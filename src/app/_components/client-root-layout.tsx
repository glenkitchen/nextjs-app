"use client";

import { provideGlobalGridOptions } from "ag-grid-community";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LicenseManager } from "ag-grid-enterprise";

LicenseManager.setLicenseKey(
  "Using_this_{AG_Grid}_Enterprise_key_{AG-051875}_in_excess_of_the_licence_granted_is_not_permitted___Please_report_misuse_to_legal@ag-grid.com___For_help_with_changing_this_key_please_contact_info@ag-grid.com___{Insight_Consulting}_is_granted_a_{Single_Application}_Developer_License_for_the_application_{Ensource}_only_for_{1}_Front-End_JavaScript_developer___All_Front-End_JavaScript_developers_working_on_{Ensource}_need_to_be_licensed___{Ensource}_has_been_granted_a_Deployment_License_Add-on_for_{1}_Production_Environment___This_key_works_with_{AG_Grid}_Enterprise_versions_released_before_{17_February_2025}____[v3]_[01]_MTczOTc1MDQwMDAwMA==f75495a0d281d8f2031d4e4cb0076500"
);

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

  // const queryClient = new QueryClient({
  //   defaultOptions: {
  //     queries: {
  //       staleTime: Infinity,
  //     },
  //   },
  // });
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
