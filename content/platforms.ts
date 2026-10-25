import type { WorkItem } from "@/content/types";

export const platforms: WorkItem[] = [
  {
    title: "Turing agent platform",
    year: "2024-2026",
    description:
      "Internal platform for releasing and evaluating browser-based agent environments.",
    stack: ["FastAPI", "React", "PostgreSQL", "GCP Cloud Build", "Cloud Run", "LLM-as-judge"],
    caseStudySlug: "turing-agent-platform",
  },
];
