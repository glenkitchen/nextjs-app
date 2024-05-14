"use client";

import { useSession } from "next-auth/react";

export const useAuthHeader = () => {
  const session = useSession();

  return { Authorization: `Bearer ${session?.data?.access_token}` };
};
