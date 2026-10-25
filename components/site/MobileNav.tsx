"use client";

import { Menu } from "lucide-react";
import { MotionConfig, motion } from "motion/react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

type LinkItem = { href: string; label: string };

export function MobileNav({ links }: { links: LinkItem[] }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Open menu">
          <Menu aria-hidden="true" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <nav aria-label="Mobile" className="mt-6">
          <MotionConfig reducedMotion="user">
            <ul className="space-y-1">
              {links.map((link, index) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.15, delay: index * 0.03 }}
                >
                  <SheetClose asChild>
                    <a
                      href={link.href}
                      className="block py-2 text-base hover:text-site-accent"
                    >
                      {link.label}
                    </a>
                  </SheetClose>
                </motion.li>
              ))}
            </ul>
          </MotionConfig>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
