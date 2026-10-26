import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const out = join(process.cwd(), "out");
const site = "https://engida.devs.et";
const cases = [
  "turing-agent-platform",
  "bellboy",
  "che",
  "sewasew",
  "ride-plus",
  "serpentine",
  "vector-search-studio",
  "signal-engine",
];

function walk(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}

type Node = Record<string, unknown>;

function isObject(value: unknown): value is Node {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function blocks(file: string): unknown[] {
  const html = readFileSync(file, "utf8");
  return [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(
    (match) => JSON.parse(match[1]) as unknown,
  );
}

function graphNodes(block: unknown): Node[] {
  if (!isObject(block)) return [];
  const graph = block["@graph"];
  if (Array.isArray(graph)) return graph.filter(isObject);
  return block["@type"] ? [block] : [];
}

function nodesOfType(nodes: Node[], type: string): Node[] {
  return nodes.filter((node) => {
    const nodeType = node["@type"];
    return nodeType === type || (Array.isArray(nodeType) && nodeType.includes(type));
  });
}

function collectTypes(value: unknown, acc: string[] = []): string[] {
  if (Array.isArray(value)) {
    for (const item of value) collectTypes(item, acc);
  } else if (isObject(value)) {
    const type = value["@type"];
    if (typeof type === "string") acc.push(type);
    else if (Array.isArray(type)) acc.push(...type.filter((item): item is string => typeof item === "string"));
    for (const child of Object.values(value)) collectTypes(child, acc);
  }
  return acc;
}

const htmlFiles = existsSync(out)
  ? walk(out).filter((file) => file.endsWith(".html"))
  : [];

describe("production build", () => {
  it("emits the home page, about page, eight case studies, 404, and CNAME", () => {
    expect(existsSync(join(out, "index.html"))).toBe(true);
    expect(existsSync(join(out, "about", "index.html"))).toBe(true);
    expect(existsSync(join(out, "404.html"))).toBe(true);
    for (const slug of cases) expect(existsSync(join(out, "work", slug, "index.html"))).toBe(true);
    expect(readFileSync(join(out, "CNAME"), "utf8").trim()).toBe("engida.is-a.dev");
  });

  it("uses the final domain in every canonical", () => {
    for (const file of htmlFiles) {
      const html = readFileSync(file, "utf8");
      const canonicals = [...html.matchAll(/<link rel="canonical" href="([^"]+)"/g)].map((m) => m[1]);
      expect(canonicals.length, file).toBe(1);
      expect(canonicals[0], file).toMatch(/^https:\/\/engida\.devs\.et\/(?:[^/]+\/)*$/);
    }
    for (const file of htmlFiles) {
      expect(readFileSync(file, "utf8"), file).not.toMatch(/\bgithub\.io\b/);
    }
  });

  it("marks only not-found pages noindex", () => {
    const indexableHtmlFiles = [
      "index.html",
      "about/index.html",
      ...cases.map((slug) => `work/${slug}/index.html`),
    ];
    const notFoundFiles = ["404.html", "404/index.html", "_not-found/index.html"].filter((file) =>
      existsSync(join(out, file)),
    );

    for (const file of notFoundFiles) {
      const html = readFileSync(join(out, file), "utf8");
      expect(html, file).toContain("noindex");
      expect(html, file).not.toContain("index, follow");
    }
    for (const file of indexableHtmlFiles) {
      expect(readFileSync(join(out, file), "utf8"), file).not.toContain("noindex");
    }
  });

  it("ships a ten-URL sitemap and an allowing robots file", () => {
    const sitemap = readFileSync(join(out, "sitemap.xml"), "utf8");
    expect((sitemap.match(/<url>/g) ?? []).length).toBe(10);
    expect(sitemap).toContain("https://engida.devs.et/");
    expect(sitemap).toContain("https://engida.devs.et/about/");
    expect(sitemap).not.toContain("github.io");
    expect(sitemap).not.toContain("localhost");

    const robots = readFileSync(join(out, "robots.txt"), "utf8");
    expect(robots).toContain("Sitemap: https://engida.devs.et/sitemap.xml");
    const robotsLines = robots.split(/\r?\n/).map((line) => line.trim());
    expect(robotsLines).not.toContain("Disallow: /");
  });

  it("ships exact home structured data", () => {
    const homeBlocks = blocks(join(out, "index.html"));
    expect(homeBlocks).toHaveLength(1);

    const homeNodes = graphNodes(homeBlocks[0]);
    expect(nodesOfType(homeNodes, "Person")).toHaveLength(1);
    expect(nodesOfType(homeNodes, "WebSite")).toHaveLength(1);

    const works = nodesOfType(homeNodes, "CreativeWork");
    expect(works).toHaveLength(cases.length);

    for (const node of [...nodesOfType(homeNodes, "Person"), ...nodesOfType(homeNodes, "WebSite"), ...works]) {
      expect(node.url, JSON.stringify(node)).toMatch(/^https:\/\/engida\.devs\.et\//);
    }
    for (const slug of cases) {
      expect(
        works.some((work) => work.url === `${site}/work/${slug}/`),
        slug,
      ).toBe(true);
    }
    for (const work of works) {
      expect(work.dateCreated, String(work.url)).toMatch(/^\d{4}$/);
    }
    expect(JSON.stringify(homeBlocks[0])).not.toMatch(/localhost|github\.io/);
  });

  it("ships exact case-study structured data and no commerce nodes", () => {
    const forbidden = ["Review", "Rating", "Offer", "PriceSpecification"];
    for (const file of htmlFiles) {
      for (const block of blocks(file)) {
        const types = collectTypes(block);
        for (const type of forbidden) expect(types, file).not.toContain(type);
      }
    }

    for (const slug of cases) {
      const file = join(out, "work", slug, "index.html");
      const pageBlocks = blocks(file);
      expect(pageBlocks, file).toHaveLength(1);

      const nodes = graphNodes(pageBlocks[0]);
      const work = nodes.find(
        (node) => node["@type"] === "CreativeWork" && node.url === `${site}/work/${slug}/`,
      );
      expect(work, file).toBeDefined();
      expect(work?.isPartOf).toEqual({ "@id": `${site}/#website` });
      expect(work?.dateCreated, file).toMatch(/^\d{4}$/);
      expect(JSON.stringify(pageBlocks[0])).not.toMatch(/localhost|github\.io/);
    }
  });
});
