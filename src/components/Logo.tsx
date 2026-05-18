interface LogoProps {
  light?: boolean
  className?: string
  style?: React.CSSProperties
}

export default function Logo({ light = false, className, style }: LogoProps) {
  const text1 = light ? '#ffffff' : '#1A2766'   // "sellyour"
  const text2 = light ? '#ffffff' : '#0d1a2e'   // "auto."

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 510 138"
      aria-label="SellYourAuto.ca"
      role="img"
      className={className}
      style={{ display: 'block', height: '100%', width: 'auto', ...style }}
    >
      <defs>
        <linearGradient id="syaBadge" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%"   stopColor="#1A2766" />
          <stop offset="58%"  stopColor="#1A2766" />
          <stop offset="100%" stopColor="#00AACC" />
        </linearGradient>
      </defs>

      {/* ── Badge ── */}
      <rect width="138" height="138" rx="21" fill="url(#syaBadge)" />

      {/* ── Car silhouette (white, evenodd cutouts for headlights + grille) ── */}
      <path
        fill="white"
        fillRule="evenodd"
        d={
          // Outer body
          'M 35,15 Q 69,9 103,15 L 117,41 Q 127,55 127,73 Q 127,91 119,103' +
          ' C 117,119 94,127 87,103 Q 79,108 69,108 Q 59,108 51,103' +
          ' C 44,127 21,119 19,103 Q 11,91 11,73 Q 11,55 21,41 Z' +
          // Left headlight hole
          ' M 23,74 A 17,12 0 1,0 57,74 A 17,12 0 1,0 23,74 Z' +
          // Right headlight hole
          ' M 81,74 A 17,12 0 1,0 115,74 A 17,12 0 1,0 81,74 Z' +
          // Grille hole
          ' M 61,85 L 77,85 Q 82,85 82,90 Q 82,96 77,96 L 61,96 Q 56,96 56,90 Q 56,85 61,85 Z'
        }
      />

      {/* ── "sellyour" ── */}
      <text
        x="153"
        y="55"
        fontFamily="'Poppins', system-ui, sans-serif"
        fontSize="47"
        fontWeight="600"
        fill={text1}
      >
        sellyour
      </text>

      {/* ── "auto.ca." ── */}
      <text
        x="153"
        y="129"
        fontFamily="'Poppins', system-ui, sans-serif"
        fontSize="75"
        fontWeight="800"
        letterSpacing="-1"
      >
        <tspan fill={text2}>auto.</tspan>
        <tspan fill="#00B2D8">ca.</tspan>
      </text>
    </svg>
  )
}
