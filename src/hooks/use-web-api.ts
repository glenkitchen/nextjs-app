"use client";

import { useSession } from "next-auth/react";

export const useWebApi = () => {
  const baseUrl = process.env.NEXT_PUBLIC_WEB_API_URL;
  const session = useSession();

  const getHeaders = async () => {
    return { Authorization: `Bearer ${session?.data?.access_token}` };
  };

  const getRowData = async (url: string) => {
    const response = await fetch(`${baseUrl}${url}`, {
      headers: await getHeaders(),
    });

    if (!response.ok) {
      console.error(`HTTP getRowData. Status: ${response.status}`);
      throw new Error(`HTTP getRowData. Status: ${response.status}`);
    }

    const json = await response.json();
    return json?.data || [];
  };

  const getData = async (url: string) => {
    const response = await fetch(`${baseUrl}${url}`, {
      headers: await getHeaders(),
    });

    if (!response.ok) {
      console.error(`HTTP getData. Status: ${response.status}`);
      throw new Error(`HTTP getData. Status: ${response.status}`);
    }

    const json = await response.json();
    return json || {};
  };

  return { getRowData, getData };
};
