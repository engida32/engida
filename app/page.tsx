import { Fragment } from "react";
import { CopyEmail } from "@/components/site/CopyEmail";
import { ExperienceList } from "@/components/site/ExperienceList";
import { JsonLd } from "@/components/site/JsonLd";
import { Reveal } from "@/components/site/Reveal";
import { SectionLabel } from "@/components/site/SectionLabel";
import { WorkList } from "@/components/site/WorkList";
import { Button } from "@/components/ui/button";
import { experience } from "@/content/experience";
import { profile } from "@/content/profile";
import { workItems } from "@/content/work";
import { homeJsonLd } from "@/lib/jsonld";
import { basePath } from "@/lib/site";

export default function HomePage() {
  return (
    <div className="shell">
      <JsonLd data={homeJsonLd()} />
      <Reveal delay={0}>
        <section className="section pt-10 hero-section">
          <div
            data-hero-grid
            className="grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(260px,5fr)] lg:gap-12"
          >
            <div>
              <h1 className="text-balance">
                <span className="block font-mono text-xs uppercase tracking-[0.16em] text-site-accent">
                  {profile.name}
                </span>
                <span className="sr-only">. </span>
                <span className="mt-4 block max-w-[24ch] hyphens-none text-[30px] font-semibold leading-[1.1] sm:max-w-[20ch] sm:text-[42px]">
                  {profile.headline.split("full-stack").map((part, index, parts) => (
                    <Fragment key={index}>
                      {part}
                      {index < parts.length - 1 ? (
                        <span className="whitespace-nowrap">full-stack</span>
                      ) : null}
                    </Fragment>
                  ))}
                </span>
              </h1>
              <p className="mt-6 max-w-[58ch]">{profile.availability}</p>
              <p className="mt-2 max-w-[58ch] text-site-muted">{profile.supporting}</p>
              <div className="mt-7 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <Button
                  asChild
                  size="lg"
                  className="w-full font-mono text-xs uppercase tracking-[0.08em] sm:w-auto"
                >
                  <a href={`mailto:${profile.email}`}>Email me</a>
                </Button>
                <Button
                  asChild
                  variant="secondary"
                  size="lg"
                  className="w-full font-mono text-xs uppercase tracking-[0.08em] sm:w-auto"
                >
                  <a href="#work">View work</a>
                </Button>
                <CopyEmail email={profile.email} />
              </div>
            </div>
            <aside aria-label="Quick facts" className="lg:pt-8">
              <dl className="grid grid-cols-1 gap-px overflow-hidden border border-site-border bg-site-border sm:grid-cols-2">
                <div className="bg-site-bg px-4 py-3">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-site-muted">Based in</dt>
                  <dd className="mt-1 text-sm leading-6">{profile.location}</dd>
                </div>
                <div className="bg-site-bg px-4 py-3">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-site-muted">Focus</dt>
                  <dd className="mt-1 text-sm leading-6">AI features and full-stack products</dd>
                </div>
                <div className="bg-site-bg px-4 py-3">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-site-muted">Stack</dt>
                  <dd className="mt-1 text-sm leading-6">Next.js, Python, pgvector</dd>
                </div>
                <div className="bg-site-bg px-4 py-3">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-site-muted">Status</dt>
                  <dd className="mt-1 text-sm leading-6">Open to senior roles</dd>
                </div>
              </dl>
            </aside>
          </div>
        </section>
      </Reveal>

      <Reveal delay={40}>
        <section id="work" aria-labelledby="work-label" className="section work-section">
          <SectionLabel id="work-label">Selected work</SectionLabel>
          <WorkList items={workItems} />
        </section>
      </Reveal>

      <Reveal delay={80}>
        <section id="experience" aria-labelledby="experience-label" className="section">
          <SectionLabel id="experience-label">Experience</SectionLabel>
          <ExperienceList items={experience} />
        </section>
      </Reveal>

      <Reveal delay={120}>
        <section id="about" aria-labelledby="about-label" className="section">
          <SectionLabel id="about-label">About</SectionLabel>
          <p className="max-w-[62ch]">{profile.about}</p>
          <a
            href={`${basePath()}/about/`}
            className="prose-link mt-3 inline-block font-mono text-xs uppercase tracking-[0.08em]"
          >
            More about how I work
          </a>
        </section>
      </Reveal>
    </div>
  );
}
