import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'SellYourAuto.ca — Sell Your Car for the Best Price',
  description:
    "Canada's premier destination for selling your vehicle with speed, ease, and confidence. Instant appraisals, zero fees, coast-to-coast pickup.",
  keywords: ['sell my car Canada', 'car appraisal', 'sell vehicle online', 'instant car offer'],
  openGraph: {
    title: 'SellYourAuto.ca — Sell Your Car for the Best Price',
    description: 'Quick, easy, and hassle-free vehicle selling across Canada.',
    url: 'https://sellyourauto.ca',
    siteName: 'SellYourAuto.ca',
    locale: 'en_CA',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  )
}
