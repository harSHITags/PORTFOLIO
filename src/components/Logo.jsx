import { LOGO_PATH, LOGO_VIEWBOX } from '../data/logoPath.js';

// Site logo. Filled with the theme gradient (--lg1 → --lg2) so it works in dark and light mode.
// To swap the artwork again, replace src/data/logoPath.js.
export default function Logo({ className = 'logo-mark' }) {
  return (
    <svg className={className} viewBox={LOGO_VIEWBOX} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="logo-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" style={{ stopColor: 'var(--lg1)' }} />
          <stop offset="1" style={{ stopColor: 'var(--lg2)' }} />
        </linearGradient>
      </defs>
      {/* hairline stroke thickens the thin script strokes so they hold up at nav size */}
      <path fill="url(#logo-grad)" stroke="url(#logo-grad)" strokeWidth="0.45" strokeLinejoin="round" d={LOGO_PATH} />
    </svg>
  );
}
