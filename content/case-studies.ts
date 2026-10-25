import type { CaseStudy } from "@/content/types";

export const caseStudies: CaseStudy[] = [
  {
    slug: "bellboy",
    title: "Bellboy",
    year: "2024",
    role: "Front end and admin",
    status: "Client work",
    summary:
      "Customer delivery site and rider onboarding for a delivery service in Australia.",
    stack: ["Next.js 14", "React", "MUI", "Tailwind", "react-query", "Formik", "Yup", "AWS S3"],
    problem: [
      "A delivery quote depends on distance, vehicle, and parcel size.",
      "Rider onboarding needs a verified phone number, a photo, a signature, and documents before anyone can review the application.",
    ],
    build: [
      "A public site with a live price estimate and a booking entry point, rider recruitment pages, an application flow with OTP phone verification, photo and signature capture, document upload, and admin screens for rate cards, rider commission, and transport rules.",
    ],
    decisions: [
      "Pricing rules live in admin data rather than hardcoded copy.",
      "The application collects every document before review.",
      "The marketing site and the operations tools stay in separate apps.",
    ],
    scope: "Front end and admin. The backend and payment integrations were built by another developer.",
    links: [],
    screenshots: [],
  },
  {
    slug: "bookbridge",
    title: "BookBridge",
    year: "2024",
    role: "Storefront and admin",
    status: "Client work",
    summary:
      "Book publishing and reading platform with Stripe checkout UI and a Sanity-backed catalog.",
    stack: ["Next.js", "React", "MUI", "Stripe", "Sanity", "react-query"],
    problem: [
      "Authors need to publish and sell books, while readers need a storefront that handles payments and long-form content without a second system.",
    ],
    build: [
      "Storefront and reading pages, an author publishing flow, Stripe checkout, a Sanity content model for books and authors, and a separate admin dashboard.",
    ],
    decisions: [
      "Book content lives in Sanity.",
      "Payments live in Stripe.",
      "Admin stays out of the storefront bundle.",
    ],
    scope: "Storefront and admin. The backend was built by another developer.",
    links: [],
    screenshots: [],
  },
  {
    slug: "serpentine",
    title: "Serpentine Arcade",
    year: "2026",
    role: "Design and build",
    status: "Independent",
    summary:
      "Eight retro games in an offline-first PWA built for TV remotes and gamepads.",
    stack: ["React", "TypeScript", "Vite", "Supabase", "Service Worker"],
    problem: [
      "TV browsers, a handful of remote buttons, unreliable networks, and no install flow.",
    ],
    build: [
      "Eight games, one input layer across remote, keyboard, and Gamepad API, a service worker for offline play, localStorage saves, an optional Supabase leaderboard and trophies, and a Slack feedback webhook.",
    ],
    decisions: [
      "The game loop runs outside React.",
      "The backend is optional, so the arcade still works offline.",
      "One canonical live URL.",
    ],
    links: [
      { label: "Live", href: "https://serpentine-arcade.vercel.app/" },
      { label: "Source", href: "https://github.com/engida32/serpentine" },
    ],
    screenshots: [],
  },
  {
    slug: "vector-search-studio",
    title: "Vector Search Studio",
    year: "2026",
    role: "Design and build",
    status: "Independent",
    summary:
      "Semantic search over Supabase docs with pgvector and a self-contained embedder.",
    stack: ["Next.js", "TypeScript", "pgvector", "HNSW", "Vitest"],
    problem: ["Keyword search misses intent, and hosted embeddings add keys and cost."],
    build: [
      "A 384-dimension random-projection embedder, a vector(384) column, an HNSW cosine index, SQL distance queries, an App Router UI, and tests in CI.",
    ],
    decisions: ["No API keys.", "Ranking is covered by tests."],
    tradeoff: "Weaker than a trained embedding model.",
    next: ["A real embedder, reranking, and recall measurement."],
    links: [
      { label: "Source", href: "https://github.com/engida32/vector-search-studio" },
    ],
    screenshots: [],
  },
  {
    slug: "signal-engine",
    title: "Real-time signal engine",
    year: "2026",
    role: "Design and build",
    status: "Private, in progress",
    summary:
      "A BTC prediction-market engine and terminal dashboard, from feature pipeline to execution simulator.",
    stack: ["Python", "LightGBM", "FastAPI", "React", "WebSockets"],
    problem: [
      "Noisy one-second market data, thin edges, and execution assumptions that flatter a backtest.",
    ],
    build: [
      "A Binance spot stream, one-second features, a LightGBM probability of up, a decision state machine, a maker-only execution simulator with fees and liquidity gates, outcome buckets, and a WebSocket view.",
    ],
    validation: ["CPCV", "PBO", "DSR", "Leakage audit", "Triple-barrier labels", "Calibration"],
    result:
      "48 to 50% out of sample on spot models. The value is the pipeline and per-bucket validation. Read the number as a measurement.",
    links: [],
    screenshots: [],
  },
];

export function caseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((item) => item.slug === slug);
}
