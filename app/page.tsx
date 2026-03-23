import { Navigation } from '@/components/Navigation'
import { Hero } from '@/components/Hero'
import { Introduction } from '@/components/Introduction'
import { PressStrip } from '@/components/PressStrip'
import { MenuHighlights } from '@/components/MenuHighlights'
import { ParallaxQuote } from '@/components/ParallaxQuote'
import { TheBar } from '@/components/TheBar'
import { OurStory } from '@/components/OurStory'
import { InstagramStrip } from '@/components/InstagramStrip'
import { Details } from '@/components/Details'
import { Footer } from '@/components/Footer'

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
      <InstagramStrip />
      <Details />
      <Footer />
    </>
  )
}
