import { describe, expect, it } from "vitest";
import { caseStudies, caseStudyBySlug } from "@/content/case-studies";
import { clients } from "@/content/clients";
import { experience } from "@/content/experience";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";

describe("content counts", () => {
  it("has six client rows, three independent rows, and five case studies", () => {
    expect(clients).toHaveLength(6);
    expect(projects).toHaveLength(3);
    expect(caseStudies).toHaveLength(5);
  });

  it("has four selected roles", () => {
    expect(experience).toHaveLength(4);
  });
});

describe("content integrity", () => {
  it("links every case-study reference to a real case study", () => {
    const slugs = new Set(caseStudies.map((item) => item.slug));
    for (const item of [...clients, ...projects]) {
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
    const all = JSON.stringify({ profile, experience, clients, projects, caseStudies });
    expect(all).not.toMatch(/\+251|932433954/);
  });

  it("keeps the honest signal-engine result", () => {
    const signal = caseStudyBySlug("signal-engine");
    expect(signal?.result).toContain("48 to 50%");
  });
});
