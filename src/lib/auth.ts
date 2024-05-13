import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";
import Okta from "next-auth/providers/okta";
import { NextResponse } from "next/server";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Okta],
  callbacks: {
    async authorized({ request, auth }) {
      const { pathname } = request.nextUrl;
      if (pathname !== "/" && !auth) {
        return NextResponse.redirect(new URL("/", request.url));
      }
      return true;
    },
    async jwt({ token, account }) {
      if (account) {
        return {
          access_token: account.access_token,
          expires_at: account.expires_at,
          refresh_token: account.refresh_token,
          user: token,
        };
      } else if (token.expires_at && Date.now() < token.expires_at * 1000) {
        return token;
      } else {
        if (!token.refresh_token) throw new Error("Missing refresh token");

        return await refreshAccessToken(token);
      }
    },
    async session({ session, token }) {
      //session.error = token.error;
      return {
        ...session,
        ...token,
      };
    },
  },
});

async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    const url =
      `${process.env.AUTH_OKTA_ISSUER}/oauth2/default/v1/token?` +
      new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: token.refresh_token ?? "",
        scope: "openid profile email offline_access",
      });

    const authorization = btoa(
      `${process.env.AUTH_OKTA_ID}:${process.env.AUTH_OKTA_SECRET}`
    );

    const headers = {
      Authorization: `Basic ${authorization}`,
      "Content-Type": "application/x-www-form-urlencoded",
    };

    const response = await fetch(url, {
      headers,
      method: "POST",
    });

    const tokens = await response.json();

    if (!response.ok) {
      throw tokens;
    }

    return {
      ...token,
      access_token: tokens.access_token,
      expires_at: Math.floor(Date.now() / 1000 + tokens.expires_in),
      refresh_token: tokens.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    console.error("Error refreshing access token", error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}
