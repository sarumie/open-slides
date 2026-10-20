---
name: Zellige Green
description: Islamic geometric craft in deep teal, olive lime, and cream, set in modern geometric type.
mode: light
---

# Zellige Green

## Palette

| Role    | Value     | Notes                                    |
| ------- | --------- | ---------------------------------------- |
| bg      | `#f7f6e8` | cream page ground                        |
| surface | `#fdfdf4` | cards, quiet panels                      |
| text    | `#0d3b4a` | deep teal-navy ink, all primary copy     |
| accent  | `#8fae3c` | olive lime: eyebrows, key numbers, motif |
| primary | `#14664f` | zellige green: rules, links, emphasis    |
| muted   | `#8c8c8c` | secondary copy, captions, page numbers   |
| line    | `#dedcc9` | hairline dividers on cream               |

## Typography

- Display font: `Outfit, 'Segoe UI', system-ui, sans-serif` — geometric, modern; weight 300 for large display, 600–700 for headings.
- Body font: `Inter, 'Segoe UI', system-ui, sans-serif` — weight 400–500.
- Webfont import: `https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700&family=Inter:wght@400;500&display=swap` — load once from module top level, `<link>` id keyed to the slide id (see `references/webfonts.md`).
- Type-scale overrides (only what differs from `slide-authoring` defaults):
  - Hero title: 152 px, weight 300, letter-spacing `-0.02em`
  - Section heading: 88 px, weight 600
  - Body text: 34 px
  - Caption / eyebrow: 24 px, letter-spacing `0.18em`, uppercase

## Layout

- Content padding: 130 px horizontal, 120 px vertical (1920 × 1080).
- Alignment: left-aligned single column; cover may split 62 / 38 with a geometric motif panel on the right.
- Grid: 12 columns, 48 px gutter; keep one strong vertical axis, generous air above the footer.
- Footer sits 56 px from the bottom, inside the same 130 px margins.

## Fixed components

Paste these verbatim into a slide that uses this theme.

### Title

```tsx
const Title = ({ children }: { children: React.ReactNode }) => (
  <h1
    style={{
      fontSize: 152,
      fontWeight: 300,
      lineHeight: 1.04,
      letterSpacing: '-0.02em',
      margin: 0,
      maxWidth: 1400,
      color: '#0d3b4a',
      fontFamily: "Outfit, 'Segoe UI', system-ui, sans-serif",
    }}
  >
    {children}
  </h1>
);
```

### Footer

```tsx
import { useSlidePageNumber } from '@open-slide/core';

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
        color: '#8c8c8c',
        fontFamily: "Inter, 'Segoe UI', system-ui, sans-serif",
      }}
    >
      <span>Zellige Green</span>
      <span>{current} / {total}</span>
    </div>
  );
};
```

### Eyebrow / accents

```tsx
const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      fontSize: 24,
      fontWeight: 500,
      letterSpacing: '0.18em',
      textTransform: 'uppercase',
      color: '#8fae3c',
      fontFamily: "Inter, 'Segoe UI', system-ui, sans-serif",
    }}
  >
    {children}
  </div>
);
```

### Geometric motif

An eight-point star rosette, the recurring Islamic-geometry signature of this theme. Use it as a large cover panel, a watermark at 6–10 % opacity, or a 1:1 badge.

```tsx
const StarMotif = ({ size = 360, color = '#14664f', stroke = 6 }: { size?: number; color?: string; stroke?: number }) => {
  const d = `M${size / 2} 0 L${size * 0.62} ${size * 0.38} L${size} ${size / 2} L${size * 0.62} ${size * 0.62} L${size / 2} ${size} L${size * 0.38} ${size * 0.62} L0 ${size / 2} L${size * 0.38} ${size * 0.38} Z`;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: 'block' }}>
      <path d={d} fill="none" stroke={color} strokeWidth={stroke} strokeLinejoin="round" />
      <circle cx={size / 2} cy={size / 2} r={size * 0.16} fill="none" stroke={color} strokeWidth={stroke} />
    </svg>
  );
};
```

## Motion

- Philosophy: **subtle** — geometry is already decorative; motion only reveals, never performs. Fades and 24 px rises, 500 ms, staggered 80 ms.
- Reusable keyframes:

```css
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

## Aesthetic

Modern Islamic editorial: the craft of zellige tilework reduced to two greens and cream, with oversized light-weight geometric type doing the talking. Flat fills only — no gradients, no drop shadows, no glossy cards; hairlines and star rosettes carry the ornament. Avoid orientalist clutter: no arabesque wallpaper, no gold, no pseudo-Arabic display type. The reference is contemporary Gulf and North African branding, not a tourist poster.

## Example usage

```tsx
const Cover: Page = () => (
  <div
    style={{
      width: '100%',
      height: '100%',
      background: '#f7f6e8',
      color: '#0d3b4a',
      padding: '120px 130px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      boxSizing: 'border-box',
    }}
  >
    <Eyebrow>Chapter 01</Eyebrow>
    <Title>Geometry, quietly.</Title>
    <p style={{ fontSize: 34, color: '#8c8c8c', maxWidth: 1000, marginTop: 40, lineHeight: 1.6 }}>
      A short subtitle that explains what this deck is about.
    </p>
    <Footer />
  </div>
);
```
