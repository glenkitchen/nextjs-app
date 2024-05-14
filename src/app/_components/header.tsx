import { SignInButton } from "@/components/signin-button";
import { UserButton } from "@/components/user-button";
import { Session } from "next-auth";

export default function Header({ session }: { session: Session | null }) {
  return (
    <div className="p-1">
      {session?.user ? <UserButton user={session?.user} /> : <SignInButton />}
    </div>
  );
}
