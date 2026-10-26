import { afterEach, describe, expect, it, vi } from "vitest";
import { assetPath } from "@/lib/asset-path";
import { pageMetadata } from "@/lib/seo";
import {
  absoluteUrl,
  allowIndexing,
  basePath,
  canonicalUrl,
  siteUrl,
} from "@/lib/site";

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("site URL", () => {
  it("defaults to the local preview URL", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "");
    expect(siteUrl()).toBe("http://localhost:4173");
  });

  it("removes a trailing slash", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://engida.devs.et/");
    expect(siteUrl()).toBe("https://engida.devs.et");
  });

  it("builds a canonical with exactly one trailing slash", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://engida.devs.et");
    expect(canonicalUrl("/")).toBe("https://engida.devs.et/");
    expect(canonicalUrl("work/serpentine")).toBe(
      "https://engida.devs.et/work/serpentine/",
    );
  });

  it("keeps staging canonicals under the project path", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://engida32.github.io/engida");
    expect(canonicalUrl("/work/serpentine")).toBe(
      "https://engida32.github.io/engida/work/serpentine/",
    );
  });

  it("keeps file URLs free of a forced trailing slash", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://engida.devs.et");
    expect(absoluteUrl("/og.png")).toBe("https://engida.devs.et/og.png");
  });
});

describe("base path", () => {
  it("is empty by default", () => {
    vi.stubEnv("NEXT_PUBLIC_BASE_PATH", "");
    expect(basePath()).toBe("");
    expect(assetPath("/cv/engida-lishan-cv.pdf")).toBe("/cv/engida-lishan-cv.pdf");
  });

  it("prefixes public files for the project page", () => {
    vi.stubEnv("NEXT_PUBLIC_BASE_PATH", "/engida");
    expect(assetPath("/cv/engida-lishan-cv.pdf")).toBe(
      "/engida/cv/engida-lishan-cv.pdf",
    );
  });
});

describe("indexing flag", () => {
  it("is off unless explicitly true", () => {
    vi.stubEnv("NEXT_PUBLIC_ALLOW_INDEXING", "");
    expect(allowIndexing()).toBe(false);
    for (const value of ["TRUE", "1", "yes"]) {
      vi.stubEnv("NEXT_PUBLIC_ALLOW_INDEXING", value);
      expect(allowIndexing()).toBe(false);
    }
    vi.stubEnv("NEXT_PUBLIC_ALLOW_INDEXING", "true");
    expect(allowIndexing()).toBe(true);
  });
});

describe("page metadata", () => {
  it("builds absolute home and case-study metadata", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://engida.devs.et");
    vi.stubEnv("NEXT_PUBLIC_ALLOW_INDEXING", "true");

    const home = pageMetadata({
      title: "Engida Lishan | Full-stack engineer",
      description: "Home description.",
      path: "/",
      type: "profile",
    });
    const work = pageMetadata({
      title: "Bellboy",
      description: "Case study description.",
      path: "/work/bellboy",
    });

    expect(home.openGraph).toMatchObject({ type: "profile", locale: "en" });
    expect(work.alternates?.canonical).toBe(
      "https://engida.devs.et/work/bellboy/",
    );
    expect(work.openGraph).toMatchObject({
      type: "website",
      locale: "en",
      url: "https://engida.devs.et/work/bellboy/",
    });
    expect(work.twitter).toMatchObject({
      card: "summary_large_image",
      creator: "@engida_lish",
    });
    expect(work.robots).toEqual({ index: true, follow: true });
  });
});
