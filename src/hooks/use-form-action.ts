"use client";

import { useAuthHeader } from "./use-auth-header";

interface FormActionOptions {
  formId?: number | string | null;
}

export const useFormAction = () => {
  const headers = useAuthHeader();

  const formAction = async (
    url: string,
    data: any,
    options: FormActionOptions
  ) => {
    console.log("🚀 ~ useFormAction ~ data:", data);
    const method = options.formId === "add" ? "POST" : "PUT";
    console.log("🚀 ~ useFormAction ~ method:", method);

    const fullUrl = `${process.env.NEXT_PUBLIC_WEB_API_URL}${url}`;

    console.log("🚀 ~ useFormAction ~ fullUrl:", fullUrl);
    const response = await fetch(fullUrl, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        error: `HTTP formAction. Status: ${response.status}`,
      };
    }
  };

  return { formAction };
};
