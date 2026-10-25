import Link from "next/link";
import { MobileNav } from "@/components/site/MobileNav";
import { profile } from "@/content/profile";
import { basePath } from "@/lib/site";

const links = [
  { href: `${basePath()}/#work`, label: "Work" },
  { href: `${basePath()}/#experience`, label: "Experience" },
  { href: `${basePath()}/#about`, label: "About" },
  { href: `mailto:${profile.email}`, label: "Email" },
];

export function Header() {
  return (
    <header className="site-header shell flex items-center justify-between gap-6 py-6">
      <Link href="/" className="font-semibold text-site-text hover:text-site-accent">
        EL
      </Link>
      <nav aria-label="Primary" className="hidden sm:block">
        <ul className="flex items-center gap-5 text-sm">
          {links.map((link) => (
            <li key={link.label}>
              <a className="hover:text-site-accent" href={link.href}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="sm:hidden" data-js-only>
        <MobileNav links={links} />
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
