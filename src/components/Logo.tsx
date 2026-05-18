interface LogoProps {
  light?: boolean
  className?: string
  style?: React.CSSProperties
}

export default function Logo({ light = false, className, style }: LogoProps) {
  const text1 = light ? '#ffffff' : '#1A2766'
  const text2 = light ? '#ffffff' : '#0f1830'

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 522 140"
      aria-label="SellYourAuto.ca"
      role="img"
      className={className}
      style={{ display: 'block', height: '100%', width: 'auto', ...style }}
    >
      <defs>
        {/* Sharp two-tone diagonal: cyan top-right triangle, navy bottom-left */}
        <linearGradient id="syaBadge" x1="1" y1="0" x2="0" y2="1">
          <stop offset="33%" stopColor="#00AACC" />
          <stop offset="33%" stopColor="#1A2766" />
        </linearGradient>
      </defs>

      {/* Badge */}
      <rect width="140" height="140" rx="22" fill="url(#syaBadge)" />

      {/* Car — white silhouette with evenodd cutouts */}
      <path
        fill="white"
        fillRule="evenodd"
        d={[
          // ── Outer body (clockwise from roof-left) ──
          // Roof arch
          'M 34,13 Q 70,7 106,13',
          // Right A-pillar
          'L 119,41',
          // Right side mirror bump
          'L 128,44 Q 134,52 128,59',
          // Right body
          'Q 130,72 130,78 Q 130,96 122,108',
          // Right wheel arch
          'C 120,124 99,132 88,109',
          // Centre bottom
          'Q 79,114 70,114 Q 61,114 52,109',
          // Left wheel arch
          'C 41,132 20,124 18,108',
          // Left body
          'Q 10,96 10,78 Q 10,72 12,59',
          // Left side mirror bump
          'Q 6,52 12,44 L 21,41',
          // Close → left A-pillar back to roof-left
          'Z',

          // ── Left headlight hole ──
          'M 18,81 A 20,14 0 1,0 58,81 A 20,14 0 1,0 18,81 Z',

          // ── Right headlight hole ──
          'M 82,81 A 20,14 0 1,0 122,81 A 20,14 0 1,0 82,81 Z',

          // ── Wide smile / grille ──
          'M 26,101 L 114,101 Q 120,101 120,108 Q 120,114 114,114 L 26,114 Q 20,114 20,108 Q 20,101 26,101 Z',
        ].join(' ')}
      />

      {/* "sellyour" */}
      <text
        x="155"
        y="55"
        fontFamily="'Poppins', system-ui, sans-serif"
        fontSize="47"
        fontWeight="600"
        fill={text1}
      >sellyour</text>

      {/* "auto.ca." */}
      <text
        x="155"
        y="130"
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
