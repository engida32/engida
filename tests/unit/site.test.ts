import { afterEach, describe, expect, it, vi } from "vitest";
import { assetPath } from "@/lib/asset-path";
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
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://engida.is-a.dev/");
    expect(siteUrl()).toBe("https://engida.is-a.dev");
  });

  it("builds a canonical with exactly one trailing slash", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://engida.is-a.dev");
    expect(canonicalUrl("/")).toBe("https://engida.is-a.dev/");
    expect(canonicalUrl("work/serpentine")).toBe(
      "https://engida.is-a.dev/work/serpentine/",
    );
  });

  it("keeps file URLs free of a forced trailing slash", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://engida.is-a.dev");
    expect(absoluteUrl("/og.png")).toBe("https://engida.is-a.dev/og.png");
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
    vi.stubEnv("NEXT_PUBLIC_ALLOW_INDEXING", "true");
    expect(allowIndexing()).toBe(true);
  });
});
