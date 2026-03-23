'use client'

import { Reveal } from '@/components/ui/Reveal'
import { MenuCard } from '@/components/ui/MenuCard'
import { menuItems } from '@/lib/constants'

export function MenuHighlights() {
  return (
    <section id="menu" aria-label="Menu highlights" className="bg-bg-deep pt-[120px] pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <span className="font-space-mono text-accent-turmeric text-xs tracking-[0.3em] uppercase">
            THE MENU
          </span>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="font-playfair text-4xl text-text-cream mt-4 mb-12">
            What we&apos;re known for.
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 menu-bento">
          {menuItems.map((item, index) => (
            <div
              key={item.name}
              style={{ gridArea: item.gridArea }}
              className={item.gridArea === 'biryani' ? 'sm:col-span-2 lg:col-span-1' : ''}
            >
              <MenuCard {...item} index={index} />
            </div>
          ))}
        </div>

        <p className="text-text-muted italic text-sm mt-8 text-center">
          Full menu available in-store. We change it when we feel like it.
        </p>
      </div>
    </section>
  )
}
