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
    const method = options.formId === "add" ? "POST" : "PUT";

    const fullUrl = `${process.env.NEXT_PUBLIC_WEB_API_URL}${url}`;

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
