'use client'

import { Instagram, Camera } from 'lucide-react'
import { Reveal } from '@/components/ui/Reveal'

const tiles = [
  {
    gradient: 'radial-gradient(ellipse at 30% 40%, #E8A838 0%, #8B6914 40%, #241E16 80%)',
    label: 'Turmeric latte art',
  },
  {
    gradient: 'radial-gradient(ellipse at 60% 50%, #C73E1D 0%, #5C2A1A 45%, #241E16 85%)',
    label: 'Masala scramble',
  },
  {
    gradient: 'radial-gradient(ellipse at 40% 60%, #7B8F6A 0%, #3D4735 40%, #1A1510 80%)',
    label: 'Fresh herb garnish',
  },
  {
    gradient: 'linear-gradient(135deg, #1A1510 0%, #2E2820 30%, #E8A838 100%)',
    label: 'Golden hour, Brunswick St',
  },
  {
    gradient: 'radial-gradient(ellipse at 50% 30%, #A0845C 0%, #6B5A3E 45%, #241E16 85%)',
    label: 'Weekend biryani prep',
  },
  {
    gradient: 'radial-gradient(ellipse at 70% 70%, #E8A838 0%, #C73E1D 50%, #241E16 90%)',
    label: 'Chai spice collection',
  },
]

export function InstagramStrip() {
  return (
    <section aria-label="Instagram" className="bg-bg-rich py-12 px-6">
      <Reveal>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 relative">
            {tiles.map((tile, i) => (
              <a
                key={i}
                href="https://instagram.com/saffronandco"
                target="_blank"
                rel="noopener noreferrer"
                className="aspect-square rounded-sm relative overflow-hidden group cursor-pointer"
                style={{ background: tile.gradient }}
              >
                {/* Subtle noise texture */}
                <div
                  className="absolute inset-0 opacity-[0.08] mix-blend-overlay"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.8' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                  }}
                />

                {/* Camera icon — appears on hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-bg-deep/30">
                  <Camera size={20} className="text-text-cream/70" />
                </div>

                {/* Photo label — visible on hover */}
                <div className="absolute bottom-0 left-0 right-0 px-2 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-bg-deep/80 to-transparent">
                  <span className="font-space-mono text-[10px] text-text-cream/70 tracking-wider">
                    {tile.label}
                  </span>
                </div>
              </a>
            ))}

            {/* Centre overlay pill */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="bg-bg-deep/70 backdrop-blur-sm rounded-full px-5 py-2.5 flex items-center gap-2 border border-border/50">
                <Instagram size={16} className="text-text-cream" />
                <span className="font-space-mono text-text-cream text-sm tracking-wider">
                  @saffronandco
                </span>
              </div>
            </div>
          </div>

          {/* Subtle prompt for the client */}
          <p className="text-center font-space-mono text-[11px] text-text-muted/40 mt-4 tracking-wider">
            Photography placeholders — your shots go here
          </p>
        </div>
      </Reveal>
    </section>
  )
}
