import { Navigation } from '@/components/Navigation'
import { SpecNoticeFooter } from '@/components/SpecNotice'
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
      {/*
        No spec-notice bar across the top. The disclosure lives in the footer
        instead, which is defensible here because the details that could
        actually mislead are already visibly fake: a 0400 000 000 phone, an
        address with no street number, an .example email, an illustrative map,
        and "(Demo Site)" in the page title.
      */}
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
