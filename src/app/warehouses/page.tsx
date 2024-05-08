import { webApi } from "@/utils/web-api";
import AgGrid from "./warehouses-aggrid";

export default async function Page() {
  return <AgGrid rowData={await webApi.getRowData("distributioncenter")} />;
}
