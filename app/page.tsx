import { Navigation } from '@/components/Navigation'
import { Hero } from '@/components/Hero'
import { Introduction } from '@/components/Introduction'
import { PressStrip } from '@/components/PressStrip'
import { MenuHighlights } from '@/components/MenuHighlights'
import { ParallaxQuote } from '@/components/ParallaxQuote'
import { TheBar } from '@/components/TheBar'
import { OurStory } from '@/components/OurStory'

export default function Home() {
  return (
    <>
      <Navigation />
      <Hero />
      <Introduction />
      <PressStrip />
      <MenuHighlights />
      <ParallaxQuote />
      <TheBar />
      <OurStory />
    </>
  )
}
