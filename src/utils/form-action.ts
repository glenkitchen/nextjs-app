"use server";

import { revalidateTag } from "next/cache";
import { getAuthHeader } from "./get-auth-header";

interface FormActionOptions {
  formId?: number | string | null;
  // revalidatePaths?: (
  //   | string
  //   | { originalPath: string; type?: "layout" | "page" }
  // )[];
  // tags?: string[];
}

export const formAction = async (
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
      ...(await getAuthHeader()),
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    // if (
    //   Array.isArray(options.revalidatePaths) &&
    //   options.revalidatePaths.length > 0
    // ) {
    //   options.revalidatePaths.forEach((path) => {
    //     if (typeof path === "string") {
    //       revalidatePath(path);
    //     } else if (path?.originalPath) {
    //       revalidatePath(path.originalPath, path.type || "page");
    //     }
    //   });
    // }

    // if (Array.isArray(options.tags) && options.tags.length > 0) {
    //   options.tags.forEach((tag) => {
    //     revalidatePath(tag);
    //   });
    // }

    revalidateTag(url);

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
