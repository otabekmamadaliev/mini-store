// Self-contained SVG hero: a green shopping basket brimming with groceries.
// Reveal + float are CSS (see .hero-basket / .hero-float in pages.css) so the
// basket is always visible, even under reduced motion.
export default function HeroBasket() {
  return (
    <div className="hero-basket reveal reveal-d2">
      <svg className="hero-float" viewBox="0 0 460 420" width="100%" role="img"
        aria-label="A MiniStore basket full of everyday products">
        <defs>
          <linearGradient id="basketBody" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#3a7d47" />
            <stop offset="1" stopColor="#255530" />
          </linearGradient>
          <linearGradient id="chipsG" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffd23f" /><stop offset="1" stopColor="#f0a500" />
          </linearGradient>
        </defs>

        <ellipse cx="230" cy="392" rx="150" ry="20" fill="#1b2620" opacity="0.10" />

        {/* soap bottle */}
        <g transform="translate(96 150)">
          <rect x="6" y="-26" width="20" height="28" rx="4" fill="#2f2f2f" />
          <rect x="-8" y="0" width="52" height="120" rx="12" fill="#fbfbf7" />
          <rect x="2" y="66" width="34" height="40" rx="5" fill="#eaf1e6" />
          <rect x="2" y="16" width="34" height="34" rx="5" fill="#dfe8f5" opacity="0.7" />
        </g>
        {/* chips bag */}
        <g transform="translate(168 116) rotate(6)">
          <path d="M0 8 Q40 -2 80 8 L84 150 Q42 158 -4 150 Z" fill="url(#chipsG)" />
          <path d="M2 4 l8 -14 h60 l8 14 Q40 -4 2 4 Z" fill="#f0a500" />
          <rect x="12" y="52" width="56" height="34" rx="5" fill="#e23b2e" />
          <rect x="20" y="96" width="40" height="8" rx="4" fill="#fff" opacity="0.6" />
        </g>
        {/* cola can */}
        <g transform="translate(268 140)">
          <rect x="0" y="0" width="56" height="118" rx="12" fill="#e2241a" />
          <rect x="0" y="0" width="56" height="12" rx="6" fill="#cfcfcf" />
          <rect x="0" y="6" width="56" height="6" fill="#e8e8e8" />
          <ellipse cx="28" cy="58" rx="24" ry="12" fill="#fff" />
          <rect x="0" y="86" width="56" height="8" fill="#b81b12" opacity="0.5" />
        </g>
        {/* paper towel roll */}
        <g transform="translate(346 150)">
          <rect x="0" y="0" width="46" height="112" rx="10" fill="#ffffff" />
          <rect x="0" y="42" width="46" height="26" fill="#3f8a4d" />
          <line x1="14" y1="0" x2="14" y2="112" stroke="#e6e6e6" strokeWidth="2" />
          <line x1="32" y1="0" x2="32" y2="112" stroke="#e6e6e6" strokeWidth="2" />
        </g>

        {/* basket */}
        <rect x="60" y="222" width="340" height="26" rx="12" fill="#2f6b3d" />
        <path d="M70 244 h320 l-24 150 a10 10 0 0 1 -10 8 H104 a10 10 0 0 1 -10 -8 Z" fill="url(#basketBody)" />
        <g fill="#20482a" opacity="0.55">
          {Array.from({ length: 4 }).map((_, row) =>
            Array.from({ length: 11 }).map((_, col) => (
              <rect key={`${row}-${col}`}
                x={96 + col * 24} y={266 + row * 26}
                width="14" height="15" rx="3" />
            ))
          )}
        </g>
        <text x="230" y="378" textAnchor="middle" fontFamily="Poppins, sans-serif"
          fontWeight="700" fontSize="30" fill="#ffffff" opacity="0.96">MiniStore</text>
      </svg>

      <span className="hero-blob" aria-hidden="true" />
    </div>
  );
}
