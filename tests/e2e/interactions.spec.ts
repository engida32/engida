import { expect, test } from "@playwright/test";

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
