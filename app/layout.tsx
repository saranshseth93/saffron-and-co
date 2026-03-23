import type { Metadata } from 'next'
import { playfair, dmSans, spaceMono } from '@/lib/fonts'
import './globals.css'

export const metadata: Metadata = {
  title: 'Saffron & Co — Indian-Fusion Caf\u00e9 & Bar | Fitzroy, Melbourne',
  description:
    'Where chai meets Melbourne. Indian-fusion caf\u00e9 and bar in Fitzroy. Turmeric lattes, masala eggs, weekend biryani. Tues\u2013Sun.',
  openGraph: {
    title: 'Saffron & Co — Indian-Fusion Caf\u00e9 & Bar | Fitzroy, Melbourne',
    description:
      'Where chai meets Melbourne. Indian-fusion caf\u00e9 and bar in Fitzroy. Turmeric lattes, masala eggs, weekend biryani. Tues\u2013Sun.',
    type: 'website',
    locale: 'en_AU',
    siteName: 'Saffron & Co',
  },
  twitter: {
    card: 'summary_large_image',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  name: 'Saffron & Co',
  description:
    'Indian-fusion caf\u00e9 and bar in Fitzroy, Melbourne. Turmeric lattes, masala eggs, weekend biryani.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '87 Brunswick St',
    addressLocality: 'Fitzroy',
    addressRegion: 'VIC',
    postalCode: '3065',
    addressCountry: 'AU',
  },
  telephone: '0401 234 567',
  servesCuisine: ['Indian', 'Fusion', 'Australian'],
  priceRange: '$$',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Tuesday', 'Wednesday', 'Thursday'],
      opens: '07:30',
      closes: '16:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Friday', 'Saturday'],
      opens: '07:30',
      closes: '22:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Sunday',
      opens: '08:00',
      closes: '16:00',
    },
  ],
  url: 'https://saffronandco.com.au',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en-AU">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${playfair.variable} ${dmSans.variable} ${spaceMono.variable} bg-bg-deep text-text-cream font-dm-sans antialiased`}
      >
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
