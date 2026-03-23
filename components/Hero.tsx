'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { FloatingWord } from '@/components/ui/FloatingWord'
import { floatingWords } from '@/lib/constants'

const wordPositions: React.CSSProperties[] = [
  { top: '10%', left: '5%', fontSize: '48px', opacity: 0.12 },
  { top: '20%', right: '10%', fontSize: '36px', opacity: 0.08 },
  { top: '45%', left: '80%', fontSize: '64px', opacity: 0.1 },
  { top: '60%', left: '15%', fontSize: '28px', opacity: 0.12 },
  { top: '75%', right: '20%', fontSize: '52px', opacity: 0.08 },
  { top: '30%', left: '60%', fontSize: '32px', opacity: 0.1 },
  { top: '85%', left: '45%', fontSize: '44px', opacity: 0.06 },
  { top: '15%', left: '40%', fontSize: '24px', opacity: 0.1 },
]

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setReducedMotion(
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )
    setIsMobile(window.matchMedia('(max-width: 768px)').matches)
  }, [])

  // GSAP parallax on headline
  useEffect(() => {
    let ctx: any
    async function initParallax() {
      try {
        const { gsap } = await import('gsap')
        const { ScrollTrigger } = await import('gsap/ScrollTrigger')
        gsap.registerPlugin(ScrollTrigger)

        const prefersReducedMotion = window.matchMedia(
          '(prefers-reduced-motion: reduce)'
        ).matches
        if (prefersReducedMotion) return

        ctx = gsap.context(() => {
          gsap.to('[data-hero-line="1"]', {
            yPercent: -20,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
          })
          gsap.to('[data-hero-line="2"]', {
            yPercent: -40,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
          })
        })
      } catch {
        // GSAP not available
      }
    }
    initParallax()
    return () => ctx?.revert()
  }, [])

  const visibleWords = isMobile ? floatingWords.slice(0, 5) : floatingWords

  const clipInitial = reducedMotion
    ? { clipPath: 'inset(0% 0 0 0)' }
    : { clipPath: 'inset(100% 0 0 0)' }
  const clipAnimate = { clipPath: 'inset(0% 0 0 0)' }

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-bg-deep px-6"
    >
      {/* Floating spice words */}
      {visibleWords.map((word, i) => (
        <FloatingWord key={word} word={word} style={wordPositions[i]} />
      ))}

      {/* Headline container */}
      <div className="relative z-10 text-center">
        {/* Turmeric line */}
        <motion.div
          initial={reducedMotion ? { width: 200 } : { width: 0 }}
          animate={{ width: 200 }}
          transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
          className="h-[1px] bg-accent-turmeric mx-auto mb-8"
        />

        <h1>
          <motion.span
            data-hero-line="1"
            className="block font-playfair font-bold text-[clamp(3rem,8vw,6rem)] text-text-cream will-change-transform"
            initial={clipInitial}
            animate={clipAnimate}
            transition={
              reducedMotion
                ? { duration: 0 }
                : { delay: 0.6, duration: 0.8, ease: 'easeOut' }
            }
          >
            Where chai
          </motion.span>
          <motion.span
            data-hero-line="2"
            className="block font-playfair font-bold text-[clamp(3rem,8vw,6rem)] text-text-cream will-change-transform"
            initial={clipInitial}
            animate={clipAnimate}
            transition={
              reducedMotion
                ? { duration: 0 }
                : { delay: 0.9, duration: 0.8, ease: 'easeOut' }
            }
          >
            meets Melbourne.
          </motion.span>
        </h1>

        <motion.p
          className="font-dm-sans text-text-spice text-lg mt-6"
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={
            reducedMotion
              ? { duration: 0 }
              : { delay: 1.2, duration: 0.6 }
          }
        >
          Indian-fusion café &amp; bar. Fitzroy, Melbourne.
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 flex flex-col items-center gap-2"
        initial={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={
          reducedMotion ? { duration: 0 } : { delay: 2.0 }
        }
      >
        <span className="font-space-mono text-xs text-text-muted tracking-wider uppercase">
          Scroll to explore
        </span>
        <ChevronDown size={20} className="text-text-muted animate-bounce-down" />
      </motion.div>
    </section>
  )
}
