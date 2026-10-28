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
    deliverables: [
      "Release control plane",
      "Task and assertion tooling",
      "Evaluation screens",
      "Access and audit",
      "Client environment variants",
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
      "Delivery booking site and rider onboarding for a delivery company.",
    outcome:
      "A quote-to-booking flow and a rider onboarding flow that collects every required document before review.",
    stack: ["Next.js 14", "React", "MUI", "Tailwind", "react-query", "Formik", "Yup", "AWS S3"],
    deliverables: [
      "Public quote and booking flow",
      "Rider onboarding",
      "Admin rate and commission screens",
    ],
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
    deliverables: [
      "Storefront front end",
      "Shared commerce components",
      "API integration",
      "AWS release automation",
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
    hero: {
      src: "/work/che/che-card.webp",
      alt: "Che product page with the Che heading, an introductory paragraph, a produce-stall photo, and the Che logo.",
      width: 1200,
      height: 800,
      caption: "The public Che product page on desktop.",
    },
    result: "Page loads fell 30%, merchant adoption rose 25%, and releases shipped 50% faster.",
    links: [{ label: "Che", href: "https://kifiya.com/che/" }],
    screenshots: [
      {
        src: "/work/che/che-plate.webp",
        alt: "The Che product page shown in a desktop browser beside a mobile phone.",
        width: 1600,
        height: 1000,
        caption: "The public page is shown on desktop and mobile.",
      },
    ],
  },
  {
    slug: "sewasew",
    title: "Sewasew",
    year: "2021-2022",
    role: "Front-end developer",
    status: "Client work",
    summary:
      "Web music streaming, subscription management, and an internal tool for users, subscriptions, and chart of accounts at an Ethiopian streaming service.",
    outcome:
      "A web player, a subscription flow, and an internal tool for users, subscriptions, and chart of accounts.",
    stack: ["Web front end", "REST APIs", "Subscription flows"],
    deliverables: [
      "Web player",
      "Subscription management",
      "Internal user and subscription management",
      "Chart of accounts (COA)",
      "API integration and states",
    ],
    problem: [
      "A streaming service needed a web player and a subscription flow that worked together, not as two separate products. The internal team also needed one place to manage users, subscriptions, chart of accounts, and related operations across the mobile and web products.",
    ],
    build: [
      "Built the landing page, the web listening experience, and the public subscription page.",
      "Worked on the internal tool for user and subscription CRUD, chart of accounts (COA), and other internal management across the mobile and web products.",
      "Connected the front end to the streaming APIs and handled loading, empty, and error states.",
      "Worked with backend engineers on API integration and UI performance.",
    ],
    decisions: [
      "Subscription state stays visible in the account flow.",
      "The web player and the account screens share the same state model.",
    ],
    scope:
      "I worked on the landing page, the public subscription page, the internal tool for user and subscription management, chart of accounts (COA), and other internal operations for the mobile and web products. I did not build the native mobile apps.",
    context:
      "Sewasew is an Ethiopian music streaming service with 500K+ Google Play downloads. The internal tool supports users, subscriptions, chart of accounts, and other operations across the mobile and web products. The tool is not public, so the dashboard images here are illustrative recreations. The download figure describes the product, not my work.",
    diagram: {
      title: "Surfaces",
      kind: "group",
      items: [
        "Web player",
        "Subscription management",
        "Internal user and subscription management",
        "Chart of accounts (COA)",
        "Streaming APIs",
      ],
    },
    hero: {
      src: "/work/sewasew/sewasew-card.webp",
      alt: "Mockup of the Sewasew internal dashboard with subscriber, revenue, plan mix, and chart-of-accounts views.",
      width: 1200,
      height: 800,
      caption:
        "Illustrative internal dashboard based on the subscription and chart-of-accounts tool. The internal tool is not public.",
    },
    links: [
      { label: "Sewasew", href: "https://sewasewmusic.com/" },
      { label: "Subscription", href: "https://subscription.sewasewmusic.com/" },
    ],
    screenshots: [
      {
        src: "/work/sewasew/sewasew-plate.webp",
        alt: "Mockup of the Sewasew subscription dashboard in a desktop browser, showing revenue, plan mix, chart of accounts, and recent invoices.",
        width: 1600,
        height: 1000,
        caption:
          "The subscription and chart-of-accounts dashboard, recreated as an illustration. The internal tool is not public.",
      },
    ],
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
    deliverables: [
      "Admin dashboard",
      "Rider and driver tools",
      "Passenger surfaces",
      "Large operational tables",
    ],
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
    hero: {
      src: "/work/ride-plus/ride-plus-card.webp",
      alt: "Mockup of the Ride Plus operations dashboard with driver, trip, payment, and activity views.",
      width: 1200,
      height: 800,
      caption:
        "Illustrative operations dashboard based on the Ride Plus admin work. The internal tool is not public.",
    },
    result: "The dashboard handled 42K+ driver records alongside trip and payment views.",
    links: [{ label: "Ride Plus", href: "https://ride8294.com/ride-plus/" }],
    screenshots: [
      {
        src: "/work/ride-plus/ride-plus-plate.webp",
        alt: "Mockup of the Ride Plus operations dashboard in a desktop browser, showing trips, dispatch status, driver verification, and recent payouts.",
        width: 1600,
        height: 1000,
        caption:
          "The internal operations dashboard, recreated as an illustration. The client dashboard is not public.",
      },
    ],
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
    deliverables: [
      "Eight games",
      "Unified input layer",
      "Offline service worker",
      "Optional leaderboard and trophies",
    ],
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
    hero: {
      src: "/work/serpentine/serpentine-card.webp",
      alt: "Serpentine Arcade game-selection screen with eight game cards and keyboard controls.",
      width: 1200,
      height: 800,
      caption: "The Serpentine Arcade game-selection screen on desktop.",
    },
    links: [
      { label: "Live", href: "https://serpentine-arcade.vercel.app/" },
      { label: "Source", href: "https://github.com/engida32/serpentine" },
    ],
    screenshots: [
      {
        src: "/work/serpentine/serpentine-plate.webp",
        alt: "The Serpentine Arcade game-selection screen shown in a desktop browser beside a mobile phone.",
        width: 1600,
        height: 1000,
        caption: "The public page is shown on desktop and mobile.",
      },
    ],
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
    deliverables: [
      "Local embedder",
      "pgvector schema and HNSW index",
      "App Router search UI",
      "CI tests",
    ],
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
    deliverables: [
      "Market data and feature pipeline",
      "Model and decision state",
      "Execution simulator",
      "Validation pipeline",
      "WebSocket dashboard",
    ],
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
