'use client'

import RevealSection from '@/components/ui/RevealSection'
import type { Testimonial } from '@/types'

interface TestimonialsProps {
  testimonials: Testimonial[]
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  const reviewBadges = [
    { score: '5.0', label: 'Google Reviews' },
    { score: '4.9', label: 'Trustpilot' },
    { score: '100%', label: 'Recommendation Rate' },
  ]

  return (
    <section id="testimonials" style={{ padding: 'clamp(80px,10vw,120px) 0', background: '#111111' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(24px,4vw,40px)' }}>
        <RevealSection style={{ textAlign: 'center', marginBottom: 72 }}>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9A96E', marginBottom: 16 }}>Client Stories</p>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(36px,4vw,56px)', fontWeight: 300, lineHeight: 1.1, color: '#FAFAF8' }}>
            Real Sellers.<br />Real Results.
          </h2>
        </RevealSection>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24, marginBottom: 60 }}>
          {testimonials.map((t, i) => (
            <RevealSection key={t.author} delay={i * 100}
              style={{
                background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.08)',
                padding: 'clamp(28px,4vw,40px)', transition: 'border-color 0.3s, transform 0.3s',
              }}
              onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => { e.currentTarget.style.borderColor = 'rgba(201,169,110,0.3)'; e.currentTarget.style.transform = 'translateY(-4px)' }}
              onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.transform = 'none' }}
            >
              <div style={{ fontSize: 14, color: '#C9A96E', letterSpacing: 3, marginBottom: 20 }}>{'★'.repeat(t.stars)}</div>
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: 19, fontStyle: 'italic', fontWeight: 300, color: 'rgba(255,255,255,0.85)', lineHeight: 1.65, marginBottom: 32 }}>
                &ldquo;{t.text}&rdquo;
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 44, height: 44, background: '#222', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600, color: '#C9A96E', letterSpacing: '0.05em', flexShrink: 0 }}>
                  {t.initials}
                </div>
                <div>
                  <strong style={{ display: 'block', fontSize: 14, color: '#FAFAF8', marginBottom: 2 }}>{t.author}</strong>
                  <small style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>{t.detail}</small>
                </div>
              </div>
            </RevealSection>
          ))}
        </div>

        {/* Review scores */}
        <RevealSection style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'clamp(32px,6vw,80px)', padding: '40px 0', borderTop: '1px solid rgba(255,255,255,0.08)', flexWrap: 'wrap' }}>
          {reviewBadges.map((b) => (
            <div key={b.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: 44, fontWeight: 300, color: '#FAFAF8', lineHeight: 1 }}>{b.score}</span>
              <div style={{ fontSize: 12, color: '#C9A96E', letterSpacing: 3 }}>★★★★★</div>
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>{b.label}</span>
            </div>
          ))}
        </RevealSection>
      </div>
    </section>
  )
}
