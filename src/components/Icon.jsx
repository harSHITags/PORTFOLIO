import { ICONS } from '../data/icons.js';

// Relative luminance of a brand colour, read from the SVG's `--c:#rrggbb`.
function luminance(hex) {
  const n = parseInt(hex, 16);
  const ch = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * ch[0] + 0.7152 * ch[1] + 0.0722 * ch[2];
}

// Brand marks that are too dark to read on the dark theme get a lift (see .ico.dim in global.css).
const DIM = new Set(
  Object.entries(ICONS)
    .filter(([, svg]) => {
      if (svg.includes('class="lg mono"')) return false; // follows the theme text colour already
      // single-colour marks carry --c; multi-colour ones carry inline fill="#rrggbb" (first one is the dominant brand colour)
      const m = svg.match(/--c:#([0-9a-f]{6})/i) || svg.match(/fill="#([0-9a-f]{6})"/i);
      return m && luminance(m[1]) < 0.12;
    })
    .map(([k]) => k)
);

// Renders one of the bundled, trusted static SVG marks (see data/icons.js).
export default function Icon({ name }) {
  const svg = ICONS[name];
  if (!svg) return null;
  return <span className={`ico${DIM.has(name) ? ' dim' : ''}`} aria-hidden="true" dangerouslySetInnerHTML={{ __html: svg }} />;
}
