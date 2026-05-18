'use client'

interface MarqueeStripProps {
  items: string[]
}

export default function MarqueeStrip({ items }: MarqueeStripProps) {
  const doubled = [...items, ...items]
  return (
    <div style={{ background: '#1A2766', padding: '13px 0', overflow: 'hidden', whiteSpace: 'nowrap' }} aria-hidden="true">
      <div className="marquee-track" style={{ display: 'inline-flex', gap: 0, willChange: 'transform' }}>
        {doubled.map((item, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 20, padding: '0 20px' }}>
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.85)' }}>
              {item}
            </span>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#00B2D8', display: 'inline-block', flexShrink: 0 }} />
          </span>
        ))}
      </div>
    </div>
  )
}
