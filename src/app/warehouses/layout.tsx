import { webApi } from "@/utils/web-api";
import Aggrid from "./warehouses-aggrid";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Aggrid rowData={await webApi.getRowData("distributioncenter")} />
      {children}
    </>
  );
}
