"use server";

import { signIn, signOut } from "@/lib/auth";

export async function oktaSignIn() {
  await signIn("okta");
}

export async function oktaSignOut() {
  await signOut();
}
