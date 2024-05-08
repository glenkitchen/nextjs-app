"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

export default function Sidebar() {
  return (
    <aside>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Admin</AccordionTrigger>
          <AccordionContent className="flex flex-col">
            <Link href="/regions">Regions</Link>
            <Link href="/suppliers">Suppliers</Link>
            <Link href="/warehouses">Warehouses</Link>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  );
}
