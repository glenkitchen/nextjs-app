import getSession from "@/utils/get-session";
import ThemeButtons from "./_components/theme-buttons";

export default async function Page() {
  const session = await getSession();

  return (
    <div className="flex flex-col gap-4">
      <h1>Home</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <ThemeButtons />
    </div>
  );
}
