import type { WorkItem } from "@/content/types";

export const clients: WorkItem[] = [
  {
    title: "Bellboy",
    year: "2024",
    description:
      "Delivery booking site and rider onboarding for a delivery company.",
    stack: ["Next.js", "React", "MUI", "S3 uploads"],
    caseStudySlug: "bellboy",
    featured: true,
  },
  {
    title: "Che",
    year: "2021-2022",
    description:
      "B2B commerce platform for 500+ retailers and merchants, built with Next.js and TypeScript.",
    stack: ["Next.js", "TypeScript", "Redux", "TailwindCSS", "Node.js APIs", "PostgreSQL", "AWS"],
    caseStudySlug: "che",
    liveUrl: "https://kifiya.com/che/",
    featured: true,
    image: {
      src: "/work/che/che-card.webp",
      alt: "Che product page with the Che heading, an introductory paragraph, a produce-stall photo, and the Che logo.",
      width: 1200,
      height: 800,
    },
  },
  {
    title: "Sewasew",
    year: "2019-2020",
    description:
      "Web player, subscription management, and an internal tool for users, subscriptions, chart of accounts, and mobile and web operations.",
    stack: ["Web front end", "REST APIs", "Subscription flows"],
    caseStudySlug: "sewasew",
    liveUrl: "https://sewasewmusic.com/",
    note: "Mockup design. The client dashboard is not public.",
    noteInPreviewOnly: true,
    image: {
      src: "/work/sewasew/sewasew-card.webp",
      alt: "Mockup of the Sewasew internal dashboard with subscriber, revenue, plan mix, and chart-of-accounts views.",
      width: 1200,
      height: 800,
    },
  },
  {
    title: "Ride Plus",
    year: "2019-2020",
    description: "Dispatch, rider, and driver tools for a taxi platform.",
    stack: ["React", "MUI data grids", "Docker", "REST APIs"],
    caseStudySlug: "ride-plus",
    liveUrl: "https://ride8294.com/ride-plus/",
    note: "Mockup design. The client dashboard is not public.",
    noteInPreviewOnly: true,
    image: {
      src: "/work/ride-plus/ride-plus-card.webp",
      alt: "Mockup of the Ride Plus operations dashboard with driver, trip, payment, and activity views.",
      width: 1200,
      height: 800,
    },
  },
  {
    title: "Nib",
    year: "2025",
    description: "Meeting and live-report tools for an insurance team.",
    stack: ["React", "Chakra", "Recharts"],
    visibility: "internal",
  },
  {
    title: "Aemro Motors",
    year: "2025",
    description:
      "Spare-parts, workshop, job-card, and test-drive admin for a motor dealer.",
    stack: ["React", "Chakra", "CKEditor"],
    visibility: "internal",
  },
];
