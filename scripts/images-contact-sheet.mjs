#!/usr/bin/env node
/**
 * Builds a single contact sheet of every resolved photo.
 *
 * The sheet is committed (unlike the derivatives, which are gitignored) so the
 * photos a build actually chose can be reviewed in the repo — including from
 * environments that cannot reach the photo hosts themselves.
 */

import { fileURLToPath } from 'node:url'
import { dirname, resolve as resolvePath, join } from 'node:path'
import { mkdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import sharp from 'sharp'
import { readLock } from './lib/lockfile.mjs'

const root = resolvePath(dirname(fileURLToPath(import.meta.url)), '..')
const { slots } = await import(resolvePath(root, 'images.config.mjs'))
const lock = await readLock(resolvePath(root, 'images.lock.json'))

const CELL_W = 320
const CELL_H = 240
const COLS = 4
const LABEL_H = 34

const rows = Math.ceil(slots.length / COLS)
const width = COLS * CELL_W
const height = rows * (CELL_H + LABEL_H)

const composites = []

for (const [i, slot] of slots.entries()) {
  const entry = lock.slots?.[slot.id]
  const col = i % COLS
  const row = Math.floor(i / COLS)
  const x = col * CELL_W
  const y = row * (CELL_H + LABEL_H)

  // Use the smallest built derivative — enough to see what the photo is of.
  const smallest = entry?.derivatives?.[0]
  const file = smallest
    ? join(root, 'public/images', slot.id, `${smallest.width}.webp`)
    : null

  if (file && existsSync(file)) {
    composites.push({
      input: await sharp(file)
        .resize(CELL_W, CELL_H, { fit: 'cover' })
        .toBuffer(),
      left: x,
      top: y,
    })
  }

  const caption = `${slot.id} — ${entry?.creator ?? 'unresolved'} (${entry?.provider ?? '?'})`
  const label = `<svg xmlns="http://www.w3.org/2000/svg" width="${CELL_W}" height="${LABEL_H}">
    <rect width="100%" height="100%" fill="#111"/>
    <text x="8" y="14" font-family="monospace" font-size="11" fill="#eee">${escapeXml(slot.id)}</text>
    <text x="8" y="27" font-family="monospace" font-size="9" fill="#999">${escapeXml(caption.slice(slot.id.length + 3, 60))}</text>
  </svg>`

  composites.push({
    input: Buffer.from(label),
    left: x,
    top: y + CELL_H,
  })
}

function escapeXml(s) {
  return String(s).replace(/[<>&'"]/g, (c) =>
    ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[c]
  )
}

await mkdir(join(root, 'docs'), { recursive: true })

await sharp({
  create: {
    width,
    height,
    channels: 3,
    background: { r: 17, g: 17, b: 17 },
  },
})
  .composite(composites)
  .webp({ quality: 78 })
  .toFile(join(root, 'docs/contact-sheet.webp'))

console.log(`Contact sheet: docs/contact-sheet.webp (${width}x${height})`)
