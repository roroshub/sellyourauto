'use client'

import RevealSection from '@/components/ui/RevealSection'
import type { Step } from '@/types'

interface HowItWorksProps {
  eyebrow: string
  heading: string
  steps: Step[]
}

const stepIcons = ['📋', '💰', '🚗']

export default function HowItWorks({ eyebrow, heading, steps }: HowItWorksProps) {
  return (
    <section id="how-it-works" aria-labelledby="hiw-heading" style={{ padding: 'var(--section-pad) 0', background: '#1A2766', position: 'relative', overflow: 'hidden' }}>
      {/* Subtle dot bg */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto', padding: '0 clamp(20px,4vw,48px)' }}>
        <RevealSection style={{ textAlign: 'center', marginBottom: 64 }}>
          <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#00B2D8', marginBottom: 12 }}>{eyebrow}</p>
          <h2 id="hiw-heading" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,4vw,46px)', fontWeight: 700, lineHeight: 1.15, color: '#fff' }}>
            {heading.split('\n').map((line, i, arr) => (
              <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
            ))}
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.65)', marginTop: 16, maxWidth: 480, margin: '16px auto 0' }}>
            No dealerships, no paperwork headaches, no waiting weeks. Here&rsquo;s exactly how easy it is.
          </p>
        </RevealSection>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
          {steps.map((step, i) => (
            <RevealSection key={step.num} delay={i * 120}>
              <div className="card-accent" style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 16, padding: 'clamp(28px,4vw,40px)', border: '1px solid rgba(255,255,255,0.1)', height: '100%', transition: 'background 0.3s, transform 0.3s', backdropFilter: 'blur(8px)' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.10)'; e.currentTarget.style.transform = 'translateY(-4px)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.transform = 'none' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
                  <div style={{ width: 52, height: 52, borderRadius: 14, background: 'rgba(0,178,216,0.2)', border: '1.5px solid rgba(0,178,216,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>
                    {stepIcons[i]}
                  </div>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 800, color: 'rgba(0,178,216,0.3)', lineHeight: 1 }}>{step.num}</span>
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 10 }}>{step.title}</h3>
                <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7 }}>{step.desc}</p>
              </div>
            </RevealSection>
          ))}
        </div>

        <RevealSection style={{ textAlign: 'center', marginTop: 52 }}>
          <a href="#appraisal" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '15px 36px', background: '#00B2D8', color: '#fff', fontSize: 15, fontWeight: 700, borderRadius: 8, transition: 'all 0.25s', fontFamily: 'var(--font-display)', boxShadow: '0 4px 20px rgba(0,178,216,0.4)' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#0099C0'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,178,216,0.5)' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#00B2D8'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,178,216,0.4)' }}
          >Start My Free Appraisal →</a>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginTop: 12 }}>No obligation · Takes 2 minutes</p>
        </RevealSection>
      </div>
    </section>
  )
}
