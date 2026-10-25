import { expect, test } from "@playwright/test";

test("shows every selected row and four roles", async ({ page }) => {
  await page.goto("/");
  for (const name of [
    "Bellboy", "BookBridge", "Central Plaza", "Ride Plus", "Nib", "Aemro Motors",
    "Serpentine Arcade", "Vector Search Studio", "Real-time signal engine",
  ]) {
    await expect(page.getByText(name, { exact: true }).first()).toBeVisible();
  }
  for (const name of [
    "Bellboy", "BookBridge", "Serpentine Arcade", "Vector Search Studio",
    "Real-time signal engine",
  ]) {
    await expect(page.getByRole("link", { name, exact: true })).toBeVisible();
  }
  for (const role of ["Turing", "Kifiya", "Kepler Lab", "2F Capital"]) {
    await expect(page.getByText(role, { exact: true }).first()).toBeVisible();
  }
});

test("shows client work before independent work", async ({ page }) => {
  await page.goto("/");
  const clientHeading = page.getByRole("heading", { name: "Client work" });
  const independentHeading = page.getByRole("heading", { name: "Independent" });
  await expect(clientHeading).toBeVisible();
  await expect(independentHeading).toBeVisible();
  const independentNode = await independentHeading.elementHandle();
  expect(await clientHeading.evaluate(
    (node, other) => node.compareDocumentPosition(other as Node) & Node.DOCUMENT_POSITION_FOLLOWING,
    independentNode,
  )).toBeTruthy();
});
