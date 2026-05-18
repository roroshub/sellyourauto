'use client'

interface FooterProps {
  tagline: string
  copyright: string
  disclaimer: string
}

const navLinks = [
  { href: '#about', label: 'About Us' },
  { href: '#how-it-works', label: 'How It Works' },
  { href: '#values', label: 'Our Values' },
  { href: '#testimonials', label: 'Reviews' },
  { href: '#appraisal', label: 'Get an Offer' },
]

export default function Footer({ tagline, copyright, disclaimer }: FooterProps) {
  return (
    <footer style={{ background: '#080808', borderTop: '1px solid rgba(255,255,255,0.08)', padding: 'clamp(60px,8vw,80px) 0 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(24px,4vw,40px)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'clamp(32px,5vw,60px)', marginBottom: 64 }}>

          {/* Brand */}
          <div style={{ gridColumn: 'span 1' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, color: '#FAFAF8', marginBottom: 20 }}>
              <span style={{ width: 44, height: 44, background: '#C9A96E', color: '#080808', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-serif)', fontSize: 14, fontWeight: 600, letterSpacing: '0.05em', flexShrink: 0 }}>SYA</span>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 500, letterSpacing: '0.06em', lineHeight: 1.3, textTransform: 'uppercase' }}>
                SellYourAuto<br />
                <small style={{ fontSize: 10, fontWeight: 400, letterSpacing: '0.12em', opacity: 0.6 }}>Canada's Best Offer</small>
              </span>
            </div>
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: 20, fontStyle: 'italic', color: 'rgba(255,255,255,0.4)', marginBottom: 8 }}>{tagline}</p>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.06em' }}>Proudly Canadian · Est. 2020</p>
          </div>

          {/* Nav */}
          <div>
            <h4 style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 24 }}>Navigate</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#C9A96E')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
                  >{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* What we buy */}
          <div>
            <h4 style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 24 }}>We Buy All Types</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {['Cars & Sedans', 'SUVs & Crossovers', 'Trucks & Vans', 'Luxury & Exotic', 'Electric Vehicles', 'Non-Running Vehicles'].map((item) => (
                <li key={item} style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 24 }}>Contact</h4>
            <a href="mailto:support@sellyourauto.ca" style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: 8, transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#C9A96E')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
            >support@sellyourauto.ca</a>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>1-800-SELL-AUTO</p>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)' }}>Available 24/7</p>
            <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
              {['IG', 'FB', 'TW', 'YT'].map((s) => (
                <a key={s} href="#" aria-label={s} style={{ width: 40, height: 40, border: '1px solid rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, letterSpacing: '0.05em', color: 'rgba(255,255,255,0.4)', transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#C9A96E'; e.currentTarget.style.color = '#C9A96E' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = 'rgba(255,255,255,0.4)' }}
                >{s}</a>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: '28px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.2)' }}>{copyright}</p>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.2)' }}>{disclaimer}</p>
        </div>
      </div>
    </footer>
  )
}
