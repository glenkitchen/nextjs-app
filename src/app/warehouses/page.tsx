import { webApi } from "@/utils/web-api";
import AgGrid from "./warehouses-aggrid";

export default async function Page() {
  const rowData = [
    {
      code: "W1",
      name: "Warehouse 1",
    },
    {
      code: "W2",
      name: "Warehouse 2",
    },
  ];

  const rowData2 = await webApi.getRowData("distributioncenter");

  return <AgGrid rowData={await webApi.getRowData("distributioncenter")} />;
}
