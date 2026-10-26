import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyPage } from "@/components/site/CaseStudyPage";
import { JsonLd } from "@/components/site/JsonLd";
import { caseStudies, caseStudyBySlug } from "@/content/case-studies";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudyBySlug(slug);
  if (!study) return {};
  return pageMetadata({
    title: `${study.title} case study`,
    description: study.summary,
    path: `/work/${study.slug}/`,
    type: "article",
  });
}

export default async function WorkPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const study = caseStudyBySlug(slug);
  if (!study) notFound();
  const index = caseStudies.findIndex((item) => item.slug === study.slug);
  const next = caseStudies[(index + 1) % caseStudies.length];
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: study.title,
          description: study.summary,
          url: absoluteUrl(`/work/${study.slug}/`),
          dateCreated: study.year.slice(0, 4),
          creator: { "@id": absoluteUrl("/#person") },
          keywords: study.stack.join(", "),
          isPartOf: { "@id": absoluteUrl("/#website") },
        }}
      />
      <CaseStudyPage study={study} next={next} />
    </>
  );
}
