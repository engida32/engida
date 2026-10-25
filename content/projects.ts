import type { WorkItem } from "@/content/types";

export const projects: WorkItem[] = [
  {
    title: "Serpentine Arcade",
    year: "2026",
    description:
      "Eight retro games in an offline-first PWA built for TV remotes and gamepads.",
    stack: ["React", "TypeScript", "Vite", "Supabase"],
    caseStudySlug: "serpentine",
    liveUrl: "https://serpentine-arcade.vercel.app/",
    sourceUrl: "https://github.com/engida32/serpentine",
  },
  {
    title: "Vector Search Studio",
    year: "2026",
    description:
      "Semantic search over Supabase docs with pgvector and a self-contained embedder.",
    stack: ["Next.js", "TypeScript", "pgvector", "HNSW"],
    caseStudySlug: "vector-search-studio",
    sourceUrl: "https://github.com/engida32/vector-search-studio",
  },
  {
    title: "Real-time signal engine",
    year: "2026",
    description:
      "A BTC prediction-market engine and terminal dashboard, from feature pipeline to execution simulator.",
    stack: ["Python", "LightGBM", "FastAPI", "React", "WebSockets"],
    caseStudySlug: "signal-engine",
    note: "Private, in progress.",
  },
];
