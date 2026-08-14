import { Navigation } from '@/components/Navigation'
import { SpecNoticeBar, SpecNoticeFooter } from '@/components/SpecNotice'
import { Hero } from '@/components/Hero'
import { Introduction } from '@/components/Introduction'
import { Menu } from '@/components/Menu'
import { ParallaxQuote } from '@/components/ParallaxQuote'
import { TheBar } from '@/components/TheBar'
import { OurStory } from '@/components/OurStory'
import { Gallery } from '@/components/Gallery'
import { Details } from '@/components/Details'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <>
      <SpecNoticeBar />
      <Navigation />
      <Hero />
      <Introduction />
      <Menu />
      <ParallaxQuote />
      <TheBar />
      <OurStory />
      <Gallery />
      <Details />
      <SpecNoticeFooter />
      <Footer />
    </>
  )
}
