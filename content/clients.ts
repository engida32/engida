import type { WorkItem } from "@/content/types";

export const clients: WorkItem[] = [
  {
    title: "Bellboy",
    year: "2024",
    description:
      "Customer delivery site and rider onboarding for a delivery service in Australia.",
    stack: ["Next.js", "React", "MUI", "AWS S3"],
    caseStudySlug: "bellboy",
  },
  {
    title: "BookBridge",
    year: "2024",
    description:
      "Book publishing and reading platform with Stripe checkout and a Sanity-backed catalog.",
    stack: ["Next.js", "React", "MUI", "Stripe", "Sanity"],
    caseStudySlug: "bookbridge",
  },
  {
    title: "Central Plaza",
    year: "2024",
    description: "Marketing site for a mixed-use property in Addis Ababa.",
    stack: ["React", "MUI", "Sanity", "GSAP"],
    liveUrl: "https://central-plaza-web-app.vercel.app/",
  },
  {
    title: "Ride Plus",
    year: "2023",
    description: "Dispatch and reporting tools for a taxi platform.",
    stack: ["React", "MUI data grids", "Docker"],
    note: "No public link.",
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
