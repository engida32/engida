"use client";

import { Menu } from "lucide-react";
import { MotionConfig, motion } from "motion/react";
import { ThemeToggle } from "@/components/site/ThemeToggle";
import { Button, buttonVariants } from "@/components/ui/button";
import { profile } from "@/content/profile";
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
  const navLinks = links.filter((link) => !link.href.startsWith("mailto:"));

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
              {navLinks.map((link, index) => (
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
        <div className="mt-8 border-t border-site-border pt-6">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-[0.08em] text-site-muted">
              Theme
            </span>
            <ThemeToggle />
          </div>
          <ul className="mt-5 space-y-2 text-sm">
            <li>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-site-accent"
              >
                GitHub<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
            <li>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-site-accent"
              >
                LinkedIn<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
            <li>
              <a
                href={profile.x}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-site-accent"
              >
                X<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          </ul>
          <SheetClose asChild>
            <a
              href={`mailto:${profile.email}`}
              className={buttonVariants({
                variant: "default",
                size: "lg",
                className:
                  "mt-6 w-full font-mono text-xs uppercase tracking-[0.08em]",
              })}
            >
              Email me
            </a>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}
