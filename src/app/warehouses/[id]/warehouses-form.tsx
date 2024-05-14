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
import { useParams, useRouter } from "next/navigation";
import { useCallback } from "react";
import { useForm } from "react-hook-form";

export default function WarehousesForm({ data }: { data: any }) {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const form = useForm({
    defaultValues: params.id ? data : { code: "", name: "" },
  });

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
        router.back();
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
