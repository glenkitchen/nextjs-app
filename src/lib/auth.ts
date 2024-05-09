import NextAuth, { NextAuthConfig } from "next-auth";
import Okta from "@auth/core/providers/okta";

export const BASE_PATH = "/auth";

const nextAuthConfig: NextAuthConfig = {
  basePath: BASE_PATH,
  providers: [
    Okta({
      clientId: `${process.env.AUTH_OKTA_CLIENT_ID}`,
      clientSecret: `${process.env.AUTH_OKTA_CLIENT_SECRET}`,
      issuer: `${process.env.NEXT_PUBLIC_AUTH_OKTA_DOMAIN}/oauth2/default`,
      authorization: {
        params: {
          scope: "openid profile email offline_access",
        },
      },
    }),
  ],
};

export const { handlers, auth, signIn, signOut } = NextAuth(nextAuthConfig);
