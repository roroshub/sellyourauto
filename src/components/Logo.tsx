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
        d={[
          // Outer body — clear cabin arch + wide lower body + wheel arches
          'M 32,14 Q 69,8 106,14 L 120,42 Q 128,56 128,73',
          'Q 128,92 120,104 C 118,120 98,128 88,106',
          'Q 79,111 69,111 Q 59,111 50,106',
          'C 40,128 20,120 18,104 Q 10,92 10,73 Q 10,56 18,42 Z',
          // Left headlight
          'M 19,79 A 19,13 0 1,0 57,79 A 19,13 0 1,0 19,79 Z',
          // Right headlight
          'M 81,79 A 19,13 0 1,0 119,79 A 19,13 0 1,0 81,79 Z',
          // Bumper/grille bar (wide, below headlights)
          'M 55,97 L 83,97 Q 88,97 88,102 Q 88,108 83,108 L 55,108 Q 50,108 50,102 Q 50,97 55,97 Z',
        ].join(' ')}
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
        <tspan fill="#00B2D8">ca</tspan>
      </text>
    </svg>
  )
}
