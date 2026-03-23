'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Instagram, Facebook } from 'lucide-react'
import { navLinks } from '@/lib/constants'
import { navOverlay, navLink, staggerContainer } from '@/lib/animations'
import { getLenis } from '@/lib/useLenis'

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Focus trap + Escape key
  useEffect(() => {
    if (!isOpen) return

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setIsOpen(false)
        return
      }

      if (e.key === 'Tab' && overlayRef.current) {
        const focusable = overlayRef.current.querySelectorAll<HTMLElement>(
          'a, button, [tabindex]:not([tabindex="-1"])'
        )
        if (focusable.length === 0) return

        const first = focusable[0]
        const last = focusable[focusable.length - 1]

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault()
            last.focus()
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault()
            first.focus()
          }
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  const handleNavClick = useCallback((href: string) => {
    getLenis()?.scrollTo(href)
    setTimeout(() => setIsOpen(false), 100)
  }, [])

  return (
    <>
      {/* Fixed header bar */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 lg:px-12 py-6">
        <a
          href="#"
          className="font-oi text-text-cream tracking-[0.05em] text-lg lg:text-xl"
        >
          Saffron &amp; Co
        </a>
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open menu"
          className="flex flex-col gap-[6px] group"
        >
          <span className="block w-6 h-[2px] bg-text-cream transition-colors group-hover:bg-accent-turmeric" />
          <span className="block w-6 h-[2px] bg-text-cream transition-colors group-hover:bg-accent-turmeric" />
          <span className="block w-6 h-[2px] bg-text-cream transition-colors group-hover:bg-accent-turmeric" />
        </button>
      </header>

      {/* Full-screen overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={overlayRef}
            variants={navOverlay}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-50 bg-bg-deep flex flex-col items-center justify-center"
            style={{
              background:
                'radial-gradient(ellipse at center, rgba(232,168,56,0.06) 0%, transparent 60%) #0C0A08',
            }}
          >
            {/* Close button */}
            <div className="absolute top-0 right-0 px-6 lg:px-12 py-6">
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close menu"
                className="text-text-cream hover:text-accent-turmeric transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Nav links */}
            <nav>
              <motion.ul
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="flex flex-col items-center gap-6"
              >
                {navLinks.map((link) => (
                  <motion.li key={link.href} variants={navLink}>
                    <button
                      onClick={() => handleNavClick(link.href)}
                      className="font-playfair text-[clamp(2.25rem,5vw,3.5rem)] text-text-cream hover:text-accent-turmeric transition-colors"
                    >
                      {link.label}
                    </button>
                  </motion.li>
                ))}
              </motion.ul>
            </nav>

            {/* Bottom area */}
            <div className="absolute bottom-8 flex flex-col items-center gap-4">
              <div className="flex gap-6">
                <a
                  href="https://instagram.com/saffronandco"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="text-text-muted hover:text-text-cream transition-colors"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href="https://facebook.com/saffronandco"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="text-text-muted hover:text-text-cream transition-colors"
                >
                  <Facebook size={20} />
                </a>
              </div>
              <p className="font-space-mono text-xs text-text-muted tracking-wider">
                Tues–Sun 7am–4pm · Fri–Sat Bar 5pm–10pm
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
