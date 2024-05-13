import getSession from "@/utils/get-session";

export default async function Page() {
  const session = await getSession();

  if (!session) {
    return <p>Not authenticated</p>;
  }

  return <div>Regions</div>;
}
