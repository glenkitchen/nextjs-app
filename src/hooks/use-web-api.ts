"use client";

import { useAuthHeader } from "./use-auth-header";

export const useWebApi = () => {
  const baseUrl = process.env.NEXT_PUBLIC_WEB_API_URL;
  const headers = useAuthHeader();

  const getRowData = async (url: string) => {
    const response = await fetch(`${baseUrl}${url}`, {
      headers,
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
      headers,
    });

    if (!response.ok) {
      console.error(`HTTP getData. Status: ${response.status}`);
      throw new Error(`HTTP getData. Status: ${response.status}`);
    }

    const json = await response.json();
    return json || {};
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
