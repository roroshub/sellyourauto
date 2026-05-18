'use client'

import { useEffect, useRef, useState } from 'react'
import type { Stat } from '@/types'

interface HeroProps {
  tagline: string
  subTagline: string
  stats: Stat[]
}

function useCountUp(target: string, triggered: boolean) {
  const [display, setDisplay] = useState('—')

  useEffect(() => {
    if (!triggered) return
    const hasPlus = target.includes('+')
    const hasDollar = target.includes('$')
    const hasM = target.includes('M')
    const hasHrs = target.includes('hrs')
    const raw = parseFloat(target.replace(/[^0-9.]/g, ''))
    if (isNaN(raw)) { setDisplay(target); return }

    const duration = 1600
    const start = performance.now()
    const format = (v: number) => {
      let s = ''
      if (hasDollar) s += '$'
      if (hasM) s += Math.floor(v) + 'M'
      else if (hasHrs) s += Math.floor(v) + 'hrs'
      else s += Math.floor(v).toLocaleString('en-CA')
      if (hasPlus) s += '+'
      return s
    }
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setDisplay(format(raw * eased))
      if (p < 1) requestAnimationFrame(tick)
      else setDisplay(target)
    }
    requestAnimationFrame(tick)
  }, [triggered, target])

  return display
}

function StatItem({ num, label, triggered }: Stat & { triggered: boolean }) {
  const display = useCountUp(num, triggered)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, minWidth: 120 }}>
      <span style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px,3.5vw,38px)', fontWeight: 700, color: '#fff', lineHeight: 1, textShadow: '0 2px 12px rgba(0,0,0,0.3)' }}>{display}</span>
      <span style={{ fontSize: 12, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.75)' }}>{label}</span>
    </div>
  )
}

export default function Hero({ tagline, subTagline, stats }: HeroProps) {
  const statsRef = useRef<HTMLDivElement>(null)
  const [statsTriggered, setStatsTriggered] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)

  useEffect(() => {
    const el = statsRef.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStatsTriggered(true); obs.disconnect() } }, { threshold: 0.4 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section
      id="hero"
      aria-label="Hero — Sell your car for the best price"
      style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}
    >
      {/* Video background */}
      <div className="hero-video-wrap">
        {/* Gradient fallback shown while video loads */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #1A2766 0%, #003C64 60%, #005B80 100%)', zIndex: 0 }} />
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onCanPlay={() => setVideoLoaded(true)}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%', opacity: videoLoaded ? 1 : 0, transition: 'opacity 1.2s ease', zIndex: 1 }}
          aria-hidden="true"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
          <source src="/hero-video.webm" type="video/webm" />
        </video>
      </div>

      {/* Gradient overlay */}
      <div className="hero-gradient-overlay" style={{ zIndex: 2 }} />

      {/* Dot pattern overlay */}
      <div className="hero-dot-pattern" style={{ zIndex: 3 }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 4, width: '100%', maxWidth: 1200, margin: '0 auto', padding: 'clamp(100px,14vw,140px) clamp(20px,5vw,48px) clamp(80px,10vw,120px)' }}>

        {/* Trust badge */}
        <div className="reveal" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(0,178,216,0.2)', border: '1px solid rgba(0,178,216,0.45)', borderRadius: 100, padding: '7px 16px', marginBottom: 28 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#00B2D8', display: 'inline-block', flexShrink: 0, boxShadow: '0 0 0 3px rgba(0,178,216,0.3)' }} />
          <span style={{ fontSize: 12, fontWeight: 600, color: '#fff', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Canada&rsquo;s #1 Car Buying Service</span>
        </div>

        {/* Headline */}
        <h1 className="reveal" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(42px,7vw,84px)', fontWeight: 800, lineHeight: 1.05, color: '#fff', marginBottom: 24, letterSpacing: '-0.02em', maxWidth: 760, textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}>
          {tagline.split(' ').slice(0, -3).join(' ')}{' '}
          <span style={{ color: '#00B2D8' }}>{tagline.split(' ').slice(-3).join(' ')}</span>
        </h1>

        {/* Subheadline */}
        <p className="reveal" style={{ fontSize: 'clamp(16px,2.2vw,20px)', color: 'rgba(255,255,255,0.85)', maxWidth: 560, lineHeight: 1.7, marginBottom: 40, fontWeight: 400 }}>
          {subTagline} Fill out our quick form and get a real, guaranteed offer in minutes — zero fees, zero stress.
        </p>

        {/* CTAs */}
        <div className="reveal" style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 64 }}>
          <a href="#appraisal"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '16px 36px', background: '#00B2D8', color: '#fff', fontSize: 15, fontWeight: 700, borderRadius: 8, transition: 'all 0.25s', boxShadow: '0 4px 20px rgba(0,178,216,0.4)', letterSpacing: '0.01em' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#0099C0'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,178,216,0.5)' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#00B2D8'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,178,216,0.4)' }}
          >
            Get My Free Offer
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </a>
          <a href="#how-it-works"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '16px 32px', background: 'rgba(255,255,255,0.12)', color: '#fff', fontSize: 15, fontWeight: 600, borderRadius: 8, border: '1.5px solid rgba(255,255,255,0.35)', transition: 'all 0.25s', backdropFilter: 'blur(8px)' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.22)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)' }}
          >How It Works</a>
        </div>

        {/* Stats */}
        <div ref={statsRef} className="reveal" style={{ display: 'flex', alignItems: 'center', gap: 0, flexWrap: 'wrap', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.18)', padding: '24px 32px', width: 'fit-content', maxWidth: '100%' }}>
          {stats.map((s, i) => (
            <div key={s.label} style={{ display: 'flex', alignItems: 'center' }}>
              {i > 0 && <div style={{ width: 1, height: 40, background: 'rgba(255,255,255,0.2)', margin: '0 clamp(20px,3vw,40px)' }} />}
              <StatItem {...s} triggered={statsTriggered} />
            </div>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <div aria-hidden="true" style={{ position: 'absolute', bottom: 36, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, zIndex: 5 }}>
        <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>Scroll</span>
        <div className="scroll-pulse" style={{ width: 1.5, height: 48, background: 'linear-gradient(to bottom, rgba(255,255,255,0.6), transparent)', borderRadius: 4 }} />
      </div>

      {/* Wave bottom divider */}
      <div className="wave-divider" style={{ zIndex: 5 }}>
        <svg viewBox="0 0 1440 56" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 56H1440V24C1200 56 960 8 720 24C480 40 240 8 0 24V56Z" fill="#ffffff"/>
        </svg>
      </div>
    </section>
  )
}
