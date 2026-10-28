import { expect, test } from "@playwright/test";

test("internal rows say Internal System and offer no public link", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("No public link.", { exact: true })).toHaveCount(0);

  const internal = page.locator('#work [data-stagger-item][data-internal="true"]');
  await expect(internal).toHaveCount(2);

  for (const title of ["Nib", "Aemro Motors"]) {
    const row = internal.filter({ hasText: title });
    await expect(row.getByText("Internal System", { exact: true })).toBeVisible();
    await expect(row.locator("a")).toHaveCount(0);
    await expect(row.getByText(title, { exact: true })).toBeVisible();
  }
});

test("profile rail carries facts and contact links", async ({ page }) => {
  await page.goto("/");
  const rail = page.locator('aside[aria-label="Profile and contact"]');
  await expect(rail).toBeVisible();

  for (const label of ["Profile", "Based in", "Focus", "Stack", "Contact"]) {
    await expect(rail.getByText(label, { exact: true })).toBeVisible();
  }
  await expect(rail.getByText("Addis Ababa, Ethiopia", { exact: true })).toBeVisible();
  await expect(rail.getByText("Available", { exact: true })).toBeVisible();
  await expect(
    rail.getByText("AI product and platform engineering", { exact: true }),
  ).toBeVisible();
  await expect(rail.getByText("TypeScript, React, Next.js", { exact: true })).toBeVisible();
  await expect(
    rail.getByText("Python, FastAPI, Postgres, pgvector", { exact: true }),
  ).toBeVisible();

  await expect(rail.getByRole("link", { name: "engida32lishan@gmail.com" })).toHaveAttribute(
    "href",
    "mailto:engida32lishan@gmail.com",
  );
  await expect(rail.getByRole("link", { name: "CV" })).toHaveAttribute(
    "href",
    "/cv/engida-lishan-cv.pdf",
  );
  await expect(rail.getByRole("link", { name: "GitHub (opens in a new tab)" })).toBeVisible();
  await expect(rail.getByRole("link", { name: "LinkedIn (opens in a new tab)" })).toBeVisible();
  await expect(rail.getByRole("link", { name: "X (opens in a new tab)" })).toBeVisible();
  await expect(rail.getByRole("button", { name: "Copy email address" })).toBeVisible();
});

test("header reserves space for nav cues and marks the current page", async ({ page }) => {
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "Primary" });
  const cues = nav.locator(".nav-cue");
  await expect(cues).toHaveCount(3);
  for (let index = 0; index < 3; index += 1) {
    await expect(cues.nth(index)).toHaveAttribute("aria-hidden", "true");
  }
  await expect(nav.getByRole("link", { name: "About" })).not.toHaveAttribute(
    "aria-current",
    "page",
  );

  await page.goto("/about/");
  await expect(
    page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "About" }),
  ).toHaveAttribute("aria-current", "page");
});

test("experience highlights only the published metrics", async ({ page }) => {
  await page.goto("/");
  const metrics = page.locator("#experience strong.metric");
  await expect(metrics).toHaveCount(8);
  const texts = await metrics.evaluateAll((nodes) =>
    nodes.map((node) => node.textContent?.trim()),
  );
  expect(texts).toEqual([
    "30% faster loads",
    "25% higher adoption",
    "50% faster releases",
    "40%",
    "30%",
    "50,000+ transactions",
    "30%",
    "40%",
  ]);
});

test("work titles stretch across the row while external actions stay clickable", async ({ page }) => {
  await page.goto("/");
  const title = page
    .locator("#work [data-stagger-item]")
    .filter({ hasText: "Turing agent platform" })
    .getByRole("link", { name: "Turing agent platform" });

  const titleStyle = await title.evaluate((element) => {
    const pseudo = getComputedStyle(element, "::after");
    return {
      position: pseudo.position,
      content: pseudo.content,
      inset: pseudo.inset,
    };
  });
  expect(titleStyle.position).toBe("absolute");
  expect(titleStyle.content).not.toBe("none");
  expect(titleStyle.inset).toBe("0px");

  const live = page.getByRole("link", { name: "Live: Central Plaza (opens in a new tab)" });
  await expect(live).toHaveCSS("position", "relative");
  await expect(live).toHaveCSS("z-index", "10");
});

test("about page uses the shell, prose measure, and metadata scale", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/about/");

  const shell = await page.locator(".shell").first().boundingBox();
  expect(shell).not.toBeNull();
  expect(shell!.width).toBeLessThanOrEqual(1180);

  await expect(page.locator("h1")).toHaveCSS("font-size", "48px");
  await expect(page.locator("h2").first()).toHaveCSS("font-size", "24px");

  const measure = page.locator(".prose-measure").first();
  const maxWidth = await measure.evaluate((element) =>
    Number.parseFloat(getComputedStyle(element).maxWidth),
  );
  expect(maxWidth).toBeGreaterThan(0);
  expect(maxWidth).toBeLessThanOrEqual(760);
  await expect(measure).toHaveCSS("font-size", "18px");
});

test("not found has its own title and a way home", async ({ page }) => {
  await page.goto("/404.html");
  await expect(page).toHaveTitle(/404: command not found/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("command not found");
  await expect(page.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
  await expect(page.getByRole("link", { name: "Back to selected work" })).toHaveAttribute(
    "href",
    "/#work",
  );
});
