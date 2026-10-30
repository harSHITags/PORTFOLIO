// Hero illustration, traced from the reference artwork (viewBox 1200 × 1000 = the reference's own pixel space).
// Layers, back to front:
//   1 soft glow · 2 accent shapes · 3 main blob · 4 orbit lines · 5 spheres, dots, dashes, sparkle · 6 the photo cutout
// The photo is never clipped by the blob. Only its bottom is trimmed, along a curve that follows the
// crossed forearms (the source photo ends at the hips with a straight edge, which the reference does not show).
// Pointer parallax uses the --tx / --ty variables written by useTilt on the parent (0 on touch / reduced motion).

// main cobalt-blue → cyan blob: tall rounded top, sloping right edge with a wide bulge, shoulder lobe on the left
const MAIN =
  'M740 78C862 80 902 226 962 290C1032 342 1096 404 1088 520C1084 604 1040 644 992 692' +
  'C930 760 900 852 780 903C680 927 560 902 470 842C380 782 292 762 236 682' +
  'C190 618 172 556 202 496C232 420 332 360 432 312C522 270 542 200 604 142C642 102 690 78 740 78Z';

// translucent background accent shapes
const LOBE_TOP = 'M248 372C240 236 336 148 470 138C540 133 584 150 606 162C524 220 484 284 402 322C338 352 270 398 248 372Z';
const LOBE_RIGHT = 'M926 266C1010 250 1092 326 1088 426C1086 448 1060 426 1002 346C972 312 940 292 926 266Z';
const LOBE_LOW = 'M148 650C128 558 194 556 212 640C284 742 402 800 472 842C380 832 270 822 192 782C150 752 144 702 148 650Z';

// thin orbit lines
const ORBIT_LEFT = 'M168 432C176 360 252 326 352 322';
const ORBIT_TOP = 'M640 102C722 60 836 58 884 122C912 160 918 200 912 224';
const ORBIT_LOW = 'M198 566C262 700 424 812 560 880C652 916 752 916 842 880C902 856 930 790 942 716';
const ORBIT_RIGHT = 'M1020 646C1056 684 1070 764 1030 812C992 858 904 890 836 862';

const SPARKLE = 'M0 -30C4 -11 11 -4 30 0C11 4 4 11 0 30C-4 11 -11 4 -30 0C-11 -4 -4 -11 0 -30Z';
const DOTS = [0, 1, 2, 3, 4].flatMap((c) => [0, 1].map((r) => [944 + c * 23, 448 + r * 26]));

// photo placement: the 760 × 848 cutout is scaled by SCALE and placed so the head sits at the upper centre of the blob
const SCALE = 1.05;
const PHOTO = `translate(198 110) scale(${SCALE})`;
// bottom trim in photo coordinates: follows the right sleeve underside, the cuffs and the left sleeve
const TRIM =
  'M-60 -60H820V540L612 560C602 640 572 722 502 750C440 760 382 752 332 750C300 752 278 768 256 773' +
  'C222 742 182 714 150 690C118 660 98 620 96 560H-60Z';

const px = (x, y) => ({ transform: `translate(calc(var(--tx, 0) * ${x}px), calc(var(--ty, 0) * ${y}px))` });

export default function PortraitBlob({ src, alt }) {
  return (
    <svg className="portrait-svg" viewBox="0 0 1200 1000" role="img" aria-label={alt}>
      <defs>
        <linearGradient id="pb-main" gradientUnits="userSpaceOnUse" x1="900" y1="90" x2="330" y2="860">
          <stop offset="0" style={{ stopColor: 'var(--blob-a)' }} />
          <stop offset="0.5" style={{ stopColor: 'var(--blob-m)' }} />
          <stop offset="1" style={{ stopColor: 'var(--blob-b)' }} />
        </linearGradient>
        <linearGradient id="pb-lobe" gradientUnits="userSpaceOnUse" x1="300" y1="140" x2="200" y2="800">
          <stop offset="0" style={{ stopColor: 'var(--blob-back)' }} />
          <stop offset="1" style={{ stopColor: 'var(--blob-back2)' }} />
        </linearGradient>
        <radialGradient id="pb-light" gradientUnits="userSpaceOnUse" cx="760" cy="200" r="460">
          <stop offset="0" stopColor="#fff" stopOpacity="0.16" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="pb-sphere" cx="0.3" cy="0.26" r="0.9">
          <stop offset="0" stopColor="var(--blob-sphere-0)" />
          <stop offset="0.45" stopColor="var(--blob-sphere-1)" />
          <stop offset="1" stopColor="var(--blob-sphere-2)" />
        </radialGradient>
        <filter id="pb-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="46" />
        </filter>
        <filter id="pb-shadow-main" x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="30" stdDeviation="28" floodColor="var(--blob-shadow)" floodOpacity="0.45" />
        </filter>
        <filter id="pb-sphere-shadow" x="-40%" y="-40%" width="180%" height="190%">
          <feDropShadow dx="0" dy="12" stdDeviation="11" floodColor="var(--blob-sphere-shadow)" floodOpacity="0.38" />
        </filter>
        {/* figure: a hairline cool rim, then a soft contact shadow */}
        <filter id="pb-figure" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow in="SourceGraphic" dx="-1.2" dy="-1" stdDeviation="0.5" floodColor="var(--blob-rim)" floodOpacity="0.2" result="rim" />
          <feDropShadow in="rim" dx="0" dy="20" stdDeviation="16" floodColor="var(--blob-shadow)" floodOpacity="0.4" />
        </filter>
        <clipPath id="pb-trim">
          <path d={TRIM} />
        </clipPath>
      </defs>

      {/* 1 · glow */}
      <path d={MAIN} className="pb-glow" filter="url(#pb-glow)" transform="translate(0 50) scale(0.96) translate(24 34)" />

      {/* 2 · accent shapes behind main blob */}
      <g style={px(14, 8)}>
        <path d={LOBE_TOP} fill="url(#pb-lobe)" />
        <path d={LOBE_RIGHT} fill="url(#pb-lobe)" />
        <path d={LOBE_LOW} fill="url(#pb-lobe)" />
      </g>

      {/* 3 · main blob */}
      <g style={px(-4, -3)}>
        <path d={MAIN} fill="url(#pb-main)" filter="url(#pb-shadow-main)" />
        <path d={MAIN} fill="url(#pb-light)" />
        <path d={MAIN} fill="none" className="pb-edge" strokeWidth="2" />
      </g>

      {/* 4 · orbit lines */}
      <g style={px(-10, -6)} fill="none" strokeLinecap="round" className="pb-sweep">
        <path d={ORBIT_LEFT} strokeWidth="2.4" />
        <path d={ORBIT_TOP} strokeWidth="2.4" />
        <path d={ORBIT_LOW} strokeWidth="2.6" />
        <path d={ORBIT_RIGHT} strokeWidth="2.4" />
      </g>

      {/* 5 · accents */}
      <g style={px(-9, -5)}>
        <circle cx="259" cy="244" r="22" fill="url(#pb-sphere)" opacity="0.92" />
        <circle cx="155" cy="508" r="70" fill="url(#pb-sphere)" filter="url(#pb-sphere-shadow)" />
        <circle cx="155" cy="508" r="70" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="3" />
        <circle cx="972" cy="674" r="49" fill="url(#pb-sphere)" filter="url(#pb-sphere-shadow)" />
        <circle cx="972" cy="674" r="49" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="2.5" />
        <g className="pb-dots">{DOTS.map(([x, y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r="3.4" />)}</g>
        <g className="pb-dash" strokeWidth="9" strokeLinecap="round" fill="none">
          <path d="M968 108L956 174" />
          <path d="M978 192L1024 150" />
        </g>
        <path d={SPARKLE} transform="translate(1132 590)" className="pb-spark" />
      </g>

      {/* 6 · photo cutout, in front of everything; trimmed only along the folded arms */}
      <g filter="url(#pb-figure)">
        <g style={px(7, 4)}>
          <image href={src} x="0" y="0" width="760" height="848" transform={PHOTO} clipPath="url(#pb-trim)" preserveAspectRatio="none" />
        </g>
      </g>
    </svg>
  );
}
