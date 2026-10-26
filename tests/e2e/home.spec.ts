import { expect, test, type Locator } from "@playwright/test";

const workTitles = [
  "Turing agent platform", "Bellboy", "Che", "Sewasew", "Ride Plus", "Central Plaza",
  "Nib", "Aemro Motors", "Serpentine Arcade", "Vector Search Studio",
  "Real-time signal engine",
];

const caseStudyTitles = [
  "Turing agent platform", "Bellboy", "Che", "Sewasew", "Ride Plus",
  "Serpentine Arcade", "Vector Search Studio", "Real-time signal engine",
];

const plainTitles = ["Central Plaza", "Nib", "Aemro Motors"];

const roles = [
  "Full-Stack Developer and AI Engineer",
  "Senior Front-End Developer",
  "Software Developer",
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

test("shows every selected row and five roles", async ({ page }) => {
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
      experience.getByRole("heading", { name: new RegExp(`^${role},`) }),
    ).toBeVisible();
  }
  for (const company of ["Turing", "Kifiya", "Kepler Lab", "2F Capital", "UpScale"]) {
    await expect(
      experience.getByText(company, { exact: true }).first(),
    ).toBeVisible();
  }
});

test("shows one selected work list with category labels", async ({ page }) => {
  await page.goto("/");
  const workHeading = page.getByRole("heading", { name: "Selected work" });
  await expect(workHeading).toBeVisible();

  const turingRow = page.locator("#work li").filter({ hasText: "Turing agent platform" });
  const bellboyRow = page.locator("#work li").filter({ hasText: "Bellboy" });
  const serpentineRow = page.locator("#work li").filter({ hasText: "Serpentine Arcade" });

  await expect(turingRow.getByText("Platform", { exact: true })).toBeVisible();
  await expect(bellboyRow.getByText("Client", { exact: true })).toBeVisible();
  await expect(serpentineRow.getByText("Independent", { exact: true })).toBeVisible();

  await expectDocumentOrder(workHeading, turingRow);
  await expectDocumentOrder(turingRow, bellboyRow);
  await expectDocumentOrder(bellboyRow, serpentineRow);
});
