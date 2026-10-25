import { expect, test } from "@playwright/test";

const homeWidths = [320, 375, 768, 1024, 1440];
const compactRoutes = [
  "/work/bellboy/",
  "/work/bookbridge/",
  "/work/serpentine/",
  "/work/vector-search-studio/",
  "/work/signal-engine/",
  "/404.html",
];

for (const width of homeWidths) {
  test(`no horizontal scroll on home at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(0);
  });
}

for (const route of compactRoutes) {
  for (const width of [320, 375]) {
    test(`no horizontal scroll at ${route} ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(route);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow).toBeLessThanOrEqual(0);
    });
  }
}
