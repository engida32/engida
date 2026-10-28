import { expect, test, type Locator } from "@playwright/test";

test("theme toggle switches and persists", async ({ page }) => {
  await page.addInitScript(() => {
    if (!localStorage.getItem("theme")) localStorage.setItem("theme", "dark");
  });
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/");

  const toggle = page.getByRole("button", { name: "Toggle color theme" });
  await expect(page.locator("html")).toHaveClass(/dark/);
  await expect(toggle).toHaveAttribute("aria-pressed", "true");

  await toggle.hover();
  await expect(page.getByRole("tooltip")).toHaveText("Switch to light");

  await toggle.click();
  await expect(page.locator("html")).toHaveClass(/light/);
  await expect(toggle).toHaveAttribute("aria-pressed", "false");

  await page.reload();
  await expect(page.locator("html")).toHaveClass(/light/);
  await expect(toggle).toHaveAttribute("aria-pressed", "false");
});

test("back to top appears after scrolling and restores focus", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  const control = page.locator("button.back-to-top");
  await expect(control).toBeHidden();
  await expect(control).toHaveAttribute("aria-hidden", "true");
  await expect(control).toHaveAttribute("tabindex", "-1");

  await page.evaluate(() => window.scrollTo(0, 400));
  await expect(control).toBeHidden();

  await page.evaluate(() => window.scrollTo(0, 700));
  await expect(control).toBeVisible();

  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await expect(control).toBeVisible();
  await expect(control).toHaveAttribute("aria-hidden", "false");
  await expect(control).toHaveAttribute("tabindex", "0");

  await control.click();
  await expect(page.locator("main")).toBeFocused();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
});

test("mobile navigation opens and closes", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open menu" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.getByRole("link", { name: "Work" }).click();
  await expect(page.getByRole("dialog")).toBeHidden();
});

test("header hash links finish at the section with a short scroll", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/");
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await page.waitForTimeout(150);

  const start = await page.evaluate(() => window.scrollY);
  expect(start).toBeGreaterThan(1000);

  await page
    .getByRole("navigation", { name: "Primary" })
    .getByRole("link", { name: "Work", exact: true })
    .click();

  await expect.poll(() => page.evaluate(() => window.location.hash)).toBe("#work");
  await page.waitForTimeout(600);

  const result = await page.evaluate(() => {
    const target = document.getElementById("work");
    if (!target) throw new Error("missing #work");
    return {
      y: window.scrollY,
      top: target.getBoundingClientRect().top,
    };
  });

  expect(result.y).toBeLessThan(start);
  expect(result.top).toBeGreaterThanOrEqual(0);
  expect(result.top).toBeLessThan(64);
  await expect.poll(() => page.evaluate(() => document.activeElement?.id)).toBe("work");
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
  await expect(reveals).toHaveCount(3);
  for (let i = 0; i < 3; i += 1) {
    const reveal = reveals.nth(i);
    await expect(reveal).toHaveClass(/is-visible/);
    await expect(reveal).toHaveCSS("opacity", "1");
    await expect(reveal).toHaveCSS("transform", "none");
    await expect(reveal).toHaveCSS("transition-duration", "0s");
    await expect(reveal).toHaveCSS("transition-delay", "0s");
  }
});

test("controls are legible at rest", async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("theme", "light"));
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/");

  const primary = page.locator('a[data-variant="default"]').first();
  const secondary = page.locator('a[data-variant="secondary"]').first();
  const railCopy = page.getByRole("button", { name: "Copy email address" });

  await expect(primary).toHaveCSS("background-color", "rgb(11, 122, 72)");
  await expect(primary).toHaveCSS("border-top-width", "0px");
  await expect(railCopy).toContainText("Copy email");

  for (const control of [secondary]) {
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

test("copy email uses the rail header action", async ({ page }) => {
  await page.goto("/");

  const button = page.getByRole("button", { name: "Copy email address" });
  await expect(button).toHaveAttribute("data-variant", "ghost");
  await expect(button).toHaveClass(/rail-copy/);
  await expect(button).toContainText("Copy email");
  await expect(button).toHaveCSS("border-top-width", "0px");
  await expect(button).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
  await expect(button).toHaveCSS("height", "24px");
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
  await expect(footerEmail).toHaveCSS("text-decoration-line", "none");

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
  await expect(row).toHaveCSS("background-color", "rgb(236, 236, 228)");

  await page.mouse.move(0, 0);
  await row.getByRole("link").first().focus();
  await expect(row).toHaveCSS("background-color", "rgb(236, 236, 228)");
});

test("reveal uses 400ms and an 8px rise, with a fallback", async ({ page }) => {
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
  expect(styles.transform).toBe("matrix(1, 0, 0, 1, 0, 8)");
  expect(styles.duration).toContain("0.4s");

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

test("stagger delays use 60ms and 20ms steps and cap at 300ms", async ({ page }) => {
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
  const featured = page.locator('[data-work-group="featured"] [data-stagger-item]');
  const more = page.locator('[data-work-group="more"] [data-stagger-item]');
  await expectStaggerDelay(featured.nth(0), "0s");
  await expectStaggerDelay(featured.nth(1), "0.06s");
  await expectStaggerDelay(featured.nth(4), "0.24s");
  await expectStaggerDelay(more.nth(0), "0s");
  await expectStaggerDelay(more.nth(5), "0.3s");

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

test("hero is not gated by a reveal animation", async ({ page }) => {
  await page.goto("/");
  const gated = await page
    .locator(".hero-section")
    .evaluate((element) => Boolean(element.closest("[data-reveal]")));
  expect(gated).toBe(false);
});

test("back to top does not cover the mobile footer", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));

  const control = page.locator("button.back-to-top");
  await expect(control).toBeVisible();
  const pill = await control.boundingBox();
  const location = await page
    .getByRole("contentinfo")
    .getByText("Addis Ababa, Ethiopia", { exact: true })
    .boundingBox();
  expect(pill).not.toBeNull();
  expect(location).not.toBeNull();

  const overlaps =
    pill!.x < location!.x + location!.width &&
    pill!.x + pill!.width > location!.x &&
    pill!.y < location!.y + location!.height &&
    pill!.y + pill!.height > location!.y;
  expect(overlaps).toBe(false);
});

test("mobile menu does not open the theme tooltip", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open menu" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.waitForTimeout(250);
  await expect(page.getByRole("tooltip")).toHaveCount(0);
});

test("mobile headline avoids an isolated word", async ({ page }) => {
  for (const width of [320, 360, 390]) {
    await test.step(`${width}px`, async () => {
      await page.setViewportSize({ width, height: 844 });
      await page.goto("/");
      await page.evaluate(() => document.fonts.ready);

      const lines = await page
        .locator("h1 > span")
        .filter({ hasText: "AI features" })
        .evaluate((element) => {
          const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
          const words: Array<{ text: string; top: number }> = [];
          let node: Node | null;
          while ((node = walker.nextNode())) {
            const text = node.textContent ?? "";
            const pattern = /\S+/g;
            let match: RegExpExecArray | null;
            while ((match = pattern.exec(text))) {
              const range = document.createRange();
              range.setStart(node, match.index);
              range.setEnd(node, match.index + match[0].length);
              const rect = range.getBoundingClientRect();
              if (rect.width > 0) words.push({ text: match[0], top: Math.round(rect.top) });
            }
          }

          const grouped: Array<{ top: number; words: string[] }> = [];
          for (const word of words) {
            let line = grouped.find((entry) => Math.abs(entry.top - word.top) < 2);
            if (!line) {
              line = { top: word.top, words: [] };
              grouped.push(line);
            }
            line.words.push(word.text);
          }
          return grouped.map((entry) => entry.words.join(" "));
        });

      expect(lines.length).toBeLessThanOrEqual(7);
      expect(lines).not.toContain("including");
    });
  }
});
