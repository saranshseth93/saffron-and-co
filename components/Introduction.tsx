import { Reveal } from '@/components/ui/Reveal'
import { Photo } from '@/components/ui/Photo'
import { introParagraphs } from '@/lib/constants'

export function Introduction() {
  return (
    <section id="intro" aria-label="Introduction" className="bg-bg-deep py-24 px-6">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-[3fr_2fr] gap-12 lg:gap-16 items-center">
        <div className="max-w-2xl">
          <Reveal>
            <span className="font-space-mono text-accent-turmeric text-xs tracking-[0.3em] uppercase">
              Est. 2024 · Fitzroy
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
        </div>

        <div className="relative rounded-xl overflow-hidden bg-bg-warm">
          <div className="absolute top-0 inset-x-0 h-[3px] z-10 bg-gradient-to-r from-accent-turmeric to-accent-chilli" />
          <Photo
            slot="chai"
            alt="Masala chai being poured into a glass"
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="w-full h-auto block"
          />
        </div>
      </div>
    </section>
  )
}
