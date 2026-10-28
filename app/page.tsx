import { Fragment } from "react";
import { ArrowRight } from "lucide-react";
import { ExperienceList } from "@/components/site/ExperienceList";
import { JsonLd } from "@/components/site/JsonLd";
import { ProfileRail } from "@/components/site/ProfileRail";
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
      <div className="site-layout">
        <div className="site-layout-hero">
          <section className="section hero-section">
            <div data-hero-grid>
              <h1>
                <span className="hero-eyebrow">{profile.name}</span>
                <span className="sr-only">. </span>
                <span className="hero-headline">
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
              <p className="hero-status">
                <span className="hero-status-dot" aria-hidden="true" />
                <span className="hero-status-copy">
                  <span>{profile.availability.role}</span>
                  <span className="hero-status-sep" aria-hidden="true">
                    {" · "}
                  </span>
                  <span className="hero-status-location">
                    {profile.availability.location}
                  </span>
                </span>
              </p>
              <p className="hero-supporting">{profile.supporting}</p>
              <div className="hero-actions">
                <Button
                  asChild
                  size="lg"
                  className="hero-cta hero-cta-primary w-full font-mono text-xs uppercase tracking-[0.08em] sm:w-auto"
                >
                  <a href="#work">
                    View selected work
                    <ArrowRight
                      aria-hidden="true"
                      data-icon="inline-end"
                      className="hero-cta-arrow"
                    />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="secondary"
                  size="lg"
                  className="hero-cta w-full font-mono text-xs uppercase tracking-[0.08em] sm:w-auto"
                >
                  <a href={`mailto:${profile.email}`}>Email me</a>
                </Button>
              </div>
            </div>
          </section>
        </div>

        <div className="site-layout-main">
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
              <p className="prose-measure text-[15px]">{profile.about}</p>
              <a
                href={`${basePath()}/about/`}
                className="prose-link tap-target mt-3 font-mono text-xs uppercase tracking-[0.08em]"
              >
                More about how I work
              </a>
            </section>
          </Reveal>
        </div>

        <div className="site-layout-rail">
          <ProfileRail />
        </div>
      </div>
    </div>
  );
}
