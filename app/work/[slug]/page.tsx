import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyPage } from "@/components/site/CaseStudyPage";
import { JsonLd } from "@/components/site/JsonLd";
import { caseStudies, caseStudyBySlug } from "@/content/case-studies";
import { caseStudyJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";

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
      <JsonLd data={caseStudyJsonLd(study)} />
      <CaseStudyPage study={study} next={next} />
    </>
  );
}
