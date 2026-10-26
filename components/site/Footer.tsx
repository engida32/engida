import { profile } from "@/content/profile";
import { assetPath } from "@/lib/asset-path";

export function Footer() {
  return (
    <footer className="site-footer shell flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-site-border pt-8 pb-20 text-sm sm:pt-8 sm:pb-8 text-site-muted">
      <a className="footer-link" href={`mailto:${profile.email}`}>
        Email
      </a>
      <a className="footer-link" href={profile.github} target="_blank" rel="noopener noreferrer">
        GitHub<span className="sr-only"> (opens in a new tab)</span>
      </a>
      <a className="footer-link" href={profile.linkedin} target="_blank" rel="noopener noreferrer">
        LinkedIn<span className="sr-only"> (opens in a new tab)</span>
      </a>
      <a className="footer-link" href={assetPath(profile.cvPath)}>
        CV
      </a>
      <span className="ml-auto">Addis Ababa</span>
    </footer>
  );
}
