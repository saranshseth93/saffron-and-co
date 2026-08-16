import { Photo } from '@/components/ui/Photo'
import { Reveal } from '@/components/ui/Reveal'
import { DishRow } from '@/components/ui/DishRow'
import { menu } from '@/lib/constants'

const barSection = menu.find((section) => section.id === 'bar')

export function TheBar() {
  if (!barSection) return null

  return (
    <section
      id="bar"
      aria-labelledby="bar-heading"
      className="relative bg-bg-rich py-24 px-6 overflow-hidden"
    >
      {/* Bar photograph, dropped back behind the type */}
      <div className="absolute inset-0" aria-hidden="true">
        <Photo
          slot="bar"
          alt=""
          sizes="100vw"
          className="w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-bg-rich via-bg-rich/85 to-bg-rich" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        <Reveal>
          <span className="font-space-mono text-accent-turmeric text-xs tracking-[0.3em] uppercase">
            After Dark
          </span>
        </Reveal>
        <Reveal delay={0.1}>
          <h2
            id="bar-heading"
            className="font-playfair text-4xl sm:text-5xl text-text-cream mt-4"
          >
            {barSection.service}.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="font-dm-sans text-text-spice mt-4 max-w-prose">
            {barSection.blurb}
          </p>
        </Reveal>

        <ul className="mt-10 lg:columns-2 lg:gap-12 [&>li]:break-inside-avoid">
          {barSection.dishes.map((dish) => (
            <DishRow key={dish.name} dish={dish} headingLevel={3} />
          ))}
        </ul>

        <p className="font-dm-sans text-sm text-text-muted italic mt-8">
          Walk-ins only after 5pm. We stop pouring when the kitchen has finished
          cleaning up, which is later than it sounds.
        </p>
      </div>
    </section>
  )
}
