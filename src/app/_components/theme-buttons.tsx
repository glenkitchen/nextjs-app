"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

export default function ThemeButtons() {
  const { setTheme } = useTheme();

  return (
    <div className="flex gap-8">
      <Button onClick={() => setTheme("dark")}>Dark</Button>
      <Button onClick={() => setTheme("light")}>Light</Button>
    </div>
  );
}
