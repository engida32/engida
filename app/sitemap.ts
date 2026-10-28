import type { MetadataRoute } from "next";
import { caseStudies } from "@/content/case-studies";
import { absoluteUrl, allowIndexing } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!allowIndexing()) return [];
  return [
    {
      url: absoluteUrl("/"),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: absoluteUrl("/about/"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...caseStudies.map((study) => ({
      url: absoluteUrl(`/work/${study.slug}/`),
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
  ];
}
