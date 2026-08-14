import { createHash } from 'node:crypto'
import { readFile, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'

/**
 * images.lock.json is the single source of truth for what photo sits in each
 * slot. Resolve writes the provider metadata; build adds the derivative
 * manifest and the inline LQIP. Both are committed, so a photo can never
 * change underneath a deploy and every credit in CREDITS.md is traceable to a
 * real API response rather than to something a person or model recalled.
 */

export const LOCK_VERSION = 1

/**
 * Slots are matched to lock entries by this fingerprint. Change the query,
 * orientation or aspect and the slot is treated as a new one and re-resolved;
 * change only the alt text or widths and the existing pin is kept.
 * @param {import('../../images.config.mjs').Slot} slot
 */
export function slotFingerprint(slot) {
  return createHash('sha256')
    .update(
      JSON.stringify({
        query: slot.query,
        orientation: slot.orientation ?? null,
        aspect: slot.aspect ?? null,
        minWidth: slot.minWidth ?? null,
      })
    )
    .digest('hex')
    .slice(0, 16)
}

/** @param {string} path */
export async function readLock(path) {
  if (!existsSync(path)) {
    return { version: LOCK_VERSION, provider: null, resolvedAt: null, slots: {} }
  }
  const raw = JSON.parse(await readFile(path, 'utf8'))
  if (raw.version !== LOCK_VERSION) {
    throw new Error(
      `${path} is version ${raw.version}, this tooling expects ${LOCK_VERSION}. ` +
        `Delete the lock and re-run \`pnpm images:resolve\`.`
    )
  }
  return raw
}

/** @param {string} path @param {object} lock */
export async function writeLock(path, lock) {
  await writeFile(path, JSON.stringify(lock, null, 2) + '\n', 'utf8')
}

/**
 * True when the lock has a usable, non-placeholder pin for every slot in the
 * manifest. The deploy workflow uses this to decide whether it needs to call
 * out to a provider at all.
 */
export function lockCoversManifest(lock, slots) {
  return slots.every((slot) => {
    const entry = lock.slots?.[slot.id]
    return (
      entry &&
      entry.fingerprint === slotFingerprint(slot) &&
      entry.downloadUrl &&
      !entry.placeholder
    )
  })
}
