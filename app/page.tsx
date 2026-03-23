import { Navigation } from '@/components/Navigation'
import { Hero } from '@/components/Hero'
import { Introduction } from '@/components/Introduction'
import { PressStrip } from '@/components/PressStrip'
import { MenuHighlights } from '@/components/MenuHighlights'

export default function Home() {
  return (
    <>
      <Navigation />
      <Hero />
      <Introduction />
      <PressStrip />
      <MenuHighlights />
    </>
  )
}
