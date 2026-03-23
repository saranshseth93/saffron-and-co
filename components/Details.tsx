'use client'

import { useState } from 'react'
import { Mail, Instagram, Phone, ArrowRight } from 'lucide-react'
import { Reveal } from '@/components/ui/Reveal'
import { hours, contactDetails } from '@/lib/constants'

const iconMap = { mail: Mail, instagram: Instagram, phone: Phone }

export function Details() {
  const [subscribed, setSubscribed] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)

    const apiKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY
    if (apiKey) {
      formData.append('access_key', apiKey)
      try {
        await fetch('https://api.web3forms.com/submit', { method: 'POST', body: formData })
      } catch {}
    }
    setSubmitted(true)
  }

  return (
    <section id="details" aria-label="Find Us" className="bg-bg-deep pt-[120px] pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <span className="font-space-mono text-accent-turmeric text-xs tracking-[0.3em] uppercase">FIND US</span>
        <h2 className="font-playfair text-[2rem] text-text-cream mt-4 mb-12">No bookings. Just rock up.</h2>

        {/* Three columns */}
        <div className="grid lg:grid-cols-3 gap-12">

          {/* Column 1 — Location */}
          <Reveal>
            <div>
              <p className="font-dm-sans font-medium text-text-cream">87 Brunswick Street</p>
              <p className="font-dm-sans text-text-spice">Fitzroy VIC 3065</p>
              <p className="font-dm-sans text-text-spice">Melbourne, Australia</p>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3152.123!2d144.977!3d-37.7965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDQ3JzQ3LjQiUyAxNDTCsDU4JzM3LjIiRQ!5e0!3m2!1sen!2sau!4v1234567890"
                className="w-full h-[200px] rounded-lg border border-border mt-4"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Saffron & Co location"
                style={{ filter: 'invert(90%) hue-rotate(180deg) saturate(0.3) brightness(0.8)' }}
              />
            </div>
          </Reveal>

          {/* Column 2 — Hours */}
          <Reveal delay={0.1}>
            <div>
              {hours.map((entry) => (
                <div key={entry.days + entry.hours} className="flex justify-between py-2 border-b border-border/50 last:border-0">
                  <span className="font-dm-sans font-medium text-text-cream">{entry.days}</span>
                  <span className={`font-dm-sans ${entry.highlight ? 'text-accent-turmeric' : 'text-text-spice'}`}>
                    {entry.hours}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Column 3 — Say Hello */}
          <Reveal delay={0.2}>
            <div>
              {contactDetails.map((detail) => {
                const Icon = iconMap[detail.icon]
                return (
                  <a
                    key={detail.label}
                    href={detail.href}
                    className="flex items-center gap-3 py-2 text-text-cream hover:underline transition-colors"
                    target={detail.icon === 'instagram' ? '_blank' : undefined}
                    rel={detail.icon === 'instagram' ? 'noopener noreferrer' : undefined}
                  >
                    <Icon size={18} className="text-text-muted" />
                    <span>{detail.label}</span>
                  </a>
                )
              })}
            </div>
          </Reveal>
        </div>

        {/* Newsletter + Contact form */}
        <div className="grid lg:grid-cols-2 gap-12 mt-16 pt-16 border-t border-border">

          {/* Left — Newsletter */}
          <Reveal>
            <div>
              <p className="font-dm-sans text-text-spice mb-4">Get the Saturday biryani alert.</p>
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
                  className="flex-1 bg-bg-rich border border-border text-text-cream rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent-turmeric placeholder:text-text-muted"
                  aria-label="Email for newsletter"
                />
                <button
                  type="submit"
                  className="w-10 h-10 rounded-full bg-accent-turmeric flex items-center justify-center hover:brightness-110 transition"
                  aria-label="Subscribe"
                >
                  <ArrowRight size={18} className="text-bg-deep" />
                </button>
              </form>
              {subscribed && (
                <p className="text-accent-sage text-sm mt-2">You're in. See you Saturday.</p>
              )}
            </div>
          </Reveal>

          {/* Right — Contact form */}
          <Reveal delay={0.1}>
            <div>
              <p className="font-dm-sans text-text-spice mb-4">For catering, events, or just to say g'day.</p>
              <form onSubmit={handleSubmit}>
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
              {submitted && (
                <p className="text-accent-sage text-sm mt-2">Got it. We'll be in touch.</p>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
