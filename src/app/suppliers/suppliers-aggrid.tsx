"use client";

import { Button } from "@/components/ui/button";
import { useWebApi } from "@/hooks/use-web-api";
import {
  ColDef,
  GridReadyEvent,
  ICellRendererParams,
  IServerSideGetRowsParams,
} from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import { Pencil } from "lucide-react";
import Link from "next/link";
import { useCallback, useMemo } from "react";

export default function SuppliersAggrid() {
  const columnDefs: ColDef[] = useMemo(
    () => [
      {
        cellRenderer: (params: ICellRendererParams) => (
          <Link href={`/suppliers/${params?.data?.id}`}>
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

  const webApi = useWebApi();

  const getRows = useCallback(
    async (params: IServerSideGetRowsParams) => {
      const { startRow } = params?.request;
      const pageSize = 100;

      const data = await webApi.post("supplier/page", {
        ...params.request,
      });

      const rowCount =
        data?.count < pageSize ? startRow ?? 0 + data?.count : -1;

      params.success({
        rowData: data?.data ?? [],
        rowCount,
      });
    },
    [webApi]
  );

  const onGridReady = useCallback(
    (event: GridReadyEvent) => {
      event.api.setGridOption("serverSideDatasource", { getRows });
    },
    [getRows]
  );

  return (
    <div className="ag-theme-quartz h-[40vh] flex flex-col">
      <div className="flex flex-row p-2">
        <Link href="/suppliers/add">
          <Button>Add Supplier</Button>
        </Link>
      </div>
      <AgGridReact
        columnDefs={columnDefs}
        rowModelType="serverSide"
        onGridReady={onGridReady}
      />
    </div>
  );
}
