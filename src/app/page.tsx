import { auth, signIn } from "@/lib/auth";
import ThemeButtons from "./_components/theme-buttons";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const session = await auth();

  return (
    <div className="flex flex-col gap-4">
      <h1>Home</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      {/* {session ? (
        <Button onClick={async () => await signIn()}>SignOut</Button>
      ) : (
        <Button onClick={async () => await signIn()}>SignIn</Button>
      )} */}
      <ThemeButtons />
    </div>
  );
}
