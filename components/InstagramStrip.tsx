'use client'

import { Instagram } from 'lucide-react'
import { Reveal } from '@/components/ui/Reveal'

const tints = [
  'rgba(232,168,56,0.08)',  // turmeric
  'rgba(36,30,22,0.5)',     // neutral brown
  'rgba(123,143,106,0.08)', // sage
  'rgba(199,62,29,0.08)',   // chilli
  'rgba(36,30,22,0.5)',     // neutral brown
  'rgba(232,168,56,0.06)',  // amber
]

export function InstagramStrip() {
  return (
    <section aria-label="Instagram" className="bg-bg-rich py-10 px-6">
      <Reveal>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 max-w-6xl mx-auto relative">
          {tints.map((tint, i) => (
            <a
              key={i}
              href="https://instagram.com/saffronandco"
              target="_blank"
              rel="noopener noreferrer"
              className="aspect-square bg-bg-warm rounded-sm relative overflow-hidden hover:brightness-110 transition-all duration-300 cursor-pointer"
              style={{ backgroundColor: tint }}
            >
              {/* Grid-line overlay for photo placeholder effect */}
              <div
                className="absolute inset-0 opacity-[0.05]"
                style={{
                  backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px),
                                    linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
                  backgroundSize: '25% 25%',
                }}
              />
            </a>
          ))}

          {/* Centre overlay pill */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-bg-deep/70 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2">
              <Instagram size={16} className="text-text-cream" />
              <span className="font-space-mono text-text-cream text-sm tracking-wider">@saffronandco</span>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
