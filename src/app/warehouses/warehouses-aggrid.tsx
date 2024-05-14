"use client";

import { Button } from "@/components/ui/button";
import { ColDef, ICellRendererParams } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import { Pencil } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

export default function WarehousesAgGrid({ rowData }: { rowData: any[] }) {
  const columnDefs: ColDef[] = useMemo(
    () => [
      {
        cellRenderer: (params: ICellRendererParams) => (
          <Link href={`/warehouses/${params?.data?.id}`}>
            <Button>
              <Pencil />
            </Button>
          </Link>
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
    <div className="ag-theme-quartz h-[85vh]">
      <div className="flex flex-row p-2">
        <Link href="/warehouses/add">
          <Button>Add Warehouse</Button>
        </Link>
      </div>
      <AgGridReact columnDefs={columnDefs} rowData={rowData} />
    </div>
  );
}
