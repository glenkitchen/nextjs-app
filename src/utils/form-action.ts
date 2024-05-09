"use server";

import { revalidatePath } from "next/cache";

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
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    if (options.revalidatePath) {
      revalidatePath(options.revalidatePath);
    }

    return { success: true };
  } else {
    return { success: false };
  }
};
