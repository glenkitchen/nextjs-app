"use client";

import { Button } from "@/components/ui/button";

import { ColDef, ICellRendererParams } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import { Pencil } from "lucide-react";
import { useMemo, useState } from "react";
import WarehousesForm from "./warehouses-form";

export default function WarehousesAgGrid({ rowData }: { rowData: any[] }) {
  const [formId, setFormId] = useState<number | string | null>();

  const columnDefs: ColDef[] = useMemo(
    () => [
      {
        cellRenderer: (params: ICellRendererParams) => (
          <Button
            onClick={() => {
              setFormId(params?.data?.id);
            }}
          >
            <Pencil />
          </Button>
        ),
      },
      {
        field: "id",
      },
      {
        field: "code",
      },
      {
        field: "name",
      },
    ],
    []
  );

  return (
    <div className="ag-theme-quartz h-[90vh]">
      <div className="flex flex-row p-2">
        <Button onClick={() => setFormId("add")}>Add Warehouse</Button>
      </div>
      <AgGridReact columnDefs={columnDefs} rowData={rowData} />
      {!!formId && <WarehousesForm formId={formId} setFormId={setFormId} />}
    </div>
  );
}
