import Link from "next/link";
import { assetPath } from "@/lib/asset-path";
import { CopyEmail } from "@/components/site/CopyEmail";
import { Reveal } from "@/components/site/Reveal";
import { profile } from "@/content/profile";
import type { CaseStudy, CaseStudyDiagram } from "@/content/types";

type TocItem = {
  id: string;
  label: string;
};

function Section({
  id,
  title,
  items,
}: {
  id: string;
  title: string;
  items: string[];
}) {
  return (
    <section id={id} data-case-section className="case-section">
      <h2>{title}</h2>
      <div className="case-prose">
        {items.map((item) => <p key={item}>{item}</p>)}
      </div>
    </section>
  );
}

function ListSection({
  id,
  title,
  items,
}: {
  id: string;
  title: string;
  items: string[];
}) {
  return (
    <section id={id} data-case-section className="case-section">
      <h2>{title}</h2>
      <ul className="case-list">
        {items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </section>
  );
}

function Diagram({ diagram }: { diagram: CaseStudyDiagram }) {
  return (
    <section id="diagram" data-case-section className="case-section">
      <h2>{diagram.title}</h2>
      <Reveal>
        <ol data-stagger="diagram" className="case-diagram">
          {diagram.items.map((item, index) => (
            <li key={item} className="flex items-center gap-2">
              <span data-stagger-item className="case-badge">
                {item}
              </span>
              {diagram.kind === "flow" && index < diagram.items.length - 1 ? (
                <span aria-hidden="true" className="font-mono text-xs text-site-muted">
                  -&gt;
                </span>
              ) : null}
            </li>
          ))}
        </ol>
      </Reveal>
    </section>
  );
}

function Sidebar({ study, toc }: { study: CaseStudy; toc: TocItem[] }) {
  return (
    <aside data-case-sidebar aria-label="Case study details" className="case-sidebar">
      <div className="case-sidebar-panel">
        <dl className="space-y-4">
          {study.scope ? (
            <div>
              <dt className="case-sidebar-label">Scope</dt>
              <dd className="mt-1 text-sm text-site-muted">{study.scope}</dd>
            </div>
          ) : null}
          <div>
            <dt className="case-sidebar-label">Timeline</dt>
            <dd className="mt-1 text-sm">{study.year}</dd>
          </div>
          <div>
            <dt className="case-sidebar-label">Role</dt>
            <dd className="mt-1 text-sm">{study.role}</dd>
          </div>
          <div>
            <dt className="case-sidebar-label">Status</dt>
            <dd className="mt-1 text-sm">{study.status}</dd>
          </div>
          <div>
            <dt className="case-sidebar-label">Stack</dt>
            <dd className="case-stack">
              {study.stack.map((item) => (
                <span key={item} className="case-badge">{item}</span>
              ))}
            </dd>
          </div>
          {study.deliverables?.length ? (
            <div>
              <dt className="case-sidebar-label">Deliverables</dt>
              <dd>
                <ul className="case-sidebar-list">
                  {study.deliverables.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </dd>
            </div>
          ) : null}
        </dl>
      </div>

      <nav data-case-toc aria-label="On this page" className="case-toc">
        <p className="case-sidebar-label">On this page</p>
        <ul>
          {toc.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`} className="case-toc-link">{item.label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export function CaseStudyPage({
  study,
  next,
}: {
  study: CaseStudy;
  next: CaseStudy;
}) {
  const toc: TocItem[] = [
    { id: "problem", label: "The problem" },
    { id: "build", label: "What I built" },
    ...(study.diagram ? [{ id: "diagram", label: study.diagram.title }] : []),
    ...(study.decisions?.length ? [{ id: "decisions", label: "Decisions" }] : []),
    ...(study.context ? [{ id: "context", label: "Team context" }] : []),
    ...(study.validation?.length ? [{ id: "validation", label: "Validation" }] : []),
    ...(study.result ? [{ id: "result", label: "Result" }] : []),
    ...(study.tradeoff ? [{ id: "tradeoff", label: "Tradeoff" }] : []),
    ...(study.next?.length ? [{ id: "next", label: "What comes next" }] : []),
    ...(study.screenshots.length ? [{ id: "screens", label: "Screens" }] : []),
    ...(study.links.length ? [{ id: "links", label: "Links" }] : []),
    { id: "contact", label: "Contact" },
  ];

  return (
    <article className="shell section pt-10">
      <header className="case-header">
        <Link href="/#work" className="prose-link text-sm">
          Back to selected work
        </Link>
        <h1 className="case-title">{study.title}</h1>
        <p className="case-summary">{study.summary}</p>
        {study.outcome ? (
          <div className="case-outcome">
            <p className="case-sidebar-label">Outcome</p>
            <p>{study.outcome}</p>
          </div>
        ) : null}
      </header>

      <div className="case-layout">
        <Sidebar study={study} toc={toc} />

        <div data-case-body className="case-body">
          {study.hero ? (
            <figure data-case-hero className="case-hero">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={assetPath(study.hero.src)}
                alt={study.hero.alt}
                width={study.hero.width}
                height={study.hero.height}
                loading="eager"
                decoding="async"
                className="w-full border border-site-border"
              />
              <figcaption>{study.hero.caption}</figcaption>
            </figure>
          ) : null}
          <Section id="problem" title="The problem" items={study.problem} />
          <Section id="build" title="What I built" items={study.build} />
          {study.diagram ? <Diagram diagram={study.diagram} /> : null}
          {study.decisions?.length ? (
            <ListSection id="decisions" title="Decisions" items={study.decisions} />
          ) : null}
          {study.context ? (
            <Section id="context" title="Team context" items={[study.context]} />
          ) : null}
          {study.validation?.length ? (
            <ListSection id="validation" title="Validation" items={study.validation} />
          ) : null}
          {study.result ? (
            <Section id="result" title="Result" items={[study.result]} />
          ) : null}
          {study.tradeoff ? (
            <Section id="tradeoff" title="Tradeoff" items={[study.tradeoff]} />
          ) : null}
          {study.next?.length ? (
            <ListSection id="next" title="What comes next" items={study.next} />
          ) : null}

          {study.screenshots.length > 0 ? (
            <section id="screens" data-case-section className="case-section">
              <h2>Screens</h2>
              <div className="space-y-6">
                {study.screenshots.map((shot) => (
                  <figure key={shot.src}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={assetPath(shot.src)}
                      alt={shot.alt}
                      width={shot.width}
                      height={shot.height}
                      loading="lazy"
                      decoding="async"
                      className="w-full border border-site-border"
                    />
                    <figcaption className="mt-2 text-sm text-site-muted">{shot.caption}</figcaption>
                  </figure>
                ))}
              </div>
            </section>
          ) : null}

          {study.links.length > 0 ? (
            <section id="links" data-case-section className="case-section">
              <h2>Links</h2>
              <div className="case-links">
                {study.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="prose-link text-sm"
                  >
                    {link.label}<span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ))}
              </div>
            </section>
          ) : null}

          <section id="contact" data-case-section className="case-section">
            <h2>Contact</h2>
            <p className="case-prose">Email me about this work.</p>
            <div className="mt-4 flex flex-wrap items-center gap-4">
              <a href={`mailto:${profile.email}`} className="prose-link text-sm">
                {profile.email}
              </a>
              <CopyEmail email={profile.email} />
            </div>
          </section>
        </div>
      </div>

      <nav aria-label="Next project" className="case-next">
        <Link href={`/work/${next.slug}/`} className="prose-link">
          Next: {next.title}
        </Link>
      </nav>
    </article>
  );
}
