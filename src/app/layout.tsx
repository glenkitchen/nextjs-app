import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Sidebar from "./_components/sidebar";
import { ThemeProvider } from "./_components/theme-provider";
import "./globals.css";
import ClientRootLayout from "./_components/client-root-layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={inter.className}>
        <ClientRootLayout>
          <ThemeProvider>
            <div className="flex-row flex">
              <Sidebar />
              <main className="flex-grow p-4">{children}</main>
            </div>
          </ThemeProvider>
        </ClientRootLayout>
      </body>
    </html>
  );
}
