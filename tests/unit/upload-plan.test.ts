import { describe, expect, it } from "vitest";
import {
  describeFailure,
  isImmutableAsset,
  shouldSkipUpload,
} from "../../scripts/upload-plan.mjs";

describe("upload plan", () => {
  it("treats hashed build output as immutable", () => {
    expect(isImmutableAsset("/_next/static/media/font.woff2")).toBe(true);
    expect(isImmutableAsset("/cv/engida-lishan-cv.pdf")).toBe(false);
    expect(isImmutableAsset("/index.html")).toBe(false);
  });

  it("skips an immutable asset listed in the previous manifest", () => {
    const manifest = ["/_next/static/media/font.woff2", "/index.html"];

    expect(shouldSkipUpload("/_next/static/media/font.woff2", manifest)).toBe(true);
  });

  it("uploads an immutable asset the previous manifest does not list", () => {
    expect(shouldSkipUpload("/_next/static/media/new-font.woff2", ["/_next/static/chunks/old.js"])).toBe(false);
    expect(shouldSkipUpload("/_next/static/media/font.woff2", [])).toBe(false);
  });

  it("never skips files that are not hashed", () => {
    const manifest = ["/index.html", "/cv/engida-lishan-cv.pdf", "/engida-manifest.json"];

    expect(shouldSkipUpload("/index.html", manifest)).toBe(false);
    expect(shouldSkipUpload("/cv/engida-lishan-cv.pdf", manifest)).toBe(false);
    expect(shouldSkipUpload("/engida-manifest.json", manifest)).toBe(false);
  });

  it("includes the server message in a failure", () => {
    const response = {
      status: 406,
      body: Buffer.from("<html>Not Acceptable: blocked by rule</html>"),
    };

    expect(describeFailure("PUT /_next/static/media/a.woff2", response)).toBe(
      "PUT /_next/static/media/a.woff2 failed: HTTP 406 (<html>Not Acceptable: blocked by rule</html>)",
    );
    expect(describeFailure("PUT /x.js", { status: 500, body: Buffer.alloc(0) })).toBe(
      "PUT /x.js failed: HTTP 500",
    );
  });
});
