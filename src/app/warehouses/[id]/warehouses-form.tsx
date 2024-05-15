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
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";

export default function WarehousesForm() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const webApi = useWebApi();

  const { data } = useQuery({
    queryKey: ["distributioncenter", params.id],
    queryFn: async () => {
      return webApi.getData(`distributioncenter/${params.id}`);
    },
    enabled: !!params.id,
  });

  const form = useForm();

  useEffect(() => {
    if (params.id === "add") {
      form.reset({ code: "", name: "" });
    } else if (params.id && data) {
      form.reset(data);
    }
  }, [data, form, params.id]);

  const onSubmit = useCallback(
    async (data: any) => {
      const result = await formAction("distributioncenter", data, {
        formId: params.id,
        revalidatePaths: [
          "/warehouses",
          { originalPath: "/warehouses/[id]", type: "page" },
        ],
      });

      if (result?.success) {
        console.log("Success");
        router.push("/warehouses");
      } else {
        console.log(result?.error);
        throw new Error(result?.error);
      }
    },
    [params.id, router]
  );

  return (
    <Sheet open={true} onOpenChange={() => router.back()}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Warehouse</SheetTitle>
          <p>{`formId: ${params.id}`}</p>
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
