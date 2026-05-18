'use client'

interface MarqueeStripProps {
  items: string[]
}

export default function MarqueeStrip({ items }: MarqueeStripProps) {
  const doubled = [...items, ...items]

  return (
    <div style={{ background: '#C9A96E', padding: '14px 0', overflow: 'hidden', whiteSpace: 'nowrap' }}>
      <div className="marquee-track" style={{ display: 'inline-flex', gap: 32 }}>
        {doubled.map((item, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 32 }}>
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#080808' }}>
              {item}
            </span>
            <span style={{ color: 'rgba(8,8,8,0.4)', fontSize: 11 }}>·</span>
          </span>
        ))}
      </div>
    </div>
  )
}
