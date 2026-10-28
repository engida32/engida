import Link from "next/link";
import { DesktopNav } from "@/components/site/DesktopNav";
import { MobileNav } from "@/components/site/MobileNav";
import { ThemeToggle } from "@/components/site/ThemeToggle";
import { profile } from "@/content/profile";
import { assetPath } from "@/lib/asset-path";
import { basePath } from "@/lib/site";

const links = [
  { href: `${basePath()}/#work`, label: "Work", cue: true },
  { href: `${basePath()}/#experience`, label: "Experience", cue: true },
  { href: `${basePath()}/about/`, label: "About", cue: true },
  { href: assetPath(profile.cvPath), label: "CV" },
  { href: `mailto:${profile.email}`, label: "Email" },
];

export function Header() {
  return (
    <header className="site-header">
      <div className="site-header-inner shell">
        <Link href="/" className="nav-link tap-target font-mono font-semibold text-site-text">
          <span aria-hidden="true">EL</span>
          <span className="sr-only">Engida Lishan</span>
        </Link>
        <div className="flex items-center gap-3">
          <DesktopNav links={links} />
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
                <a className="tap-target hover:text-site-accent" href={link.href}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
