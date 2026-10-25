import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const routes = [
  "/",
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

for (const route of routes) {
  test(`axe passes ${route}`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(route);
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations.filter((v) => ["serious", "critical"].includes(v.impact ?? ""))).toEqual([]);
  });
}

for (const route of ["/", "/work/bellboy/"]) {
  test(`axe passes ${route} in light theme`, async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem("theme", "light"));
    await page.emulateMedia({ colorScheme: "light", reducedMotion: "reduce" });
    await page.goto(route);
    await expect(page.locator("html")).toHaveClass(/light/);
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations.filter((v) => ["serious", "critical"].includes(v.impact ?? ""))).toEqual([]);
  });
}
