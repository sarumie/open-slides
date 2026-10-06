import { type Page, type DesignSystem, useSlidePageNumber } from '@open-slide/core';

const bg = '#faf6f0';
const text = '#1c1917';
const accent = '#c2410c';
const muted = '#78716c';
const line = '#e7e0d5';

export const design: DesignSystem = {
  palette: { bg, text, accent },
  fonts: {
    display: "system-ui, -apple-system, 'Segoe UI', sans-serif",
    body: "system-ui, -apple-system, 'Segoe UI', sans-serif",
  },
  typeScale: { hero: 160, body: 36 },
  radius: 0,
};

const Title = ({ children }: { children: React.ReactNode }) => (
  <h1
    style={{
      fontSize: 160,
      fontWeight: 900,
      lineHeight: 1.05,
      letterSpacing: '-0.02em',
      margin: 0,
      maxWidth: 1500,
      color: text,
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
        left: 140,
        right: 140,
        bottom: 56,
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: 24,
        letterSpacing: '0.08em',
        color: muted,
      }}
    >
      <span>WARM EDITORIAL · 2026</span>
      <span>
        {current} / {total}
      </span>
    </div>
  );
};

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      fontSize: 26,
      fontWeight: 600,
      letterSpacing: '0.18em',
      textTransform: 'uppercase',
      color: accent,
      paddingBottom: 20,
      borderBottom: `2px solid ${line}`,
    }}
  >
    {children}
  </div>
);

const fill = {
  width: '100%',
  height: '100%',
  background: bg,
  color: text,
} as const;

const Cover: Page = () => (
  <div
    style={{
      ...fill,
      padding: '0 140px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    }}
  >
    <Eyebrow>Chapter 01</Eyebrow>
    <Title>The Big Idea</Title>
    <p
      style={{
        fontSize: 36,
        color: muted,
        maxWidth: 1200,
        marginTop: 48,
        lineHeight: 1.5,
      }}
    >
      A short subtitle that explains what this slide is about.
    </p>
    <Footer />
  </div>
);

const Content: Page = () => (
  <div style={{ ...fill, padding: '140px' }}>
    <Eyebrow>Section 02</Eyebrow>
    <h2 style={{ fontSize: 96, fontWeight: 900, lineHeight: 1.1, marginTop: 48, marginBottom: 0 }}>
      Warm ink on paper
    </h2>
    <p style={{ fontSize: 36, color: muted, maxWidth: 1240, marginTop: 48, lineHeight: 1.6 }}>
      Two or three lines of body copy that read like the lede of a magazine
      feature — unhurried, left-aligned, plenty of whitespace.
    </p>
    <div style={{ display: 'flex', gap: 48, marginTop: 80 }}>
      <div style={{ fontSize: 116, fontWeight: 900, color: accent }}>04</div>
      <div style={{ fontSize: 116, fontWeight: 900, color: accent }}>12</div>
      <div style={{ fontSize: 116, fontWeight: 900, color: accent }}>48</div>
    </div>
    <div
      style={{
        display: 'flex',
        gap: 48,
        fontSize: 26,
        color: muted,
        marginTop: 8,
        letterSpacing: '0.06em',
      }}
    >
      <span>CHAPTERS</span>
      <span>FEATURES</span>
      <span>PAGES</span>
    </div>
    <Footer />
  </div>
);

const Closer: Page = () => (
  <div
    style={{
      ...fill,
      padding: '0 140px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    }}
  >
    <Eyebrow>To be continued</Eyebrow>
    <Title>Keep reading.</Title>
    <p style={{ fontSize: 36, color: muted, maxWidth: 1100, marginTop: 48, lineHeight: 1.5 }}>
      A closing line that leaves the room thinking — heavy type, quiet page.
    </p>
    <Footer />
  </div>
);

export default [Cover, Content, Closer];