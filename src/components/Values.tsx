'use client'

import RevealSection from '@/components/ui/RevealSection'
import type { Value } from '@/types'

interface ValuesProps {
  values: Value[]
}

const valueEmoji: Record<string, string> = {
  Excellence: '🏆', Speed: '⚡', Integrity: '🤝',
  'Customer Obsession': '❤️', Innovation: '🚀', Community: '🇨🇦',
}

export default function Values({ values }: ValuesProps) {
  return (
    <section id="values" aria-labelledby="values-heading" style={{ padding: 'var(--section-pad) 0', background: '#F8FAFF' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(20px,4vw,48px)' }}>
        <RevealSection style={{ textAlign: 'center', marginBottom: 60 }}>
          <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#00B2D8', marginBottom: 12 }}>What We Stand For</p>
          <h2 id="values-heading" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,4vw,44px)', fontWeight: 700, lineHeight: 1.15, color: '#1A2766' }}>
            Built on Six Promises<br />
            <span style={{ color: '#00B2D8' }}>We Actually Keep.</span>
          </h2>
        </RevealSection>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {values.map((v, i) => (
            <RevealSection key={v.title} delay={i * 70}>
              <div style={{
                background: '#fff', borderRadius: 14, padding: '28px 28px 32px',
                border: '1.5px solid rgba(26,39,102,0.07)', height: '100%',
                transition: 'border-color 0.25s, box-shadow 0.25s, transform 0.25s',
                cursor: 'default',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#00B2D8'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,178,216,0.12)'; e.currentTarget.style.transform = 'translateY(-4px)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(26,39,102,0.07)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none' }}
              >
                <div style={{ width: 52, height: 52, borderRadius: 14, background: '#EEF3FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, marginBottom: 18 }}>
                  {valueEmoji[v.title] || v.icon}
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: '#1A2766', marginBottom: 10 }}>{v.title}</h3>
                <p style={{ fontSize: 14, color: '#6B7280', lineHeight: 1.7 }}>{v.desc}</p>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  )
}
