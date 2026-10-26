import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { about } from "@/content/about";
import { caseStudies, caseStudyBySlug } from "@/content/case-studies";
import { clients } from "@/content/clients";
import { experience } from "@/content/experience";
import { platforms } from "@/content/platforms";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";

describe("content counts", () => {
  it("has one platform row, seven client rows, three independent rows, and eight case studies", () => {
    expect(platforms).toHaveLength(1);
    expect(clients).toHaveLength(7);
    expect(projects).toHaveLength(3);
    expect(caseStudies).toHaveLength(8);
  });

  it("has five selected roles", () => {
    expect(experience).toHaveLength(5);
  });
});

describe("content integrity", () => {
  it("links every case-study reference to a real case study", () => {
    const slugs = new Set(caseStudies.map((item) => item.slug));
    for (const item of [...platforms, ...clients, ...projects]) {
      if (item.caseStudySlug) expect(slugs.has(item.caseStudySlug)).toBe(true);
    }
  });

  it("uses unique slugs", () => {
    const slugs = caseStudies.map((item) => item.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("resolves a known slug and rejects an unknown one", () => {
    expect(caseStudyBySlug("serpentine")?.title).toBe("Serpentine Arcade");
    expect(caseStudyBySlug("nope")).toBeUndefined();
  });

  it("does not publish a phone number", () => {
    const all = JSON.stringify({
      profile,
      about,
      experience,
      platforms,
      clients,
      projects,
      caseStudies,
    });
    expect(all).not.toMatch(/\+251|932433954/);
  });

  it("keeps forbidden claims out of public content", () => {
    const all = JSON.stringify({
      profile,
      about,
      experience,
      platforms,
      clients,
      projects,
      caseStudies,
    });
    const forbidden = [
      /fine[- ]?tun/i,
      /human[- ]in[- ]the[- ]loop/i,
      /\bHITL\b/i,
      /10,?000\+? drivers/i,
      /10K\+? drivers/i,
      /fortune 500/i,
      /patented/i,
      /real estate/i,
      /strapi/i,
      /pinecone/i,
      /milvus/i,
      /pytorch/i,
      /hugging face/i,
    ];
    for (const pattern of forbidden) expect(all, pattern.source).not.toMatch(pattern);
  });

  it("keeps the honest signal-engine result", () => {
    const signal = caseStudyBySlug("signal-engine");
    expect(signal?.result).toContain("48 to 50%");
  });

  it("keeps the signal-engine result exact", () => {
    expect(caseStudyBySlug("signal-engine")?.result?.startsWith("48 to 50% out-of-sample")).toBe(
      true,
    );
  });
});

describe("approved content", () => {
  it("uses only the approved client titles", () => {
    expect(clients.map((item) => item.title)).toEqual([
      "Bellboy",
      "Che",
      "Sewasew",
      "Ride Plus",
      "Central Plaza",
      "Nib",
      "Aemro Motors",
    ]);
  });

  it("uses only the approved case-study titles", () => {
    expect(caseStudies.map((item) => item.title)).toEqual([
      "Turing agent evaluation platform",
      "Bellboy",
      "Che",
      "Sewasew",
      "Ride Plus",
      "Serpentine Arcade",
      "Vector Search Studio",
      "Real-time signal engine",
    ]);
  });

  it("pins the decisions contract", () => {
    expect(caseStudyBySlug("signal-engine")?.decisions).toBeUndefined();
    for (const slug of [
      "turing-agent-platform",
      "bellboy",
      "che",
      "sewasew",
      "ride-plus",
      "serpentine",
      "vector-search-studio",
    ]) {
      expect(caseStudyBySlug(slug)?.decisions?.length, slug).toBeGreaterThan(0);
    }
  });

  it("points cvPath at the sanitized cv", () => {
    expect(profile.cvPath).toBe("/cv/engida-lishan-cv.pdf");
  });

  it("publishes no phone-like digit run", () => {
    const all = JSON.stringify({
      profile,
      experience,
      platforms,
      clients,
      projects,
      caseStudies,
    }).replace(/[\s.()\-]/g, "");
    expect(all).not.toMatch(/\d{9,}/);
  });

  it("credits the Bellboy backend to another developer", () => {
    const study = caseStudyBySlug("bellboy");
    expect(study?.scope).toMatch(/another developer/i);
    expect(study?.scope).toMatch(/backend/i);
  });

  it("attributes the Bellboy backend in team context", () => {
    const bellboy = caseStudyBySlug("bellboy");
    expect(bellboy?.context).toContain("NestJS/Prisma");
    expect(bellboy?.context).toContain("I built the front end and admin");
  });

  it("anchors every platform, client, and project row", () => {
    const provenance = readFileSync("PROVENANCE.md", "utf8");
    for (const item of platforms) {
      expect(provenance, item.title).toContain(`Platform: ${item.title}`);
    }
    for (const item of clients) expect(provenance, item.title).toContain(`Client: ${item.title}`);
    for (const item of projects) expect(provenance, item.title).toContain(`Project: ${item.title}`);
  });

  it("anchors every client year exactly", () => {
    const provenance = readFileSync("PROVENANCE.md", "utf8");
    for (const client of clients) {
      expect(provenance, client.title).toContain(
        `Client year: ${client.title} ${client.year}`,
      );
    }
  });

  it("anchors every case-study problem, role, and status", () => {
    const provenance = readFileSync("PROVENANCE.md", "utf8");
    for (const study of caseStudies) {
      for (const label of ["problem", "role", "status"]) {
        expect(provenance, `${study.slug} ${label}`).toContain(`${study.slug} ${label}`);
      }
    }
  });

  it("freezes the published metrics", () => {
    expect(profile.about).toContain("500+ merchants");
    expect(profile.about).toContain("100,000+ users");

    const kifiya = experience.find((item) => item.company === "Kifiya");
    expect(kifiya?.scope).toContain("500+ merchants");
    expect(kifiya?.outcome).toBe(
      "30% faster loads, 25% higher adoption, and releases 50% faster.",
    );

    const capital = experience.find((item) => item.company === "2F Capital");
    expect(capital?.scope).toContain("100,000+ users");
    expect(capital?.scope).not.toContain("10,000+ drivers");
    expect(capital?.outcome).toBe("50,000+ transactions processed through the app.");

    expect(caseStudyBySlug("che")?.result).toContain("30%");
    expect(caseStudyBySlug("che")?.result).toContain("25%");
    expect(caseStudyBySlug("che")?.result).toContain("50%");
    expect(caseStudyBySlug("ride-plus")?.result).toContain("42K+");
  });

  it("keeps platform and client years aligned with their case studies", () => {
    for (const item of [...platforms, ...clients]) {
      if (!item.caseStudySlug) continue;
      const study = caseStudyBySlug(item.caseStudySlug);
      expect(study?.year, item.title).toBe(item.year);
    }
    for (const client of clients) {
      if (!client.caseStudySlug) continue;
      expect(caseStudyBySlug(client.caseStudySlug)?.title, client.title).toBe(client.title);
    }
  });
});
