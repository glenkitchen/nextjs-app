"use client";

import { SignInButton } from "@/components/signin-button";
import { UserButton } from "@/components/user-button";
import { useSession } from "next-auth/react";

export default function Home() {
  const session = useSession();
  const user = session?.data?.user;

  return (
    <>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      {user && <UserButton user={user} />}
      {!user && session.status !== "loading" && <SignInButton />}
    </>
  );
}
