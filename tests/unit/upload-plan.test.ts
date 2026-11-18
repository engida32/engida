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

  it("skips an immutable asset whose remote length already matches", () => {
    expect(
      shouldSkipUpload({
        remotePath: "/_next/static/media/font.woff2",
        localSize: 6800,
        remoteStatus: 200,
        remoteLength: 6800,
      }),
    ).toBe(true);
  });

  it("uploads when the remote copy is missing or a different size", () => {
    const base = { remotePath: "/_next/static/media/font.woff2", localSize: 6800 };

    expect(shouldSkipUpload({ ...base, remoteStatus: 404, remoteLength: 0 })).toBe(false);
    expect(shouldSkipUpload({ ...base, remoteStatus: 200, remoteLength: 6799 })).toBe(false);
    expect(shouldSkipUpload({ ...base, remoteStatus: 200, remoteLength: Number.NaN })).toBe(false);
  });

  it("never skips files that are not hashed", () => {
    expect(
      shouldSkipUpload({
        remotePath: "/index.html",
        localSize: 2000,
        remoteStatus: 200,
        remoteLength: 2000,
      }),
    ).toBe(false);
    expect(
      shouldSkipUpload({
        remotePath: "/cv/engida-lishan-cv.pdf",
        localSize: 60998,
        remoteStatus: 200,
        remoteLength: 60998,
      }),
    ).toBe(false);
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
