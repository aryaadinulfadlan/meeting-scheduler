"use client";

import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { FaBars } from "react-icons/fa6";
import { useMobileSidebar } from "@/store";
import Sidebar from "./sidebar";

export default function MobileSidebar() {
  const pathname = usePathname();
  const { isOpen, onClose, onOpen } = useMobileSidebar();

  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  return (
    <>
      <Button
        onClick={onOpen}
        className="block md:hidden"
        variant="ghost"
        size="sm"
      >
        <FaBars className="size-4" />
      </Button>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent
          side="left"
          className="pt-8 w-56"
          aria-describedby={undefined}
        >
          <SheetTitle>
            <VisuallyHidden.Root>Dummy Title</VisuallyHidden.Root>
          </SheetTitle>
          <Sidebar />
        </SheetContent>
      </Sheet>
    </>
  );
}
