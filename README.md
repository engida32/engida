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

## Deployment

Pushes to `main` deploy to GitHub Pages. `DEPLOY_TARGET` selects the staging or production build.
