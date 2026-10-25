import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const files = [
  "content/profile.ts",
  "content/experience.ts",
  "content/clients.ts",
  "content/projects.ts",
  "content/case-studies.ts",
];

const banned = [
  "delve", "realm", "harness", "unlock", "tapestry", "paradigm",
  "cutting-edge", "revolutionize", "landscape", "intricate", "showcasing",
  "crucial", "pivotal", "surpass", "meticulously", "vibrant", "unparalleled",
  "underscore", "leverage", "synergy", "innovative", "game-changer",
  "testament", "commendable", "highlight", "emphasize", "boast",
  "groundbreaking", "align", "foster", "showcase", "enhance", "holistic",
  "garner", "accentuate", "pioneering", "trailblazing", "unleash",
  "versatile", "transformative", "redefine", "seamless", "optimize",
  "scalable", "robust", "breakthrough", "empower", "streamline",
  "frictionless", "elevate", "adaptive", "effortless", "data-driven",
  "insightful", "proactive", "mission-critical", "visionary", "disruptive",
  "reimagine", "unprecedented", "intuitive", "leading-edge", "synergize",
  "democratize", "accelerate", "state-of-the-art", "dynamic", "immersive",
  "predictive", "transparent", "proprietary", "integrated", "plug-and-play",
  "turnkey", "future-proof", "supercharge", "enduring", "interplay",
  "valuable", "captivate",
];

describe("voice", () => {
  it("contains no em dash or en dash", () => {
    for (const file of files) {
      const text = readFileSync(file, "utf8");
      expect(text, file).not.toMatch(/[\u2013\u2014]/);
    }
  });

  it("contains no banned vocabulary", () => {
    for (const file of files) {
      const text = readFileSync(file, "utf8").toLowerCase();
      for (const word of banned) expect(text, `${file}: ${word}`).not.toContain(word);
    }
  });
});
