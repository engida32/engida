import { expect, test, type Locator } from "@playwright/test";

test("theme choice persists across reloads", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /theme/i }).click();
  await page.getByRole("menuitem", { name: "Light" }).click();
  await expect(page.locator("html")).toHaveClass(/light/);
  await page.reload();
  await expect(page.locator("html")).toHaveClass(/light/);
});

test("mobile navigation opens and closes", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open menu" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.getByRole("link", { name: "Work" }).click();
  await expect(page.getByRole("dialog")).toBeHidden();
});

test("copy email announces success in a live region", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/");
  await page.getByRole("button", { name: "Copy email address" }).click();
  await expect(page.getByRole("status")).toContainText("Copied");
  await expect(page.getByRole("tooltip").filter({ hasText: "Copied" })).toHaveCount(0);
});

test("content is visible without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Engida Lishan");
  await expect(page.getByText("Bellboy", { exact: true })).toBeVisible();
  await context.close();
});

test("reduced motion shows content immediately", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const reveals = page.locator("[data-reveal]");
  await expect(reveals).toHaveCount(4);
  for (let i = 0; i < 4; i += 1) {
    const reveal = reveals.nth(i);
    await expect(reveal).toHaveClass(/is-visible/);
    await expect(reveal).toHaveCSS("opacity", "1");
    await expect(reveal).toHaveCSS("transform", "none");
    await expect(reveal).toHaveCSS("transition-duration", "0s");
  }
});

test("controls are legible at rest", async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("theme", "light"));
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/");

  const primary = page.locator('a[data-variant="default"]').first();
  const secondary = page.locator('a[data-variant="secondary"]').first();
  const utility = page.locator('button[data-variant="utility"]').first();

  await expect(primary).toHaveCSS("background-color", "rgb(11, 122, 72)");
  await expect(primary).toHaveCSS("border-top-width", "0px");
  await expect(utility).toContainText("Copy email");

  for (const control of [secondary, utility]) {
    const styles = await control.evaluate((element) => {
      const computed = getComputedStyle(element);
      return {
        borderWidth: computed.borderTopWidth,
        borderStyle: computed.borderTopStyle,
        borderColor: computed.borderTopColor,
        transitionProperty: computed.transitionProperty,
        transitionDuration: computed.transitionDuration,
      };
    });

    expect(Number.parseFloat(styles.borderWidth)).toBeGreaterThanOrEqual(1);
    expect(styles.borderStyle).not.toBe("none");
    expect(styles.borderColor).not.toBe("rgba(0, 0, 0, 0)");
    expect(styles.transitionProperty).not.toContain("all");
    const durations = styles.transitionDuration
      .split(",")
      .map((value) => Number.parseFloat(value));
    expect(durations.every((value) => Math.abs(value - 0.15) < 0.001)).toBe(true);
  }
});

test("copy email uses the utility control", async ({ page }) => {
  await page.goto("/");

  const button = page.getByRole("button", { name: "Copy email address" });
  await expect(button).toHaveAttribute("data-variant", "utility");
  await expect(button).toContainText("Copy email");

  const border = await button.evaluate((element) => {
    const computed = getComputedStyle(element);
    return {
      width: computed.borderTopWidth,
      color: computed.borderTopColor,
    };
  });
  expect(Number.parseFloat(border.width)).toBeGreaterThanOrEqual(1);
  expect(border.color).not.toBe("rgba(0, 0, 0, 0)");
});

test("links use the navigation and prose treatments", async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("theme", "light"));
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/");

  const navWork = page
    .getByRole("navigation", { name: "Primary" })
    .getByRole("link", { name: "Work" });
  await expect(navWork).toHaveCSS("text-decoration-line", "none");
  await navWork.hover();
  await expect(navWork).toHaveCSS("text-decoration-line", "underline");
  await expect(navWork).toHaveCSS("color", "rgb(11, 122, 72)");

  const footerEmail = page
    .getByRole("contentinfo")
    .getByRole("link", { name: "Email" });
  await expect(footerEmail).toHaveCSS("text-decoration-line", "underline");

  const prose = page.getByRole("link", { name: "More about how I work" });
  await expect(prose).toHaveCSS("text-decoration-line", "underline");
});

test("work rows show a surface on hover and focus-within", async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("theme", "light"));
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/");

  const row = page.locator("#work li").first();
  await expect(row).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");

  await row.hover();
  await expect(row).toHaveCSS("background-color", "rgb(239, 239, 232)");

  await page.mouse.move(0, 0);
  await row.getByRole("link").first().focus();
  await expect(row).toHaveCSS("background-color", "rgb(239, 239, 232)");
});

test("reveal uses 300ms and a 6px rise, with a fallback", async ({ page }) => {
  await page.addInitScript(() => {
    class NoopIntersectionObserver {
      observe() {}
      unobserve() {}
      disconnect() {}
    }
    Object.defineProperty(window, "IntersectionObserver", {
      configurable: true,
      writable: true,
      value: NoopIntersectionObserver,
    });
  });

  await page.goto("/");
  const reveal = page.locator("[data-reveal]").first();
  await expect(reveal).not.toHaveClass(/is-visible/);

  const styles = await reveal.evaluate((element) => {
    const computed = getComputedStyle(element);
    return {
      opacity: computed.opacity,
      transform: computed.transform,
      duration: computed.transitionDuration,
    };
  });
  expect(styles.opacity).toBe("0");
  expect(styles.transform).toBe("matrix(1, 0, 0, 1, 0, 6)");
  expect(styles.duration).toContain("0.3s");

  await page.addInitScript(() => {
    Object.defineProperty(window, "IntersectionObserver", {
      configurable: true,
      writable: true,
      value: undefined,
    });
  });
  await page.reload();
  await expect(page.locator("[data-reveal]").first()).toHaveClass(/is-visible/);
});

test("stagger delays use 40ms and 20ms steps and cap at 200ms", async ({ page }) => {
  await page.addInitScript(() => {
    class NoopIntersectionObserver {
      observe() {}
      unobserve() {}
      disconnect() {}
    }
    Object.defineProperty(window, "IntersectionObserver", {
      configurable: true,
      writable: true,
      value: NoopIntersectionObserver,
    });
  });

  async function expectStaggerDelay(locator: Locator, expected: string) {
    const delays = await locator.evaluate((element) =>
      getComputedStyle(element)
        .transitionDelay.split(",")
        .map((value) => value.trim()),
    );
    expect(delays.slice(1).every((value) => value === expected)).toBe(true);
  }

  await page.goto("/");
  const work = page.locator('[data-stagger="work"] > [data-stagger-item]');
  await expectStaggerDelay(work.nth(0), "0s");
  await expectStaggerDelay(work.nth(1), "0.04s");
  await expectStaggerDelay(work.nth(5), "0.2s");
  await expectStaggerDelay(work.nth(10), "0.2s");

  await page.goto("/work/bellboy/");
  const diagram = page.locator('[data-stagger="diagram"] [data-stagger-item]');
  await expectStaggerDelay(diagram.nth(0), "0s");
  await expectStaggerDelay(diagram.nth(1), "0.02s");

  const count = await diagram.count();
  if (count > 10) {
    await expectStaggerDelay(diagram.nth(10), "0.2s");
  }
});

test("reduced motion shows staggered items without delay", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  const items = page.locator('[data-stagger="work"] > [data-stagger-item]');
  const count = await items.count();
  expect(count).toBeGreaterThan(0);

  for (let index = 0; index < count; index += 1) {
    await expect(items.nth(index)).toHaveCSS("opacity", "1");
    await expect(items.nth(index)).toHaveCSS("transform", "none");
    await expect(items.nth(index)).toHaveCSS("transition-duration", "0s");
    await expect(items.nth(index)).toHaveCSS("transition-delay", "0s");
  }
});
