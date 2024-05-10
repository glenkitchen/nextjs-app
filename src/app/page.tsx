import { SignInButton } from "@/components/signin-button";
import { UserButton } from "@/components/user-button";
import { auth } from "@/lib/auth";
import ThemeButtons from "./_components/theme-buttons";

export default async function Home() {
  const session = await auth();
  const user = session?.user;

  return (
    <div className="flex flex-col gap-4">
      <h1>Home</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      {user ? <UserButton user={user} /> : <SignInButton />}
      <ThemeButtons />
    </div>
  );
}
