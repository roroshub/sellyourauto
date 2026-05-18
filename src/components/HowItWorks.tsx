'use client'

import RevealSection from '@/components/ui/RevealSection'
import type { Step } from '@/types'

interface HowItWorksProps {
  eyebrow: string
  heading: string
  steps: Step[]
}

export default function HowItWorks({ eyebrow, heading, steps }: HowItWorksProps) {
  return (
    <section id="how-it-works" style={{ padding: 'clamp(80px,10vw,120px) 0', background: '#111111' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(24px,4vw,40px)' }}>
        <RevealSection style={{ textAlign: 'center', marginBottom: 72 }}>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9A96E', marginBottom: 16 }}>{eyebrow}</p>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(36px,4vw,56px)', fontWeight: 300, lineHeight: 1.1, color: '#FAFAF8' }}>
            {heading.split('\n').map((line, i, arr) => (
              <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
            ))}
          </h2>
        </RevealSection>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 1, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.08)' }}>
          {steps.map((step, i) => (
            <RevealSection key={step.num} delay={i * 100}
              style={{ background: '#1a1a1a', padding: 'clamp(36px,5vw,52px) clamp(28px,4vw,44px)', position: 'relative', overflow: 'hidden', transition: 'background 0.3s' }}
              className="card-accent"
            >
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: 80, fontWeight: 300, color: 'rgba(201,169,110,0.1)', lineHeight: 1, marginBottom: 8, transition: 'color 0.3s' }}>
                {step.num}
              </div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 24, fontWeight: 300, color: '#FAFAF8', marginBottom: 14, lineHeight: 1.2 }}>{step.title}</h3>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)', lineHeight: 1.75 }}>{step.desc}</p>
            </RevealSection>
          ))}
        </div>

        <RevealSection style={{ textAlign: 'center', marginTop: 60 }}>
          <a href="#appraisal" style={{ display: 'inline-flex', alignItems: 'center', padding: '14px 36px', background: '#C9A96E', color: '#080808', fontSize: 13, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', transition: 'all 0.3s' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#E8D5B0'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(201,169,110,0.3)' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#C9A96E'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}
          >Start My Appraisal Now</a>
        </RevealSection>
      </div>
    </section>
  )
}
