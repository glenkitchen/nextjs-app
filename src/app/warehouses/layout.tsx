import { webApi } from "@/utils/web-api";
import Aggrid from "./warehouses-aggrid";
import getSession from "@/utils/get-session";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  //const session = getSession();

  return (
    <>
      <Aggrid rowData={await webApi.getRowData("distributioncenter")} />
      {children}
    </>
  );
}
