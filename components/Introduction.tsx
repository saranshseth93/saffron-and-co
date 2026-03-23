'use client'

import { Reveal } from '@/components/ui/Reveal'
import { introParagraphs } from '@/lib/constants'

export function Introduction() {
  return (
    <section id="intro" aria-label="Introduction" className="bg-bg-deep pt-[120px] pb-20 px-6">
      <div className="max-w-2xl mx-auto">
        <Reveal>
          <span className="font-space-mono text-accent-turmeric text-xs tracking-[0.3em] uppercase">
            EST. 2024 · FITZROY
          </span>
        </Reveal>

        {introParagraphs.map((paragraph, index) => (
          <Reveal key={index} delay={index * 0.15}>
            <p className="font-dm-sans text-lg text-text-cream leading-relaxed mt-8 first:mt-6">
              {paragraph}
            </p>
          </Reveal>
        ))}

        <Reveal delay={introParagraphs.length * 0.15}>
          <p className="font-space-mono text-text-muted italic text-sm mt-6">
            Spices from Kerala. Coffee from Brunswick.
          </p>
        </Reveal>

        <div className="h-px w-24 bg-accent-turmeric mx-auto mt-16" />
      </div>
    </section>
  )
}
