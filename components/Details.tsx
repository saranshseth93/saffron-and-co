'use client'

import { useState } from 'react'
import { Mail, Instagram, Phone, ArrowRight } from 'lucide-react'
import { Reveal } from '@/components/ui/Reveal'
import { hours, contactDetails } from '@/lib/constants'

const iconMap = { mail: Mail, instagram: Instagram, phone: Phone }

/**
 * Both forms are deliberately inert.
 *
 * This is a spec build for a business that does not exist, so there is nothing
 * behind a submit button and no third-party endpoint collecting addresses.
 * They demonstrate the interaction and then say plainly that nothing was sent.
 */
export function Details() {
  const [subscribed, setSubscribed] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  return (
    <section
      id="details"
      aria-labelledby="details-heading"
      className="bg-bg-deep py-24 px-6"
    >
      <div className="max-w-6xl mx-auto">
        <span className="font-space-mono text-accent-turmeric text-xs tracking-[0.3em] uppercase">
          Find Us
        </span>
        <h2
          id="details-heading"
          className="font-playfair text-[2rem] text-text-cream mt-4 mb-12"
        >
          No bookings. Just rock up.
        </h2>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Location */}
          <Reveal>
            <div>
              <p className="font-dm-sans font-medium text-text-cream">
                Brunswick Street
              </p>
              <p className="font-dm-sans text-text-spice">Fitzroy VIC 3065</p>
              <p className="font-dm-sans text-text-spice">Melbourne, Australia</p>

              {/* A real map embed would point strangers at a real street number
                  and cost a few hundred ms of third-party JavaScript. Neither
                  is worth it for a business that does not exist. */}
              <div
                className="relative w-full h-[200px] rounded-lg border border-border mt-4 overflow-hidden bg-bg-rich"
                role="img"
                aria-label="Illustrative map. This café is a demo build and has no real location."
              >
                <div
                  className="absolute inset-0 opacity-40"
                  style={{
                    backgroundImage:
                      'linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)',
                    backgroundSize: '28px 28px',
                  }}
                  aria-hidden="true"
                />
                <div
                  className="absolute inset-y-0 left-1/3 w-8 -rotate-12 bg-bg-warm"
                  aria-hidden="true"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-space-mono text-[11px] uppercase tracking-[0.2em] text-text-muted text-center px-6 leading-relaxed">
                    Illustrative only
                    <br />
                    no real address
                  </span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Hours */}
          <Reveal delay={0.1}>
            <div>
              {hours.map((entry) => (
                <div
                  key={entry.days + entry.hours}
                  className="flex justify-between gap-4 py-2 border-b border-border/50 last:border-0"
                >
                  <span className="font-dm-sans font-medium text-text-cream">
                    {entry.days}
                  </span>
                  <span
                    className={`font-dm-sans text-right ${
                      entry.highlight ? 'text-accent-turmeric' : 'text-text-spice'
                    }`}
                  >
                    {entry.hours}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Say hello */}
          <Reveal delay={0.2}>
            <div>
              {contactDetails.map((detail) => {
                const Icon = iconMap[detail.icon]
                return (
                  <a
                    key={detail.label}
                    href={detail.href}
                    className="flex items-center gap-3 py-2 text-text-cream hover:text-accent-turmeric transition-colors"
                  >
                    <Icon size={18} className="text-text-muted" />
                    <span>{detail.label}</span>
                  </a>
                )
              })}
              <p className="font-dm-sans text-xs text-text-muted mt-4 leading-relaxed">
                Contact details are placeholders. Nothing here reaches a real
                inbox or phone.
              </p>
            </div>
          </Reveal>
        </div>

        {/* Forms */}
        <div className="grid lg:grid-cols-2 gap-12 mt-16 pt-16 border-t border-border">
          <Reveal>
            <div>
              <p className="font-dm-sans text-text-spice mb-4">
                Get the Saturday biryani alert.
              </p>
              <form
                className="flex gap-2"
                onSubmit={(e) => {
                  e.preventDefault()
                  setSubscribed(true)
                }}
              >
                <input
                  type="email"
                  placeholder="Your email"
                  required
                  className="flex-1 min-w-0 bg-bg-rich border border-border text-text-cream rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent-turmeric placeholder:text-text-muted"
                  aria-label="Email for newsletter"
                />
                <button
                  type="submit"
                  className="w-10 h-10 shrink-0 rounded-full bg-accent-turmeric flex items-center justify-center hover:brightness-110 transition"
                  aria-label="Subscribe"
                >
                  <ArrowRight size={18} className="text-bg-deep" />
                </button>
              </form>
              <p className="text-sm mt-2 min-h-5" aria-live="polite" role="status">
                {subscribed ? (
                  <span className="text-accent-sage">
                    That is the interaction. Being a demo, nothing was sent or
                    stored.
                  </span>
                ) : null}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div>
              <p className="font-dm-sans text-text-spice mb-4">
                For catering, events, or just to say g&apos;day.
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  setSubmitted(true)
                }}
              >
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  required
                  aria-label="Name"
                  className="w-full bg-bg-rich border border-border text-text-cream rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent-turmeric placeholder:text-text-muted"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  aria-label="Email"
                  className="mt-3 w-full bg-bg-rich border border-border text-text-cream rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent-turmeric placeholder:text-text-muted"
                />
                <textarea
                  name="message"
                  placeholder="Message"
                  rows={3}
                  required
                  aria-label="Message"
                  className="mt-3 w-full bg-bg-rich border border-border text-text-cream rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent-turmeric placeholder:text-text-muted resize-none"
                />
                <button
                  type="submit"
                  className="w-full bg-accent-turmeric text-bg-deep font-medium rounded-lg py-3 mt-4 hover:brightness-110 transition"
                >
                  Send it.
                </button>
              </form>
              <p className="text-sm mt-2 min-h-5" aria-live="polite" role="status">
                {submitted ? (
                  <span className="text-accent-sage">
                    Got it — or we would have, if this were a real café. Nothing
                    was sent.
                  </span>
                ) : null}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
