interface LogoProps {
  light?: boolean
  width?: number
}

export default function Logo({ light = false, width = 200 }: LogoProps) {
  const textPrimary = light ? '#ffffff' : '#1A2766'
  const textBold    = light ? '#ffffff' : '#0f1a2e'

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 580 140"
      width={width}
      height={Math.round(width * (140 / 580))}
      aria-label="SellYourAuto.ca"
      role="img"
      style={{ display: 'block', flexShrink: 0 }}
    >
      <defs>
        <linearGradient id="sya-badge" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%"   stopColor="#1A2766" />
          <stop offset="55%"  stopColor="#1A2766" />
          <stop offset="100%" stopColor="#00B2D8" />
        </linearGradient>
      </defs>

      {/* Badge */}
      <rect width="140" height="140" rx="22" fill="url(#sya-badge)" />

      {/* Car — white silhouette with evenodd headlight + grille cutouts */}
      <path
        fill="white"
        fillRule="evenodd"
        d={[
          // Outer body
          'M 36,16',
          'Q 70,10 104,16',
          'L 118,42',
          'Q 128,56 128,74',
          'Q 128,92 120,104',
          'C 118,120 95,128 88,104',
          'Q 80,109 70,109',
          'Q 60,109 52,104',
          'C 45,128 22,120 20,104',
          'Q 12,92 12,74',
          'Q 12,56 22,42',
          'Z',
          // Left headlight hole
          'M 24,76 A 17,13 0 1,0 58,76 A 17,13 0 1,0 24,76 Z',
          // Right headlight hole
          'M 82,76 A 17,13 0 1,0 116,76 A 17,13 0 1,0 82,76 Z',
          // Grille hole (rounded rect)
          'M 62,86 L 78,86 Q 83,86 83,91 Q 83,97 78,97 L 62,97 Q 57,97 57,91 Q 57,86 62,86 Z',
        ].join(' ')}
      />

      {/* "sellyour" */}
      <text
        x="158"
        y="58"
        fontFamily="'Poppins', system-ui, sans-serif"
        fontSize="50"
        fontWeight="600"
        fill={textPrimary}
        style={{ transition: 'fill 0.35s' }}
      >
        sellyour
      </text>

      {/* "auto.ca." */}
      <text
        x="158"
        y="133"
        fontFamily="'Poppins', system-ui, sans-serif"
        fontSize="78"
        fontWeight="800"
        letterSpacing="-1"
      >
        <tspan fill={textBold} style={{ transition: 'fill 0.35s' }}>auto.</tspan>
        <tspan fill="#00B2D8">ca.</tspan>
      </text>
    </svg>
  )
}
