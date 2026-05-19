# TrouPos

Premium cinematic digital wedding invitations for the South African market.

## Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- Framer Motion
- Vercel

## Getting started

```bash
cp .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Copy [`.env.example`](.env.example) to `.env.local` for local development. On Vercel, set the same keys in **Project → Settings → Environment Variables**.

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_BASE_URL` | Production | Canonical URL, e.g. `https://troupos.vercel.app` |
| `NEXT_PUBLIC_SITE_NAME` | No | Brand name in metadata (default: `Trou`) |
| `NEXT_PUBLIC_ALLOW_INVITE_INDEXING` | No | `true` to allow Google to index `/invite/*` (default: private) |

Vercel provides `VERCEL_URL` automatically; `getSiteUrl()` uses it when `NEXT_PUBLIC_BASE_URL` is unset.

## Routes

| Route | Description |
|-------|-------------|
| `/` | Landing page |
| `/templates` | Template gallery |
| `/demo/[templateId]` | Template preview (`modern-cinematic`, `classic-elegance`, `luxury-floral-gold`) |
| `/invite/[slug]` | Couple invitation (`amara-thabo`, `amara-thabo-classic`, `amara-thabo-floral`) |

## Scripts

```bash
npm run dev        # development
npm run build      # production build (run before deploy)
npm run start      # production server
npm run lint       # ESLint
npm run typecheck  # TypeScript
```

## Deploy to Vercel

### Option A — GitHub (recommended)

1. Push this repo to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and **Import** the repository.
3. Framework preset: **Next.js** (auto-detected).
4. Add environment variables:
   - `NEXT_PUBLIC_BASE_URL` → your production URL (e.g. `https://your-app.vercel.app` or custom domain)
   - Optional: `NEXT_PUBLIC_SITE_NAME`, `NEXT_PUBLIC_ALLOW_INVITE_INDEXING`
5. Click **Deploy**.

Every push to `main` triggers a production deployment; other branches get preview URLs.

### Option B — Vercel CLI

```bash
npm i -g vercel
vercel login
vercel link
vercel env pull .env.local   # optional: sync env locally
vercel --prod
```

### Custom domain

1. Vercel project → **Settings → Domains** → add your domain.
2. Update `NEXT_PUBLIC_BASE_URL` to `https://yourdomain.co.za`.
3. Redeploy so OG tags, sitemap, and calendar links use the new URL.

### Production checklist

- [ ] `npm run build` passes locally
- [ ] `NEXT_PUBLIC_BASE_URL` set to production domain
- [ ] Test `/invite/amara-thabo-floral` in WhatsApp in-app browser
- [ ] Confirm `/sitemap.xml` and `/robots.txt` load
- [ ] Hero/gallery images load (Unsplash allowed in `next.config.ts`)

### Region

[`vercel.json`](vercel.json) sets `cpt1` (Cape Town) for lower latency in South Africa. Change `regions` if you prefer `iad1` or multi-region.

## Architecture

- **Templates** (`src/templates/`) — composition only
- **Components** (`src/components/`) — reusable invitation UI
- **Config** (`src/config/env.ts`) — environment and site URL
- **SEO** (`src/lib/seo/`, `src/app/robots.ts`, `src/app/sitemap.ts`)
