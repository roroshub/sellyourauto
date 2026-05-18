import type { Metadata } from 'next'
import { Poppins, Inter } from 'next/font/google'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://sellyourauto.ca'),
  title: {
    default: 'SellYourAuto.ca — Sell Your Car for the Best Price in Canada',
    template: '%s | SellYourAuto.ca',
  },
  description:
    'Get a guaranteed offer for your car in minutes. SellYourAuto.ca buys all makes and models across Canada — no fees, no haggling, free pickup, instant payment.',
  keywords: [
    'sell my car Canada',
    'sell car online Canada',
    'instant car offer Canada',
    'sell vehicle fast',
    'car appraisal Canada',
    'sell used car Ontario',
    'sell car no fees',
    'cash for cars Canada',
  ],
  authors: [{ name: 'SellYourAuto.ca' }],
  creator: 'SellYourAuto.ca',
  publisher: 'SellYourAuto.ca',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  openGraph: {
    title: 'SellYourAuto.ca — Sell Your Car for the Best Price',
    description: 'Get a guaranteed offer in minutes. No fees, no haggling, free pickup across Canada.',
    url: 'https://sellyourauto.ca',
    siteName: 'SellYourAuto.ca',
    locale: 'en_CA',
    type: 'website',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'SellYourAuto.ca — Canada\'s Best Car Buying Service' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SellYourAuto.ca — Sell Your Car for the Best Price',
    description: 'Get a guaranteed offer in minutes. No fees, no haggling, free pickup across Canada.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://sellyourauto.ca',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AutoDealer',
  name: 'SellYourAuto.ca',
  description: 'Canada\'s premier destination for selling your vehicle with speed, ease, and confidence.',
  url: 'https://sellyourauto.ca',
  logo: 'https://sellyourauto.ca/logo.png',
  email: 'support@sellyourauto.ca',
  telephone: '1-800-SELL-AUTO',
  areaServed: 'Canada',
  priceRange: 'Free',
  openingHours: 'Mo-Su 00:00-23:59',
  sameAs: [
    'https://instagram.com/sellyourauto',
    'https://facebook.com/sellyourauto',
  ],
  potentialAction: {
    '@type': 'QuoteAction',
    target: 'https://sellyourauto.ca/#appraisal',
    name: 'Get a Free Car Appraisal',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
