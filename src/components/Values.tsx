'use client'

import RevealSection from '@/components/ui/RevealSection'
import type { Value } from '@/types'

interface ValuesProps {
  values: Value[]
}

export default function Values({ values }: ValuesProps) {
  return (
    <section id="values" style={{ padding: 'clamp(80px,10vw,120px) 0', background: '#F5F3EF' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(24px,4vw,40px)' }}>
        <RevealSection style={{ textAlign: 'center', marginBottom: 72 }}>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9A96E', marginBottom: 16 }}>What We Stand For</p>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(36px,4vw,56px)', fontWeight: 300, lineHeight: 1.1, color: '#111111' }}>
            Built on Six<br /><em style={{ fontStyle: 'italic', color: '#C9A96E' }}>Unbreakable</em> Principles.
          </h2>
        </RevealSection>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 2, background: '#E8E3DA' }}>
          {values.map((v, i) => (
            <RevealSection key={v.title} delay={i * 80}
              style={{
                background: '#F5F3EF', padding: 'clamp(36px,5vw,56px) clamp(28px,4vw,48px)',
                transition: 'background 0.3s', cursor: 'default',
              }}
              onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => (e.currentTarget.style.background = '#FAFAF8')}
              onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => (e.currentTarget.style.background = '#F5F3EF')}
            >
              <span style={{ fontSize: 28, color: '#C9A96E', display: 'block', marginBottom: 20 }}>{v.icon}</span>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 26, fontWeight: 300, color: '#111111', marginBottom: 14 }}>{v.title}</h3>
              <p style={{ fontSize: 15, color: '#666', lineHeight: 1.75 }}>{v.desc}</p>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  )
}
