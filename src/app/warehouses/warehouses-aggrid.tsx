"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { formAction } from "@/utils/form-action";
import { webApi } from "@/utils/web-api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ColDef, ICellRendererParams } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import { set } from "date-fns";
import { Pencil } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

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

  function WarehousesForm() {
    const form = useForm({
      defaultValues: {
        code: "",
        name: "",
      },
    });

    const { data } = useQuery({
      queryKey: ["distributioncenter", formId],
      queryFn: async () => {
        return webApi.getData(`distributioncenter/${formId}`);
      },
      enabled: !!formId,
    });
    const queryClient = useQueryClient();

    useEffect(() => {
      if (formId && data) {
        form.reset(data);
      }
    }, [data, form]);

    const onSubmit = useCallback(
      async (data: any) => {
        const result = await formAction("distributioncenter", data, {
          formId,
          revalidatePath: "/warehouses",
        });

        if (result.success) {
          queryClient.invalidateQueries({ queryKey: ["distributioncenter"] });
          console.log("Success");
          setFormId(null);
        }
      },
      [queryClient]
    );

    return (
      <Sheet open={!!formId} onOpenChange={() => setFormId(null)}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Warehouse</SheetTitle>
            <p>{`formId: ${formId}`}</p>
            <Form {...form}>
              <form
                className="flex flex-col gap-2"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Code</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter code" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button>Save</Button>
              </form>
            </Form>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div className="ag-theme-quartz h-[90vh]">
      <div className="flex flex-row p-2">
        <Button onClick={() => setFormId("add")}>Add Warehouse</Button>
      </div>
      <AgGridReact columnDefs={columnDefs} rowData={rowData} />
      {!!formId && <WarehousesForm />}
    </div>
  );
}
