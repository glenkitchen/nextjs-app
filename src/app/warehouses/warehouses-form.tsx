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
import { useWebApi } from "@/hooks/use-web-api";
import { formAction } from "@/utils/form-action";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";

export default function WarehousesForm({
  formId,
  setFormId,
}: {
  formId: number | string | null;
  setFormId: (formId: number | string | null) => void;
}) {
  const form = useForm({
    defaultValues: {
      code: "",
      name: "",
    },
  });

  const webApi = useWebApi();
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
  }, [data, form, formId]);

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
    [formId, queryClient, setFormId]
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
