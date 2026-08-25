import { Playfair_Display, DM_Sans, Space_Mono, Oi } from 'next/font/google'

export const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--ff-playfair',
  display: 'swap',
})

export const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--ff-dm-sans',
  display: 'swap',
})

export const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--ff-space-mono',
  display: 'swap',
})

export const oiFont = Oi({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--ff-oi',
  display: 'swap',
})
