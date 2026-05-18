'use client'

import { useEffect, useRef, useState } from 'react'
import type { Stat } from '@/types'

interface HeroProps {
  tagline: string
  subTagline: string
  stats: Stat[]
}

function useCountUp(target: string, triggered: boolean) {
  const [display, setDisplay] = useState('0')

  useEffect(() => {
    if (!triggered) return
    const hasPlus = target.includes('+')
    const hasDollar = target.includes('$')
    const hasM = target.includes('M')
    const hasHrs = target.includes('hrs')
    const raw = parseFloat(target.replace(/[^0-9.]/g, ''))
    if (isNaN(raw)) { setDisplay(target); return }

    const duration = 1800
    const start = performance.now()
    const format = (v: number) => {
      let s = ''
      if (hasDollar) s += '$'
      if (hasM) s += Math.floor(v) + 'M'
      else if (hasHrs) s += Math.floor(v) + 'hrs'
      else s += Math.floor(v).toLocaleString()
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <span style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px,3vw,40px)', fontWeight: 300, color: '#FAFAF8', lineHeight: 1 }}>{display}</span>
      <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>{label}</span>
    </div>
  )
}

export default function Hero({ tagline, subTagline, stats }: HeroProps) {
  const statsRef = useRef<HTMLDivElement>(null)
  const [statsTriggered, setStatsTriggered] = useState(false)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = statsRef.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStatsTriggered(true); obs.disconnect() } }, { threshold: 0.5 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const onScroll = () => {
      if (gridRef.current) gridRef.current.style.transform = `translateY(${window.scrollY * 0.3}px)`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section id="hero" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
      {/* Background */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #080808 0%, #150e04 50%, #0d0b06 100%)' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 30% 60%, rgba(201,169,110,0.09) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(201,169,110,0.05) 0%, transparent 50%)' }} />
        <div ref={gridRef} className="hero-grid-bg" style={{ position: 'absolute', inset: 0 }} />
      </div>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, maxWidth: 1000, padding: 'clamp(120px,15vw,160px) clamp(24px,5vw,64px) clamp(80px,10vw,120px)', margin: '0 auto', width: '100%' }}>
        <p className="reveal" style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#C9A96E', marginBottom: 28, display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ display: 'block', width: 40, height: 1, background: '#C9A96E', flexShrink: 0 }} />
          Canada's Premier Auto Buying Service
        </p>

        <h1 className="reveal" style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(56px,9vw,120px)', fontWeight: 300, lineHeight: 0.95, color: '#FAFAF8', marginBottom: 32, letterSpacing: '-0.01em' }}>
          {tagline.split(' ').slice(0, -2).join(' ')}<br />
          <em style={{ fontStyle: 'italic', color: '#C9A96E' }}>{tagline.split(' ').slice(-2).join(' ')}</em>
        </h1>

        <p className="reveal" style={{ fontSize: 'clamp(16px,2vw,19px)', color: 'rgba(255,255,255,0.6)', maxWidth: 520, lineHeight: 1.75, marginBottom: 48 }}>
          {subTagline} Fill out our smart form and receive a real, guaranteed offer in minutes — zero haggling, zero fees.
        </p>

        <div className="reveal" style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 80 }}>
          <a href="#appraisal" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '15px 36px', background: '#C9A96E', color: '#080808', fontSize: 13, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', border: 'none', cursor: 'pointer', transition: 'all 0.3s' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#E8D5B0'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(201,169,110,0.3)' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#C9A96E'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}
          >Get My Free Offer</a>
          <a href="#how-it-works" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '15px 36px', background: 'transparent', color: '#FAFAF8', fontSize: 13, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', border: '1px solid rgba(255,255,255,0.3)', transition: 'all 0.3s' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)' }}
          >How It Works</a>
        </div>

        <div ref={statsRef} className="reveal" style={{ display: 'flex', alignItems: 'center', gap: 40, flexWrap: 'wrap' }}>
          {stats.map((s, i) => (
            <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
              {i > 0 && <div style={{ width: 1, height: 48, background: 'rgba(255,255,255,0.15)' }} />}
              <StatItem {...s} triggered={statsTriggered} />
            </div>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <div style={{ position: 'absolute', bottom: 48, right: 48, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, color: 'rgba(255,255,255,0.3)', fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
        <span>Scroll</span>
        <div className="scroll-pulse" style={{ width: 1, height: 60, background: 'linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)' }} />
      </div>
    </section>
  )
}
