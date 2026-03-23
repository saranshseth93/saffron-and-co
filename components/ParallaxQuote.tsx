'use client'

import { useEffect, useRef } from 'react'
import { Reveal } from '@/components/ui/Reveal'

export function ParallaxQuote() {
  const sectionRef = useRef<HTMLElement>(null)
  const quoteRef = useRef<HTMLQuoteElement>(null)
  const lineTopRef = useRef<HTMLDivElement>(null)
  const lineBottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ctx: any
    async function init() {
      try {
        const { gsap } = await import('gsap')
        const { ScrollTrigger } = await import('gsap/ScrollTrigger')
        gsap.registerPlugin(ScrollTrigger)

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

        ctx = gsap.context(() => {
          gsap.to(quoteRef.current, {
            yPercent: -15,
            ease: 'none',
            scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: true }
          })
          gsap.to([lineTopRef.current, lineBottomRef.current], {
            yPercent: -25,
            ease: 'none',
            scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: true }
          })
        })
      } catch {}
    }
    init()
    return () => ctx?.revert()
  }, [])

  return (
    <section ref={sectionRef} aria-label="Quote" className="bg-bg-deep py-40 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <Reveal>
          <div ref={lineTopRef} className="h-px w-32 bg-accent-turmeric mx-auto mb-12" />
          <blockquote ref={quoteRef} className="font-playfair italic text-[clamp(1.75rem,4vw,3.25rem)] text-text-cream leading-snug">
            "We cook the way we grew up eating — a little bit of everything, all at once, and always with too much flavour."
          </blockquote>
          <div ref={lineBottomRef} className="h-px w-32 bg-accent-turmeric mx-auto mt-12" />
          <p className="font-space-mono text-text-muted text-[13px] mt-8">— Priya & Arjun, Founders</p>
        </Reveal>
      </div>
    </section>
  )
}
