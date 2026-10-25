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
    "Delivery booking site and rider onboarding for a delivery company in Australia.",
  ],
  [
    "che",
    "Che",
    "B2B commerce front end for 500+ retailers and merchants, built with Next.js 14 and TypeScript.",
  ],
  [
    "sewasew",
    "Sewasew",
    "Web music streaming experience and subscription management for an Ethiopian streaming service.",
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

for (const [slug, title, summary] of cases) {
  test(`${slug} renders as a static page`, async ({ page }) => {
    const response = await page.goto(`/work/${slug}/`);
    expect(response?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1, name: title })).toBeVisible();
    await expect(page.getByRole("link", { name: "Back to selected work" })).toBeVisible();

    const productionCanonical = `https://engida.is-a.dev/work/${slug}/`;
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

  await page.goto("/work/signal-engine/");
  await expect(page.getByRole("heading", { name: "Pipeline" })).toBeVisible();
  await expect(page.getByText("Maker simulator", { exact: true })).toBeVisible();
});
