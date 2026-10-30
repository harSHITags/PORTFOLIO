// The original pine-tree silhouette drawing, kept as the page's background illustration.
const TREES = {
  hero: {
    viewBox: '0 0 1200 170',
    items: [[-10, 40, 70, 130], [60, 70, 54, 100], [130, 30, 80, 140], [230, 80, 50, 90], [330, 55, 62, 115], [470, 95, 44, 75], [700, 90, 46, 80], [840, 60, 62, 110], [930, 85, 50, 85], [1010, 25, 84, 145], [1110, 65, 64, 105], [1170, 40, 70, 130]],
    ground: [160, 10],
  },
  footer: {
    viewBox: '0 0 1200 120',
    items: [[20, 30, 60, 90], [90, 55, 44, 65], [300, 60, 40, 60], [880, 55, 42, 65], [1010, 20, 64, 100], [1090, 50, 50, 70]],
    ground: [112, 8],
  },
};

export default function Pines({ variant = 'hero', className = 'trees' }) {
  const t = TREES[variant];
  const id = `pine-${variant}`;
  return (
    <svg className={className} viewBox={t.viewBox} preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <defs>
        <symbol id={id} viewBox="0 0 60 100">
          <path d="M30 0l18 34H38l16 28H40l16 30H34v8H26v-8H4l16-30H6l16-28H12z" />
        </symbol>
      </defs>
      {t.items.map(([x, y, w, h]) => (
        <use key={`${x}-${y}`} href={`#${id}`} x={x} y={y} width={w} height={h} />
      ))}
      <rect x="0" y={t.ground[0]} width="1200" height={t.ground[1]} />
    </svg>
  );
}
