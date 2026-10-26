import type { MetadataRoute } from "next";
import { caseStudies } from "@/content/case-studies";
import { absoluteUrl, allowIndexing } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!allowIndexing()) return [];
  return [
    {
      url: absoluteUrl("/"),
      lastModified: "2026-10-25",
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: absoluteUrl("/about/"),
      lastModified: "2026-10-26",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...caseStudies.map((study) => ({
      url: absoluteUrl(`/work/${study.slug}/`),
      lastModified: "2026-10-25",
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
  ];
}
