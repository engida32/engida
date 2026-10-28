# Engida Lishan portfolio

Static portfolio and case studies for Engida Lishan: https://engida.devs.et/

Built with Next.js App Router, Tailwind CSS, and shadcn/ui. The static export is mirrored to `engida.devs.et` over WebDAV, with GitHub Pages kept as a backup.

## Local development

```bash
npm install
npm run dev
```

## Checks

```bash
npm run check
```

`check` builds the production export once, runs the unit and build tests against it, then runs Playwright against the same `out/` directory.

## Deployment

Pull requests run the full check suite without deploying. Pushes to `main` run the same suite, deploy GitHub Pages first, mirror the same tested artifact to `engida.devs.et` over WebDAV, upload `.htaccess`, and verify both sites.
