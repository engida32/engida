import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
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

  it("has six selected roles", () => {
    expect(experience).toHaveLength(6);
  });
});

describe("portfolio structure", () => {
  it("pins the five featured rows in display order", () => {
    const featured = [...platforms, ...clients, ...projects]
      .filter((item) => item.featured)
      .map((item) => item.title);
    expect(featured).toEqual([
      "Turing agent platform",
      "Che",
      "Ride Plus",
      "Serpentine Arcade",
      "Real-time signal engine",
    ]);
  });

  it("marks Nib and Aemro as internal with no public-link note", () => {
    const internal = [...platforms, ...clients, ...projects].filter(
      (item) => item.visibility === "internal",
    );
    expect(internal.map((item) => item.title)).toEqual(["Nib", "Aemro Motors"]);
    for (const item of internal) expect(item.note).toBeUndefined();
  });

  it("stores metrics only as exact outcome substrings", () => {
    for (const item of experience) {
      for (const metric of item.metrics ?? []) {
        expect(item.outcome, `${item.company}: ${metric}`).toContain(metric);
      }
    }
    expect(experience.find((item) => item.company === "Turing")?.metrics).toBeUndefined();
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

  it("includes the JaktTech role with CV dates and scope", () => {
    const jaktTech = experience.find((item) => item.company === "JaktTech Engineering");
    expect(jaktTech).toMatchObject({
      role: "Lead Front-End Developer",
      start: "Sep 2022",
      end: "Nov 2023",
      location: "Addis Ababa",
    });
    expect(jaktTech?.scope).toContain("SMS gateway");
  });

  it("anchors every published image in provenance and on disk", () => {
    const provenance = readFileSync("PROVENANCE.md", "utf8");
    const images = new Set<string>();

    for (const item of [...clients, ...projects]) {
      if (item.image) images.add(item.image.src);
    }
    for (const study of caseStudies) {
      if (study.hero) images.add(study.hero.src);
      for (const screenshot of study.screenshots) images.add(screenshot.src);
    }

    expect(images.size).toBe(8);
    for (const src of images) {
      expect(existsSync(`public${src}`), src).toBe(true);
      expect(provenance, src).toContain(src);
    }
  });

  it("keeps unsupported and private-source claims out", () => {
    const all = JSON.stringify({ clients, projects, caseStudies });
    const provenance = readFileSync("PROVENANCE.md", "utf8");
    const vector = projects.find((project) => project.title === "Vector Search Studio");

    expect(all).not.toContain("Australia");
    expect(provenance).toContain("JaktTech role");
    expect(provenance).toContain("https://sewasewmusic.com/");
    expect(provenance).toContain("https://github.com/engida32/vector-search-studio");
    expect(provenance).not.toContain("Private project repository, README.md at 720ceb3");
    expect(vector?.sourceUrl).toBe("https://github.com/engida32/vector-search-studio");
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

  it("ships a CV without the phone number", () => {
    let text: string;
    try {
      text = execFileSync("pdftotext", ["public/cv/engida-lishan-cv.pdf", "-"], {
        encoding: "utf8",
      });
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === "ENOENT") return;
      throw error;
    }
    expect(text).not.toMatch(/\+251|932433954/);
  });

  it("keeps mockup notes in the preview only", () => {
    for (const title of ["Ride Plus", "Sewasew"]) {
      const item = clients.find((client) => client.title === title);
      expect(item?.note).toBe("Mockup design. The client dashboard is not public.");
      expect(item?.noteInPreviewOnly).toBe(true);
    }

    const signalEngine = projects.find(
      (project) => project.title === "Real-time signal engine",
    );
    expect(signalEngine?.note).toBe("Private, in progress.");
    expect(signalEngine?.noteInPreviewOnly).toBeUndefined();
  });

  it("does not put invented metrics in generated-image alt text", () => {
    for (const title of ["Ride Plus", "Sewasew"]) {
      const item = clients.find((client) => client.title === title);
      expect(item?.image?.alt, title).not.toMatch(/\d{1,3},\d{3}/);
    }
    for (const slug of ["ride-plus", "sewasew"]) {
      const study = caseStudyBySlug(slug);
      expect(study?.hero?.alt, slug).not.toMatch(/\d{1,3},\d{3}/);
      expect(study?.screenshots[0]?.alt, slug).not.toMatch(/\d{1,3},\d{3}/);
    }
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

  it("publishes no local paths or private repository names", () => {
    const provenance = readFileSync("PROVENANCE.md", "utf8");
    for (const marker of [
      "/home/emmrc-02",
      "career-ops",
      "visa_status",
      "turing project",
      "btc-signal-engine",
      "personal-works",
    ]) {
      expect(provenance, marker).not.toContain(marker);
    }
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
      "Platform results: 30% faster loads, 25% higher adoption, and 50% faster releases.",
    );

    const capital = experience.find((item) => item.company === "2F Capital");
    expect(capital?.scope).toContain("100,000+ users");
    expect(capital?.scope).not.toContain("10,000+ drivers");
    expect(capital?.outcome).toBe("The taxi platform processed 50,000+ transactions.");

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
