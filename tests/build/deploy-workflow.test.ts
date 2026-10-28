import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const workflow = readFileSync(".github/workflows/deploy.yml", "utf8");
const packageJson = JSON.parse(readFileSync("package.json", "utf8")) as {
  scripts: Record<string, string>;
};

function indexOf(text: string) {
  const index = workflow.indexOf(text);
  expect(index, text).toBeGreaterThanOrEqual(0);
  return index;
}

describe("deployment pipeline", () => {
  it("tests production output once and reuses it", () => {
    expect(packageJson.scripts.build).toBe("npm run build:prod");
    expect(packageJson.scripts["build:test"]).toBeUndefined();
    expect(packageJson.scripts["build:staging"]).toBeUndefined();
    expect(packageJson.scripts["test:build"]).toBe(
      "vitest run --config vitest.build.config.ts",
    );
    expect(packageJson.scripts.check).toBe(
      "npm run lint && npm run typecheck && npm run test && npm run build:prod && npm run test:build && npm run test:e2e",
    );
    expect(workflow).not.toContain("npm run build:test");
    expect(indexOf("npm run build:prod")).toBeLessThan(indexOf("npm run test:build"));
    expect(indexOf("npm run test:build")).toBeLessThan(indexOf("npm run test:e2e"));
  });

  it("runs checks on pull requests and only publishes from non-PR runs", () => {
    expect(workflow).toContain("pull_request:");
    expect(workflow).toContain("if: github.event_name != 'pull_request'");
    expect(workflow).toContain("needs: test");
    expect(workflow).toContain("actions/download-artifact@");
    expect(workflow).toContain("name: portfolio-site");
  });

  it("checks out repository files used by the deploy job", () => {
    const deployJob = workflow.slice(indexOf("\n  deploy:"));
    expect(deployJob).toContain("actions/checkout@");
  });

  it("deploys Pages before WebDAV and verifies the public domains", () => {
    expect(indexOf("actions/deploy-pages@")).toBeLessThan(indexOf("node scripts/deploy-webdav.mjs"));
    expect(indexOf("node scripts/deploy-webdav.mjs")).toBeLessThan(
      indexOf("deploy/webdav/.htaccess"),
    );
    expect(indexOf("deploy/webdav/.htaccess")).toBeLessThan(
      indexOf('node scripts/verify-deploy.mjs "https://engida.devs.et"'),
    );
    expect(workflow).toContain("Verify GitHub Pages backup");
  });
});
