import { expect, test } from "@playwright/test";

const routes = [
  "/",
  "/work/bellboy/",
  "/work/bookbridge/",
  "/work/serpentine/",
  "/work/vector-search-studio/",
  "/work/signal-engine/",
  "/404.html",
];

for (const route of routes) {
  test(`external links open safely and say so at ${route}`, async ({ page }) => {
    await page.goto(route);
    const externals = page.locator('a[href^="http"], a[target="_blank"]');
    const count = await externals.count();
    for (let index = 0; index < count; index += 1) {
      const link = externals.nth(index);
      await expect(link).toHaveAttribute("href", /^https:\/\//);
      await expect(link).toHaveAttribute("target", "_blank");
      const rel = await link.getAttribute("rel");
      expect(rel).toContain("noopener");
      expect(rel).toContain("noreferrer");
      await expect(link).toContainText("opens in a new tab");
    }
  });
}

test("home page actually contains external links", async ({ page }) => {
  await page.goto("/");
  expect(await page.locator('a[href^="http"]').count()).toBeGreaterThan(0);
});
