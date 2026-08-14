import { Photo } from '@/components/ui/Photo'
import { Reveal } from '@/components/ui/Reveal'
import { DishRow } from '@/components/ui/DishRow'
import { FeatureDish } from '@/components/ui/FeatureDish'
import { MenuNav } from '@/components/ui/MenuNav'
import { menu, featureDishes, dietaryLegend } from '@/lib/constants'

/** The bar gets its own photographed section further down the page. */
const foodSections = menu.filter((section) => section.id !== 'bar')

export function Menu() {
  return (
    <section id="menu" aria-labelledby="menu-heading" className="bg-bg-deep">
      {/* Spice band, doubles as the section rule */}
      <div className="relative h-32 sm:h-40 overflow-hidden">
        <Photo
          slot="spices"
          alt="Ground spices in open bowls"
          sizes="100vw"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-bg-deep via-bg-deep/40 to-bg-deep" />
      </div>

      <div className="px-6 pb-24">
        <div className="max-w-6xl mx-auto pt-4 pb-12">
          <Reveal>
            <span className="font-space-mono text-accent-turmeric text-xs tracking-[0.3em] uppercase">
              The Menu
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2
              id="menu-heading"
              className="font-playfair text-4xl sm:text-5xl text-text-cream mt-4 max-w-xl"
            >
              Everything we cook, and what it costs.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="font-dm-sans text-text-spice mt-4 max-w-prose">
              No hidden second menu, no market price. Kitchen closes half an hour
              before we do.
            </p>
          </Reveal>
        </div>

        {/* Photographed dishes */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {featureDishes.map((dish, i) => (
            <FeatureDish key={dish.name} dish={dish} priority={i === 0} />
          ))}
        </div>

        <MenuNav
          sections={foodSections.map(({ id, title }) => ({ id, title }))}
        />

        <div className="max-w-6xl mx-auto">
          {foodSections.map((section) => (
            <div
              key={section.id}
              id={`menu-${section.id}`}
              className="pt-16 scroll-mt-20"
            >
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <h3 className="font-playfair text-3xl text-text-cream">
                  {section.title}
                </h3>
                <span className="font-space-mono text-xs tracking-[0.2em] uppercase text-accent-turmeric">
                  {section.service}
                </span>
              </div>

              <p className="font-dm-sans text-sm text-text-muted mt-3 max-w-prose">
                {section.blurb}
              </p>

              {/* Two columns of dishes on desktop, balanced by the browser */}
              <ul className="mt-6 lg:columns-2 lg:gap-12 [&>li]:break-inside-avoid">
                {section.dishes.map((dish) => (
                  <DishRow key={dish.name} dish={dish} />
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="max-w-6xl mx-auto mt-16 pt-8 border-t border-border/60 flex flex-wrap gap-x-6 gap-y-3">
          {Object.entries(dietaryLegend).map(([key, label]) => (
            <span key={key} className="flex items-center gap-2">
              <span className="font-space-mono text-[10px] uppercase tracking-wider text-accent-sage border border-accent-sage/40 rounded-full px-1.5 leading-[1.5]">
                {key}
              </span>
              <span className="font-dm-sans text-xs text-text-muted">{label}</span>
            </span>
          ))}
        </div>

        <p className="max-w-6xl mx-auto font-dm-sans text-sm text-text-muted italic mt-6">
          Dietary requirements: tell us and we will tell you honestly whether we
          can do it. Cross-contamination is a real risk in a kitchen this size.
        </p>
      </div>
    </section>
  )
}
