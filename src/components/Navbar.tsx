'use client'

import { useEffect, useState } from 'react'

const links = [
  { href: '#about', label: 'About' },
  { href: '#how-it-works', label: 'How It Works' },
  { href: '#values', label: 'Our Values' },
  { href: '#testimonials', label: 'Reviews' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <nav
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        transition: 'background 0.4s, backdrop-filter 0.4s, border-color 0.4s',
        background: scrolled ? 'rgba(8,8,8,0.93)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent',
      }}
    >
      {/* Desktop nav */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 80, padding: '0 48px', maxWidth: 1400, margin: '0 auto' }}>
        {/* Logo */}
        <a href="#hero" style={{ display: 'flex', alignItems: 'center', gap: 14, color: '#FAFAF8' }}>
          <span style={{
            width: 44, height: 44, background: '#C9A96E', color: '#080808',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--font-serif)', fontSize: 16, fontWeight: 600, letterSpacing: '0.05em', flexShrink: 0,
          }}>SYA</span>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 500, letterSpacing: '0.06em', lineHeight: 1.3, textTransform: 'uppercase' }}>
            SellYourAuto<br />
            <small style={{ fontSize: 10, fontWeight: 400, letterSpacing: '0.12em', opacity: 0.6 }}>Canada's Best Offer</small>
          </span>
        </a>

        {/* Desktop links */}
        <ul style={{ display: 'flex', alignItems: 'center', gap: 36, listStyle: 'none' }} className="hidden-mobile">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#FAFAF8')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
              >{l.label}</a>
            </li>
          ))}
          <li>
            <a href="#appraisal" style={{
              color: '#C9A96E', border: '1px solid #C9A96E', padding: '8px 20px',
              fontSize: 12, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase',
              transition: 'background 0.2s, color 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = '#C9A96E'; e.currentTarget.style.color = '#080808' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#C9A96E' }}
            >Get My Offer</a>
          </li>
        </ul>

        {/* Burger */}
        <button
          onClick={() => setMenuOpen(o => !o)}
          style={{ display: 'none', flexDirection: 'column', gap: 5, background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
          className="burger-btn"
          aria-label="Toggle menu"
        >
          <span style={{ display: 'block', width: 24, height: 1.5, background: '#FAFAF8', transition: 'transform 0.3s, opacity 0.3s', transform: menuOpen ? 'rotate(45deg) translate(4.5px, 4.5px)' : 'none' }} />
          <span style={{ display: 'block', width: 24, height: 1.5, background: '#FAFAF8', transition: 'opacity 0.3s', opacity: menuOpen ? 0 : 1 }} />
          <span style={{ display: 'block', width: 24, height: 1.5, background: '#FAFAF8', transition: 'transform 0.3s', transform: menuOpen ? 'rotate(-45deg) translate(4.5px, -4.5px)' : 'none' }} />
        </button>
      </div>

      {/* Mobile menu */}
      <div style={{
        background: '#080808', borderTop: '1px solid rgba(255,255,255,0.08)',
        maxHeight: menuOpen ? 400 : 0, overflow: 'hidden', transition: 'max-height 0.4s',
      }}>
        {[...links, { href: '#appraisal', label: 'Get My Offer' }].map((l) => (
          <a key={l.href} href={l.href} onClick={closeMenu} style={{
            display: 'block', color: 'rgba(255,255,255,0.7)', fontSize: 13, fontWeight: 500,
            letterSpacing: '0.1em', textTransform: 'uppercase', padding: '18px 48px',
            borderBottom: '1px solid rgba(255,255,255,0.08)', transition: 'color 0.2s, padding-left 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.color = '#C9A96E'; e.currentTarget.style.paddingLeft = '56px' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; e.currentTarget.style.paddingLeft = '48px' }}
          >{l.label}</a>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .burger-btn { display: flex !important; }
        }
      `}</style>
    </nav>
  )
}
