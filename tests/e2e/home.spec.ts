import { expect, test, type Locator } from "@playwright/test";

const workTitles = [
  "Turing agent platform", "Che", "Ride Plus", "Serpentine Arcade",
  "Real-time signal engine", "Bellboy", "Sewasew", "Vector Search Studio",
  "Central Plaza", "Nib", "Aemro Motors",
];

const caseStudyTitles = [
  "Turing agent platform", "Che", "Ride Plus", "Serpentine Arcade",
  "Real-time signal engine", "Bellboy", "Sewasew", "Vector Search Studio",
];

const plainTitles = ["Central Plaza", "Nib", "Aemro Motors"];

const roles = [
  "Full-Stack Developer and AI Engineer",
  "Senior Front-End Developer",
  "Software Developer",
  "Lead Front-End Developer",
  "Front-End Developer",
  "Full-Stack Developer",
];

async function expectDocumentOrder(before: Locator, after: Locator) {
  const beforeHandle = await before.elementHandle();
  const afterHandle = await after.elementHandle();
  expect(beforeHandle).not.toBeNull();
  expect(afterHandle).not.toBeNull();
  const follows = await beforeHandle!.evaluate(
    (node, other) =>
      Boolean(
        node.compareDocumentPosition(other as unknown as Node) &
          Node.DOCUMENT_POSITION_FOLLOWING,
      ),
    afterHandle!,
  );
  expect(follows).toBe(true);
}

test("shows every selected row and six roles", async ({ page }) => {
  await page.goto("/");
  const work = page.locator("#work");
  for (const name of workTitles) {
    await expect(work.getByText(name, { exact: true })).toBeVisible();
  }
  for (const name of caseStudyTitles) {
    await expect(work.getByRole("link", { name, exact: true })).toBeVisible();
  }
  for (const name of plainTitles) {
    await expect(work.getByRole("link", { name, exact: true })).toHaveCount(0);
  }
  await expect(
    work.getByRole("link", {
      name: "Live: Central Plaza (opens in a new tab)",
      exact: true,
    }),
  ).toHaveAttribute("href", "https://central-plaza-web-app.vercel.app/");
  await expect(
    work.getByRole("link", {
      name: "Source: Vector Search Studio (opens in a new tab)",
      exact: true,
    }),
  ).toHaveAttribute("href", "https://github.com/engida32/vector-search-studio");
  const experience = page.locator("#experience");
  for (const role of roles) {
    await expect(
      experience.getByRole("heading", { name: role, exact: true }),
    ).toBeVisible();
  }
  for (const company of ["Turing", "Kifiya", "Kepler Lab", "JaktTech Engineering", "2F Capital", "UpScale"]) {
    await expect(
      experience.getByText(new RegExp(`^${company}`)).first(),
    ).toBeVisible();
  }
});

test("groups five featured case studies ahead of six more rows", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Selected work" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Featured case studies" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "More work" })).toBeVisible();

  const featured = page.locator('[data-work-group="featured"] [data-stagger-item]');
  const more = page.locator('[data-work-group="more"] [data-stagger-item]');
  await expect(featured).toHaveCount(5);
  await expect(more).toHaveCount(6);

  await expect(featured.getByRole("link", { name: /^(Turing agent platform|Che|Ride Plus|Serpentine Arcade|Real-time signal engine)$/ })).toHaveCount(5);
  await expect(more.getByRole("link", { name: /^(Bellboy|Sewasew|Vector Search Studio)$/ })).toHaveCount(3);

  const titles = async (group: Locator) =>
    group.locator("[data-work-title]").evaluateAll((links) =>
      links.map((link) => link.textContent?.trim()),
    );
  expect(await titles(featured)).toEqual([
    "Turing agent platform", "Che", "Ride Plus", "Serpentine Arcade", "Real-time signal engine",
  ]);
  expect(await titles(more)).toEqual([
    "Bellboy", "Sewasew", "Central Plaza", "Nib", "Aemro Motors", "Vector Search Studio",
  ]);
});

test("work rows put category above the title and keep an 80px date gutter", async ({ page }) => {
  await page.setViewportSize({ width: 768, height: 900 });
  await page.goto("/");

  const row = page.locator("#work [data-stagger-item]").filter({ hasText: "Turing agent platform" });
  const date = row.locator("[data-work-date]");
  const category = row.getByText("Platform", { exact: true });
  const title = row.getByRole("link", { name: "Turing agent platform" });

  await expectDocumentOrder(category, title);

  const template = await row.evaluate(
    (element) => getComputedStyle(element).gridTemplateColumns,
  );
  expect(template.startsWith("80px")).toBe(true);

  const dateBox = await date.boundingBox();
  const titleBox = await title.boundingBox();
  expect(dateBox).not.toBeNull();
  expect(titleBox).not.toBeNull();
  expect(titleBox!.x).toBeGreaterThan(dateBox!.x + 60);
});

test("desktop uses a two-column grid with a sticky profile rail", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 1280, height: 1000 });
  await page.goto("/");

  await expect(page.locator('aside[aria-label="Quick facts"]')).toHaveCount(0);
  const rail = page.locator("[data-profile-rail]");
  await expect(rail).toBeVisible();
  await expect(rail).toContainText("Available");

  const grid = await page.locator(".site-layout").evaluate((element) =>
    getComputedStyle(element).gridTemplateColumns,
  );
  expect(grid.trim().split(/\s+/)).toHaveLength(2);

  const hero = await page.locator(".site-layout-hero").boundingBox();
  const main = await page.locator(".site-layout-main").boundingBox();
  const railBox = await rail.boundingBox();
  expect(hero).not.toBeNull();
  expect(main).not.toBeNull();
  expect(railBox).not.toBeNull();
  expect(railBox!.x).toBeGreaterThan(main!.x + main!.width);
  expect(Math.abs(hero!.x - main!.x)).toBeLessThan(1);
  await expect(rail).toHaveCSS("position", "sticky");

  await page.evaluate(() => window.scrollTo(0, 1200));
  const stuckTop = await rail.evaluate((element) => Math.round(element.getBoundingClientRect().top));
  expect(stuckTop).toBeGreaterThanOrEqual(30);
  expect(stuckTop).toBeLessThanOrEqual(34);
});

test("mobile stacks hero, work, experience, about, then rail", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 375, height: 844 });
  await page.goto("/");

  await expect(page.locator(".site-header")).toHaveCSS("position", "sticky");
  const rail = page.locator("[data-profile-rail]");
  await expect(rail).toHaveCSS("position", "static");

  const about = page.locator("#about");
  await expectDocumentOrder(about, rail);

  const workLabel = await page.locator("#work-label").boundingBox();
  expect(workLabel).not.toBeNull();
  expect(workLabel!.y).toBeLessThan(844);

  const viewWork = page.getByRole("link", { name: "View selected work" });
  const email = page.getByRole("link", { name: "Email me" });
  await expectDocumentOrder(viewWork, email);
  await expect(viewWork).toBeVisible();
  await expect(email).toBeVisible();
});
