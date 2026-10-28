import { expect, test } from "@playwright/test";

function previewParam(value: string) {
  return new URL(value).searchParams.get("preview");
}

test("opens a compact preview from a case-study title", async ({ page }) => {
  await page.goto("/");
  const title = page.getByRole("link", { name: "Che", exact: true });
  await title.click();

  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  expect(previewParam(page.url())).toBe("che");

  await expect(dialog.locator('[data-slot="sheet-title"]')).toHaveText("Che");
  await expect(dialog.locator('[data-slot="sheet-description"]')).toHaveText(
    "B2B commerce front end for 500+ retailers and merchants, built with Next.js 14 and TypeScript.",
  );

  const image = dialog.locator("[data-preview-image]");
  await expect(image).toBeVisible();
  await expect(image).toHaveAttribute("src", /\/work\/che\/che-card\.webp$/);
  await expect(image).toHaveAttribute(
    "alt",
    "Che product page with the Che heading, an introductory paragraph, a produce-stall photo, and the Che logo.",
  );

  await expect(
    dialog.getByRole("link", { name: "Read full case study" }),
  ).toHaveAttribute("href", "/work/che/");
  const full = dialog.getByRole("link", { name: "Read full case study" });
  const live = dialog.getByRole("link", { name: "Live: Che (opens in a new tab)" });
  await expect(live).toHaveAttribute("href", "https://kifiya.com/che/");
  for (const action of [full, live]) {
    await expect(action).toHaveCSS("font-size", "12px");
    await expect(action).toHaveCSS("text-transform", "uppercase");
    const box = await action.boundingBox();
    expect(Math.round(box?.height ?? 0)).toBe(28);
  }
});

test("escape closes the preview, removes the param, and restores focus", async ({ page }) => {
  await page.goto("/");
  const title = page.getByRole("link", { name: "Che", exact: true });
  await title.click();

  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await page.keyboard.press("Escape");

  await expect(dialog).toBeHidden();
  await expect.poll(() => previewParam(page.url())).toBeNull();
  await expect(title).toBeFocused();
});

test("browser back closes the preview", async ({ page }) => {
  await page.goto("/");
  const title = page.getByRole("link", { name: "Che", exact: true });
  await title.click();

  await expect(page.getByRole("dialog")).toBeVisible();
  await page.goBack();

  await expect(page.getByRole("dialog")).toBeHidden();
  await expect.poll(() => previewParam(page.url())).toBeNull();
});

test("a direct preview link opens and closes without leaving the page", async ({ page }) => {
  await page.goto("/?preview=ride-plus");

  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog.locator('[data-slot="sheet-title"]')).toHaveText("Ride Plus");
  await expect(dialog.locator("[data-preview-image]")).toHaveAttribute(
    "alt",
    "Mockup of the Ride Plus operations dashboard with driver, trip, payment, and activity views.",
  );
  await expect(dialog.locator(".preview-note")).toContainText(
    "Mockup design. The client dashboard is not public.",
  );
  await expect(page.locator("[data-work-note]")).not.toContainText("Mockup design.");

  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();

  const url = new URL(page.url());
  expect(url.pathname).toBe("/");
  expect(url.searchParams.has("preview")).toBe(false);
  await expect(page.getByRole("link", { name: "Ride Plus", exact: true })).toBeFocused();
});

test("an unknown preview param neither opens nor throws", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));

  await page.goto("/?preview=not-a-case");
  await expect(page.locator("[data-preview-sheet]")).toHaveCount(0);
  await expect(page.getByRole("dialog")).toHaveCount(0);
  expect(errors).toEqual([]);
});

test("case titles keep their real href without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/");

  const title = page.getByRole("link", { name: "Che", exact: true });
  await expect(title).toHaveAttribute("href", "/work/che/");
  await expect(title).toHaveAttribute("aria-haspopup", "dialog");

  await context.close();
});

test("the open preview does not overflow horizontally at 390px", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("link", { name: "Che", exact: true }).click();

  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();

  const pageOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(pageOverflow).toBeLessThanOrEqual(0);

  const sheetOverflow = await page.locator("[data-preview-sheet]").evaluate(
    (element) => element.scrollWidth - element.clientWidth,
  );
  expect(sheetOverflow).toBeLessThanOrEqual(0);
});
