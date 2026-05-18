import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import MarqueeStrip from '@/components/MarqueeStrip'
import About from '@/components/About'
import HowItWorks from '@/components/HowItWorks'
import Values from '@/components/Values'
import AppraisalSection from '@/components/AppraisalSection'
import Testimonials from '@/components/Testimonials'
import Footer from '@/components/Footer'

import siteData from '@/content/site.json'
import valuesData from '@/content/values.json'
import testimonialsData from '@/content/testimonials.json'

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero
        tagline={siteData.tagline}
        subTagline={siteData.subTagline}
        stats={siteData.stats}
      />
      <MarqueeStrip items={siteData.marquee} />
      <About
        eyebrow={siteData.about.eyebrow}
        heading={siteData.about.heading}
        body1={siteData.about.body1}
        body2={siteData.about.body2}
        pillars={siteData.about.pillars}
      />
      <HowItWorks
        eyebrow={siteData.howItWorks.eyebrow}
        heading={siteData.howItWorks.heading}
        steps={siteData.howItWorks.steps}
      />
      <Values values={valuesData} />
      <AppraisalSection />
      <Testimonials testimonials={testimonialsData} />
      <Footer
        tagline={siteData.footer.tagline}
        copyright={siteData.footer.copyright}
        disclaimer={siteData.footer.disclaimer}
      />
    </>
  )
}
