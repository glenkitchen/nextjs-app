"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

export default function Buttons() {
  const { setTheme } = useTheme();

  return (
    <>
      <Button onClick={() => setTheme("dark")}>Dark</Button>
      <Button onClick={() => setTheme("light")}>Light</Button>
    </>
  );
}
