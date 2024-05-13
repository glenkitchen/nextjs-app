import { signIn } from "@/lib/auth";
import { Button } from "./ui/button";

export function SignInButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("okta");
      }}
    >
      <Button type="submit">Signin with Okta</Button>
    </form>
  );
}

// Client-side button
// export function SignInButton() {
//   return <Button onClick={() => signIn("okta")}>Signin with Okta</Button>;
// }
