import { Photo } from '@/components/ui/Photo'
import type { MenuDish } from '@/lib/constants'

/**
 * A photographed dish, pulled out of the list so the menu opens with food
 * rather than with a wall of type.
 */
export function FeatureDish({
  dish,
  priority = false,
}: {
  dish: MenuDish
  priority?: boolean
}) {
  if (!dish.slot) return null

  return (
    <article className="group relative rounded-xl overflow-hidden bg-bg-warm">
      {/* Top gradient strip in the section accent */}
      <div className="absolute top-0 inset-x-0 h-[3px] z-20 bg-gradient-to-r from-accent-turmeric via-accent-chilli to-accent-turmeric" />

      <div className="overflow-hidden">
        <Photo
          slot={dish.slot}
          alt={`${dish.name} — ${dish.description}`}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          priority={priority}
          className="w-full h-auto block transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.04]"
        />
      </div>

      <div className="p-5">
        <div className="flex items-baseline gap-3">
          <h3 className="font-playfair text-xl text-text-cream">{dish.name}</h3>
          <span
            className="flex-1 border-b border-dotted border-text-muted/35 translate-y-[-0.2em]"
            aria-hidden="true"
          />
          <span className="font-space-mono text-sm text-accent-turmeric tabular-nums">
            ${dish.price}
          </span>
        </div>

        <p className="font-dm-sans text-sm text-text-spice leading-relaxed mt-2">
          {dish.description}
        </p>

        {dish.note ? (
          <p className="font-space-mono text-[11px] uppercase tracking-[0.2em] text-accent-chilli mt-3">
            {dish.note}
          </p>
        ) : null}
      </div>
    </article>
  )
}
