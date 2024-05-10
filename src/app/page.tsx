import { SignInButton } from "@/components/signin-button";
import { UserButton } from "@/components/user-button";
import getSession from "@/utils/get-session";
import ThemeButtons from "./_components/theme-buttons";

export default async function Page() {
  const session = await getSession();
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
