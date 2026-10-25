import { mkdirSync } from "node:fs";
import { chromium } from "@playwright/test";

mkdirSync("public", { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1200, height: 630 },
  deviceScaleFactor: 1,
});

await page.setContent(`<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <style>
      * { box-sizing: border-box; }
      body {
        margin: 0;
        width: 1200px;
        height: 630px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 72px;
        background: #0b0b0c;
        color: #f2f0eb;
        font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
      }
      .eyebrow {
        font-size: 22px;
        letter-spacing: 0.16em;
        text-transform: uppercase;
        color: #a3a09a;
      }
      h1 {
        margin: 0;
        max-width: 900px;
        font-size: 82px;
        line-height: 0.98;
        letter-spacing: -0.045em;
        font-weight: 600;
      }
      p {
        margin: 28px 0 0;
        max-width: 760px;
        font-size: 30px;
        line-height: 1.3;
        color: #c9c6bf;
      }
      footer {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        font-size: 24px;
        color: #a3a09a;
      }
      .domain { color: #f2f0eb; }
    </style>
  </head>
  <body>
    <div class="eyebrow">Engida Lishan</div>
    <main>
      <h1>Full-stack engineer building useful software.</h1>
      <p>Product engineering, reliable systems, and interfaces that stay out of the way.</p>
    </main>
    <footer>
      <span class="domain">engida.is-a.dev</span>
      <span>Portfolio</span>
    </footer>
  </body>
</html>`);

await page.screenshot({ path: "public/og.png" });
await browser.close();
