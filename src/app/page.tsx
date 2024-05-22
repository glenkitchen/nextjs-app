import getSession from "@/utils/get-session";
import ThemeButtons from "./_components/theme-buttons";
import { db } from "@/db/drizzle";

export default async function Page() {
  const session = await getSession();

  const accounts = await db.query.accounts.findMany();

  return (
    <div className="flex flex-col gap-4">
      <h1>Home</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <ThemeButtons />
      <pre>{JSON.stringify(accounts, null, 2)}</pre>
    </div>
  );
}
