'use client'

import { Fragment } from 'react'
import { Reveal } from '@/components/ui/Reveal'
import { pressNames } from '@/lib/constants'

export function PressStrip() {
  return (
    <section aria-label="Press mentions" className="bg-bg-rich py-16 px-6">
      <Reveal>
        <div className="flex items-center justify-center gap-6 flex-wrap">
          {pressNames.map((name, i) => (
            <Fragment key={name}>
              {i > 0 && <span className="w-px h-4 bg-border" aria-hidden="true" />}
              <span className="font-space-mono text-[13px] text-text-muted/40 tracking-wider uppercase hover:text-text-cream/80 transition-colors duration-300 cursor-default">
                {name}
              </span>
            </Fragment>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
