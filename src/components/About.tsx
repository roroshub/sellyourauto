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
    <section id="about" aria-labelledby="about-heading" style={{ padding: 'var(--section-pad) 0', background: '#fff' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(20px,4vw,48px)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 'clamp(48px,6vw,80px)', alignItems: 'center' }}>

          {/* Visual side */}
          <RevealSection>
            <div style={{ position: 'relative' }}>
              {/* Main card */}
              <div style={{ borderRadius: 16, overflow: 'hidden', background: 'linear-gradient(145deg, #1A2766 0%, #003C64 100%)', aspectRatio: '4/3', position: 'relative', boxShadow: '0 24px 64px rgba(26,39,102,0.2)' }}>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 24, padding: 40 }}>
                  {/* Car SVG */}
                  <svg width="200" height="110" viewBox="0 0 200 110" fill="none" aria-hidden="true">
                    <path d="M20 80 L20 60 L40 32 L80 22 L120 22 L155 32 L175 60 L180 80 L20 80Z" fill="rgba(255,255,255,0.08)" stroke="rgba(0,178,216,0.6)" strokeWidth="2"/>
                    <path d="M40 60 L55 35 L90 28 L110 28 L145 35 L160 60" stroke="rgba(0,178,216,0.5)" strokeWidth="1.5" fill="none"/>
                    <circle cx="55" cy="82" r="16" fill="rgba(0,178,216,0.15)" stroke="rgba(0,178,216,0.7)" strokeWidth="2"/>
                    <circle cx="55" cy="82" r="8" fill="rgba(0,178,216,0.3)"/>
                    <circle cx="145" cy="82" r="16" fill="rgba(0,178,216,0.15)" stroke="rgba(0,178,216,0.7)" strokeWidth="2"/>
                    <circle cx="145" cy="82" r="8" fill="rgba(0,178,216,0.3)"/>
                    <path d="M5 80 L195 80" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5"/>
                    <path d="M160 50 L170 50 L172 58 L163 58" fill="rgba(0,178,216,0.3)" stroke="rgba(0,178,216,0.5)" strokeWidth="1"/>
                    <rect x="85" y="34" width="30" height="20" rx="3" fill="rgba(0,178,216,0.2)" stroke="rgba(0,178,216,0.4)" strokeWidth="1"/>
                    <rect x="115" y="34" width="28" height="20" rx="3" fill="rgba(0,178,216,0.2)" stroke="rgba(0,178,216,0.4)" strokeWidth="1"/>
                  </svg>
                  {/* Dot pattern */}
                  <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
                </div>
              </div>

              {/* Floating stat badge */}
              <div className="badge-pulse" style={{
                position: 'absolute', bottom: -20, right: -16,
                background: '#fff', borderRadius: 12, padding: '16px 20px',
                boxShadow: '0 12px 40px rgba(26,39,102,0.18)',
                display: 'flex', alignItems: 'center', gap: 12,
                border: '1px solid rgba(0,178,216,0.15)',
              }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: 'linear-gradient(135deg, #00B2D8, #1A2766)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>🏆</div>
                <div>
                  <strong style={{ display: 'block', fontSize: 16, fontWeight: 700, color: '#1A2766', fontFamily: 'var(--font-display)' }}>10,000+</strong>
                  <small style={{ fontSize: 12, color: '#6B7280' }}>Vehicles Purchased</small>
                </div>
              </div>

              {/* Accent quote card */}
              <div style={{ marginTop: 40, padding: '20px 24px', borderRadius: 10, background: '#EEF3FF', borderLeft: '4px solid #00B2D8' }}>
                <p style={{ fontSize: 15, fontStyle: 'italic', color: '#1A2766', lineHeight: 1.6, fontWeight: 500 }}>
                  &ldquo;Selling your car should take minutes, not months. We built the process Canadians actually deserve.&rdquo;
                </p>
              </div>
            </div>
          </RevealSection>

          {/* Text side */}
          <RevealSection delay={120}>
            <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#00B2D8', marginBottom: 12 }}>{eyebrow}</p>
            <h2 id="about-heading" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(30px,4vw,46px)', fontWeight: 700, lineHeight: 1.15, color: '#1A2766', marginBottom: 20 }}>
              {heading.split('\n').map((line, i, arr) => (
                <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
              ))}
            </h2>
            <p style={{ fontSize: 16, color: '#4B5563', lineHeight: 1.8, marginBottom: 16 }}>{body1}</p>
            <p style={{ fontSize: 16, color: '#4B5563', lineHeight: 1.8, marginBottom: 32 }}>{body2}</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 36 }}>
              {pillars.map((p) => (
                <div key={p.title} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', padding: '14px 18px', borderRadius: 10, background: '#F8FAFF', border: '1px solid rgba(26,39,102,0.07)', transition: 'border-color 0.2s, box-shadow 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,178,216,0.4)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,178,216,0.08)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(26,39,102,0.07)'; e.currentTarget.style.boxShadow = 'none' }}
                >
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(0,178,216,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>{p.icon}</div>
                  <div>
                    <strong style={{ display: 'block', fontSize: 14, fontWeight: 700, color: '#1A2766', marginBottom: 3, fontFamily: 'var(--font-display)' }}>{p.title}</strong>
                    <p style={{ fontSize: 13, color: '#6B7280', margin: 0, lineHeight: 1.5 }}>{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <a href="#appraisal" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 32px', background: '#1A2766', color: '#fff', fontSize: 14, fontWeight: 700, borderRadius: 8, transition: 'all 0.25s', fontFamily: 'var(--font-display)', boxShadow: '0 4px 16px rgba(26,39,102,0.25)' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#00B2D8'; e.currentTarget.style.boxShadow = '0 6px 24px rgba(0,178,216,0.4)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#1A2766'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(26,39,102,0.25)'; e.currentTarget.style.transform = 'none' }}
            >Get My Free Offer →</a>
          </RevealSection>

        </div>
      </div>
    </section>
  )
}
