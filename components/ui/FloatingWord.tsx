'use client'

import { useRef, useEffect } from 'react'

interface FloatingWordProps {
  word: string
  style: React.CSSProperties
}

export function FloatingWord({ word, style }: FloatingWordProps) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    let ctx: any
    async function initGSAP() {
      try {
        const { gsap } = await import('gsap')
        const { ScrollTrigger } = await import('gsap/ScrollTrigger')
        gsap.registerPlugin(ScrollTrigger)

        ctx = gsap.context(() => {
          gsap.to(ref.current, {
            yPercent: -30,
            ease: 'none',
            scrollTrigger: {
              trigger: ref.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          })
        })
      } catch (e) {
        // GSAP failed to load — word stays static
      }
    }
    initGSAP()
    return () => ctx?.revert()
  }, [])

  return (
    <span
      ref={ref}
      className="absolute font-playfair italic text-text-muted pointer-events-none select-none"
      style={style}
      aria-hidden="true"
    >
      {word}
    </span>
  )
}
