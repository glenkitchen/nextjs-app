"use server";

import { revalidatePath as revalidate } from "next/cache";

export const revalidatePath = async (path: string) => {
  revalidate(path, "page");
};
