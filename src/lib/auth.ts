import NextAuth, { NextAuthConfig } from "next-auth";
import Okta from "next-auth/providers/okta";

export const BASE_PATH = "/auth";

const nextAuthConfig: NextAuthConfig = {
  providers: [
    Okta({
      issuer: `${process.env.NEXT_PUBLIC_AUTH_OKTA_ISSUER}/oauth2/default`,
    }),
  ],
};

export const { handlers, auth, signIn, signOut } = NextAuth(nextAuthConfig);
