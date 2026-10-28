import type { Metadata } from "next";
import { CopyEmail } from "@/components/site/CopyEmail";
import { Reveal } from "@/components/site/Reveal";
import { about } from "@/content/about";
import { profile } from "@/content/profile";
import { pageMetadata } from "@/lib/seo";
import { basePath } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "About Engida Lishan, a full-stack engineer in Addis Ababa working on commerce, fintech, and AI products.",
  path: "/about/",
});

export default function AboutPage() {
  return (
    <div className="shell section pt-10">
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-site-accent">
          {profile.name}
        </p>
        <h1 className="mt-4">About</h1>
        <p className="prose-measure mt-4 text-lg text-site-muted">{about.intro}</p>
      </div>

      {about.sections.map((section, index) => (
        <Reveal key={section.title} delay={(index + 1) * 40}>
          <section className="mt-10" aria-labelledby={`about-${index}`}>
            <h2 id={`about-${index}`}>{section.title}</h2>
            <div className="mt-3 space-y-3">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="prose-measure text-[15px]">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
        </Reveal>
      ))}

      <Reveal delay={160}>
        <section className="mt-12 border-t border-site-border pt-6" aria-labelledby="now">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 id="now">Now</h2>
            <span className="font-mono text-[13px] uppercase tracking-[0.08em] text-site-muted">
              {about.now.date}
            </span>
          </div>
          <div className="mt-3 space-y-3">
            {about.now.paragraphs.map((paragraph) => (
              <p key={paragraph} className="prose-measure text-[15px]">
                {paragraph}
              </p>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal delay={200}>
        <div className="mt-12 flex flex-wrap items-center gap-4 text-[15px]">
          <a href={`${basePath()}/#work`} className="prose-link tap-target">
            See selected work
          </a>
          <a href={`mailto:${profile.email}`} className="prose-link tap-target">
            Email me
          </a>
          <CopyEmail email={profile.email} />
        </div>
      </Reveal>
    </div>
  );
}
