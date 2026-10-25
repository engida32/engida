import type { WorkItem } from "@/content/types";

export const clients: WorkItem[] = [
  {
    title: "Bellboy",
    year: "2024",
    description:
      "Delivery booking site and rider onboarding for a delivery company in Australia.",
    stack: ["Next.js", "React", "MUI", "S3 uploads"],
    caseStudySlug: "bellboy",
  },
  {
    title: "Che",
    year: "2023-2024",
    description:
      "B2B commerce front end for 500+ retailers and merchants, built with Next.js 14 and TypeScript.",
    stack: ["Next.js 14", "TypeScript", "Redux", "TailwindCSS", "AWS"],
    caseStudySlug: "che",
    liveUrl: "https://kifiya.com/che/",
  },
  {
    title: "Sewasew",
    year: "2021-2022",
    description:
      "Web music streaming experience and subscription management for an Ethiopian streaming service.",
    stack: ["Web front end", "REST APIs", "Subscription flows"],
    caseStudySlug: "sewasew",
    liveUrl: "https://sewasew.com",
  },
  {
    title: "Ride Plus",
    year: "2022-2023",
    description: "Dispatch, rider, and driver tools for a taxi platform.",
    stack: ["React", "MUI data grids", "Docker", "REST APIs"],
    caseStudySlug: "ride-plus",
    liveUrl: "https://ride8294.com/ride-plus/",
    note: "Product page. The admin dashboard is internal.",
  },
  {
    title: "Central Plaza",
    year: "2024",
    description: "Marketing site for a mixed-use property in Addis Ababa.",
    stack: ["React", "MUI", "Sanity", "GSAP"],
    liveUrl: "https://central-plaza-web-app.vercel.app/",
  },
  {
    title: "Nib",
    year: "2025",
    description: "Meeting and live-report tools for an insurance team.",
    stack: ["React", "Chakra", "Recharts"],
    note: "No public link.",
  },
  {
    title: "Aemro Motors",
    year: "2025",
    description: "Spare-parts and workshop admin for a motor dealer.",
    stack: ["React", "Chakra", "CKEditor"],
    note: "No public link.",
  },
];
