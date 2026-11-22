# Plyobox Public Website

Next.js public preview for Plyobox Performance Gym.

- `app/` — Next.js routes and layout
- `components/` — site sections and reusable UI
- `data/site.ts` — editable gym content
- `styles/` — authored styles and design tokens
- `lib/shared/` — generated shared contract copy

Edit gym content in `data/site.ts` and unresolved values in `docs/CONTENT_TODO.md`.

```bash
npm ci
npm run dev
npm run build
npm run lint
```

Design tokens come from `styles/tokens.css`, checked against `shared/tokens.json`.
