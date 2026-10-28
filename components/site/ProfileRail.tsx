import {
  ArrowRight,
  ArrowUpRight,
  FileText,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";
import { CopyEmail } from "@/components/site/CopyEmail";
import { XMark } from "@/components/site/XMark";
import { profile } from "@/content/profile";
import { assetPath } from "@/lib/asset-path";

const facts = [
  { label: "Based in", value: profile.location },
  { label: "Focus", value: "AI product and platform engineering" },
  {
    label: "Stack",
    value: (
      <span className="rail-stack">
        <span>TypeScript, React, Next.js</span>
        <span>Python, FastAPI, Postgres, pgvector</span>
      </span>
    ),
  },
];

export function ProfileRail() {
  return (
    <aside
      data-profile-rail
      aria-label="Profile and contact"
      className="site-rail border border-site-border bg-site-surface p-5"
    >
      <div className="rail-header">
        <p className="rail-eyebrow">Profile</p>
        <span className="rail-available">
          <span className="rail-available-dot" aria-hidden="true" />
          Available
        </span>
      </div>

      <dl className="rail-facts">
        {facts.map((fact) => (
          <div key={fact.label} className="rail-fact">
            <dt>{fact.label}</dt>
            <dd>{fact.value}</dd>
          </div>
        ))}
      </dl>

      <div className="rail-contact">
        <div className="rail-contact-header">
          <p className="rail-contact-label">Contact</p>
          <CopyEmail email={profile.email} variant="rail" />
        </div>

        <div className="rail-contact-list">
          <a className="rail-email" href={`mailto:${profile.email}`}>
            <Mail aria-hidden="true" />
            <span>{profile.email}</span>
            <ArrowRight aria-hidden="true" className="rail-row-arrow" />
          </a>

          <div className="rail-secondary">
            <a className="rail-contact-link" href={assetPath(profile.cvPath)}>
              <FileText aria-hidden="true" />
              <span>CV</span>
              <ArrowUpRight aria-hidden="true" className="rail-row-arrow" />
            </a>
            <a
              className="rail-contact-link"
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github aria-hidden="true" />
              <span>GitHub</span>
              <ArrowUpRight aria-hidden="true" className="rail-row-arrow" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <a
              className="rail-contact-link"
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin aria-hidden="true" />
              <span>LinkedIn</span>
              <ArrowUpRight aria-hidden="true" className="rail-row-arrow" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <a
              className="rail-contact-link"
              href={profile.x}
              target="_blank"
              rel="noopener noreferrer"
            >
              <XMark className="rail-x-icon" />
              <span>X</span>
              <ArrowUpRight aria-hidden="true" className="rail-row-arrow" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
}
