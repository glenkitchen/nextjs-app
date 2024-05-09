"use client";

import { provideGlobalGridOptions } from "ag-grid-community";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function ClientRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  provideGlobalGridOptions({
    defaultColDef: {
      filter: true,
    },
  });

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
