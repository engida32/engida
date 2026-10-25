import { expect, test } from "@playwright/test";

test("unknown paths return a styled 404 with status 404", async ({ page }) => {
  const response = await page.goto("/work/missing/");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("command not found");
});
