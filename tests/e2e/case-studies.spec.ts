import { expect, test } from "@playwright/test";

const cases = [
  [
    "turing-agent-platform",
    "Turing agent evaluation platform",
    "An internal platform for releasing and evaluating browser-based agent environments for AI labs.",
  ],
  [
    "bellboy",
    "Bellboy",
    "Delivery booking site and rider onboarding for a delivery company.",
  ],
  [
    "che",
    "Che",
    "B2B commerce front end for 500+ retailers and merchants, built with Next.js 14 and TypeScript.",
  ],
  [
    "sewasew",
    "Sewasew",
    "Web music streaming, subscription management, and an internal tool for users, subscriptions, and chart of accounts at an Ethiopian streaming service.",
  ],
  [
    "ride-plus",
    "Ride Plus",
    "Admin dashboard, rider and driver tools, and passenger surfaces for a taxi platform.",
  ],
  [
    "serpentine",
    "Serpentine Arcade",
    "Eight retro games in an offline-first PWA built for TV remotes and gamepads.",
  ],
  [
    "vector-search-studio",
    "Vector Search Studio",
    "Semantic search over Supabase docs with pgvector and a local embedder. No API keys.",
  ],
  [
    "signal-engine",
    "Real-time signal engine",
    "A BTC prediction-market engine and terminal dashboard, from feature pipeline to execution simulator.",
  ],
] as const;

const expectedToc: Record<string, string[]> = {
  "turing-agent-platform": [
    "problem",
    "build",
    "diagram",
    "decisions",
    "validation",
    "result",
    "tradeoff",
    "contact",
  ],
  bellboy: ["problem", "build", "diagram", "decisions", "context", "contact"],
  che: [
    "problem",
    "build",
    "diagram",
    "decisions",
    "context",
    "result",
    "screens",
    "links",
    "contact",
  ],
  sewasew: [
    "problem",
    "build",
    "diagram",
    "decisions",
    "context",
    "screens",
    "links",
    "contact",
  ],
  "ride-plus": [
    "problem",
    "build",
    "diagram",
    "decisions",
    "context",
    "result",
    "screens",
    "links",
    "contact",
  ],
  serpentine: ["problem", "build", "diagram", "decisions", "screens", "links", "contact"],
  "vector-search-studio": [
    "problem",
    "build",
    "diagram",
    "decisions",
    "tradeoff",
    "next",
    "links",
    "contact",
  ],
  "signal-engine": ["problem", "build", "diagram", "validation", "result", "contact"],
};

for (const [slug, title, summary] of cases) {
  test(`${slug} renders as a static page`, async ({ page }) => {
    const response = await page.goto(`/work/${slug}/`);
    expect(response?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1, name: title })).toBeVisible();
    await expect(page.getByRole("link", { name: "Back to selected work" })).toBeVisible();

    const productionCanonical = `https://engida.devs.et/work/${slug}/`;
    const testCanonical = `http://localhost:4173/work/${slug}/`;
    const canonical = page.locator('link[rel="canonical"]');
    const canonicalHref = await canonical.getAttribute("href");
    expect([productionCanonical, testCanonical]).toContain(canonicalHref);
    await expect(page.locator('meta[property="og:type"]')).toHaveAttribute("content", "article");
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
      "content",
      canonicalHref!,
    );
    await expect(page.locator('meta[property="og:description"]')).toHaveAttribute(
      "content",
      summary,
    );
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
      "content",
      "summary_large_image",
    );
  });
}

for (const slug of ["che", "sewasew", "ride-plus", "serpentine"] as const) {
  test(`${slug} shows a hero image and a screens plate`, async ({ page }) => {
    await page.goto(`/work/${slug}/`);

    const hero = page.locator("[data-case-hero] img");
    await expect(hero).toBeVisible();
    await expect(hero).toHaveAttribute("loading", "eager");
    await expect(hero).toHaveAttribute("src", new RegExp(`/work/${slug}/`));
    await expect(hero).toHaveAttribute("width", "1200");
    await expect(hero).toHaveAttribute("height", "800");
    await expect(hero).toHaveAttribute("alt", /.+/);
    await expect(page.locator("[data-case-hero] figcaption")).toHaveText(/.+/);

    const shot = page.locator("#screens img");
    await expect(shot).toBeVisible();
    await expect(shot).toHaveAttribute("loading", "lazy");
    await expect(shot).toHaveAttribute("src", new RegExp(`/work/${slug}/`));
    await expect(shot).toHaveAttribute("width", "1600");
    await expect(shot).toHaveAttribute("height", "1000");
    await expect(shot).toHaveAttribute("alt", /.+/);
    await expect(page.locator("#screens figcaption")).toHaveText(/.+/);
  });
}

test("links to the next project", async ({ page }) => {
  await page.goto("/work/serpentine/");
  await expect(page.getByRole("link", { name: /Next: Vector Search Studio/ })).toBeVisible();
});

test("shows team context and system diagrams", async ({ page }) => {
  await page.goto("/work/turing-agent-platform/");
  await expect(page.getByRole("heading", { name: "Lifecycle" })).toBeVisible();
  await expect(page.getByText("Assertions and judge", { exact: true })).toBeVisible();

  await page.goto("/work/ride-plus/");
  await expect(page.getByText(/The dashboard handled 42K\+ driver records/)).toBeVisible();

  await page.goto("/work/bellboy/");
  await expect(page.getByRole("heading", { name: "Team context" })).toBeVisible();
  await expect(page.getByText(/NestJS\/Prisma service/)).toBeVisible();
  await expect(page.getByRole("heading", { name: "Surfaces" })).toBeVisible();
  await expect(page.getByText("Team API", { exact: true })).toBeVisible();

  await page.goto("/work/sewasew/");
  await expect(
    page.getByText(
      "Worked on the internal tool for user and subscription CRUD, chart of accounts (COA), and other internal management across the mobile and web products.",
      { exact: true },
    ),
  ).toBeVisible();

  await page.goto("/work/signal-engine/");
  await expect(page.getByRole("heading", { name: "Pipeline" })).toBeVisible();
  await expect(page.getByText("Maker simulator", { exact: true })).toBeVisible();
});

for (const [slug, ids] of Object.entries(expectedToc)) {
  test(`${slug} shows a case sidebar and a matching table of contents`, async ({ page }) => {
    await page.goto(`/work/${slug}/`);

    const sidebar = page.locator("[data-case-sidebar]");
    await expect(sidebar).toBeVisible();

    for (const label of [
      "Timeline",
      "Role",
      "Status",
      "Stack",
      "Deliverables",
      "On this page",
    ]) {
      await expect(sidebar.getByText(label, { exact: true })).toBeVisible();
    }

    const tocLinks = page.locator("[data-case-toc] a");
    await expect(tocLinks).toHaveCount(ids.length);

    const hrefs = await tocLinks.evaluateAll((links) =>
      links.map((link) => link.getAttribute("href")),
    );
    expect(hrefs).toEqual(ids.map((id) => `#${id}`));

    for (const id of ids) {
      await expect(page.locator(`[data-case-section]#${id}`)).toHaveCount(1);
    }

    await expect(page.locator("[data-case-body] [data-case-section]")).toHaveCount(ids.length);

    const heights = await tocLinks.evaluateAll((links) =>
      links.map((link) => link.getBoundingClientRect().height),
    );
    for (const height of heights) {
      expect(height).toBeGreaterThanOrEqual(24);
    }
  });
}

test("uses a sticky table of contents at the desktop breakpoint", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/work/turing-agent-platform/");

  await expect(page.locator("[data-case-toc]")).toHaveCSS("position", "sticky");
});

test("keeps the case study table of contents sticky on desktop", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 720 });
  await page.goto("/work/turing-agent-platform/");

  const toc = page.locator("[data-case-toc]");
  await expect(toc).toHaveCSS("position", "sticky");

  await page.evaluate(() => {
    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo(0, 1300);
  });
  await page.waitForTimeout(100);

  const top = await toc.evaluate((element) => element.getBoundingClientRect().top);
  expect(top).toBeGreaterThanOrEqual(30);
  expect(top).toBeLessThanOrEqual(34);
});

test("stacks the case sidebar above the body on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/work/bellboy/");

  const sidebar = page.locator("[data-case-sidebar]");
  await expect(sidebar).toHaveCSS("position", "static");
  await expect(page.locator("[data-case-toc]")).toHaveCSS("position", "static");

  const sidebarBox = await sidebar.boundingBox();
  const bodyBox = await page.locator("[data-case-body]").boundingBox();
  expect(sidebarBox).not.toBeNull();
  expect(bodyBox).not.toBeNull();
  expect(sidebarBox!.y).toBeLessThan(bodyBox!.y);

  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(overflow).toBeLessThanOrEqual(0);
});

test("keeps the case body within the reading measure", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/work/che/");

  const bodyBox = await page.locator("[data-case-body]").boundingBox();
  expect(bodyBox).not.toBeNull();
  expect(bodyBox!.width).toBeGreaterThan(700);
  expect(bodyBox!.width).toBeLessThanOrEqual(760);
});
