import { getImage, srcSet, imageSrc } from '@/lib/images'

interface PhotoProps {
  /** Slot id from images.config.mjs. */
  slot: string
  /** Describe what is in the photo. Required — decorative photos should be CSS. */
  alt: string
  /** Matches the CSS box the photo fills, e.g. "(min-width: 1024px) 50vw, 100vw". */
  sizes: string
  className?: string
  /** Set on the LCP image only. Everything else stays lazy. */
  priority?: boolean
}

/**
 * Serves the pre-generated AVIF/WebP derivatives from public/images.
 *
 * This is deliberately not next/image: the site is a static export with
 * `images.unoptimized`, so next/image would emit a plain <img> pointing at one
 * full-size original. Pre-generating the sizes at build time and listing them
 * here gets real responsive art direction and modern formats out of a static
 * host, with width/height on the <img> so nothing shifts while it loads.
 */
export function Photo({ slot, alt, sizes, className = '', priority = false }: PhotoProps) {
  const image = getImage(slot)
  const largest = image.derivatives[image.derivatives.length - 1]

  return (
    <picture>
      <source type="image/avif" srcSet={srcSet(image, slot, 'avif')} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet(image, slot, 'webp')} sizes={sizes} />
      <img
        src={imageSrc(slot, largest.width, 'webp')}
        alt={alt}
        width={largest.width}
        height={largest.height}
        sizes={sizes}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding={priority ? 'sync' : 'async'}
        className={className}
        style={{
          // The LQIP sits behind the image so there is colour in the box
          // immediately, rather than a flash of empty background.
          backgroundImage: `url("${image.lqip}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
    </picture>
  )
}
