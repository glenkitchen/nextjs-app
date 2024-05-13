import NextAuth from "next-auth";
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
  },
});
