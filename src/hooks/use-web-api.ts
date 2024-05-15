"use client";

import { useAuthHeader } from "./use-auth-header";

export const useWebApi = () => {
  const baseUrl = process.env.NEXT_PUBLIC_WEB_API_URL;
  const headers = useAuthHeader();

  const throwError = (message: string) => {
    console.error(message);
    throw new Error(message);
  };

  const getRowData = async <TData>(url: string) => {
    const response = await fetch(`${baseUrl}${url}`, {
      headers,
    });

    if (!response.ok) {
      throwError(`getRowData. Status: ${response.status}`);
    }

    const json = await response.json();
    return json?.data as TData[];
  };

  const getData = async <TData>(url: string) => {
    const response = await fetch(`${baseUrl}${url}`, {
      headers,
    });

    if (!response.ok) {
      throwError(`getData. Status: ${response.status}`);
    }

    const json = await response.json();
    return json as TData;
  };

  const post = async (url: string, data: any) => {
    const response = await fetch(`${baseUrl}${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.error(`HTTP post. Status: ${response.status}`);
      throw new Error(`HTTP post. Status: ${response.status}`);
    }

    const json = await response.json();
    return json || {};
  };

  return { getRowData, getData, post };
};
