'use client'

import RevealSection from '@/components/ui/RevealSection'
import type { Pillar } from '@/types'

interface AboutProps {
  eyebrow: string
  heading: string
  body1: string
  body2: string
  pillars: Pillar[]
}

export default function About({ eyebrow, heading, body1, body2, pillars }: AboutProps) {
  return (
    <section id="about" style={{ padding: 'clamp(80px,10vw,120px) 0', background: '#FAFAF8' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(24px,4vw,40px)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 'clamp(48px,6vw,80px)', alignItems: 'start' }}>

          {/* Image side */}
          <RevealSection>
            <div style={{ position: 'relative' }}>
              <div style={{ background: '#1a1a1a', aspectRatio: '3/4', maxWidth: 440, overflow: 'hidden', position: 'relative' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(145deg, #1a1208 0%, #2a1e08 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
                  {/* Stylized car icon */}
                  <div style={{ fontSize: 100, color: 'rgba(201,169,110,0.1)', fontFamily: 'var(--font-serif)', fontWeight: 300, userSelect: 'none' }}>SYA</div>
                  <svg width="160" height="80" viewBox="0 0 160 80" fill="none" style={{ opacity: 0.15 }}>
                    <path d="M20 60 L20 45 L35 25 L65 18 L95 18 L120 25 L135 45 L140 60 L20 60Z" stroke="#C9A96E" strokeWidth="2" fill="none"/>
                    <circle cx="45" cy="62" r="12" stroke="#C9A96E" strokeWidth="2" fill="none"/>
                    <circle cx="115" cy="62" r="12" stroke="#C9A96E" strokeWidth="2" fill="none"/>
                    <path d="M35 45 L60 28 L100 28 L125 45" stroke="#C9A96E" strokeWidth="1.5" fill="none"/>
                  </svg>
                </div>
                {/* Floating badge */}
                <div style={{
                  position: 'absolute', bottom: 32, left: -24, background: '#FAFAF8',
                  padding: '16px 24px', display: 'flex', alignItems: 'center', gap: 14,
                  boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
                }}>
                  <span style={{ fontSize: 24, color: '#C9A96E' }}>★</span>
                  <div>
                    <strong style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#111111' }}>Trusted Coast to Coast</strong>
                    <small style={{ fontSize: 11, color: '#888888', letterSpacing: '0.08em' }}>10,000+ Vehicles Purchased</small>
                  </div>
                </div>
              </div>
              {/* Accent quote */}
              <div style={{ marginTop: 24, padding: '28px 32px', borderLeft: '3px solid #C9A96E', background: '#F0EDE8', marginLeft: 24 }}>
                <p style={{ fontFamily: 'var(--font-serif)', fontSize: 19, fontStyle: 'italic', color: '#111111', lineHeight: 1.5 }}>
                  "Sellers don't want headaches — they want their money and their time back."
                </p>
              </div>
            </div>
          </RevealSection>

          {/* Text side */}
          <RevealSection delay={120}>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9A96E', marginBottom: 16 }}>{eyebrow}</p>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(36px,4vw,52px)', fontWeight: 300, lineHeight: 1.1, color: '#111111', marginBottom: 24 }}>
              {heading.split('\n').map((line, i) => (
                <span key={i}>{line}{i < heading.split('\n').length - 1 && <br />}</span>
              ))}
            </h2>
            <p style={{ fontSize: 16, color: '#555', lineHeight: 1.8, marginBottom: 20 }}>{body1}</p>
            <p style={{ fontSize: 16, color: '#555', lineHeight: 1.8, marginBottom: 36 }}>{body2}</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 40 }}>
              {pillars.map((p) => (
                <div key={p.title} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 18, color: '#C9A96E', marginTop: 2, flexShrink: 0 }}>{p.icon}</span>
                  <div>
                    <strong style={{ display: 'block', fontSize: 15, fontWeight: 600, marginBottom: 2 }}>{p.title}</strong>
                    <p style={{ fontSize: 14, color: '#888', margin: 0 }}>{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <a href="#appraisal" style={{ display: 'inline-flex', alignItems: 'center', padding: '14px 32px', background: '#C9A96E', color: '#080808', fontSize: 13, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', transition: 'all 0.3s' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#E8D5B0'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(201,169,110,0.3)' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#C9A96E'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}
            >Get My Free Offer</a>
          </RevealSection>

        </div>
      </div>
    </section>
  )
}
