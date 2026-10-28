import { FileText, Github, Linkedin, Mail } from "lucide-react";
import { XMark } from "@/components/site/XMark";
import { profile } from "@/content/profile";
import { assetPath } from "@/lib/asset-path";

export function Footer() {
  return (
    <footer className="site-footer shell flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-site-border pt-6 pb-20 text-[13px] text-site-muted">
      <div className="footer-links">
        <a className="footer-contact" href={`mailto:${profile.email}`}>
          <Mail aria-hidden="true" />
          <span>Email</span>
        </a>
        <a className="footer-contact" href={assetPath(profile.cvPath)}>
          <FileText aria-hidden="true" />
          <span>CV</span>
        </a>
        <a
          className="footer-contact"
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github aria-hidden="true" />
          <span>GitHub</span>
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
        <a
          className="footer-contact"
          href={profile.linkedin}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Linkedin aria-hidden="true" />
          <span>LinkedIn</span>
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
        <a
          className="footer-contact"
          href={profile.x}
          target="_blank"
          rel="noopener noreferrer"
        >
          <XMark className="footer-x" />
          <span>X</span>
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>
      <span className="footer-location">{profile.location}</span>
    </footer>
  );
}
