'use client'

import { useEffect, useState } from 'react'

/**
 * Sticky section switcher for the menu, with scroll-spy.
 *
 * IntersectionObserver rather than a scroll listener so this costs nothing on
 * the main thread while the page is moving.
 */
export function MenuNav({
  sections,
}: {
  sections: { id: string; title: string }[]
}) {
  const [active, setActive] = useState(sections[0]?.id ?? '')

  useEffect(() => {
    const targets = sections
      .map((s) => document.getElementById(`menu-${s.id}`))
      .filter((el): el is HTMLElement => Boolean(el))

    if (!targets.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
        if (visible) setActive(visible.target.id.replace('menu-', ''))
      },
      // Bias the band towards the top of the viewport so the highlighted tab
      // matches the section the reader is actually looking at.
      { rootMargin: '-25% 0px -60% 0px', threshold: 0 }
    )

    targets.forEach((t) => observer.observe(t))
    return () => observer.disconnect()
  }, [sections])

  return (
    <nav
      aria-label="Menu sections"
      className="sticky top-0 z-30 -mx-6 px-6 py-3 bg-bg-deep/85 backdrop-blur-md border-b border-border/60"
    >
      <ul className="flex gap-2 overflow-x-auto scrollbar-none max-w-6xl mx-auto">
        {sections.map((section) => {
          const isActive = active === section.id
          return (
            <li key={section.id}>
              <a
                href={`#menu-${section.id}`}
                aria-current={isActive ? 'true' : undefined}
                className={`block whitespace-nowrap font-space-mono text-[11px] uppercase tracking-[0.2em] px-3 py-2 rounded-full transition-colors duration-200 ${
                  isActive
                    ? 'bg-accent-turmeric text-bg-deep'
                    : 'text-text-muted hover:text-text-cream'
                }`}
              >
                {section.title}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
