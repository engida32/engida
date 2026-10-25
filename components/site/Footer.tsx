import { profile } from "@/content/profile";
import { assetPath } from "@/lib/asset-path";

export function Footer() {
  return (
    <footer className="site-footer shell flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-site-border py-8 text-sm text-site-muted">
      <a className="hover:text-site-accent" href={`mailto:${profile.email}`}>
        Email
      </a>
      <a className="hover:text-site-accent" href={profile.github} target="_blank" rel="noopener noreferrer">
        GitHub<span className="sr-only"> (opens in a new tab)</span>
      </a>
      <a className="hover:text-site-accent" href={profile.linkedin} target="_blank" rel="noopener noreferrer">
        LinkedIn<span className="sr-only"> (opens in a new tab)</span>
      </a>
      <a className="hover:text-site-accent" href={assetPath(profile.cvPath)}>
        CV
      </a>
      <span className="ml-auto">Addis Ababa</span>
    </footer>
  );
}
