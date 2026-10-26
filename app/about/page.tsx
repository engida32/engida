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
      <Reveal delay={0}>
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-site-accent">
            {profile.name}
          </p>
          <h1 className="mt-4 text-[32px] font-semibold leading-[1.1] sm:text-[42px]">About</h1>
          <p className="mt-4 max-w-[62ch] text-lg text-site-muted">{about.intro}</p>
        </div>
      </Reveal>

      {about.sections.map((section, index) => (
        <Reveal key={section.title} delay={(index + 1) * 40}>
          <section className="mt-10" aria-labelledby={`about-${index}`}>
            <h2 id={`about-${index}`} className="text-xl font-semibold">
              {section.title}
            </h2>
            <div className="mt-3 space-y-3">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="max-w-[62ch]">
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
            <h2 id="now" className="text-xl font-semibold">
              Now
            </h2>
            <span className="font-mono text-xs uppercase tracking-[0.08em] text-site-muted">
              {about.now.date}
            </span>
          </div>
          <div className="mt-3 space-y-3">
            {about.now.paragraphs.map((paragraph) => (
              <p key={paragraph} className="max-w-[62ch]">
                {paragraph}
              </p>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal delay={200}>
        <div className="mt-12 flex flex-wrap items-center gap-4 text-sm">
          <a href={`${basePath()}/#work`} className="prose-link">
            See selected work
          </a>
          <a href={`mailto:${profile.email}`} className="prose-link">
            Email me
          </a>
          <CopyEmail email={profile.email} />
        </div>
      </Reveal>
    </div>
  );
}
