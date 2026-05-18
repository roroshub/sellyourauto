'use client'

interface FooterProps {
  tagline: string
  copyright: string
  disclaimer: string
}

const navLinks = [
  { href: '#about', label: 'About Us' },
  { href: '#how-it-works', label: 'How It Works' },
  { href: '#values', label: 'Why Choose Us' },
  { href: '#testimonials', label: 'Customer Reviews' },
  { href: '#appraisal', label: 'Get a Free Offer' },
]

const vehicleTypes = [
  'Cars & Sedans', 'SUVs & Crossovers', 'Trucks & Pickup', 'Luxury & Exotic',
  'Electric Vehicles', 'Non-Running Vehicles',
]

export default function Footer({ tagline, copyright, disclaimer }: FooterProps) {
  return (
    <footer style={{ background: '#111B4E', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      {/* Main footer */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(48px,7vw,72px) clamp(20px,4vw,48px) clamp(36px,5vw,52px)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 'clamp(28px,4vw,48px)', marginBottom: 52 }}>

          {/* Brand */}
          <div style={{ minWidth: 200 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <div style={{ width: 42, height: 42, borderRadius: 10, background: 'linear-gradient(135deg, #00B2D8, #1A2766)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, fontWeight: 800, color: '#fff', fontFamily: 'var(--font-display)', letterSpacing: '-0.02em', border: '1.5px solid rgba(255,255,255,0.2)' }}>SYA</div>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 700, color: '#fff', letterSpacing: '0.02em' }}>SellYourAuto<span style={{ color: '#00B2D8' }}>.ca</span></div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em' }}>Canada&rsquo;s Best Offer</div>
              </div>
            </div>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontStyle: 'italic', color: 'rgba(255,255,255,0.45)', marginBottom: 10, fontWeight: 400 }}>&ldquo;{tagline}&rdquo;</p>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)' }}>Proudly Canadian · Est. 2020</p>
          </div>

          {/* Navigate */}
          <div>
            <h3 style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 20 }}>Navigate</h3>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {navLinks.map(l => (
                <li key={l.href}>
                  <a href={l.href} style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#00B2D8')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
                  >{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* We Buy */}
          <div>
            <h3 style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 20 }}>We Buy</h3>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {vehicleTypes.map(v => (
                <li key={v} style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>{v}</li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 20 }}>Contact</h3>
            <a href="mailto:support@sellyourauto.ca" style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', display: 'block', marginBottom: 8, transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#00B2D8')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
            >support@sellyourauto.ca</a>
            <a href="tel:18007355288" style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', display: 'block', marginBottom: 4, transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#00B2D8')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
            >1-800-SELL-AUTO</a>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', marginBottom: 20 }}>Available 24/7</p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {[{ label: 'IG', aria: 'Instagram' }, { label: 'FB', aria: 'Facebook' }, { label: 'TW', aria: 'Twitter/X' }, { label: 'YT', aria: 'YouTube' }].map(s => (
                <a key={s.label} href="#" aria-label={s.aria} style={{ width: 36, height: 36, border: '1px solid rgba(255,255,255,0.15)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.45)', transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#00B2D8'; e.currentTarget.style.color = '#00B2D8'; e.currentTarget.style.background = 'rgba(0,178,216,0.1)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = 'rgba(255,255,255,0.45)'; e.currentTarget.style.background = 'transparent' }}
                >{s.label}</a>
              ))}
            </div>
          </div>

        </div>

        {/* CTA banner */}
        <div style={{ background: 'rgba(0,178,216,0.12)', border: '1px solid rgba(0,178,216,0.25)', borderRadius: 12, padding: '20px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 40 }}>
          <div>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 2 }}>Ready to sell your car?</p>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)' }}>Get a free guaranteed offer in 2 minutes.</p>
          </div>
          <a href="#appraisal" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', background: '#00B2D8', color: '#fff', fontSize: 13, fontWeight: 700, borderRadius: 8, transition: 'all 0.2s', fontFamily: 'var(--font-display)', whiteSpace: 'nowrap' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#0099C0' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#00B2D8' }}
          >Get Free Offer →</a>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)' }}>{copyright}</p>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)' }}>{disclaimer}</p>
        </div>
      </div>
    </footer>
  )
}
