# Engida Lishan portfolio

[![deploy](https://github.com/engida32/engida/actions/workflows/deploy.yml/badge.svg)](https://github.com/engida32/engida/actions/workflows/deploy.yml)
![License: MIT](https://img.shields.io/badge/license-MIT-blue)

Static portfolio and case studies for Engida Lishan: https://engida.devs.et/

Built with Next.js App Router, Tailwind CSS, and shadcn/ui. The static export is mirrored to `engida.devs.et` over WebDAV, with GitHub Pages kept as a backup.

## What is in here

- `app/page.tsx` — home: featured case studies, more work, and the CV download
- `app/about/page.tsx` — how I work, experience, and provenance
- `content/` — every public claim lives in typed modules (`case-studies.ts`, `clients.ts`, `projects.ts`, `platforms.ts`, `experience.ts`, `profile.ts`, `about.ts`) composed by `work.ts`
- `PROVENANCE.md` — the source for each claim in `content/`; a claim without a row does not ship
- `components/site/` — page components; `lib/` — shared helpers
- `scripts/` — the WebDAV mirror (`deploy-webdav.mjs`), the upload planner (`upload-plan.mjs`), post-deploy checks (`verify-deploy.mjs`), and a local static server (`serve-out.mjs`)
- `deploy/webdav/.htaccess` — security headers, caching, and the canonical redirect, shipped with the export
- `tests/` — Vitest unit and build tests, plus 10 Playwright specs covering accessibility, responsive layout, links, previews, the shell, and the not-found page

## Local development

```bash
npm install
npm run dev
```

`npm run preview` serves an existing `out/` export locally when you want to inspect the real artifact instead of the dev server.

## Checks

```bash
npm run check
```

`check` builds the production export once, runs the unit and build tests against it, then runs Playwright against the same `out/` directory.

## Deployment

Pull requests run the full check suite without deploying. Pushes to `main` run the same suite, deploy GitHub Pages first, mirror the same tested artifact to `engida.devs.et` over WebDAV, upload `.htaccess`, and verify both sites.
