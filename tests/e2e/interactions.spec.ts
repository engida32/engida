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
