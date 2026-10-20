import { type Page, type DesignSystem, useSlidePageNumber } from '@open-slide/core';

const bg = '#f7f6e8';
const surface = '#fdfdf4';
const text = '#0d3b4a';
const accent = '#8fae3c';
const primary = '#14664f';
const muted = '#8c8c8c';
const line = '#dedcc9';

const display = "Outfit, 'Segoe UI', system-ui, sans-serif";
const body = "Inter, 'Segoe UI', system-ui, sans-serif";

const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700&family=Inter:wght@400;500&display=swap';
const FONT_LINK_ID = 'osd-webfont-zellige-green';
if (typeof document !== 'undefined') {
  let link = document.getElementById(FONT_LINK_ID) as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement('link');
    link.id = FONT_LINK_ID;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }
  if (link.href !== FONT_HREF) link.href = FONT_HREF;
}

export const design: DesignSystem = {
  palette: { bg, text, accent },
  fonts: { display, body },
  typeScale: { hero: 152, body: 34 },
  radius: 0,
};

const fill: React.CSSProperties = {
  width: '100%',
  height: '100%',
  background: bg,
  color: text,
  boxSizing: 'border-box',
  fontFamily: body,
  position: 'relative',
};

const Title = ({ children }: { children: React.ReactNode }) => (
  <h1
    style={{
      fontSize: 152,
      fontWeight: 300,
      lineHeight: 1.04,
      letterSpacing: '-0.02em',
      margin: 0,
      maxWidth: 1400,
      color: text,
      fontFamily: display,
    }}
  >
    {children}
  </h1>
);

const Footer = () => {
  const { current, total } = useSlidePageNumber();
  return (
    <div
      style={{
        position: 'absolute',
        left: 130,
        right: 130,
        bottom: 56,
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: 22,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color: muted,
        fontFamily: body,
      }}
    >
      <span>Zellige Green</span>
      <span>
        {current} / {total}
      </span>
    </div>
  );
};

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      fontSize: 24,
      fontWeight: 500,
      letterSpacing: '0.18em',
      textTransform: 'uppercase',
      color: accent,
      fontFamily: body,
    }}
  >
    {children}
  </div>
);

const StarMotif = ({
  size = 360,
  color = primary,
  stroke = 6,
}: {
  size?: number;
  color?: string;
  stroke?: number;
}) => {
  const d = `M${size / 2} 0 L${size * 0.62} ${size * 0.38} L${size} ${size / 2} L${size * 0.62} ${size * 0.62} L${size / 2} ${size} L${size * 0.38} ${size * 0.62} L0 ${size / 2} L${size * 0.38} ${size * 0.38} Z`;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: 'block' }}>
      <path d={d} fill="none" stroke={color} strokeWidth={stroke} strokeLinejoin="round" />
      <circle cx={size / 2} cy={size / 2} r={size * 0.16} fill="none" stroke={color} strokeWidth={stroke} />
    </svg>
  );
};

const Cover: Page = () => (
  <div style={{ ...fill, padding: '120px 130px', display: 'flex', alignItems: 'center', gap: 96 }}>
    <div style={{ flex: '1 1 0', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Eyebrow>Chapter 01</Eyebrow>
      <Title>Geometry, quietly.</Title>
      <p style={{ fontSize: 34, color: muted, maxWidth: 900, marginTop: 40, lineHeight: 1.6 }}>
        Eight-point stars, two greens, and a cream ground. A deck that looks crafted rather than decorated.
      </p>
    </div>

    <div
      style={{
        flex: '0 0 560px',
        height: 700,
        background: primary,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      <StarMotif size={380} color={bg} stroke={8} />
      <div
        style={{
          position: 'absolute',
          inset: 40,
          border: `1px solid rgba(247,246,232,0.35)`,
        }}
      />
    </div>

    <Footer />
  </div>
);

const pillars = [
  { n: '01', title: 'Tilework', copy: 'Repetition with rhythm: one star, tiled honestly.' },
  { n: '02', title: 'Two greens', copy: 'Deep zellige and olive lime, held by cream.' },
  { n: '03', title: 'Light type', copy: 'Geometric display at 152 px, weight 300.' },
];

const Content: Page = () => (
  <div style={{ ...fill, padding: '120px 130px' }}>
    <Eyebrow>Section 02</Eyebrow>
    <h2 style={{ fontSize: 88, fontWeight: 600, lineHeight: 1.1, letterSpacing: '-0.015em', margin: '40px 0 0', fontFamily: display }}>
      Three rules of the pattern
    </h2>
    <p style={{ fontSize: 34, color: muted, maxWidth: 1240, marginTop: 32, lineHeight: 1.6 }}>
      Every page keeps one vertical axis, wide margins, and ornament that stays flat: hairlines and star rosettes, never texture.
    </p>

    <div style={{ display: 'flex', gap: 48, marginTop: 72 }}>
      {pillars.map((p) => (
        <div
          key={p.n}
          style={{
            flex: '1 1 0',
            background: surface,
            borderTop: `3px solid ${primary}`,
            padding: '40px 40px 44px',
          }}
        >
          <div style={{ fontSize: 22, letterSpacing: '0.16em', color: accent, fontWeight: 500 }}>{p.n}</div>
          <div style={{ fontSize: 46, fontWeight: 600, marginTop: 20, fontFamily: display }}>{p.title}</div>
          <div style={{ fontSize: 28, color: muted, marginTop: 16, lineHeight: 1.55 }}>{p.copy}</div>
        </div>
      ))}
    </div>

    <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginTop: 72, borderTop: `1px solid ${line}`, paddingTop: 32 }}>
      <StarMotif size={48} stroke={4} color={primary} />
      <div style={{ fontSize: 24, color: muted, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
        One motif · three values · endless tiling
      </div>
    </div>

    <Footer />
  </div>
);

const Closer: Page = () => (
  <div
    style={{
      ...fill,
      background: primary,
      color: bg,
      padding: '120px 130px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      overflow: 'hidden',
    }}
  >
    <div style={{ position: 'absolute', right: -140, bottom: -160, opacity: 0.18 }}>
      <StarMotif size={620} color={bg} stroke={10} />
    </div>
    <div style={{ fontSize: 24, fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', color: accent }}>
      To be continued
    </div>
    <h1
      style={{
        fontSize: 152,
        fontWeight: 300,
        lineHeight: 1.04,
        letterSpacing: '-0.02em',
        margin: '32px 0 0',
        color: bg,
        fontFamily: display,
      }}
    >
      Keep tiling.
    </h1>
    <p style={{ fontSize: 34, color: 'rgba(247,246,232,0.72)', maxWidth: 900, marginTop: 32, lineHeight: 1.6 }}>
      Pick the theme again on the next deck and the greens will still agree.
    </p>
  </div>
);

export default [Cover, Content, Closer];
