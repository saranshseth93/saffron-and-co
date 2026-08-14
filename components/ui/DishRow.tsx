import type { MenuDish } from '@/lib/constants'

/**
 * One line of the menu: name, leader dots, price, then the description.
 *
 * Deliberately a server component with no motion. A menu is thirty-odd rows,
 * and animating each one individually is how a page ends up janky on a phone.
 */
export function DishRow({ dish }: { dish: MenuDish }) {
  return (
    // Every row keeps its rule: in a two-column list, `last:` would strip the
    // border from one column's final row and not the other's.
    <li className="group py-4 border-b border-border/60">
      <div className="flex items-baseline gap-3">
        <h4 className="font-playfair text-lg text-text-cream leading-snug">
          {dish.name}
        </h4>

        {dish.dietary?.length ? (
          <span className="flex gap-1 shrink-0" aria-hidden="true">
            {dish.dietary.map((d) => (
              <span
                key={d}
                className="font-space-mono text-[10px] uppercase tracking-wider text-accent-sage border border-accent-sage/40 rounded-full px-1.5 leading-[1.5]"
              >
                {d}
              </span>
            ))}
          </span>
        ) : null}

        <span
          className="flex-1 border-b border-dotted border-text-muted/35 translate-y-[-0.2em] min-w-6"
          aria-hidden="true"
        />

        <span className="font-space-mono text-sm text-accent-turmeric shrink-0 tabular-nums">
          {dish.altPrice ? `$${dish.price} / $${dish.altPrice}` : `$${dish.price}`}
        </span>
      </div>

      <p className="font-dm-sans text-sm text-text-spice leading-relaxed mt-1.5 max-w-prose">
        {dish.description}
      </p>

      {dish.note ? (
        <p className="font-space-mono text-[11px] uppercase tracking-[0.2em] text-accent-chilli mt-2">
          {dish.note}
        </p>
      ) : null}

      {dish.dietary?.length ? (
        <span className="sr-only">
          {dish.dietary
            .map((d) => ({ v: 'Vegetarian', vg: 'Vegan', gf: 'Gluten free', n: 'Contains nuts' })[d])
            .join(', ')}
        </span>
      ) : null}
    </li>
  )
}
