import { expect, test } from "@playwright/test";

test("renders the identity, navigation, and footer", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Engida Lishan");
  await expect(page.getByRole("link", { name: "Work", exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: "Experience", exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: "About", exact: true })).toBeVisible();
  await expect(page.getByRole("banner").getByRole("link", { name: "Email" })).toBeVisible();
  await expect(page.getByRole("contentinfo")).toBeVisible();
});

test("has a skip link", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
});
