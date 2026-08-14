import lockJson from '@/images.lock.json'

/**
 * Typed access to the photos pinned in images.lock.json.
 *
 * The lock is written by scripts/images-resolve.mjs (which photo) and
 * scripts/images-build.mjs (what sizes exist, plus the inline LQIP). Because
 * every page is statically generated, a missing or half-built slot fails the
 * production build rather than shipping a broken <img>.
 */

export interface ImageDerivative {
  width: number
  height: number
}

export interface ImageSlot {
  provider: string
  id: string
  creator: string
  creatorUrl: string
  licence: string
  licenceUrl: string
  sourcePage: string
  alt: string
  aspect: number
  lqip: string
  derivatives: ImageDerivative[]
  placeholder?: boolean
}

interface ImageLock {
  version: number
  provider: string | null
  resolvedAt: string | null
  slots: Record<string, ImageSlot>
}

const lock = lockJson as unknown as ImageLock

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

export function getImage(slotId: string): ImageSlot {
  const slot = lock.slots?.[slotId]
  if (!slot?.derivatives?.length) {
    throw new Error(
      `Image slot "${slotId}" is not built. Run \`pnpm images:build\` ` +
        `(or \`pnpm images:build --offline\` with no network).`
    )
  }
  return slot
}

export function imageSrc(slotId: string, width: number, format: 'avif' | 'webp') {
  return `${basePath}/images/${slotId}/${width}.${format}`
}

export function srcSet(slot: ImageSlot, slotId: string, format: 'avif' | 'webp') {
  return slot.derivatives
    .map((d) => `${imageSrc(slotId, d.width, format)} ${d.width}w`)
    .join(', ')
}

/** True when any slot is still a generated stand-in — used by the dev banner. */
export const hasPlaceholderImages = Object.values(lock.slots ?? {}).some(
  (s) => s.placeholder
)

export const imageProvider = lock.provider
