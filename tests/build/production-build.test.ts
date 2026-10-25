import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const out = join(process.cwd(), "out");
const cases = ["bellboy", "bookbridge", "serpentine", "vector-search-studio", "signal-engine"];

function walk(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}

const htmlFiles = existsSync(out)
  ? walk(out).filter((file) => file.endsWith(".html"))
  : [];

const indexableHtmlFiles = htmlFiles.filter(
  (file) => !file.includes("404") && !file.includes("_not-found"),
);

describe("production build", () => {
  it("emits the home page, five case studies, and 404", () => {
    expect(existsSync(join(out, "index.html"))).toBe(true);
    expect(existsSync(join(out, "404.html"))).toBe(true);
    for (const slug of cases) expect(existsSync(join(out, "work", slug, "index.html"))).toBe(true);
  });

  it("uses the final domain in every canonical", () => {
    for (const file of htmlFiles) {
      const html = readFileSync(file, "utf8");
      const canonicals = [...html.matchAll(/<link rel="canonical" href="([^"]+)"/g)].map((m) => m[1]);
      expect(canonicals.length, file).toBe(1);
      expect(canonicals[0], file).toMatch(/^https:\/\/engida\.is-a\.dev\/(?:.*\/)?$/);
    }
    expect(htmlFiles.some((file) => readFileSync(file, "utf8").includes("github.io"))).toBe(false);
  });

  it("does not ship a noindex tag", () => {
    for (const file of indexableHtmlFiles) {
      expect(readFileSync(file, "utf8"), file).not.toContain("noindex");
    }
  });

  it("ships a six-URL sitemap and an allowing robots file", () => {
    const sitemap = readFileSync(join(out, "sitemap.xml"), "utf8");
    expect((sitemap.match(/<url>/g) ?? []).length).toBe(6);
    expect(sitemap).toContain("https://engida.is-a.dev/");
    const robots = readFileSync(join(out, "robots.txt"), "utf8");
    expect(robots).toContain("Sitemap: https://engida.is-a.dev/sitemap.xml");
    expect(robots).not.toContain("Disallow: /");
  });

  it("has Person and WebSite JSON-LD on the home page", () => {
    const html = readFileSync(join(out, "index.html"), "utf8");
    expect(html).toContain('"@type":"Person"');
    expect(html).toContain('"@type":"WebSite"');
    expect(html).toContain('"@type":"CreativeWork"');
  });

  it("writes CNAME only for production", () => {
    expect(readFileSync(join(out, "CNAME"), "utf8").trim()).toBe("engida.is-a.dev");
  });
});
