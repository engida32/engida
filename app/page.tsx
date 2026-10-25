import { CopyEmail } from "@/components/site/CopyEmail";
import { ExperienceList } from "@/components/site/ExperienceList";
import { JsonLd } from "@/components/site/JsonLd";
import { Reveal } from "@/components/site/Reveal";
import { SectionLabel } from "@/components/site/SectionLabel";
import { WorkList } from "@/components/site/WorkList";
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
          <h1 className="text-balance">
            <span className="block text-[32px] font-semibold leading-[1.15] sm:text-[40px]">
              {profile.name}
            </span>
            <span className="mt-3 block max-w-[62ch] text-lg font-normal text-site-muted">
              {profile.headline}
            </span>
          </h1>
          <p className="mt-6 max-w-[62ch]">{profile.availability}</p>
          <p className="mt-2 max-w-[62ch] text-site-muted">{profile.supporting}</p>
          <div className="mt-6">
            <CopyEmail email={profile.email} />
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
