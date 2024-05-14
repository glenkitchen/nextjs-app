"use server";

import { revalidatePath } from "next/cache";
import { getAuthHeader } from "./get-auth-header";

export const formAction = async (
  url: string,
  data: any,
  options: { formId?: number | string | null; revalidatePath?: string }
) => {
  const method = options.formId === "add" ? "POST" : "PUT";

  const fullUrl = `${process.env.NEXT_PUBLIC_WEB_API_URL}${url}`;

  const response = await fetch(fullUrl, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(await getAuthHeader()),
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    console.error(`HTTP formAction. Status: ${response.status}`);
    throw new Error(`HTTP formAction. Status: ${response.status}`);
  }

  if (response.ok) {
    if (options.revalidatePath) {
      revalidatePath(options.revalidatePath);
    }

    return { success: true };
  } else {
    return { success: false };
  }
};
