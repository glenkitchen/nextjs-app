"use client";

import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { useMemo } from "react";

export default function WarehousesAggrid({ rowData }: { rowData: any[] }) {
  const columnDefs: ColDef[] = useMemo(
    () => [
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
    <div className="ag-theme-quartz h-[95vh]">
      <AgGridReact columnDefs={columnDefs} rowData={rowData} />
    </div>
  );
}
