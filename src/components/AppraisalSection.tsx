'use client'

import VehicleForm from '@/components/VehicleForm'

const trustItems = [
  { emoji: '✅', title: 'Guaranteed Offer', desc: 'The number you see is the number you get — no last-minute lowballing.' },
  { emoji: '💸', title: 'Zero Fees', desc: 'We pay you. No commissions, no listing fees, no hidden charges.' },
  { emoji: '🚐', title: 'Free Pickup', desc: 'We come to you anywhere in Canada — at your home or office.' },
  { emoji: '⚡', title: 'Instant Payment', desc: 'E-transfer issued on the spot the moment we pick up your vehicle.' },
]

export default function AppraisalSection() {
  return (
    <section id="appraisal" aria-labelledby="appraisal-heading" style={{ padding: 'var(--section-pad) 0', background: '#F8FAFF' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(20px,4vw,48px)' }}>

        {/* Section header */}
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#00B2D8', marginBottom: 12 }}>Free Appraisal</p>
          <h2 id="appraisal-heading" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,4vw,44px)', fontWeight: 700, color: '#1A2766', lineHeight: 1.15, marginBottom: 16 }}>
            What Is Your Car Worth?
          </h2>
          <p style={{ fontSize: 16, color: '#6B7280', maxWidth: 480, margin: '0 auto' }}>
            Fill out the form and our team will deliver a real, guaranteed offer — typically within minutes.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 'clamp(32px,5vw,60px)', alignItems: 'start' }}>

          {/* Left: trust signals */}
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 36 }}>
              {trustItems.map(item => (
                <div key={item.title} style={{ display: 'flex', gap: 16, alignItems: 'flex-start', padding: '16px 20px', background: '#fff', borderRadius: 12, border: '1.5px solid rgba(26,39,102,0.07)', transition: 'border-color 0.2s, box-shadow 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#00B2D8'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,178,216,0.1)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(26,39,102,0.07)'; e.currentTarget.style.boxShadow = 'none' }}>
                  <div style={{ fontSize: 24, flexShrink: 0, width: 40, textAlign: 'center' }}>{item.emoji}</div>
                  <div>
                    <strong style={{ display: 'block', fontSize: 15, fontWeight: 700, color: '#1A2766', marginBottom: 3, fontFamily: 'var(--font-display)' }}>{item.title}</strong>
                    <span style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.5 }}>{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Support callout */}
            <div style={{ padding: '20px 24px', borderRadius: 12, background: '#1A2766', color: '#fff' }}>
              <p style={{ fontSize: 14, fontWeight: 600, marginBottom: 6, fontFamily: 'var(--font-display)' }}>💬 Have questions? We&rsquo;re here 24/7.</p>
              <a href="mailto:support@sellyourauto.ca" style={{ fontSize: 13, color: '#00B2D8', textDecoration: 'none' }}>support@sellyourauto.ca</a>
              <span style={{ color: 'rgba(255,255,255,0.4)', padding: '0 8px' }}>·</span>
              <a href="tel:18007355288" style={{ fontSize: 13, color: '#00B2D8' }}>1-800-SELL-AUTO</a>
            </div>
          </div>

          {/* Right: form */}
          <div style={{ background: '#fff', borderRadius: 16, padding: 'clamp(24px,4vw,40px)', boxShadow: '0 8px 40px rgba(26,39,102,0.10)', border: '1.5px solid rgba(26,39,102,0.07)' }}>
            <VehicleForm />
          </div>

        </div>
      </div>
    </section>
  )
}
