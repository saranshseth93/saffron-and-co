# Saffron & Co

A **fictional** Indian-fusion café in Fitzroy, Melbourne, designed and built by
[Pixel Pundit](https://pixelpundit.dev) as a portfolio spec piece.

Saffron & Co is not a real business. The menu, prices, people, phone number and
address are illustrative. There are no real reviews, awards, press mentions or
customer numbers anywhere on the site, and the contact forms are inert — they
demonstrate the interaction and then say so.

**Live:** https://saranshseth93.github.io/saffron-and-co/

## Stack

Next.js 16 static export, Tailwind CSS 4, Framer Motion, GSAP ScrollTrigger,
Lenis smooth scroll. Deployed to GitHub Pages by
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

## Photography

Every photo is royalty-free and credited in [CREDITS.md](./CREDITS.md).

Images are not committed. They are resolved from a provider API, pinned in
`images.lock.json`, then downloaded and turned into responsive AVIF/WebP
derivatives at build time.

| Command | What it does |
|---|---|
| `pnpm images:resolve` | Pins a real photo to each slot in `images.config.mjs` and records its photographer, licence and source page. Only fills slots that are missing or whose query changed. |
| `pnpm images:resolve --force` | Re-pins every slot. |
| `pnpm images:build` | Downloads the pinned photos, generates the derivatives, writes `CREDITS.md`. |
| `pnpm images:build --offline` | Generates procedural stand-ins instead, so the site builds with no network. |
| `pnpm images:verify` | Deploy gate: fails if any slot is a stand-in, unbuilt or uncredited. |

The resolver uses [Pexels](https://www.pexels.com/license/) when a
`PEXELS_API_KEY` repository secret is set, and falls back to
[Openverse](https://openverse.org) (CC0 and public-domain only, no key needed)
when it is not.

Because the credits are written from the API response rather than typed by
hand, every attribution in `CREDITS.md` is traceable to the photo actually
being served.

### Adding or changing a photo

Edit the slot in `images.config.mjs` and re-run the resolver. To pin a specific
photo by hand, edit its entry in `images.lock.json` and add `"manual": true` —
the resolver will then leave it alone.

## Local development

```bash
pnpm install
pnpm images:build --offline   # or `pnpm images:build` with a network
pnpm dev
```

| Command | |
|---|---|
| `pnpm dev` | Dev server |
| `pnpm build` | Static export to `out/` |
| `pnpm lint` | ESLint |
| `pnpm typecheck` | `tsc --noEmit` |
