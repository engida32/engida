import { expect, test } from "@playwright/test";

const cases = [
  ["bellboy", "Bellboy"],
  ["bookbridge", "BookBridge"],
  ["serpentine", "Serpentine Arcade"],
  ["vector-search-studio", "Vector Search Studio"],
  ["signal-engine", "Real-time signal engine"],
] as const;

for (const [slug, title] of cases) {
  test(`${slug} renders as a static page`, async ({ page }) => {
    const response = await page.goto(`/work/${slug}/`);
    expect(response?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1, name: title })).toBeVisible();
    await expect(page.getByRole("link", { name: "Back to selected work" })).toBeVisible();
  });
}

test("links to the next project", async ({ page }) => {
  await page.goto("/work/serpentine/");
  await expect(page.getByRole("link", { name: /Next: Vector Search Studio/ })).toBeVisible();
});
