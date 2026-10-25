import { expect, test } from "@playwright/test";

const cases = [
  [
    "bellboy",
    "Bellboy",
    "Customer delivery site and rider onboarding for a delivery service in Australia.",
  ],
  [
    "bookbridge",
    "BookBridge",
    "Book publishing and reading platform with Stripe checkout UI and a Sanity-backed catalog.",
  ],
  [
    "serpentine",
    "Serpentine Arcade",
    "Eight retro games in an offline-first PWA built for TV remotes and gamepads.",
  ],
  [
    "vector-search-studio",
    "Vector Search Studio",
    "Semantic search over Supabase docs with pgvector and a self-contained embedder.",
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
