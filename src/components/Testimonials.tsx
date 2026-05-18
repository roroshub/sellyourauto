'use client'

import RevealSection from '@/components/ui/RevealSection'
import type { Testimonial } from '@/types'

interface TestimonialsProps {
  testimonials: Testimonial[]
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  const reviewBadges = [
    { score: '5.0', label: 'Google Reviews', stars: 5 },
    { score: '4.9', label: 'Trustpilot', stars: 5 },
    { score: '100%', label: 'Recommendation Rate', stars: 5 },
  ]

  return (
    <section id="testimonials" aria-labelledby="testimonials-heading" style={{ padding: 'var(--section-pad) 0', background: '#fff' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(20px,4vw,48px)' }}>
        <RevealSection style={{ textAlign: 'center', marginBottom: 60 }}>
          <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#00B2D8', marginBottom: 12 }}>Happy Sellers</p>
          <h2 id="testimonials-heading" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,4vw,44px)', fontWeight: 700, lineHeight: 1.15, color: '#1A2766' }}>
            Real Canadians.<br />Real Results.
          </h2>
        </RevealSection>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24, marginBottom: 56 }}>
          {testimonials.map((t, i) => (
            <RevealSection key={t.author} delay={i * 100}>
              <article style={{
                background: '#F8FAFF', borderRadius: 16, padding: 'clamp(24px,4vw,36px)',
                border: '1.5px solid rgba(26,39,102,0.07)', height: '100%',
                transition: 'border-color 0.25s, box-shadow 0.25s, transform 0.25s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#00B2D8'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,178,216,0.12)'; e.currentTarget.style.transform = 'translateY(-4px)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(26,39,102,0.07)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none' }}
              >
                <div style={{ fontSize: 16, color: '#F59E0B', letterSpacing: 2, marginBottom: 16 }}>
                  {'★'.repeat(t.stars)}
                </div>
                <blockquote style={{ fontSize: 15, color: '#374151', lineHeight: 1.75, marginBottom: 24, fontStyle: 'normal' }}>
                  &ldquo;{t.text}&rdquo;
                </blockquote>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: 'linear-gradient(135deg, #1A2766, #00B2D8)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff', flexShrink: 0, fontFamily: 'var(--font-display)' }}>
                    {t.initials}
                  </div>
                  <div>
                    <strong style={{ display: 'block', fontSize: 14, color: '#1A2766', fontWeight: 700, fontFamily: 'var(--font-display)' }}>{t.author}</strong>
                    <small style={{ fontSize: 12, color: '#9CA3AF' }}>{t.detail}</small>
                  </div>
                </div>
              </article>
            </RevealSection>
          ))}
        </div>

        {/* Review score strip */}
        <RevealSection>
          <div style={{ background: '#1A2766', borderRadius: 16, padding: 'clamp(24px,4vw,36px) clamp(24px,4vw,48px)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'clamp(24px,5vw,72px)', flexWrap: 'wrap' }}>
            {reviewBadges.map((b, i) => (
              <div key={b.label} style={{ display: 'flex', alignItems: 'center' }}>
                {i > 0 && <div style={{ width: 1, height: 40, background: 'rgba(255,255,255,0.15)', marginRight: 'clamp(24px,5vw,72px)' }} />}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px,4vw,44px)', fontWeight: 800, color: '#fff', lineHeight: 1 }}>{b.score}</span>
                  <div style={{ fontSize: 13, color: '#F59E0B', letterSpacing: 2 }}>{'★'.repeat(b.stars)}</div>
                  <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{b.label}</span>
                </div>
              </div>
            ))}
          </div>
        </RevealSection>
      </div>
    </section>
  )
}
