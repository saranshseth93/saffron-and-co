#!/usr/bin/env node
/**
 * Deploy gate. Fails if the site is about to ship with anything other than a
 * real, credited, royalty-free photo in every slot.
 *
 * `images:build --offline` exists so the site can be developed with no
 * outbound network, and this is the check that stops one of those generated
 * stand-ins from quietly reaching production.
 */

import { fileURLToPath } from 'node:url'
import { dirname, resolve as resolvePath, join } from 'node:path'
import { existsSync } from 'node:fs'
import { readLock } from './lib/lockfile.mjs'

const root = resolvePath(dirname(fileURLToPath(import.meta.url)), '..')
const { slots } = await import(resolvePath(root, 'images.config.mjs'))
const lock = await readLock(resolvePath(root, 'images.lock.json'))

const problems = []

for (const slot of slots) {
  const entry = lock.slots?.[slot.id]

  if (!entry) {
    problems.push(`${slot.id}: missing from images.lock.json`)
    continue
  }
  if (entry.placeholder) {
    problems.push(`${slot.id}: still a generated placeholder, not a real photo`)
    continue
  }
  for (const field of ['creator', 'licence', 'sourcePage']) {
    if (!entry[field]) {
      problems.push(`${slot.id}: no ${field} recorded — cannot credit it`)
    }
  }
  if (!entry.derivatives?.length) {
    problems.push(`${slot.id}: no derivatives built`)
    continue
  }
  for (const d of entry.derivatives) {
    for (const format of ['avif', 'webp']) {
      const file = join(root, 'public/images', slot.id, `${d.width}.${format}`)
      if (!existsSync(file)) problems.push(`${slot.id}: missing ${d.width}.${format}`)
    }
  }
}

if (problems.length) {
  console.error(`Image verification failed (${problems.length}):`)
  for (const p of problems) console.error(`  - ${p}`)
  process.exit(1)
}

console.log(`All ${slots.length} image slot(s) are real, built and credited.`)
