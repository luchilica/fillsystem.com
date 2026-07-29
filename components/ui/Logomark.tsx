import type { CSSProperties } from "react";

// Fill System brand mark — "Signet O".
// A signet-weight monogram ring whose stroke flows from
// the blue accent (top-right) smoothly into ink around the rest of the ring —
// blue = the found insight, ink = the operational whole. A soft drop shadow +
// a specular highlight (light from the top-left) give the ring a little volume.
// No literal iconography.
//
// Note: the ring is a self-contained gradient (not currentColor), so it is
// tuned for light surfaces — the only place it renders today (header, favicon
// tile, OG card). A dark-surface variant can be added if ever needed.
export default function Logomark({
  size = 32,
  className,
  style,
}: {
  size?: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={className}
      style={style}
    >
      <defs>
        {/* Blue (top-right) → ink, sweeping toward the bottom-left. */}
        <linearGradient id="opsfieldRing" x1="1" y1="0" x2="0.25" y2="0.9">
          <stop offset="0" stopColor="#5C86FF" />
          <stop offset="0.22" stopColor="#2551D2" />
          <stop offset="0.46" stopColor="#0A0A0F" />
          <stop offset="1" stopColor="#0A0A0F" />
        </linearGradient>
        <filter
          id="opsfieldShadow"
          x="-60%"
          y="-60%"
          width="220%"
          height="220%"
        >
          <feDropShadow
            dx="0"
            dy="0.55"
            stdDeviation="0.75"
            floodColor="#0A0A0F"
            floodOpacity="0.38"
          />
        </filter>
        <filter id="opsfieldSoft" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="1.1" />
        </filter>
      </defs>

      <g filter="url(#opsfieldShadow)">
        <circle
          cx="16"
          cy="16"
          r="11.5"
          stroke="url(#opsfieldRing)"
          strokeWidth="3.6"
        />
      </g>
      {/* Specular highlight — soft glossy catch at the top-left. */}
      <ellipse
        cx="9.6"
        cy="8"
        rx="3.1"
        ry="1.7"
        fill="#ffffff"
        opacity="0.72"
        filter="url(#opsfieldSoft)"
        transform="rotate(-42 9.6 8)"
      />
    </svg>
  );
}
