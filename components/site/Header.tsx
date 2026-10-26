import Link from "next/link";
import { MobileNav } from "@/components/site/MobileNav";
import { ThemeToggle } from "@/components/site/ThemeToggle";
import { profile } from "@/content/profile";
import { assetPath } from "@/lib/asset-path";
import { basePath } from "@/lib/site";

const links = [
  { href: `${basePath()}/#work`, label: "Work" },
  { href: `${basePath()}/#experience`, label: "Experience" },
  { href: `${basePath()}/about/`, label: "About" },
  { href: assetPath(profile.cvPath), label: "CV" },
  { href: `mailto:${profile.email}`, label: "Email" },
];

export function Header() {
  return (
    <header className="site-header shell flex items-center justify-between gap-6 py-6">
      <Link href="/" className="font-mono font-semibold text-site-text hover:text-site-accent">
        EL
      </Link>
      <div className="flex items-center gap-3">
        <nav aria-label="Primary" className="hidden sm:block">
          <ul className="flex items-center gap-5 font-mono text-xs uppercase tracking-[0.08em]">
            {links.map((link) => (
              <li key={link.label}>
                <a className="hover:text-site-accent" href={link.href}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div data-js-only>
          <ThemeToggle />
        </div>
        <div className="sm:hidden" data-js-only>
          <MobileNav links={links} />
        </div>
      </div>
      <nav aria-label="Primary" className="sm:hidden" data-no-js-nav>
        <ul className="flex flex-wrap gap-3 text-xs">
          {links.map((link) => (
            <li key={link.label}>
              <a className="hover:text-site-accent" href={link.href}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
