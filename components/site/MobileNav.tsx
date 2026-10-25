"use client";

type LinkItem = { href: string; label: string };

export function MobileNav({ links }: { links: LinkItem[] }) {
  return <span className="text-sm">Menu</span>;
}
