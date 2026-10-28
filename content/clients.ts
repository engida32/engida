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
    year: "2021-2022",
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
    year: "2022-2023",
    description: "Dispatch, rider, and driver tools for a taxi platform.",
    stack: ["React", "MUI data grids", "Docker", "REST APIs"],
    caseStudySlug: "ride-plus",
    liveUrl: "https://ride8294.com/ride-plus/",
    featured: true,
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
    visibility: "internal",
  },
  {
    title: "Aemro Motors",
    year: "2025",
    description: "Spare-parts and workshop admin for a motor dealer.",
    stack: ["React", "Chakra", "CKEditor"],
    visibility: "internal",
  },
];
