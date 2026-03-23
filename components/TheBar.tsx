'use client'

import { drinkItems } from '@/lib/constants'
import { MenuCard } from '@/components/ui/MenuCard'

export function TheBar() {
  return (
    <section
      id="bar"
      aria-label="The Bar"
      className="pt-[120px] pb-20 px-6"
      style={{ background: 'radial-gradient(ellipse at center, rgba(232,168,56,0.04) 0%, transparent 70%), #1A1510' }}
    >
      <div className="max-w-6xl mx-auto">
        <span className="font-space-mono text-accent-turmeric text-xs tracking-[0.3em] uppercase">AFTER DARK</span>
        <h2 className="font-playfair text-4xl text-text-cream mt-4">Fri &amp; Sat from 5pm.</h2>
        <p className="font-dm-sans text-text-spice mt-3 mb-12">The espresso machine sleeps. The cocktail shaker wakes up.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {drinkItems.map((item, index) => (
            <MenuCard key={item.name} {...item} size="sm" index={index} />
          ))}
        </div>
        <p className="text-text-muted italic text-sm mt-8 text-center">Plus natural wines, local beers, and a lassi for the designated driver.</p>
      </div>
    </section>
  )
}
