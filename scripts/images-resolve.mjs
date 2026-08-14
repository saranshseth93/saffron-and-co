#!/usr/bin/env node
/**
 * Phase 1 — pin a real photo to every slot in images.config.mjs.
 *
 * Queries a royalty-free provider and records the winning photo's download URL,
 * photographer, licence and source page in images.lock.json. Nothing here is
 * invented: every field written to the lock came back from a live API response,
 * which is what makes CREDITS.md trustworthy.
 *
 * Run this from CI (or anywhere with outbound internet), commit the lock, and
 * every later build is byte-for-byte reproducible.
 *
 *   node scripts/images-resolve.mjs             # fill missing/stale slots only
 *   node scripts/images-resolve.mjs --force     # re-pin every slot
 *   node scripts/images-resolve.mjs --slot hero # re-pin one slot
 */

import { fileURLToPath } from 'node:url'
import { dirname, resolve as resolvePath } from 'node:path'
import { selectProvider } from './lib/providers.mjs'
import {
  LOCK_VERSION,
  readLock,
  writeLock,
  slotFingerprint,
} from './lib/lockfile.mjs'

const root = resolvePath(dirname(fileURLToPath(import.meta.url)), '..')
const LOCK_PATH = resolvePath(root, 'images.lock.json')

const args = process.argv.slice(2)
const force = args.includes('--force')
const onlySlot = args.includes('--slot')
  ? args[args.indexOf('--slot') + 1]
  : null

const { slots } = await import(resolvePath(root, 'images.config.mjs'))

/** Aspect ratios within this much of the target are close enough to crop. */
const ASPECT_TOLERANCE = 0.45

/**
 * Deterministic pick: walk the provider's relevance order and take the first
 * candidate that is big enough, roughly the right shape, and not already used
 * by another slot on this site.
 */
function pick(candidates, slot, taken) {
  const minWidth = slot.minWidth ?? 1600
  const targetAspect = slot.aspect ?? null

  return (
    candidates.find((c) => {
      if (taken.has(`${c.provider}:${c.id}`)) return false
      if (c.width && c.width < minWidth) return false
      if (targetAspect && c.width && c.height) {
        const aspect = c.width / c.height
        if (Math.abs(aspect - targetAspect) > ASPECT_TOLERANCE) return false
      }
      return true
    }) ?? null
  )
}

const pexelsKey = process.env.PEXELS_API_KEY?.trim() || undefined
const provider = selectProvider(pexelsKey)

console.log(
  `Resolving ${slots.length} image slot(s) via ${provider.name}` +
    (provider.name === 'openverse'
      ? ' (no PEXELS_API_KEY set — using the keyless CC0 provider)'
      : '')
)

const lock = await readLock(LOCK_PATH)
lock.version = LOCK_VERSION
lock.slots ??= {}

const taken = new Set()
for (const [id, entry] of Object.entries(lock.slots)) {
  if (onlySlot && id === onlySlot) continue
  if (entry?.provider && entry?.id) taken.add(`${entry.provider}:${entry.id}`)
}

let resolved = 0
let kept = 0
const failures = []

for (const slot of slots) {
  const fingerprint = slotFingerprint(slot)
  const existing = lock.slots[slot.id]

  if (onlySlot && slot.id !== onlySlot) continue

  // A manual pin is a deliberate human choice — never overwrite it.
  if (existing?.manual && !force) {
    kept += 1
    continue
  }

  const isFresh =
    existing &&
    existing.fingerprint === fingerprint &&
    existing.downloadUrl &&
    !existing.placeholder

  if (isFresh && !force) {
    kept += 1
    continue
  }

  let candidates = []
  try {
    candidates = await provider.search({
      query: slot.query,
      orientation: slot.orientation,
    })
  } catch (err) {
    failures.push(`${slot.id}: search failed — ${err.message}`)
    continue
  }

  const chosen = pick(candidates, slot, taken)
  if (!chosen) {
    failures.push(
      `${slot.id}: no candidate for "${slot.query}" met minWidth ` +
        `${slot.minWidth ?? 1600}px (${candidates.length} returned)`
    )
    continue
  }

  taken.add(`${chosen.provider}:${chosen.id}`)
  lock.slots[slot.id] = {
    ...chosen,
    fingerprint,
    query: slot.query,
    // Derivatives and LQIP are filled in by images-build.mjs.
    derivatives: null,
    lqip: null,
  }
  resolved += 1
  console.log(`  ${slot.id} → ${chosen.provider}:${chosen.id} by ${chosen.creator}`)
}

lock.provider = provider.name
lock.resolvedAt = new Date().toISOString()

await writeLock(LOCK_PATH, lock)

console.log(`\nResolved ${resolved}, kept ${kept} existing pin(s).`)

if (failures.length) {
  console.error(`\n${failures.length} slot(s) could not be resolved:`)
  for (const f of failures) console.error(`  - ${f}`)
  process.exit(1)
}
