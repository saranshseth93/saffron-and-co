import { storyParagraphs } from '@/lib/constants'
import { Reveal } from '@/components/ui/Reveal'
import { Photo } from '@/components/ui/Photo'

export function OurStory() {
  return (
    <section
      id="story"
      aria-labelledby="story-heading"
      className="bg-bg-deep py-24 px-6"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-[2fr_3fr] gap-12 lg:gap-16">
          {/* Left column */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <span className="font-space-mono text-accent-turmeric text-xs tracking-[0.3em] uppercase">
              Our Story
            </span>
            <h2
              id="story-heading"
              className="font-playfair text-4xl text-text-cream mt-4 mb-8"
            >
              Second-gen cooking.
            </h2>

            <div className="relative rounded-xl overflow-hidden bg-bg-warm max-w-[320px]">
              <div className="absolute top-0 inset-x-0 h-[3px] z-10 bg-gradient-to-r from-accent-turmeric to-accent-chilli" />
              <Photo
                slot="story"
                alt="Hands working in a restaurant kitchen"
                sizes="(min-width: 1024px) 320px, 100vw"
                className="w-full h-auto block"
              />
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-8">
            {storyParagraphs.map((paragraph, i) => (
              <Reveal key={i} delay={i * 0.12}>
                <p className="text-[17px] text-text-cream leading-relaxed">
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
