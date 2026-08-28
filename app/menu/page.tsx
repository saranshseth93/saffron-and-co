import type { Metadata } from 'next'
import Link from 'next/link'
import { menu, dietaryLegend, specials, type MenuDish } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Menu — Saffron & Co (Demo)',
  description:
    'The full menu: breakfast, lunch, dinner, bar and this week’s specials. Designed to be read on a phone and printed on A4.',
}

/*
 * The menu as a system, not a poster.
 *
 * Every dish here comes from `menu` and `specials` in lib/constants.ts — the
 * same data the homepage section reads. That is the point: a seasonal change is
 * one edit and every surface updates together, this page and the printed A4
 * included. It is the $149/month care plan demonstrated rather than described,
 * and a prospect can be shown the diff.
 *
 * Print rules live in globals.css under @media print. Menus get printed; one
 * that only exists on a screen is not a menu.
 */

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

const foodSections = menu.filter((s) => s.id !== 'bar')
const barSection = menu.find((s) => s.id === 'bar')

function Dietary({ codes }: { codes?: MenuDish['dietary'] }) {
  if (!codes?.length) return null
  return (
    <span className="ml-2 inline-flex gap-1 align-middle">
      {codes.map((c) => (
        <abbr
          key={c}
          title={dietaryLegend[c]}
          className="font-space-mono text-[10px] uppercase tracking-wider text-accent-sage no-underline"
        >
          {c}
        </abbr>
      ))}
    </span>
  )
}

function Dish({ dish }: { dish: MenuDish }) {
  return (
    <li className="dish flex gap-4 border-b border-border py-4 last:border-b-0">
      <div className="min-w-0 flex-1">
        <p className="font-dm-sans font-medium text-text-cream">
          {dish.name}
          <Dietary codes={dish.dietary} />
        </p>
        <p className="font-dm-sans mt-1 text-sm leading-relaxed text-text-spice">
          {dish.description}
        </p>
      </div>
      <p className="font-space-mono shrink-0 tabular-nums text-accent-turmeric">{dish.price}</p>
    </li>
  )
}

export default function MenuPage() {
  return (
    <main className="menu-doc min-h-screen bg-bg-deep px-6 py-16 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-3xl">
        {/* Masthead — becomes the printed header */}
        <header className="menu-masthead border-b border-border pb-10">
          <div className="flex items-center gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${base}/brand/mark.svg`} alt="" width={40} height={40} />
            <div>
              <p className="font-playfair text-2xl leading-none text-text-cream">
                Saffron &amp; Co
              </p>
              <p className="font-space-mono mt-1 text-[10px] uppercase tracking-[0.22em] text-text-muted">
                Fitzroy · Breakfast, lunch, dinner
              </p>
            </div>
          </div>

          <p className="font-dm-sans mt-8 max-w-prose text-text-spice">
            Everything we cook and what it costs. No second menu, no market
            price. The kitchen closes half an hour before we do.
          </p>

          <p className="no-print font-dm-sans mt-6 text-sm text-text-muted">
            <Link href="/" className="text-accent-turmeric underline underline-offset-4">
              Back to the site
            </Link>
            {'  ·  '}
            <Link href="/brand" className="text-accent-turmeric underline underline-offset-4">
              Brand system
            </Link>
            {'  ·  '}
            Print this page for an A4 menu.
          </p>
        </header>

        {/* ── This week ── */}
        <section className="specials mt-14 border border-accent-turmeric/40 bg-bg-rich p-6 lg:p-8">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="font-playfair text-2xl text-text-cream">This week</h2>
            <p className="font-space-mono text-[10px] uppercase tracking-[0.2em] text-accent-turmeric">
              Week of {specials.weekOf}
            </p>
          </div>
          <p className="font-dm-sans mt-3 text-sm leading-relaxed text-text-spice">{specials.note}</p>
          <ul className="mt-5">
            {specials.dishes.map((d) => (
              <Dish key={d.name} dish={d} />
            ))}
          </ul>
        </section>

        {/* ── Food ── */}
        {foodSections.map((section) => (
          <section key={section.id} className="menu-section mt-14">
            <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-border pb-3">
              <h2 className="font-playfair text-3xl text-text-cream">{section.title}</h2>
              <p className="font-space-mono text-[10px] uppercase tracking-[0.2em] text-text-muted">
                {section.service}
              </p>
            </div>
            {section.blurb && (
              <p className="font-dm-sans mt-4 max-w-prose text-sm leading-relaxed text-text-spice">
                {section.blurb}
              </p>
            )}
            <ul className="mt-4">
              {section.dishes.map((d) => (
                <Dish key={d.name} dish={d} />
              ))}
            </ul>
          </section>
        ))}

        {/* ── Bar ── */}
        {barSection && (
          <section className="menu-section mt-14">
            <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-border pb-3">
              <h2 className="font-playfair text-3xl text-text-cream">{barSection.title}</h2>
              <p className="font-space-mono text-[10px] uppercase tracking-[0.2em] text-text-muted">
                {barSection.service}
              </p>
            </div>
            {barSection.blurb && (
              <p className="font-dm-sans mt-4 max-w-prose text-sm leading-relaxed text-text-spice">
                {barSection.blurb}
              </p>
            )}
            <ul className="mt-4">
              {barSection.dishes.map((d) => (
                <Dish key={d.name} dish={d} />
              ))}
            </ul>
          </section>
        )}

        {/* ── Legend ── */}
        <footer className="menu-legend mt-14 border-t border-border pt-6">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {(Object.keys(dietaryLegend) as (keyof typeof dietaryLegend)[]).map((k) => (
              <li key={k} className="font-dm-sans text-xs text-text-muted">
                <span className="font-space-mono uppercase text-accent-sage">{k}</span>{' '}
                {dietaryLegend[k]}
              </li>
            ))}
          </ul>
          <p className="font-dm-sans mt-5 text-xs leading-relaxed text-text-muted">
            Prices in AUD and include GST. Tell us about allergies before you
            order — the kitchen handles nuts, dairy and gluten daily and we
            won&apos;t pretend otherwise.
          </p>
          <p className="no-print font-dm-sans mt-6 text-xs text-text-muted">
            Saffron &amp; Co is a fictional café, built by{' '}
            <a href="https://pixelpundit.dev" className="text-accent-turmeric underline underline-offset-4">
              Pixel Pundit
            </a>{' '}
            to show the kind of work we make. Nothing here is for sale.
          </p>
        </footer>
      </div>
    </main>
  )
}
