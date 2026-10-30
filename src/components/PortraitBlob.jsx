// Hero illustration for a cutout portrait. viewBox 1200 × 1000 (same pixel space as before, so the photo placement is unchanged).
//
// Design intent: quiet, editorial, tonal. One deep-navy circle is the hero; everything else is a whisper.
// Layers, back to front:
//   1 soft glow · 2 orbit ring (partly hidden by the circle) · 3 offset echo circle · 4 main circle · 5 small accents · 6 photo cutout
//
// Why a near-circle: it is the calmest frame for a head-and-shoulders cutout. The head rises above the top edge
// and the shoulders fill the widest part. Above the circle's widest point the figure is free to overflow it;
// below that, the figure follows the circle's own outline and fades into the navy (see CROP and the pb-fade mask).
// The outline is a true circle softened by tiny differences between the four quarters, so it reads as hand-drawn.
//
// Colours are CSS variables with built-in fallbacks, so it works with no extra CSS. Override on a parent to retheme:
//   --blob-a   top highlight of the circle      (dull steel blue)
//   --blob-m   mid tone                         (slate navy)
//   --blob-b   base tone                        (deep navy)
//   --blob-back / --blob-back2   echo circle gradient
//   --blob-glow   blurred halo      --blob-line   ring + edge lines      --blob-accent   dots
//   --blob-shadow   drop shadows    --blob-rim   hairline rim light on the figure
//   --blob-tint   colour the bottom of the figure sinks into (match --blob-b)
// Pointer parallax uses --tx / --ty written by useTilt on the parent (0 on touch / reduced motion).

// Main shape: centre (600, 590), radius 400. Each quarter's handle length differs by a few px for a soft, organic edge.
// Every join is horizontal or vertical, so the outline has no kinks.
const MAIN =
  'M600 190C825 190 1000 365 1000 590C1000 805 820 990 600 990' +
  'C375 990 200 815 200 590C200 365 385 190 600 190Z';

// Vertical nudge for the circle if the head in your cutout sits higher or lower (positive = down).
const BLOB_Y = 0;

// Centre of the circle, used for the scale / offset helpers below.
const CX = 600;
const CY = 590;

// Orbit ring: a slightly oval, tilted ring around the circle. Drawn behind it, so only the outer arcs show.
const RING = { cx: CX, cy: CY, rx: 490, ry: 440, rot: -18 };

// Dot grid, outside the circle's lower-right edge
const DOTS = [0, 1, 2, 3].flatMap((c) => [0, 1, 2].map((r) => [1004 + c * 22, 744 + r * 22]));

// Photo placement: the 760 × 848 cutout is scaled and placed so the head sits at the upper centre of the circle
const PHOTO_W = 760;
const PHOTO_H = 848;
const SCALE = 1.05;
const PHOTO = `translate(198 110) scale(${SCALE})`;

// Photo crop: the figure is free above the circle's widest point (y = CY), so head and shoulders can overflow the
// circle. Below that line it is clipped to the circle itself. The two sub-paths wind the same way, so they union
// cleanly, and the join is vertical on both sides: no sliver, no floating cut edge, no kink.
const CROP = `M-400 -600H1600V${CY}H-400Z` + MAIN;

// Where the bottom of the figure dissolves into the circle (canvas y)
const FADE_FROM = 800;
const FADE_TO = 975;

// Extra navy tone laid over the lower part of the figure so it settles into the circle
const TINT_FROM = 690;
const TINT_TO = 960;
const TINT_STRENGTH = 0.4;

const px = (x, y) => ({
  transform: `translate(calc(var(--tx, 0) * ${x}px), calc(var(--ty, 0) * ${y}px))`,
  transition: 'transform 0.25s cubic-bezier(0.22, 0.61, 0.36, 1)',
  willChange: 'transform',
});

// scale around the circle centre, then move by (dx, dy)
const around = (s, dx = 0, dy = 0) =>
  `translate(${dx} ${dy}) translate(${CX} ${CY}) scale(${s}) translate(${-CX} ${-CY})`;

const c = (name, fallback) => `var(${name}, ${fallback})`;

export default function PortraitBlob({ src, alt }) {
  const line = c('--blob-line', '#9db3d1');
  const accent = c('--blob-accent', '#8aa3c6');

  // the photo is drawn twice (plain + navy tint), so keep its props in one place
  const photoProps = {
    href: src,
    x: 0,
    y: 0,
    width: PHOTO_W,
    height: PHOTO_H,
    transform: PHOTO,
    // keeps the cutout's real proportions even if the file is not exactly 760 × 848
    preserveAspectRatio: 'xMidYMax meet',
  };

  return (
    <svg className="portrait-svg" viewBox="0 0 1200 1000" role="img" aria-label={alt} style={{ overflow: 'visible' }}>
      <defs>
        {/* circle: dull steel blue at the upper right, falling to deep navy at the base */}
        <linearGradient id="pb-main" gradientUnits="userSpaceOnUse" x1="860" y1="210" x2="360" y2="990">
          <stop offset="0" style={{ stopColor: c('--blob-a', '#5f7898') }} />
          <stop offset="0.48" style={{ stopColor: c('--blob-m', '#2d4566') }} />
          <stop offset="1" style={{ stopColor: c('--blob-b', '#121f35') }} />
        </linearGradient>
        <linearGradient id="pb-back" gradientUnits="userSpaceOnUse" x1="400" y1="160" x2="900" y2="900">
          <stop offset="0" style={{ stopColor: c('--blob-back', '#4a6385') }} />
          <stop offset="1" style={{ stopColor: c('--blob-back2', '#1b2d48') }} />
        </linearGradient>
        {/* a faint light from above, so the circle reads as a soft surface and not a flat fill */}
        <radialGradient id="pb-light" gradientUnits="userSpaceOnUse" cx="700" cy="270" r="520">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.1" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        {/* base falloff: deepens the bottom of the circle */}
        <linearGradient id="pb-base" gradientUnits="userSpaceOnUse" x1="0" y1="720" x2="0" y2="990">
          <stop offset="0" stopColor="#0a1426" stopOpacity="0" />
          <stop offset="1" stopColor="#0a1426" stopOpacity="0.38" />
        </linearGradient>

        {/* figure mask: fully visible down to FADE_FROM, then dissolves into the circle by FADE_TO */}
        <linearGradient id="pb-fade-grad" gradientUnits="userSpaceOnUse" x1="0" y1={FADE_FROM} x2="0" y2={FADE_TO}>
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#000000" />
        </linearGradient>
        <mask id="pb-fade" maskUnits="userSpaceOnUse" x="-400" y="-600" width="2000" height="1700">
          <rect x="-400" y="-600" width="2000" height="1700" fill="url(#pb-fade-grad)" />
        </mask>

        {/* tint mask: how strongly the navy tone shows on the figure, growing toward the bottom */}
        <linearGradient id="pb-tint-grad" gradientUnits="userSpaceOnUse" x1="0" y1={TINT_FROM} x2="0" y2={TINT_TO}>
          <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="1" stopColor="#ffffff" stopOpacity={TINT_STRENGTH} />
        </linearGradient>
        <mask id="pb-tint-mask" maskUnits="userSpaceOnUse" x="-400" y="-600" width="2000" height="1700">
          <rect x="-400" y="-600" width="2000" height="1700" fill="url(#pb-tint-grad)" />
        </mask>
        {/* flat navy silhouette of the photo (same alpha, solid colour) */}
        <filter id="pb-tint" x="0" y="0" width="100%" height="100%">
          <feFlood style={{ floodColor: c('--blob-tint', '#0a1426') }} result="navy" />
          <feComposite in="navy" in2="SourceAlpha" operator="in" />
        </filter>

        <filter id="pb-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="52" />
        </filter>
        <filter id="pb-shadow-main" x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="26" stdDeviation="30" style={{ floodColor: c('--blob-shadow', '#050c1a') }} floodOpacity="0.45" />
        </filter>
        {/* figure: a very faint cool rim, then a soft contact shadow */}
        <filter id="pb-figure" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow in="SourceGraphic" dx="-1" dy="-0.8" stdDeviation="0.6" style={{ floodColor: c('--blob-rim', '#b7c9e2') }} floodOpacity="0.1" result="rim" />
          <feDropShadow in="rim" dx="0" dy="20" stdDeviation="16" style={{ floodColor: c('--blob-shadow', '#050c1a') }} floodOpacity="0.4" />
        </filter>
        <clipPath id="pb-fit" clipPathUnits="userSpaceOnUse">
          <path d={CROP} clipRule="nonzero" />
        </clipPath>
      </defs>

      <g transform={`translate(0 ${BLOB_Y})`}>
        {/* 1 · glow */}
        <path
          d={MAIN}
          filter="url(#pb-glow)"
          style={{ fill: c('--blob-glow', '#3d5a85') }}
          opacity="0.32"
          transform={around(0.94, 0, 44)}
        />

        {/* 2 · orbit ring: one fine line, mostly hidden behind the circle */}
        <g style={px(-10, -6)}>
          <ellipse
            cx={RING.cx}
            cy={RING.cy}
            rx={RING.rx}
            ry={RING.ry}
            transform={`rotate(${RING.rot} ${RING.cx} ${RING.cy})`}
            fill="none"
            strokeWidth="1.6"
            style={{ stroke: line }}
            opacity="0.32"
          />
        </g>

        {/* 3 · echo circle: a smaller translucent copy tucked behind the upper right, plus a fine offset outline lower left */}
        <g style={px(12, 7)}>
          <path d={MAIN} fill="url(#pb-back)" opacity="0.5" transform={around(0.9, 62, -46)} />
          <path
            d={MAIN}
            fill="none"
            strokeWidth="1.6"
            style={{ stroke: line }}
            opacity="0.28"
            transform={around(1.1, -26, 20)}
          />
        </g>

        {/* 4 · main circle */}
        <g style={px(-4, -3)}>
          <path d={MAIN} fill="url(#pb-main)" filter="url(#pb-shadow-main)" />
          <path d={MAIN} fill="url(#pb-light)" />
          <path d={MAIN} fill="url(#pb-base)" />
          <path d={MAIN} fill="none" strokeWidth="1.5" style={{ stroke: line }} opacity="0.2" />
        </g>

        {/* 5 · accents: two satellites on the ring and a quiet dot grid */}
        <g style={px(-9, -5)}>
          <circle cx="935" cy="250" r="7" style={{ fill: accent }} opacity="0.85" />
          <circle cx="209" cy="875" r="13" fill="none" strokeWidth="1.6" style={{ stroke: accent }} opacity="0.7" />
          <g style={{ fill: accent }} opacity="0.4">
            {DOTS.map(([x, y]) => (
              <circle key={`${x}-${y}`} cx={x} cy={y} r="2.6" />
            ))}
          </g>
        </g>
      </g>

      {/* 6 · photo cutout, in front of everything.
           Free to overflow the circle above its widest point; below that it follows the circle,
           dissolves into the navy at the base, and picks up a navy tone so it settles into the surface. */}
      <g filter="url(#pb-figure)">
        <g transform={`translate(0 ${BLOB_Y})`}>
          <g style={px(-4, -3)} clipPath="url(#pb-fit)">
            <g style={px(7, 4)}>
              <g mask="url(#pb-fade)">
                <image {...photoProps} />
                <g mask="url(#pb-tint-mask)">
                  <image {...photoProps} filter="url(#pb-tint)" />
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}
