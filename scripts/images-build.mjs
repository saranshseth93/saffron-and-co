#!/usr/bin/env node
/**
 * Phase 2 — turn the pinned photos in images.lock.json into the responsive
 * AVIF/WebP derivatives the site actually serves, then write CREDITS.md.
 *
 * Runs on every build. Because it only ever reads URLs the resolver pinned,
 * two builds of the same commit produce the same bytes.
 *
 *   node scripts/images-build.mjs            # strict: real photos or bust
 *   node scripts/images-build.mjs --offline  # procedural placeholders instead
 *
 * --offline exists so the site can be developed and built with no outbound
 * network. It marks every slot `placeholder: true`, and strict mode refuses to
 * run against placeholders, so a placeholder can never reach production.
 */

import { fileURLToPath } from 'node:url'
import { dirname, resolve as resolvePath, join } from 'node:path'
import { mkdir, rm, writeFile, readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { createHash } from 'node:crypto'
import sharp from 'sharp'
import { readLock, writeLock } from './lib/lockfile.mjs'

const root = resolvePath(dirname(fileURLToPath(import.meta.url)), '..')
const LOCK_PATH = resolvePath(root, 'images.lock.json')
const OUT_DIR = resolvePath(root, 'public/images')
const CREDITS_PATH = resolvePath(root, 'CREDITS.md')
const CACHE_DIR = resolvePath(root, 'node_modules/.cache/images')

const offline = process.argv.includes('--offline')

const { slots, site } = await import(resolvePath(root, 'images.config.mjs'))
const lock = await readLock(LOCK_PATH)

await mkdir(OUT_DIR, { recursive: true })
await mkdir(CACHE_DIR, { recursive: true })

/**
 * Download once, reuse across rebuilds. Keyed by URL hash so a re-pin always
 * misses the cache and a rebuild of the same pin always hits it.
 */
async function fetchOriginal(url) {
  const key = createHash('sha256').update(url).digest('hex').slice(0, 24)
  const cached = join(CACHE_DIR, key)
  if (existsSync(cached)) return readFile(cached)

  const res = await fetch(url, {
    headers: { 'User-Agent': 'pixel-pundit-demo-image-build' },
    redirect: 'follow',
  })
  if (!res.ok) throw new Error(`${res.status} fetching ${url}`)
  const buf = Buffer.from(await res.arrayBuffer())
  await writeFile(cached, buf)
  return buf
}

/**
 * Deterministic stand-in built from the slot's palette hint — a soft two-tone
 * gradient plus grain, at the slot's real aspect ratio so layout, LQIP and
 * CLS behave exactly as they will with the real photo in place.
 */
async function placeholderOriginal(slot) {
  const [from, to] = slot.placeholderColours ?? ['#3A3630', '#14110D']
  const width = 2000
  const height = Math.round(width / (slot.aspect ?? 1.5))
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${from}"/>
      <stop offset="100%" stop-color="${to}"/>
    </linearGradient>
    <filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3"/></filter>
  </defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
  <rect width="100%" height="100%" filter="url(#n)" opacity="0.09"/>
</svg>`
  return sharp(Buffer.from(svg)).png().toBuffer()
}

/** A 20px-wide blurred WebP, inlined as a data URI to cover the load. */
async function makeLqip(input) {
  const buf = await sharp(input)
    .resize(20, null, { fit: 'inside' })
    .blur(1.2)
    .webp({ quality: 45 })
    .toBuffer()
  return `data:image/webp;base64,${buf.toString('base64')}`
}

const problems = []
const built = []

for (const slot of slots) {
  const entry = lock.slots?.[slot.id]

  if (!offline && (!entry || !entry.downloadUrl)) {
    problems.push(
      `${slot.id}: no pin in images.lock.json — run \`pnpm images:resolve\` first`
    )
    continue
  }
  if (!offline && entry.placeholder) {
    problems.push(
      `${slot.id}: pinned to a placeholder — run \`pnpm images:resolve --force --slot ${slot.id}\``
    )
    continue
  }

  let original
  try {
    original = offline
      ? await placeholderOriginal(slot)
      : await fetchOriginal(entry.downloadUrl)
  } catch (err) {
    problems.push(`${slot.id}: ${err.message}`)
    continue
  }

  const slotDir = join(OUT_DIR, slot.id)
  await rm(slotDir, { recursive: true, force: true })
  await mkdir(slotDir, { recursive: true })

  const meta = await sharp(original).metadata()
  const aspect = slot.aspect ?? (meta.width && meta.height ? meta.width / meta.height : 1.5)
  const derivatives = []

  for (const width of slot.widths) {
    const height = Math.round(width / aspect)
    const pipeline = sharp(original)
      .rotate() // honour EXIF orientation before cropping
      .resize(width, height, { fit: 'cover', position: slot.focus ?? 'centre' })

    await pipeline
      .clone()
      .avif({ quality: 52, effort: 5 })
      .toFile(join(slotDir, `${width}.avif`))
    await pipeline
      .clone()
      .webp({ quality: 76 })
      .toFile(join(slotDir, `${width}.webp`))

    derivatives.push({ width, height })
  }

  const lqip = await makeLqip(original)

  lock.slots ??= {}
  lock.slots[slot.id] = {
    ...(entry ?? {}),
    ...(offline
      ? {
          provider: 'placeholder',
          id: slot.id,
          creator: 'Generated placeholder',
          creatorUrl: '',
          licence: 'n/a',
          licenceUrl: '',
          sourcePage: '',
          downloadUrl: '',
          placeholder: true,
        }
      : {}),
    aspect,
    derivatives,
    lqip,
  }

  built.push(slot.id)
}

if (problems.length) {
  console.error(`Image build failed for ${problems.length} slot(s):`)
  for (const p of problems) console.error(`  - ${p}`)
  process.exit(1)
}

await writeLock(LOCK_PATH, lock)

// ---------------------------------------------------------------- credits ---

const rows = slots.map((slot) => {
  const e = lock.slots[slot.id]
  const creator = e.creatorUrl ? `[${e.creator}](${e.creatorUrl})` : e.creator
  const source = e.sourcePage ? `[${e.provider}](${e.sourcePage})` : e.provider
  const licence = e.licenceUrl ? `[${e.licence}](${e.licenceUrl})` : e.licence
  return `| \`${slot.id}\` | ${slot.usage ?? '—'} | ${creator} | ${source} | ${licence} |`
})

const credits = `# Image credits

${site?.name ?? 'This site'} is a **fictional business built as a portfolio spec piece**.
Every photograph below is royalty-free and was pinned automatically by
\`scripts/images-resolve.mjs\` from a live provider API response — the
photographer, source page and licence recorded here come straight from that
response, not from anyone's recollection.

The exact photo used in each slot is pinned in [\`images.lock.json\`](./images.lock.json).
Re-running the resolver will not silently swap a photo; a pin only changes when
its slot's query changes or someone passes \`--force\`.

| Slot | Used for | Photographer | Source | Licence |
|---|---|---|---|---|
${rows.join('\n')}

<sub>Generated by \`scripts/images-build.mjs\`. Do not edit by hand.</sub>
`

await writeFile(CREDITS_PATH, credits, 'utf8')

console.log(
  `Built ${built.length} image slot(s)${offline ? ' as OFFLINE PLACEHOLDERS' : ''}, ` +
    `wrote CREDITS.md`
)
