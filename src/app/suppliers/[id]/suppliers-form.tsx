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
import { useFormAction } from "@/hooks/use-form-action";
import { useWebApi } from "@/hooks/use-web-api";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";

export default function SuppliersForm() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const form = useForm();

  const webApi = useWebApi();

  const { data } = useQuery({
    queryKey: ["supplier", params.id],
    queryFn: async () => {
      return webApi.getData(`supplier/${params.id}`);
    },
    enabled: !!params.id,
  });

  useEffect(() => {
    if (params.id === "add") {
      form.reset({ code: "", name: "" });
    } else if (params.id && data) {
      form.reset(data);
    }
  }, [data, form, params.id]);

  const { formAction } = useFormAction();

  const onSubmit = useCallback(
    async (data: any) => {
      const result = await formAction("supplier", data, {
        formId: params.id,
      });

      if (result?.success) {
        console.log("Success");
        router.back();
      } else {
        console.log(result?.error);
        throw new Error(result?.error);
      }
    },
    [formAction, params.id, router]
  );

  return (
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
  );
}
