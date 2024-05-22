import getSession from "@/utils/get-session";
import ThemeButtons from "./_components/theme-buttons";
import { db } from "@/db/drizzle";
import { unstable_cache } from "next/cache";

export const fetchCache = "force-cache";

const distributioncenters = unstable_cache(async () =>
  db.query.distributioncenters.findMany()
);

export default async function Page() {
  const session = await getSession();

  const accounts = await db.query.distributioncenters.findMany();
  console.log("🚀 ~ Page ~ accounts:", accounts);

  return (
    <div className="flex flex-col gap-4">
      <h1>Home</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <ThemeButtons />
      <pre>{JSON.stringify(accounts, null, 2)}</pre>
    </div>
  );
}
