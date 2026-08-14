import { Photo } from '@/components/ui/Photo'
import { Reveal } from '@/components/ui/Reveal'

/**
 * Replaces the old "Instagram" strip.
 *
 * That strip linked to an Instagram account that does not exist, for a café
 * that does not exist. This is the same visual beat without implying a social
 * following or a customer base that was never there.
 */
const tiles = [
  { slot: 'gallery-1', alt: 'A latte on a café table' },
  { slot: 'gallery-2', alt: 'A plate of Indian snacks' },
  { slot: 'gallery-3', alt: 'Fresh coriander and cooking ingredients' },
  { slot: 'gallery-4', alt: 'A slice of cake on a plate' },
]

export function Gallery() {
  return (
    <section id="gallery" aria-labelledby="gallery-heading" className="bg-bg-rich py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="flex flex-wrap items-baseline justify-between gap-4 mb-8">
            <h2
              id="gallery-heading"
              className="font-space-mono text-accent-turmeric text-xs tracking-[0.3em] uppercase"
            >
              The Room
            </h2>
            <p className="font-dm-sans text-xs text-text-muted">
              Stock photography, credited in{' '}
              <a
                href="https://github.com/saranshseth93/saffron-and-co/blob/master/CREDITS.md"
                className="underline underline-offset-4 decoration-text-muted/50 hover:text-text-cream transition-colors"
              >
                CREDITS.md
              </a>
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {tiles.map((tile) => (
            <div key={tile.slot} className="rounded-sm overflow-hidden bg-bg-warm">
              <Photo
                slot={tile.slot}
                alt={tile.alt}
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="w-full h-auto block aspect-square object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
