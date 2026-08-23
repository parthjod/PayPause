// src/components/CinemaScroll/SightsSlider/icons.tsx
// All icons: 40×40, stroke #fdf1e1, stroke-width 1.6, fill none, rounded linecaps.

export function IconShieldCheck() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none"
         stroke="#fdf1e1" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 5 L33 10 V20 C33 27.5 27 33.5 20 36 C13 33.5 7 27.5 7 20 V10 Z" />
      <polyline points="15,20 18.5,23.5 25,17" />
    </svg>
  );
}

export function IconQRGrid() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none"
         stroke="#fdf1e1" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="7"  y="7"  width="10" height="10" rx="1.5" />
      <rect x="23" y="7"  width="10" height="10" rx="1.5" />
      <rect x="7"  y="23" width="10" height="10" rx="1.5" />
      <rect x="17" y="17" width="6"  height="6"  rx="1" />
    </svg>
  );
}

export function IconPhoneLock() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none"
         stroke="#fdf1e1" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="10" y="4" width="20" height="32" rx="3" />
      <rect x="16" y="18" width="8" height="7" rx="1.5" />
      <path d="M17 18 V16 a3 3 0 0 1 6 0 V18" />
    </svg>
  );
}

export function IconDualBubble() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none"
         stroke="#fdf1e1" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      {/* Primary bubble */}
      <path d="M5 7 H22 Q26 7 26 11 V18 Q26 22 22 22 H14 L9 27 V22 H5 Q2 22 2 18 V11 Q2 7 5 7 Z" />
      <text x="14" y="18" textAnchor="middle" fontSize="8"
            fill="#fdf1e1" stroke="none" fontFamily="Georgia, serif">A</text>
      {/* Secondary bubble (offset, slightly transparent) */}
      <path d="M18 22 H30 Q35 22 35 26 V32 Q35 36 30 36 H24 L20 39 V36 H18 Q14 36 14 32 V26 Q14 22 18 22 Z"
            opacity="0.65" />
      <text x="26" y="32" textAnchor="middle" fontSize="8"
            fill="#fdf1e1" stroke="none" fontFamily="serif">अ</text>
    </svg>
  );
}

export function IconLightbulb() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none"
         stroke="#fdf1e1" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 5 a10 10 0 0 1 6 18 L24 28 H16 L14 23 a10 10 0 0 1 6 -18 Z" />
      <line x1="16" y1="31" x2="24" y2="31" />
      <line x1="17" y1="34" x2="23" y2="34" />
      <line x1="18.5" y1="37" x2="21.5" y2="37" />
    </svg>
  );
}
