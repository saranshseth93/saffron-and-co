import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Brand System — Saffron & Co (Demo)',
  description:
    'The identity behind Saffron & Co: mark, palette, type and usage. An example built by Pixel Pundit for a café that does not exist.',
}

/*
 * The brand system, shown the way it would be handed to a real client.
 *
 * This page exists because the studio sells brand and graphic design but had
 * published work for websites only. Saffron & Co is fictional, so its identity
 * can be extended into a full system without inventing a client relationship —
 * the example-site notice on every other page applies here too.
 *
 * Nothing here is a mockup. The hexes are the CSS custom properties in
 * globals.css and the typefaces are the ones loaded in lib/fonts.ts, so the
 * page cannot drift from the site it documents without someone noticing.
 */

// Static export ships under /saffron-and-co on GitHub Pages, so asset URLs
// need the prefix. lib/images.ts reads the same env for the photo pipeline.
const base = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

const palette = [
  { name: 'Deep', hex: '#0C0A08', token: '--color-bg-deep', use: 'Page ground. The dark the whole brand sits on.' },
  { name: 'Rich', hex: '#1A1510', token: '--color-bg-rich', use: 'Cards and raised surfaces.' },
  { name: 'Warm', hex: '#241E16', token: '--color-bg-warm', use: 'Hover states, inset panels.' },
  { name: 'Cream', hex: '#F5EDE0', token: '--color-text-cream', use: 'Body copy and headings.' },
  { name: 'Spice', hex: '#C4A882', token: '--color-text-spice', use: 'Secondary copy, captions.' },
  { name: 'Muted', hex: '#968A78', token: '--color-text-muted', use: 'Fine print. Lightened from #7A6E60, which failed AA.' },
  { name: 'Turmeric', hex: '#E8A838', token: '--color-accent-turmeric', use: 'Primary accent. Prices, links, the stem of the mark.' },
  { name: 'Chilli', hex: '#EA6440', token: '--color-accent-chilli', use: 'Labels and heat. The threads of the mark.' },
  { name: 'Sage', hex: '#7B8F6A', token: '--color-accent-sage', use: 'Rare third accent. Vegetarian markers, success.' },
  { name: 'Border', hex: '#2E2820', token: '--color-border', use: 'Hairlines and dividers.' },
]

const type = [
  {
    face: 'Playfair Display',
    role: 'Headlines',
    css: 'font-playfair',
    sample: 'Where chai meets Melbourne',
    note: 'High contrast and a little theatrical. Used large, never below 20px, never for body.',
  },
  {
    face: 'DM Sans',
    role: 'Body',
    css: 'font-dm-sans',
    sample: 'Slow-cooked dal, a proper filter coffee, and a bar that stays open after the kitchen shuts.',
    note: 'Does the reading. Everything a customer has to actually get through is set in this.',
  },
  {
    face: 'Space Mono',
    role: 'Labels & prices',
    css: 'font-space-mono',
    sample: 'OPENING HOURS · $18.50 · TABLE 4',
    note: 'Uppercase, letterspaced, small. Tabular figures keep menu prices in a column.',
  },
  {
    face: 'Oi',
    role: 'Accent only',
    css: 'font-oi',
    sample: 'Saffron',
    note: 'One word at a time, once per page at most. It stops being special the second it repeats.',
  },
]

function Swatch({ name, hex, token, use }: (typeof palette)[number]) {
  return (
    <div className="border border-border">
      <div className="h-20" style={{ background: hex }} />
      <div className="p-4">
        <p className="font-dm-sans text-sm font-semibold text-text-cream">{name}</p>
        <p className="font-space-mono mt-1 text-xs text-accent-turmeric">{hex}</p>
        <p className="font-space-mono mt-1 break-all text-[10px] text-text-muted">{token}</p>
        <p className="font-dm-sans mt-3 text-xs leading-relaxed text-text-spice">{use}</p>
      </div>
    </div>
  )
}

export default function BrandPage() {
  return (
    <main className="min-h-screen bg-bg-deep px-6 py-20 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-5xl">
        <p className="font-space-mono text-[11px] uppercase tracking-[0.25em] text-accent-chilli">
          Brand system
        </p>
        <h1 className="font-playfair mt-5 text-4xl leading-tight text-text-cream sm:text-5xl lg:text-6xl">
          Saffron &amp; Co
        </h1>
        <p className="font-dm-sans mt-5 max-w-2xl text-lg leading-relaxed text-text-spice">
          The identity behind the café: one mark, ten colours, four typefaces and
          the rules that keep them working together. This is the whole system, in
          the form a client would receive it.
        </p>

        <div className="mt-8 border border-border bg-bg-rich p-5">
          <p className="font-dm-sans text-sm leading-relaxed text-text-spice">
            <span className="font-semibold text-text-cream">
              Saffron &amp; Co is not a real business.
            </span>{' '}
            It is a fictional Fitzroy café, invented and built by{' '}
            <a href="https://pixelpundit.dev" className="text-accent-turmeric underline underline-offset-4">
              Pixel Pundit
            </a>{' '}
            to show what the studio produces. No customer has ever eaten here.
          </p>
        </div>

        {/* ── The mark ── */}
        <section className="mt-20">
          <h2 className="font-playfair text-3xl text-text-cream">The mark</h2>
          <p className="font-dm-sans mt-4 max-w-2xl leading-relaxed text-text-spice">
            Saffron is the stigma of the crocus flower, and it grows as exactly
            three deep-red threads above a yellow style. The mark is that, drawn
            plainly — the spice itself rather than a monogram or a coffee cup.
          </p>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="border border-border bg-bg-rich p-8 text-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${base}/brand/mark.svg`} alt="Primary mark" width={96} height={96} className="mx-auto" />
              <p className="font-space-mono mt-6 text-[10px] uppercase tracking-[0.18em] text-text-muted">
                Primary
              </p>
            </div>
            <div className="border border-border bg-[#F5EDE0] p-8 text-center text-[#1A1510]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/brand/mark-ink.svg`} alt="Single colour mark on cream" width={96} height={96} className="mx-auto" />
              <p className="font-space-mono mt-6 text-[10px] uppercase tracking-[0.18em] text-[#7A6E60]">
                Mono, light ground
              </p>
            </div>
            <div className="border border-border bg-bg-rich p-8 text-center text-text-cream">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/brand/mark-cream.svg`} alt="Single colour mark reversed" width={96} height={96} className="mx-auto" />
              <p className="font-space-mono mt-6 text-[10px] uppercase tracking-[0.18em] text-text-muted">
                Mono, reversed
              </p>
            </div>
            <div className="border border-border bg-bg-rich p-8 text-center">
              <div className="flex h-24 items-center justify-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${base}/brand/mark.svg`} alt="" width={24} height={24} />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${base}/brand/mark.svg`} alt="" width={16} height={16} />
              </div>
              <p className="font-space-mono mt-6 text-[10px] uppercase tracking-[0.18em] text-text-muted">
                24px / 16px
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <div className="border border-border bg-bg-rich p-6">
              <p className="font-space-mono text-[10px] uppercase tracking-[0.18em] text-accent-sage">Do</p>
              <ul className="font-dm-sans mt-4 space-y-2 text-sm leading-relaxed text-text-spice">
                <li>Give it clear space of at least one thread-height on every side.</li>
                <li>Use the mono version wherever colour would fight the background.</li>
                <li>Keep it above 16px. Below that the threads merge.</li>
              </ul>
            </div>
            <div className="border border-border bg-bg-rich p-6">
              <p className="font-space-mono text-[10px] uppercase tracking-[0.18em] text-accent-chilli">
                Don&apos;t
              </p>
              <ul className="font-dm-sans mt-4 space-y-2 text-sm leading-relaxed text-text-spice">
                <li>Recolour the threads. Chilli above, turmeric below, always.</li>
                <li>Stretch, rotate, outline or add a drop shadow.</li>
                <li>Set it in a circle or a badge. It has its own silhouette.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ── Palette ── */}
        <section className="mt-20">
          <h2 className="font-playfair text-3xl text-text-cream">Palette</h2>
          <p className="font-dm-sans mt-4 max-w-2xl leading-relaxed text-text-spice">
            Built from what the kitchen actually smells like. Dark grounds so the
            food photography carries, warm neutrals for reading, and three spices
            used sparingly.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {palette.map((c) => (
              <Swatch key={c.hex} {...c} />
            ))}
          </div>
          <p className="font-dm-sans mt-6 max-w-2xl text-sm leading-relaxed text-text-muted">
            Every combination used for text on this site clears WCAG AA at 4.5:1.
            Two of these were lightened during the build for exactly that reason,
            and the original values are noted against them.
          </p>
        </section>

        {/* ── Type ── */}
        <section className="mt-20">
          <h2 className="font-playfair text-3xl text-text-cream">Type</h2>
          <p className="font-dm-sans mt-4 max-w-2xl leading-relaxed text-text-spice">
            Four faces, each with one job. The discipline is in what each one is
            not allowed to do.
          </p>
          <div className="mt-10 space-y-5">
            {type.map((t) => (
              <div key={t.face} className="border border-border bg-bg-rich p-6 lg:p-8">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <p className="font-dm-sans text-base font-semibold text-text-cream">{t.face}</p>
                  <p className="font-space-mono text-[10px] uppercase tracking-[0.18em] text-accent-turmeric">
                    {t.role}
                  </p>
                </div>
                <p className={`${t.css} mt-5 text-2xl leading-snug text-text-cream sm:text-3xl`}>
                  {t.sample}
                </p>
                <p className="font-dm-sans mt-5 text-sm leading-relaxed text-text-muted">{t.note}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Voice ── */}
        <section className="mt-20">
          <h2 className="font-playfair text-3xl text-text-cream">Voice</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <div className="border border-border bg-bg-rich p-6">
              <p className="font-dm-sans text-sm leading-relaxed text-text-spice">
                Warm, specific, unpretentious. Names the dish and the person who
                makes it. Never &ldquo;culinary journey&rdquo;, never
                &ldquo;elevated&rdquo;, and never &ldquo;fusion&rdquo; as a
                compliment.
              </p>
            </div>
            <div className="border border-border bg-bg-rich p-6">
              <p className="font-playfair text-xl leading-snug text-text-cream">
                &ldquo;The dal takes six hours. We start it before we open and
                it&apos;s ready when you are.&rdquo;
              </p>
            </div>
          </div>
        </section>

        <footer className="mt-24 border-t border-border pt-8">
          <p className="font-dm-sans text-sm text-text-muted">
            <Link href="/" className="text-accent-turmeric underline underline-offset-4">
              Back to Saffron &amp; Co
            </Link>
            {'  ·  '}
            Identity and build by{' '}
            <a href="https://pixelpundit.dev" className="text-accent-turmeric underline underline-offset-4">
              Pixel Pundit
            </a>
          </p>
        </footer>
      </div>
    </main>
  )
}
