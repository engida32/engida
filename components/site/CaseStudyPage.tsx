import Link from "next/link";
import { CopyEmail } from "@/components/site/CopyEmail";
import { Reveal } from "@/components/site/Reveal";
import { profile } from "@/content/profile";
import type { CaseStudy } from "@/content/types";

function Section({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="mt-10">
      <h2 className="mb-3 text-lg font-semibold">{title}</h2>
      <div className="space-y-3">
        {items.map((item) => <p key={item} className="max-w-[62ch]">{item}</p>)}
      </div>
    </section>
  );
}

export function CaseStudyPage({
  study,
  next,
}: {
  study: CaseStudy;
  next: CaseStudy;
}) {
  return (
    <article className="shell section pt-10">
      <Reveal delay={0}>
        <div>
          <Link href="/#work" className="text-sm text-site-accent underline-offset-4 hover:underline">
            Back to selected work
          </Link>
          <h1 className="mt-6 text-[32px] font-semibold leading-[1.15] sm:text-[40px]">{study.title}</h1>
          <p className="mt-3 max-w-[62ch] text-lg text-site-muted">{study.summary}</p>
        </div>
      </Reveal>

      <Reveal delay={40}>
        <dl className="mt-8 grid grid-cols-2 gap-4 border-y border-site-border py-5 text-sm sm:grid-cols-4">
          <div><dt className="text-site-muted">Year</dt><dd>{study.year}</dd></div>
          <div><dt className="text-site-muted">Role</dt><dd>{study.role}</dd></div>
          <div><dt className="text-site-muted">Status</dt><dd>{study.status}</dd></div>
          <div><dt className="text-site-muted">Stack</dt><dd>{study.stack.join(", ")}</dd></div>
        </dl>
      </Reveal>

      <Reveal delay={80}>
        <div>
          <Section title="The problem" items={study.problem} />
          <Section title="What I built" items={study.build} />
          {study.decisions?.length ? (
            <Section title="Decisions" items={study.decisions} />
          ) : null}
          {study.scope ? <Section title="Scope" items={[study.scope]} /> : null}
          {study.validation ? <Section title="Validation" items={study.validation} /> : null}
          {study.result ? <Section title="Result" items={[study.result]} /> : null}
          {study.tradeoff ? <Section title="Tradeoff" items={[study.tradeoff]} /> : null}
          {study.next ? <Section title="What comes next" items={study.next} /> : null}

          {study.screenshots.length > 0 ? (
            <section className="mt-10">
              <h2 className="mb-3 text-lg font-semibold">Screens</h2>
              <div className="space-y-6">
                {study.screenshots.map((shot) => (
                  <figure key={shot.src}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={shot.src} alt={shot.alt} width={shot.width} height={shot.height} className="w-full border border-site-border" />
                    <figcaption className="mt-2 text-sm text-site-muted">{shot.caption}</figcaption>
                  </figure>
                ))}
              </div>
            </section>
          ) : null}

          {study.links.length > 0 ? (
            <div className="mt-10 flex flex-wrap gap-4 text-sm">
              {study.links.map((link) => (
                <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="text-site-accent underline-offset-4 hover:underline">
                  {link.label}<span className="sr-only"> (opens in a new tab)</span>
                </a>
              ))}
            </div>
          ) : null}

          <div className="mt-10">
            <CopyEmail email={profile.email} />
          </div>
        </div>
      </Reveal>

      <Reveal delay={120}>
        <nav aria-label="Next project" className="mt-16 border-t border-site-border pt-6">
          <Link href={`/work/${next.slug}/`} className="text-site-accent underline-offset-4 hover:underline">
            Next: {next.title}
          </Link>
        </nav>
      </Reveal>
    </article>
  );
}
