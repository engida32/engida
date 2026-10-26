import type { CaseStudy } from "@/content/types";

export const caseStudies: CaseStudy[] = [
  {
    slug: "turing-agent-platform",
    title: "Turing agent evaluation platform",
    year: "2024-2026",
    role: "Full-stack and AI engineering",
    status: "Turing, internal",
    summary:
      "An internal platform for releasing and evaluating browser-based agent environments for AI labs.",
    outcome:
      "One control plane now covers register, release, run, inspect, and score across agent environments.",
    stack: [
      "FastAPI",
      "React",
      "PostgreSQL",
      "GCP Cloud Build",
      "Cloud Run",
      "GitHub",
      "LLM-as-judge",
    ],
    problem: [
      "Agent work needs realistic software to act in, a clean starting state, and a clear pass or fail signal.",
      "Each environment also needs its own release path, access rules, and logs that explain a failed run.",
      "Doing that across several apps by hand does not scale.",
    ],
    build: [
      "Built the control plane: register a gym, connect its GitHub repo, provision Cloud Build, cut release branches and tags, deploy to Cloud Run, and stream build logs.",
      "Added redeploy and cancel controls, back-merge tracking, access walls, notifications, audit history, and release notes.",
      "Built task and prompt workflows, assertion-based state checks, rubric scoring, LLM-as-judge review, golden reviews, and batch end-to-end runs.",
      "Worked across four environment families: support desk, email, CRM, and sales. Client examples included NVIDIA, Amazon, Salesforce, and Microsoft.",
    ],
    decisions: [
      "Releases are branch and tag based, so every environment has a reproducible version.",
      "Assertions decide pass or fail; the judge adds a qualitative read, not the only signal.",
      "Each run starts from a clean state, so one session does not leak into the next.",
      "Access is scoped per environment, not shared across every gym.",
    ],
    scope:
      "I worked across the platform and the gym environments: release and deployment flows, task and assertion tooling, evaluation screens, access management, and client-specific variants. The platform was a team effort; the case study describes the system and the parts I built.",
    diagram: {
      title: "Lifecycle",
      kind: "flow",
      items: [
        "GitHub repo",
        "Cloud Build",
        "Cloud Run",
        "Task prompt",
        "Agent run",
        "Assertions and judge",
      ],
    },
    validation: [
      "Assertion checks against application state.",
      "Rubric scoring and LLM-as-judge review.",
      "Human review on golden runs.",
      "Batch end-to-end runs across environments.",
      "Release logs, audit history, and access checks.",
    ],
    result:
      "One workflow now covers register, release, run, inspect, and score. Client variants reused the same control plane instead of rebuilding the release path.",
    tradeoff:
      "The platform is internal, so the case study shows architecture and workflow rather than a public demo.",
    links: [],
    screenshots: [],
  },
  {
    slug: "bellboy",
    title: "Bellboy",
    year: "2024",
    role: "Front end and admin",
    status: "Client work",
    summary:
      "Delivery booking site and rider onboarding for a delivery company in Australia.",
    outcome:
      "A quote-to-booking flow and a rider onboarding flow that collects every required document before review.",
    stack: ["Next.js 14", "React", "MUI", "Tailwind", "react-query", "Formik", "Yup", "AWS S3"],
    problem: [
      "A delivery quote depends on distance, vehicle, and parcel size.",
      "Rider onboarding needs a verified phone number, a photo, a signature, and documents before anyone can review the application.",
    ],
    build: [
      "The public site quotes a delivery from distance, vehicle, and parcel size, then hands off to booking.",
      "Rider recruitment pairs a marketing page with an application flow: OTP phone verification, photo and signature capture, document upload.",
      "Admin screens manage rate cards, rider commission, and transport rules.",
    ],
    decisions: [
      "Pricing rules live in admin data rather than hardcoded copy.",
      "The application collects every document before review.",
      "The marketing site and the operations tools stay in separate apps.",
    ],
    scope: "I built the front end and admin tools. Another developer built the backend and payment integration.",
    context:
      "The backend was a NestJS/Prisma service with RabbitMQ, Adyen payments, S3 media, Firebase, and Twilio. I built the front end and admin against its APIs.",
    diagram: {
      title: "Surfaces",
      kind: "group",
      items: ["Public site", "Rider application", "Admin", "Team API"],
    },
    links: [],
    screenshots: [],
  },
  {
    slug: "che",
    title: "Che",
    year: "2023-2024",
    role: "Senior Front-End Developer",
    status: "Client work",
    summary:
      "B2B commerce front end for 500+ retailers and merchants, built with Next.js 14 and TypeScript.",
    outcome: "A faster storefront for 500+ merchants, with releases 50% faster.",
    stack: [
      "Next.js 14",
      "TypeScript",
      "Redux",
      "TailwindCSS",
      "Node.js APIs",
      "PostgreSQL",
      "AWS",
    ],
    problem: [
      "A B2B commerce platform serving 500+ retailers and merchants needed a front end that stayed fast as catalog and order data grew.",
    ],
    build: [
      "Built the front end in Next.js 14, TypeScript, Redux, and TailwindCSS, with a modular structure for shared commerce screens.",
      "Used the App Router and React Server Components for server rendering and real-time data sync.",
      "Connected the front end to Node.js and PostgreSQL APIs.",
      "Automated the AWS release path, cutting release cycles by 50%.",
    ],
    decisions: [
      "Server rendering for catalog pages, with client state only where interaction needed it.",
      "Shared components for repeated merchant workflows.",
      "Release automation instead of manual deploys.",
    ],
    scope:
      "I led the front end and worked with backend engineers on the API contract. The credit, underwriting, and distributor operations systems were outside my scope.",
    context:
      "The platform is part of Kifiya's Che retail ecosystem, which connects manufacturers, distributors, and retailers with commerce, credit, and payment services.",
    diagram: {
      title: "Front-end path",
      kind: "flow",
      items: ["Next.js App Router", "Redux state", "Commerce APIs", "AWS release"],
    },
    result: "Page loads fell 30%, merchant adoption rose 25%, and releases shipped 50% faster.",
    links: [{ label: "Che", href: "https://kifiya.com/che/" }],
    screenshots: [],
  },
  {
    slug: "sewasew",
    title: "Sewasew",
    year: "2021-2022",
    role: "Front-end developer",
    status: "Client work",
    summary:
      "Web music streaming experience and subscription management for an Ethiopian streaming service.",
    outcome: "A web player and subscription flow that share one state model.",
    stack: ["Web front end", "REST APIs", "Subscription flows"],
    problem: [
      "A streaming service needed a web player and a subscription flow that worked together, not as two separate products.",
    ],
    build: [
      "Built the web listening experience and subscription management screens.",
      "Connected the front end to the streaming APIs and handled loading, empty, and error states.",
      "Worked with backend engineers on API integration and UI performance.",
    ],
    decisions: [
      "Subscription state stayed visible in the account flow.",
      "The web player and account screens shared the same state model.",
    ],
    scope:
      "I worked on the web application and subscription management, not the native mobile apps.",
    context:
      "Sewasew is an Ethiopian music streaming service with 500K+ Google Play downloads and a 4.2 rating. Those figures describe the product, not my work.",
    diagram: {
      title: "Surfaces",
      kind: "group",
      items: ["Web player", "Subscription management", "Streaming APIs"],
    },
    links: [{ label: "Sewasew", href: "https://sewasew.com" }],
    screenshots: [],
  },
  {
    slug: "ride-plus",
    title: "Ride Plus",
    year: "2022-2023",
    role: "Front-end developer",
    status: "Client work",
    summary:
      "Admin dashboard, rider and driver tools, and passenger surfaces for a taxi platform.",
    outcome: "One dashboard for 42K+ driver records, trips, and payments.",
    stack: ["React", "MUI data grids", "Docker", "REST APIs"],
    problem: [
      "Dispatch teams needed one view of drivers, trips, and payments while riders and drivers used separate surfaces.",
    ],
    build: [
      "Built the admin dashboard with driver records, trip views, and operational controls.",
      "Worked on rider, driver, and passenger-facing screens.",
      "Used MUI data grids for large operational tables and Docker for local and deploy environments.",
    ],
    decisions: [
      "Operational data stayed in dense tables instead of cards.",
      "Admin, rider, and driver surfaces shared the same API contract.",
    ],
    scope: "I worked on the dashboard, rider and driver tools, and passenger surfaces.",
    context:
      "Ride Plus is part of RIDE 8294, a taxi platform operating in Ethiopia and Djibouti. The admin view I worked on held 42K+ driver records.",
    diagram: {
      title: "Surfaces",
      kind: "group",
      items: ["Admin dashboard", "Rider app", "Driver tools", "Dispatch APIs"],
    },
    result: "The dashboard handled 42K+ driver records alongside trip and payment views.",
    links: [{ label: "Ride Plus", href: "https://ride8294.com/ride-plus/" }],
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
    outcome: "Eight games that work offline across TV remotes, keyboards, and gamepads.",
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
    diagram: {
      title: "System",
      kind: "flow",
      items: ["Input layer", "Game loop", "Service worker", "Optional Supabase"],
    },
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
      "Semantic search over Supabase docs with pgvector and a local embedder. No API keys.",
    outcome: "Semantic search over Supabase docs with no API keys.",
    stack: ["Next.js", "TypeScript", "pgvector", "HNSW", "Vitest"],
    problem: ["Keyword search misses intent, and hosted embeddings add keys and cost."],
    build: [
      "A 384-dimension random-projection embedder, a vector(384) column, an HNSW cosine index, SQL distance queries, an App Router UI, and tests in CI.",
    ],
    decisions: ["No API keys.", "Ranking is covered by tests."],
    diagram: {
      title: "Query path",
      kind: "flow",
      items: ["Local embedder", "vector(384)", "HNSW index", "SQL distance"],
    },
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
    outcome:
      "A validation pipeline that reports 48 to 50% out-of-sample instead of claiming an edge.",
    stack: ["Python", "LightGBM", "FastAPI", "React", "WebSockets"],
    problem: [
      "Noisy one-second market data, thin edges, and execution assumptions that flatter a backtest.",
    ],
    build: [
      "A Binance spot stream, one-second features, a LightGBM probability of up, a decision state machine, a maker-only execution simulator with fees and liquidity gates, outcome buckets, and a WebSocket view.",
    ],
    diagram: {
      title: "Pipeline",
      kind: "flow",
      items: [
        "Binance stream",
        "1s features",
        "LightGBM",
        "Decision state",
        "Maker simulator",
        "WebSocket view",
      ],
    },
    validation: ["CPCV", "PBO", "DSR", "Leakage audit", "Triple-barrier labels", "Calibration"],
    result:
      "48 to 50% out-of-sample on spot models. I report it as a measurement, not an edge. The useful work is the validation pipeline and the per-bucket record.",
    links: [],
    screenshots: [],
  },
];

export function caseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((item) => item.slug === slug);
}
