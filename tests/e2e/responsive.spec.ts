import { expect, test } from "@playwright/test";

const homeWidths = [320, 375, 768, 1024, 1440];
const compactRoutes = [
  "/work/bellboy/",
  "/work/turing-agent-platform/",
  "/work/che/",
  "/work/sewasew/",
  "/work/ride-plus/",
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

test("work dates stay on one line", async ({ page }) => {
  for (const width of [320, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");

    const dates = page.locator("[data-work-date]");
    const count = await dates.count();
    expect(count).toBeGreaterThan(0);

    for (let index = 0; index < count; index += 1) {
      const metrics = await dates.nth(index).evaluate((element) => {
        const computed = getComputedStyle(element);
        return {
          whiteSpace: computed.whiteSpace,
          clientWidth: element.clientWidth,
          scrollWidth: element.scrollWidth,
        };
      });
      expect(metrics.whiteSpace).toBe("nowrap");
      expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.clientWidth);
    }
  }
});
