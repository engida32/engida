"use client";

import { usePathname } from "next/navigation";
import { stripBasePath } from "@/lib/site";

export type NavLink = { href: string; label: string; cue?: boolean };

export function DesktopNav({ links }: { links: NavLink[] }) {
  const pathname = usePathname() ?? "/";
  const current = stripBasePath(pathname);

  return (
    <nav aria-label="Primary" className="hidden sm:block">
      <ul className="flex items-center gap-5 font-mono text-xs uppercase tracking-[0.08em]">
        {links.map((link) => {
          const isAbout = link.label === "About" && current === "/about";
          return (
            <li key={link.label}>
              <a
                className="nav-link tap-target"
                href={link.href}
                aria-current={isAbout ? "page" : undefined}
              >
                {link.cue ? (
                  <span aria-hidden="true" className="nav-cue">
                    &gt;
                  </span>
                ) : null}
                {link.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
