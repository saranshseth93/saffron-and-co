'use client'

import { storyParagraphs } from '@/lib/constants'
import { Reveal } from '@/components/ui/Reveal'

export function OurStory() {
  return (
    <section id="story" aria-label="Our Story" className="bg-bg-deep py-[120px] px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-[2fr_3fr] gap-12 lg:gap-16">
          {/* Left column */}
          <div className="lg:sticky lg:top-[120px] lg:self-start">
            <span className="font-space-mono text-accent-turmeric text-xs tracking-[0.3em] uppercase">OUR STORY</span>
            <h2 className="font-playfair text-4xl text-text-cream mt-4 mb-8">Second-gen cooking.</h2>
            <div className="relative w-[280px] h-[320px] hidden lg:block">
              <div className="absolute w-48 h-48 rounded-full bg-accent-turmeric/15 top-0 left-4" />
              <div className="absolute w-36 h-36 rounded-full bg-accent-chilli/[0.12] top-20 left-24 animate-slow-rotate" />
              <div className="absolute w-28 h-28 rounded-full bg-accent-sage/10 top-8 left-36" />
              <div className="absolute w-40 h-px bg-border top-32 left-0 -rotate-[15deg]" />
              <div className="absolute w-40 h-px bg-border top-48 left-16 rotate-[25deg]" />
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-8">
            {storyParagraphs.map((paragraph, i) => (
              <Reveal key={i} delay={i * 0.15}>
                <p className="text-[17px] text-text-cream leading-relaxed">{paragraph}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
