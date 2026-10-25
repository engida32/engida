import { CopyEmail } from "@/components/site/CopyEmail";
import { ExperienceList } from "@/components/site/ExperienceList";
import { JsonLd } from "@/components/site/JsonLd";
import { Reveal } from "@/components/site/Reveal";
import { SectionLabel } from "@/components/site/SectionLabel";
import { WorkList } from "@/components/site/WorkList";
import { Button } from "@/components/ui/button";
import { clients } from "@/content/clients";
import { experience } from "@/content/experience";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { homeJsonLd } from "@/lib/jsonld";

export default function HomePage() {
  return (
    <div className="shell">
      <JsonLd data={homeJsonLd()} />
      <Reveal delay={0}>
        <section className="section pt-10">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(260px,5fr)] lg:gap-12">
            <div>
              <h1 className="text-balance">
                <span className="block font-mono text-xs uppercase tracking-[0.16em] text-site-accent">
                  {profile.name}
                </span>
                <span className="mt-4 block max-w-[20ch] text-[32px] font-semibold leading-[1.1] sm:text-[42px]">
                  {profile.headline}
                </span>
              </h1>
              <p className="mt-6 max-w-[58ch]">{profile.availability}</p>
              <p className="mt-2 max-w-[58ch] text-site-muted">{profile.supporting}</p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Button
                  asChild
                  size="lg"
                  className="h-10 px-4 font-mono text-xs uppercase tracking-[0.08em]"
                >
                  <a href={`mailto:${profile.email}`}>Email me</a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-10 px-4 font-mono text-xs uppercase tracking-[0.08em]"
                >
                  <a href="#work">View work</a>
                </Button>
                <CopyEmail email={profile.email} />
              </div>
            </div>
            <aside aria-label="Quick facts" className="lg:pt-8">
              <dl className="grid grid-cols-2 gap-px overflow-hidden border border-site-border bg-site-border lg:grid-cols-1">
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
        <section id="work" className="section">
          <SectionLabel>Selected work</SectionLabel>
          <h2 className="mb-4 text-xl font-semibold">Client work</h2>
          <WorkList items={clients} />
          <h2 className="mb-4 mt-12 text-xl font-semibold">Independent</h2>
          <WorkList items={projects} />
        </section>
      </Reveal>

      <Reveal delay={80}>
        <section id="experience" className="section">
          <SectionLabel>Experience</SectionLabel>
          <ExperienceList items={experience} />
        </section>
      </Reveal>

      <Reveal delay={120}>
        <section id="about" className="section">
          <SectionLabel>About</SectionLabel>
          <p className="max-w-[62ch]">{profile.about}</p>
        </section>
      </Reveal>
    </div>
  );
}
