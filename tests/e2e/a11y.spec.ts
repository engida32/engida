import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const routes = [
  "/",
  "/about/",
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

for (const route of routes) {
  test(`dark theme axe: ${route}`, async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem("theme", "dark"));
    await page.emulateMedia({ colorScheme: "dark", reducedMotion: "reduce" });
    await page.goto(route);
    await expect(page.locator("html")).toHaveClass(/dark/);

    const results = await new AxeBuilder({ page }).analyze();
    const severe = results.violations.filter(
      (violation) => violation.impact === "serious" || violation.impact === "critical",
    );
    expect(severe).toEqual([]);
  });
}

test("control borders meet 3:1 in both themes", async ({ page }) => {
  function parseRgb(value: string) {
    return value.match(/\d+/g)!.slice(0, 3).map(Number);
  }

  function channel(value: number) {
    const normalized = value / 255;
    return normalized <= 0.03928
      ? normalized / 12.92
      : ((normalized + 0.055) / 1.055) ** 2.4;
  }

  function luminance(rgb: number[]) {
    return 0.2126 * channel(rgb[0]) + 0.7152 * channel(rgb[1]) + 0.0722 * channel(rgb[2]);
  }

  function contrast(a: string, b: string) {
    const first = luminance(parseRgb(a));
    const second = luminance(parseRgb(b));
    return (Math.max(first, second) + 0.05) / (Math.min(first, second) + 0.05);
  }

  for (const theme of ["light", "dark"] as const) {
    await page.addInitScript((value) => localStorage.setItem("theme", value), theme);
    await page.emulateMedia({ colorScheme: theme, reducedMotion: "reduce" });
    await page.goto("/");
    await expect(page.locator("html")).toHaveClass(new RegExp(theme));

    const control = page.locator('a[data-variant="secondary"]').first();
    const colors = await control.evaluate((element) => {
      const computed = getComputedStyle(element);
      return {
        border: computed.borderTopColor,
        surface: computed.backgroundColor,
        background: getComputedStyle(document.body).backgroundColor,
      };
    });

    expect(contrast(colors.border, colors.surface), `${theme} surface`).toBeGreaterThanOrEqual(3);
    expect(contrast(colors.border, colors.background), `${theme} background`).toBeGreaterThanOrEqual(3);
  }
});
