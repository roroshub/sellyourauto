'use client'

import { useEffect, useState } from 'react'

const links = [
  { href: '#about', label: 'About Us' },
  { href: '#how-it-works', label: 'How It Works' },
  { href: '#values', label: 'Why Us' },
  { href: '#testimonials', label: 'Reviews' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        transition: 'background 0.35s, box-shadow 0.35s',
        background: scrolled ? 'rgba(255,255,255,0.97)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
        boxShadow: scrolled ? '0 2px 24px rgba(26,39,102,0.10)' : 'none',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 76, padding: '0 clamp(20px,4vw,48px)', maxWidth: 1320, margin: '0 auto' }}>

        {/* Logo */}
        <a href="#hero" aria-label="SellYourAuto.ca home" style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="SellYourAuto.ca" style={{ height: 46, width: 'auto', display: 'block' }} />
        </a>

        {/* Desktop links */}
        <ul className="nav-links-desktop" style={{ display: 'flex', alignItems: 'center', gap: 32, listStyle: 'none' }}>
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} style={{
                color: scrolled ? '#1A2766' : 'rgba(255,255,255,0.9)',
                fontSize: 14, fontWeight: 500, letterSpacing: '0.01em',
                transition: 'color 0.2s', padding: '4px 0', position: 'relative',
              }}
                onMouseEnter={e => (e.currentTarget.style.color = '#00B2D8')}
                onMouseLeave={e => (e.currentTarget.style.color = scrolled ? '#1A2766' : 'rgba(255,255,255,0.9)')}
              >{l.label}</a>
            </li>
          ))}
          <li>
            <a href="#appraisal" style={{
              background: '#00B2D8', color: '#fff', padding: '11px 24px', borderRadius: 6,
              fontSize: 14, fontWeight: 600, letterSpacing: '0.01em',
              transition: 'background 0.2s, transform 0.2s, box-shadow 0.2s',
              display: 'inline-block',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = '#0099C0'; e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,178,216,0.4)' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#00B2D8'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}
            >Get Free Offer</a>
          </li>
        </ul>

        {/* Burger */}
        <button
          onClick={() => setMenuOpen(o => !o)}
          className="burger-btn"
          style={{ display: 'none', flexDirection: 'column', gap: 5, background: 'none', border: 'none', cursor: 'pointer', padding: 6, borderRadius: 4 }}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          {[0, 1, 2].map((i) => (
            <span key={i} style={{
              display: 'block', width: 22, height: 2, borderRadius: 2,
              background: scrolled ? '#1A2766' : '#fff',
              transition: 'transform 0.3s, opacity 0.3s',
              transform: i === 0 && menuOpen ? 'rotate(45deg) translate(5px, 5px)' : i === 2 && menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
              opacity: i === 1 && menuOpen ? 0 : 1,
            }} />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      <div style={{
        background: '#fff',
        borderTop: '1px solid rgba(26,39,102,0.08)',
        maxHeight: menuOpen ? 400 : 0, overflow: 'hidden',
        transition: 'max-height 0.4s var(--ease-smooth)',
        boxShadow: menuOpen ? '0 8px 24px rgba(26,39,102,0.12)' : 'none',
      }}>
        {[...links, { href: '#appraisal', label: 'Get Free Offer ↗' }].map((l) => (
          <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} style={{
            display: 'block', color: '#1A2766', fontSize: 15, fontWeight: 500,
            padding: '16px clamp(20px,4vw,48px)', borderBottom: '1px solid rgba(26,39,102,0.06)',
            transition: 'color 0.2s, background 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.color = '#00B2D8'; e.currentTarget.style.background = '#F0FBFF' }}
            onMouseLeave={e => { e.currentTarget.style.color = '#1A2766'; e.currentTarget.style.background = 'transparent' }}
          >{l.label}</a>
        ))}
      </div>

      <style>{`
        @media (max-width: 800px) {
          .nav-links-desktop { display: none !important; }
          .burger-btn { display: flex !important; }
        }
      `}</style>
    </nav>
  )
}
