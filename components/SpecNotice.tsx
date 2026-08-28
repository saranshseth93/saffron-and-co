import { specNotice } from '@/lib/constants'

/**
 * Permanent, non-dismissible. A visitor should know this is an example site
 * before they read a price or dial the phone number.
 */
export function SpecNoticeBar() {
  return (
    <div className="relative z-50 bg-accent-turmeric text-bg-deep">
      <p className="max-w-6xl mx-auto px-6 py-2 font-space-mono text-[11px] sm:text-xs tracking-wide text-center">
        <span className="font-semibold uppercase">{specNotice.short}</span>
        <span className="hidden sm:inline">
          {' '}— {specNotice.bar}{' '}
          <a
            href={specNotice.studioUrl}
            className="underline underline-offset-2 hover:opacity-70 transition-opacity"
          >
            {specNotice.studio}
          </a>
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
          {specNotice.honesty}
        </p>

        <div className="mt-10 border-t border-border pt-8">
          <p className="font-playfair text-lg text-text-cream">
            {specNotice.ctaLabel}
          </p>
          <p className="font-dm-sans text-sm text-text-muted leading-relaxed mt-2">
            {specNotice.ctaText}
          </p>
          <a
            href={specNotice.ctaHref}
            className="mt-5 inline-block bg-accent-turmeric px-6 py-3 font-space-mono text-[11px] uppercase tracking-[0.18em] text-bg-deep hover:brightness-110 transition"
          >
            {specNotice.ctaButton}
          </a>
        </div>

        <p className="font-dm-sans text-sm text-text-muted leading-relaxed mt-8">
          Photography is royalty-free and{' '}
          <a
            href={specNotice.creditsUrl}
            className="text-text-spice underline underline-offset-4 hover:text-text-cream transition-colors"
          >
            credited here
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
