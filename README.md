# Plyobox Performance

Plyobox Performance is a three-app preview: a Next.js public site, a Vite staff dashboard, and an Expo mobile app.

## Run

```bash
cd Web && npm ci && npm run dev
cd AdminDashboard && npm ci && npm run dev
cd Plyobox && npm ci && npm run start
```

## Shared contract

See `docs/CONTRACT.md`. Edit sources in `shared/`, then run:

```bash
node shared/sync.mjs
node shared/sync.mjs --check
node shared/check.mjs
```
