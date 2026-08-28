import type { Metadata } from 'next'
import { playfair, dmSans, spaceMono, oiFont } from '@/lib/fonts'
import { SmoothScroll } from '@/components/SmoothScroll'
import './globals.css'

const title = 'Saffron & Co — Indian-Fusion Café & Bar (Demo Site)'
const description =
  'Where chai meets Melbourne. A made-up Fitzroy café, built by Pixel Pundit to show the kind of site we make. Not a real business.'

export const metadata: Metadata = {
  metadataBase: new URL('https://saffronand.co'),
  title,
  description,
  openGraph: {
    title,
    description,
    type: 'website',
    locale: 'en_AU',
    siteName: 'Saffron & Co (demo site)',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Saffron & Co — a fictional Indian-fusion café, built as a portfolio demo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og-image.svg'],
  },
  icons: {
    icon: '/favicon.svg',
  },
}

/*
 * There is deliberately no Restaurant / LocalBusiness JSON-LD here.
 *
 * Saffron & Co does not exist. Publishing opening hours, a telephone number
 * and a postal address as structured data would invite search engines to list
 * a fictional café as a real place someone could turn up to. The page is still
 * indexable — it just does not claim to be a business.
 */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    // suppressHydrationWarning: the inline script below adds `js-reveal` to
    // <html> before React hydrates, so the client element legitimately carries
    // a class the server markup does not. Scoped to this element only.
    <html lang="en-AU" suppressHydrationWarning>
      <body
        className={`${playfair.variable} ${dmSans.variable} ${spaceMono.variable} ${oiFont.variable} grain bg-bg-deep text-text-cream font-dm-sans antialiased overflow-x-hidden`}
      >
        <SmoothScroll />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-accent-turmeric focus:text-bg-deep focus:px-4 focus:py-2 focus:rounded"
        >
          Skip to content
        </a>
        <main id="main">{children}</main>
      </body>
    </html>
  )
}
