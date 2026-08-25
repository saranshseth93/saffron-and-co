import Link from 'next/link'

export function Footer() {
  return (
    <footer aria-label="Footer" className="bg-bg-deep pt-20 pb-10 px-6">
      <div className="max-w-2xl mx-auto text-center flex flex-col items-center">

        {/* Wordmark */}
        <p className="font-oi text-3xl text-text-cream tracking-[0.05em]">Saffron & Co</p>

        {/* Tagline */}
        <p className="font-dm-sans text-text-spice italic mt-2">Where chai meets Melbourne.</p>

        {/*
          No social row. The Instagram icon pointed at instagram.com/saffronandco
          — a real handle belonging to someone else, under a fictional café's
          branding — and the Facebook one went nowhere at all. This is the same
          reason the fake Instagram strip was cut from the page body.
        */}

        {/*
          The full menu and the brand system are separate pages. Without links
          they are orphans — unreachable by a visitor and uncrawled — which
          defeats the point of building them as portfolio pieces.
        */}
        <div className="mt-10 flex flex-wrap justify-center gap-x-5 gap-y-2">
          <Link
            href="/menu"
            className="font-dm-sans text-[13px] text-accent-turmeric hover:underline cursor-pointer"
          >
            Full menu
          </Link>
          <Link
            href="/brand"
            className="font-dm-sans text-[13px] text-accent-turmeric hover:underline cursor-pointer"
          >
            Brand system
          </Link>
        </div>

        {/* Credits */}
        <div className="mt-10 space-y-1">
          <p className="font-dm-sans text-[13px] text-text-muted">© 2026 Saffron & Co. All rights reserved.</p>
          <a
            href="https://pixelpundit.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="font-dm-sans text-[13px] text-accent-turmeric hover:underline cursor-pointer"
          >
            Website by Pixel Pundit
          </a>
        </div>

        {/* Bottom */}
        <div className="mt-6 space-y-2">
          <p className="font-dm-sans text-[11px] text-text-muted max-w-lg">
            Saffron & Co acknowledges the Wurundjeri Woi Wurrung people of the Kulin Nation as the Traditional Owners of the land on which we gather.
          </p>
          <p className="font-dm-sans text-[11px] text-text-muted">
            A Pixel Pundit showcase. This is a fictional business.
          </p>
        </div>

      </div>
    </footer>
  )
}
