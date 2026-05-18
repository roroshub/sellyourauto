'use client'

import VehicleForm from '@/components/VehicleForm'

export default function AppraisalSection() {
  return (
    <section id="appraisal" style={{ padding: 'clamp(80px,10vw,120px) 0', background: '#FAFAF8' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(24px,4vw,40px)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 'clamp(48px,6vw,80px)', alignItems: 'start' }}>

          {/* Left: copy */}
          <div>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9A96E', marginBottom: 16 }}>Free Appraisal</p>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(36px,4vw,52px)', fontWeight: 300, lineHeight: 1.1, color: '#111111', marginBottom: 24 }}>
              What Is Your<br /><em style={{ fontStyle: 'italic', color: '#C9A96E' }}>Car Worth?</em>
            </h2>
            <p style={{ fontSize: 16, color: '#666', lineHeight: 1.8, marginBottom: 40 }}>
              Fill out the form and our appraisal engine will analyze live Canadian market data to deliver a real, guaranteed offer — typically within minutes. No obligation, no pressure.
            </p>

            {/* Trust signals */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 40 }}>
              {[
                { icon: '✓', title: 'Guaranteed Offer', desc: 'The number you see is the number you get.' },
                { icon: '✓', title: 'Zero Fees', desc: 'We pay you. No commissions or hidden charges.' },
                { icon: '✓', title: 'Free Pickup', desc: 'We come to you — anywhere in Canada.' },
                { icon: '✓', title: 'Instant Payment', desc: 'E-transfer issued on the spot at pickup.' },
              ].map((item) => (
                <div key={item.title} style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                  <span style={{ width: 28, height: 28, flexShrink: 0, background: 'rgba(201,169,110,0.1)', border: '1px solid rgba(201,169,110,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, color: '#C9A96E' }}>{item.icon}</span>
                  <div>
                    <strong style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#111', marginBottom: 2 }}>{item.title}</strong>
                    <span style={{ fontSize: 13, color: '#888' }}>{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Support */}
            <div style={{ padding: '20px 24px', background: '#F0EDE8', borderLeft: '3px solid #C9A96E' }}>
              <p style={{ fontSize: 14, color: '#555', lineHeight: 1.6 }}>
                <strong style={{ color: '#111' }}>Have questions?</strong> Our team is available 24/7.<br />
                <a href="mailto:support@sellyourauto.ca" style={{ color: '#C9A96E', fontSize: 13 }}>support@sellyourauto.ca</a>
              </p>
            </div>
          </div>

          {/* Right: form */}
          <div style={{ background: '#111111', padding: 'clamp(32px,5vw,52px)' }}>
            <VehicleForm />
          </div>

        </div>
      </div>
    </section>
  )
}
