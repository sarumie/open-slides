---
name: Warm Editorial
description: Warm ivory pages, near-black sans-serif type, burnt-amber accents — an editorial look with strong contrast.
mode: light
---

# Warm Editorial

## Palette

| Role   | Value     | Notes                          |
| ------ | --------- | ------------------------------ |
| bg     | `#faf6f0` | warm ivory page background     |
| text   | `#1c1917` | near-black warm ink            |
| accent | `#c2410c` | burnt amber — eyebrow, callouts, key numbers |
| muted  | `#78716c` | secondary copy, dividers       |
| line   | `#e7e0d5` | hairline borders, rules        |

## Typography

- Display font: `system-ui, -apple-system, 'Segoe UI', sans-serif` — weight 800–900 for headlines.
- Body font: `system-ui, -apple-system, 'Segoe UI', sans-serif` — weight 400–500.
- No webfont import — system stack, crisp at all sizes.
- Type-scale overrides (defaults from `slide-authoring`):
  - Hero title: 160 px
  - Section heading: 96 px
  - Body text: 36 px
  - Caption / eyebrow: 26 px

## Layout

- Content padding: 140 px from canvas edges (1920 × 1080).
- Alignment: left-aligned, single column. Headlines flush left, ragged-right body.
- Rhythm: 32 px between eyebrow and title, 48 px below titles, 64 px between blocks.
- Optional hairline rules (`1px solid #e7e0d5`) separate eyebrow rows and footer.

## Fixed components

These are paste-ready. Copy them verbatim into a slide that uses this theme.

### Title

```tsx
const Title = ({ children }: { children: React.ReactNode }) => (
  <h1
    style={{
      fontSize: 160,
      fontWeight: 900,
      lineHeight: 1.05,
      letterSpacing: '-0.02em',
      margin: 0,
      maxWidth: 1500,
      color: '#1c1917',
    }}
  >
    {children}
  </h1>
);
```

### Footer

Pull the page number from `useSlidePageNumber()` — never hardcode `pageNum` / `total` props.

```tsx
import { useSlidePageNumber } from '@open-slide/core';

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
        color: '#78716c',
      }}
    >
      <span>WARM EDITORIAL · 2026</span>
      <span>{current} / {total}</span>
    </div>
  );
};
```

### Eyebrow / accents (optional)

```tsx
const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      fontSize: 26,
      fontWeight: 600,
      letterSpacing: '0.18em',
      textTransform: 'uppercase',
      color: '#c2410c',
      paddingBottom: 20,
      borderBottom: '2px solid #e7e0d5',
    }}
  >
    {children}
  </div>
);
```

## Motion

- Philosophy: **subtle** — a quiet fade-up on entry; page changes snap.
- Reusable keyframes (paste-ready):

```css
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

Apply it sparingly — the eyebrow, then the title, once on mount. Never to the footer.

## Aesthetic

Warm type-led pages that borrow the structure of a printed op-ed or magazine spread: a flat ivory field, one dense black sans-serif headline with a short amber eyebrow, thin hairline rules, and generous margins. Contrast is the point — near-black ink on warm paper reads as high-contrast even in `light` mode. Avoid: gradients, drop shadows, rounded everything, decorative emoji, more than one accent color. Let whitespace and heavy type do the work.

## Example usage

```tsx
const Cover: Page = () => (
  <div style={{ width: '100%', height: '100%', background: '#faf6f0', color: '#1c1917', padding: '0 140px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
    <Eyebrow>CHAPTER 01</Eyebrow>
    <Title>The Big Idea</Title>
    <p style={{ fontSize: 36, fontWeight: 400, color: '#78716c', maxWidth: 1200, marginTop: 48, lineHeight: 1.5 }}>
      A short subtitle that explains what this slide is about.
    </p>
    <Footer />
  </div>
);
```