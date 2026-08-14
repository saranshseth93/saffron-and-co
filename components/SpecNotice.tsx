import { specNotice } from '@/lib/constants'

/**
 * Permanent, non-dismissible. Saffron & Co is a spec build, and a visitor
 * should know that before they read a price or dial the phone number.
 */
export function SpecNoticeBar() {
  return (
    <div className="relative z-50 bg-accent-turmeric text-bg-deep">
      <p className="max-w-6xl mx-auto px-6 py-2 font-space-mono text-[11px] sm:text-xs tracking-wide text-center">
        <span className="font-semibold uppercase">{specNotice.short}</span>
        <span className="hidden sm:inline">
          {' '}— a spec build by{' '}
          <a
            href={specNotice.studioUrl}
            className="underline underline-offset-2 hover:opacity-70 transition-opacity"
          >
            {specNotice.studio}
          </a>
          . Nothing here is a real café.
        </span>
      </p>
    </div>
  )
}

export function SpecNoticeFooter() {
  return (
    <aside
      aria-label="About this site"
      className="border-t border-border bg-bg-deep px-6 py-10"
    >
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="font-space-mono text-[11px] uppercase tracking-[0.3em] text-accent-turmeric">
          About this site
        </h2>
        <p className="font-dm-sans text-sm text-text-muted leading-relaxed mt-4">
          {specNotice.long}
        </p>
        <p className="font-dm-sans text-sm text-text-muted leading-relaxed mt-4">
          Photography is royalty-free and credited in{' '}
          <a
            href="https://github.com/saranshseth93/saffron-and-co/blob/master/CREDITS.md"
            className="text-text-spice underline underline-offset-4 hover:text-text-cream transition-colors"
          >
            CREDITS.md
          </a>
          . Built by{' '}
          <a
            href={specNotice.studioUrl}
            className="text-accent-turmeric underline underline-offset-4 hover:text-text-cream transition-colors"
          >
            {specNotice.studio}
          </a>
          .
        </p>
      </div>
    </aside>
  )
}
