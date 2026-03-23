'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'

let lenisInstance: Lenis | null = null

export function getLenis() {
  return lenisInstance
}

export function useLenis() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })

    lenisInstance = lenis

    let gsapAvailable = false

    // Try to sync with GSAP ticker (preferred — single update loop)
    async function syncGSAP() {
      try {
        const { gsap } = await import('gsap')
        const { ScrollTrigger } = await import('gsap/ScrollTrigger')
        gsap.registerPlugin(ScrollTrigger)

        lenis.on('scroll', ScrollTrigger.update)
        gsap.ticker.add((time: number) => lenis.raf(time * 1000))
        gsap.ticker.lagSmoothing(0)
        gsapAvailable = true
      } catch {
        // GSAP not available — use standalone RAF
      }
    }
    syncGSAP()

    // Standalone RAF loop — ONLY if GSAP isn't driving Lenis
    function raf(time: number) {
      if (!gsapAvailable) {
        lenis.raf(time)
      }
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
      lenisInstance = null
    }
  }, [])
}
