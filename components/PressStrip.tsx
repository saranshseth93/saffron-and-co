'use client'

import { Fragment } from 'react'
import Image from 'next/image'
import { Reveal } from '@/components/ui/Reveal'

const pressLogos = [
  { name: 'Broadsheet', src: '/press/broadsheet.svg', width: 130, height: 24 },
  { name: 'TimeOut Melbourne', src: '/press/timeout.svg', width: 120, height: 24 },
  { name: 'The Age', src: '/press/theage.svg', width: 90, height: 24 },
  { name: 'Good Food', src: '/press/goodfood.svg', width: 120, height: 24 },
  { name: 'Concrete Playground', src: '/press/concreteplayground.svg', width: 170, height: 20 },
  { name: 'Eater', src: '/press/eater.svg', width: 80, height: 24 },
]

export function PressStrip() {
  return (
    <section aria-label="Press mentions" className="bg-bg-rich py-16 px-6">
      <Reveal>
        <div className="flex items-center justify-center gap-8 lg:gap-12 flex-wrap max-w-5xl mx-auto">
          {pressLogos.map((logo, i) => (
            <Fragment key={logo.name}>
              {i > 0 && (
                <span
                  className="w-px h-5 bg-border hidden sm:block"
                  aria-hidden="true"
                />
              )}
              <div
                className="opacity-30 hover:opacity-70 transition-opacity duration-300 cursor-default"
                title={logo.name}
              >
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={logo.width}
                  height={logo.height}
                  className="h-5 lg:h-6 w-auto text-text-cream"
                  style={{ filter: 'brightness(0) invert(0.9)' }}
                />
              </div>
            </Fragment>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
