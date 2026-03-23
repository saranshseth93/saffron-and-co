import { Instagram, Facebook } from 'lucide-react'

export function Footer() {
  return (
    <footer aria-label="Footer" className="bg-bg-deep pt-20 pb-10 px-6">
      <div className="max-w-2xl mx-auto text-center flex flex-col items-center">

        {/* Wordmark */}
        <p className="font-playfair text-2xl text-text-cream tracking-[0.15em]">SAFFRON & CO</p>

        {/* Tagline */}
        <p className="font-dm-sans text-text-spice italic mt-2">Where chai meets Melbourne.</p>

        {/* Social row */}
        <div className="flex items-center gap-4 mt-6">
          <a
            href="https://instagram.com/saffronandco"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <Instagram size={20} className="text-text-muted hover:text-text-cream transition-colors" />
          </a>
          <a
            href="#"
            aria-label="Facebook"
          >
            <Facebook size={20} className="text-text-muted hover:text-text-cream transition-colors" />
          </a>
        </div>

        {/* Credits */}
        <div className="mt-10 space-y-1">
          <p className="font-dm-sans text-[13px] text-text-muted">© 2026 Saffron & Co. All rights reserved.</p>
          <a
            href="https://pixelpundit.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="font-dm-sans text-[13px] text-accent-turmeric hover:underline"
          >
            Website by Pixel Pundit
          </a>
        </div>

        {/* Bottom */}
        <div className="mt-6 space-y-2">
          <p className="font-dm-sans text-[11px] text-text-muted/60 max-w-lg">
            Saffron & Co acknowledges the Wurundjeri Woi Wurrung people of the Kulin Nation as the Traditional Owners of the land on which we gather.
          </p>
          <p className="font-dm-sans text-[11px] text-text-muted/40">
            A Pixel Pundit showcase. This is a fictional business.
          </p>
        </div>

      </div>
    </footer>
  )
}
