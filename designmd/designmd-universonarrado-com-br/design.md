# Cursos | Universo Narrado — Style Reference
> Extracted 2026-11-16 from https://universonarrado.com.br/cursos#trilha

**Theme:** light

Cursos | Universo Narrado (universonarrado.com.br) reads as a light, layered interface built on a Museo/Young Serif type pairing. Structurally it relies on fully-rounded pill shapes as its signature geometry, and soft shadows lift key surfaces off the canvas — while brand accent (#03203d) carries the interactive energy. Motion is snappy and utilitarian, averaging 140ms on interactive transitions. Typography runs from 13px up to 67px across 9 steps, and the spacing system sits on a 4-unit base with 24px container padding.

## Contents

- [At a Glance](#at-a-glance)
- [Tokens — Colors](#tokens-colors)
- [Tokens — Typography](#tokens-typography)
- [Tokens — Spacing & Shapes](#tokens-spacing-shapes)
- [Tokens — Motion](#tokens-motion)
- [Design Token System](#design-token-system)
- [Micro-interactions](#micro-interactions)
- [Component State Matrix](#component-state-matrix)
- [Components](#components)
- [Component Census](#component-census)
- [Component API Sketch](#component-api-sketch)
- [Starter Components](#starter-components)
- [Do's and Don'ts](#dos-and-donts)
- [Surfaces](#surfaces)
- [Elevation](#elevation)
- [Imagery](#imagery)
- [Assets & Media](#assets-media)
- [Layout](#layout)
- [Page Blueprint](#page-blueprint)
- [Grid & Composition](#grid-composition)
- [Landing Page Anatomy](#landing-page-anatomy)
- [Hero & Conversion](#hero-conversion)
- [Signature Devices](#signature-devices)
- [Content & Copy](#content-copy)
- [Accessibility Profile](#accessibility-profile)
- [Responsive](#responsive)
- [Responsive Behaviour](#responsive-behaviour)
- [Agent Prompt Guide](#agent-prompt-guide)
- [Quick Start](#quick-start)
- [Rebuild Checklist](#rebuild-checklist)
- [Extraction Coverage](#extraction-coverage)

## At a Glance

The decisions that define this design. Everything below expands on these.

| Aspect | Value |
|--------|-------|
| Theme | light, comfortable density |
| Core colors | canvas `#ffffff`, surface `#0cf2b5`, text `#1c3752` (12.2:1), accent `#03203d` |
| Display type | Museo 400, 67px / 1.04, -1.33px tracking |
| Body type | Museo 300, 18px / 1.45 |
| Corner radius | 12px buttons, 16px cards, 28px cards, pills (9999px) |
| Spacing | 4px base unit, 1260px container, 24px card padding |
| Elevation | 2 shadow tiers, most used `rgb(3, 32, 61) 4px 4px 0px 0px` |
| Motion | 150ms default with `ease`, honours reduced motion |
| Breakpoints | 600px, 640px, 800px, 960px |
| Page flow | Hero → Content section → Content section → Content section → Content section → Content section → Content section |

## Tokens — Colors

| Name | Value | Token | Role |
|------|-------|-------|------|
| Canvas | `#ffffff` | `--color-bg-canvas` | Page background — the base layer every other surface floats on · 2.14% of usage |
| Primary Text | `#1c3752` | `--color-text-primary` | Primary copy, headings, high-emphasis UI labels — 12.2:1 against canvas · 31.55% of usage |
| Secondary Text | `#4a6079` | `--color-text-secondary` | Supporting copy and descriptions — 6.5:1 against canvas · 10.16% of usage |
| Brand Accent | `#03203d` | `--color-accent` | Primary interactive color — buttons, links, key fills carry the brand energy · 40.11% of usage |
| Surface | `#0cf2b5` | `--color-bg-surface` | Elevated container fill — cards, nav bars, panels sitting on the canvas · 9.09% of usage |
| Gray Light | `#eaf0ff` | `--color-gray-light` | Supporting surface / fill color · 1.6% of usage |
| Gray Light 2 | `#f1ecff` | `--color-gray-light-2` | Supporting surface / fill color · 1.6% of usage |
| Gray Light 3 | `#f9f3e3` | `--color-gray-light-3` | Supporting surface / fill color · 1.6% of usage |
| Gray Light 4 | `#fff9d6` | `--color-gray-light-4` | Supporting surface / fill color · 1.6% of usage |
| Gray Light 5 | `#e3e7eb` | `--color-gray-light-5` | Supporting border color · 0.53% of usage |

## Tokens — Typography

### Museo — display+body family
- **Weights:** 300, 700, 900
- **Sizes:** 64px, 48px, 40px, 22px, 20px, 18px, 17px, 15px
- **Role:** Workhorse family — used for both display headlines and body/UI text across weights 300/700/900.

### Young Serif — supporting family
- **Weights:** 300, 400
- **Sizes:** 66.5px, 20px, 15px
- **Role:** Supporting family for accents and specialized text.

### Type Scale

| Role | Size | Line Height | Letter Spacing | Weight | Family |
|------|------|-------------|----------------|--------|--------|
| display | 67px | 1.04 | -1.33px | 400 | Young Serif |
| heading-xl | 64px | 1.04 | -1.79px | 900 | Museo |
| heading-lg | 48px | 1.08 | -1.15px | 900 | Museo |
| heading | 40px | 1.08 | -0.96px | 900 | Museo |
| heading-sm | 22px | 1.45 | — | 300 | Museo |
| subheading | 20px | 1.2 | — | 700 | Museo |
| body | 18px | 1.45 | — | 300 | Museo |
| small | 15px | 1.55 | — | 300 | Museo |
| caption | 13px | 1.55 | 1.04px | 700 | Museo |

## Tokens — Spacing & Shapes

**Density:** comfortable

### Border Radius

| Context | Value | Usage |
|---------|-------|-------|
| card | 12px | 14 elements |
| button | 12px | 10 elements |
| tag | pill (fully rounded, 9999px) | 4 elements |

### Shadows

| Name | Value | Token |
|------|-------|-------|
| sm | `rgb(3, 32, 61) 4px 4px 0px 0px` | `--shadow-sm` |
| md | `rgba(255, 255, 255, 0.9) 4px 4px 0px 0px` | `--shadow-md` |

### Layout

- **Page max-width:** 1260px
- **Section gap:** not detected
- **Card padding:** 24px
- **Element gap:** 10px
- **Spacing base unit:** 4px

## Tokens — Motion

### Duration scale

| Token | Value | Use |
|-------|-------|-----|
| `--duration-fast` | 150ms | hover/color transitions (3 observed) |

### Easing

| Token | Value | Character |
|-------|-------|-----------|
| `--ease-custom-1` | `ease` | used 16× |

### Animation recipes (paste-ready)

```css
```

**Reduced motion:** the site defines `prefers-reduced-motion` overrides — replicate them.

## Design Token System

**Naming fingerprint:** bespoke — these 37 custom properties match no framework convention (Tailwind, shadcn/ui, MUI, Chakra, Bootstrap, Ant, Mantine, Material 3 and Open Props were all tested), and read as hand-authored: `--butter-300`, `--container`, `--cyan-300`, `--cyan-500`, `--dmat-100`.

**Scopes captured:** `:root` → light (37 vars).

### Variable groups

| Group | Kind | Count | Examples |
|---|---|---|---|
| `--ink` | color | 6 | `--ink-100: #E3E7EB` `--ink-200: #C5CDD6` |
| `--mint` | color | 4 | `--mint-200: #C3FBEB` `--mint-300: #8DF7DB` |
| `--cyan` | color | 2 | `--cyan-300: #8EF7FF` `--cyan-500: #18F0FF` |
| `--night` | color | 2 | `--night: #03203D` `--night-2: #0A2C4E` |
| `(ungrouped)` | mixed | 23 | `--butter-300: #FFE96B` `--container: 1200p…` |

### Detected numeric scales

- `--ink` — #E3E7EB / #C5CDD6 / #8A9AAD / #4A6079 / #1C3752 / #03203D (6 steps, colour ramp)
- `--mint` — #C3FBEB / #8DF7DB / #4FF5C8 / #0CF2B5 (4 steps, colour ramp)

**Tokenised coverage:** 100% of the page's most-used colours resolve to a variable — this design is genuinely tokenised, so rebuild against the variables rather than the hex values.

### Paste-ready token block

```css
:root {
  /* color */
  --ink-500: #4A6079;
  --ink-700: #1C3752;
  --ink-900: #03203D;
  --white: #FFFFFF;
  --mint-500: #0CF2B5;
  --butter-300: #FFE96B;
  --cyan-300: #8EF7FF;
  --cyan-500: #18F0FF;
  --dmat-100: #FFF9D6;
  --ink-100: #E3E7EB;
  --ink-200: #C5CDD6;
  --ink-300: #8A9AAD;
  --lc-100: #F9F3E3;
  --lf-100: #F1ECFF;
  --lilac-300: #CDBDFF;
  --lm-100: #EAF0FF;
  --mint-200: #C3FBEB;
  --mint-300: #8DF7DB;
  --mint-400: #4FF5C8;
  --night: #03203D;
  --night-2: #0A2C4E;
  --paper: #F5F4F0;
  --rose-300: #FFB8CB;
  /* space */
  --gutter: 32px;
  /* size */
  --measure: calc(var(--container) * .6);
  --container: 1200px;
  --section: 96px;
  --r-btn: 12px;
  --r-card: 16px;
  --r-panel: 28px;
  /* font */
  --font: "Museo", ui-rounded, "Segoe UI", system-ui, sans-serif;
  /* shadow */
  --shadow: 4px 4px 0 var(--ink-900);
  --shadow-press: 1px 1px 0 var(--ink-900);
  --shadow-hover: 6px 6px 0 var(--ink-900);
  /* other */
  --serif: "Young Serif", Georgia, serif;
  --line: 1px solid var(--ink-900);
  --line-soft: 1px solid var(--ink-100);
}
```

**Caveats:** 3 component/width-scoped var blocks skipped

## Micro-interactions

### Declared transitions

| Properties | Duration | Easing | Applies to |
|------------|----------|--------|------------|
| `background, transform, box-shadow` | 150ms | `ease` | button (10 elements) |
| `translate, box-shadow` | 150ms | `ease` | link (4 elements) |
| `transform, box-shadow` | 120ms | `ease` | element (2 elements) |

### Hover states (from live stylesheets)

- `.btn:hover` (10 elements) → box-shadow: var(--shadow-hover); transform: translate(-2px, -2px)
- `.on-night .btn:hover` (1 elements) → box-shadow: rgba(255, 255, 255, 0.9) 6px 6px
- `.nav-links a:hover` (4 elements) → color: var(--ink-900)
- `.trilha a:hover` (4 elements) → box-shadow: var(--shadow-press); translate: 0px -3px

### Active / pressed states

- `.btn:active` → box-shadow: var(--shadow-press); transform: translate(3px, 3px)
- `.on-night .btn:active` → box-shadow: rgba(255, 255, 255, 0.9) 1px 1px
- `.linha-seta:active` → box-shadow: var(--shadow-press); transform: translate(1px, 1px)
- `.palco-seta:active` → box-shadow: var(--shadow-press); transform: translate(1px, 1px)

### Interaction patterns

- **Hover language:** predominantly *elevation* (67% of 12 hover rules)
- **Cursor language:** pointer

## Component State Matrix

### Actions

**Primary button** — 7 instances · exemplar `a.btn` · measured 210×52px

| State | Shadow | Transform | Other |
|---|---|---|---|
| **Base** | `#03203d 4px 4px 0px 0px` | `none` | radius 12px · padding 0px 24px |
| Hover | 6px 6px 0 #03203D | translate(-2px, -2px) | — |
| Focus (`:focus-visible`) | — | — | outline 2px |
| Active / pressed | 1px 1px 0 #03203D | translate(3px, 3px) | — |

Transition recipe: `transition: background 0.15s ease, transform 0.12s ease, box-shadow 0.12s ease`

**Secondary button** — 2 instances · exemplar `a.btn` · measured 145×52px

| State | Shadow | Transform | Other |
|---|---|---|---|
| **Base** | `#03203d 4px 4px 0px 0px` | `none` | radius 12px · padding 0px 24px |
| Hover | 6px 6px 0 #03203D | translate(-2px, -2px) | — |
| Focus (`:focus-visible`) | — | — | outline 2px |
| Active / pressed | 1px 1px 0 #03203D | translate(3px, 3px) | — |

Transition recipe: `transition: background 0.15s ease, transform 0.12s ease, box-shadow 0.12s ease`

### Navigation

**Link** — 1 instance · exemplar `a` · measured 282×173px

| State | Shadow | Transform |
|---|---|---|
| **Base** | `none` | `none` |
| Hover | 1px 1px 0 #03203D | 0px -3px |

Transition recipe: `transition: translate 0.15s ease, box-shadow 0.15s ease`

**Nav item** — 4 instances · exemplar `a` · measured 124×39px

| State | Text |
|---|---|
| **Base** | `#1c3752` |
| Hover | #03203D |

**Link** — 1 instance · exemplar `a` · measured 282×173px

| State | Shadow | Transform |
|---|---|---|
| **Base** | `none` | `none` |
| Hover | 1px 1px 0 #03203D | 0px -3px |

Transition recipe: `transition: translate 0.15s ease, box-shadow 0.15s ease`

**Link** — 1 instance · exemplar `a` · measured 282×173px

| State | Shadow | Transform |
|---|---|---|
| **Base** | `none` | `none` |
| Hover | 1px 1px 0 #03203D | 0px -3px |

Transition recipe: `transition: translate 0.15s ease, box-shadow 0.15s ease`

### Surfaces

**Chip / badge** — 1 instance · exemplar `a.btn` · measured 78×40px

| State | Shadow | Transform | Other |
|---|---|---|---|
| **Base** | `#03203d 4px 4px 0px 0px` | `none` | radius 9999px · padding 0px 16px |
| Hover | 6px 6px 0 #03203D | translate(-2px, -2px) | — |
| Focus (`:focus-visible`) | — | — | outline 2px |
| Active / pressed | 1px 1px 0 #03203D | translate(3px, 3px) | — |

Transition recipe: `transition: background 0.15s ease, transform 0.12s ease, box-shadow 0.12s ease`

### Interaction language

- **Hover language:** dominantly *shadow*. Of the 7 of 8 archetypes that respond to hover, 86% shift shadow, 86% shift transform, 14% shift color (one archetype can move several at once); 1 archetype change nothing on hover.
- **Focus policy:** a real `outline` on 3 of 8 archetypes, scoped to `:focus-visible` so mouse clicks stay quiet.
- **Tap targets:** median 149×39px over 32 interactive elements; 18 (56%) fall under the 44px guidance — smallest: `a` 60×18px, `a` 75×18px.
- **Cursor language:** Chip / badge → `pointer`, Link → `pointer`, Nav item → `pointer`, Primary button → `pointer`, Secondary button → `pointer`. 8 non-interactive elements also carry `cursor: pointer` — the page signals clickability broadly.

## Components

### Filled #0cf2b5 button
**Role:** primary action

#0cf2b5 background, #03203d text, border-radius 12px, padding 0px 24px, Museo 700 17px, 1px solid rgb(3, 32, 61) border, rgb(3, 32, 61) 4px 4px 0px 0px shadow. Transitions: background, transform, box-shadow 0.15s, 0.12s, 0.12s.

### Ghost / outline button
**Role:** secondary variant (2 instances)

#00000000 background, #03203d text, border-radius 12px, padding 0px 24px, Museo 700 17px, 1px solid rgb(3, 32, 61) border, rgb(3, 32, 61) 4px 4px 0px 0px shadow. Transitions: background, transform, box-shadow 0.15s, 0.12s, 0.12s.

### Filled #0cf2b5 button
**Role:** secondary variant (1 instances)

#0cf2b5 background, #03203d text, border-radius 9999px, padding 0px 16px, Museo 700 15px, 1px solid rgb(3, 32, 61) border, rgb(3, 32, 61) 4px 4px 0px 0px shadow. Transitions: background, transform, box-shadow 0.15s, 0.12s, 0.12s.

### Text link (15 instances)

#1c3752 text, no underline by default, Museo 300 15px. Hover transition: all 0s.

### Heading stack

| Level | Sample | Font | Size | Line Height | Tracking |
|-------|--------|------|------|-------------|----------|
| H1 | Escolha o curso pelo ponto em  | Museo 900 | 64px | 66.56px | -1.792px |
| H2 | Quatro cursos, uma escada | Museo 900 | 48px | 51.84px | -1.152px |

## Component Census

Additional UI inventory detected on the page, with a measured exemplar per category:

| Component | Count | Measured exemplar |
|-----------|-------|-------------------|
| Badges / chips | 1 | bg rgb(12, 242, 181) · radius 9999px · pad 0px 16px · 1px solid rgb(3, 32, 61) |

## Component API Sketch

### Props, from the measured variants

```ts
// Every union member below was measured on this page. Nothing is invented.
type ButtonVariant = 'primary' | 'secondary';
type ButtonSize = 'sm' | 'md';  // measured padding: 0px 16px / 0px 24px

interface ButtonProps {
  variant?: ButtonVariant;   // "primary" is the default — 7 instances
  size?: ButtonSize;
  children: React.ReactNode;
}
```

### React + Tailwind, using the measured values

```jsx
// Primary button — measured: #0cf2b5 fill, #03203d text, 12px radius, 0px 24px padding, Museo 700 17px
export function Button({ children, ...props }) {
  return (
    <button
      className="inline-flex items-center justify-center font-bold text-[17px] rounded-xl px-6 py-0 bg-[#0cf2b5] text-[#03203d] transition-colors duration-[150ms] hover:-translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0cf2b5]"
      {...props}
    >
      {children}
    </button>
  );
}
```

_Arbitrary values (`px-[18px]`, `bg-[#4f46e5]`) appear wherever the measured number has no Tailwind scale token — that is deliberate; rounding them to the nearest token changes the design._

## Starter Components

Working React + Tailwind v4 components built from the measured values — the same numbers as the tables above, already wired to the `@theme` tokens in Quick Start. Hover, focus and active classes come from the Component State Matrix. Start here instead of from a blank file.

```tsx
// Starter components generated by DesignMD from https://universonarrado.com.br/cursos#trilha on 2026-11-16.
// Every value below was measured on the page. Needs the Tailwind v4 @theme block from design.md.
import * as React from 'react';

const cx = (...parts: unknown[]) => parts.filter(Boolean).join(' ');

/* ---------------------------------------------------------------- Button */
type ButtonVariant = 'primary' | 'secondary';

const buttonBase = 'inline-flex items-center justify-center gap-2 whitespace-nowrap font-display text-[17px] font-bold rounded-sm h-13 px-6 transition duration-150 ease-custom-1 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none';

const buttonVariants: Record<ButtonVariant, string> = {
  primary: 'bg-bg-surface text-accent border border-accent shadow-sm hover:shadow-[6px_6px_0_#03203D] active:shadow-[1px_1px_0_#03203D] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',  // measured on “Falar Com A Equipe”
  secondary: 'text-accent border border-accent shadow-sm hover:shadow-[6px_6px_0_#03203D] active:shadow-[1px_1px_0_#03203D] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',  // measured on “Ver A Trilha”
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export function Button({ variant = 'primary', className, ...props }: ButtonProps) {
  return <button className={cx(buttonBase, buttonVariants[variant], className)} {...props} />;
}

/* -------------------------------------------------------------- TextLink */
export function TextLink({ className, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a className={cx('text-text-primary font-light no-underline hover:underline underline-offset-4 transition-colors', className)} {...props} />;
}

/* ------------------------------------------------------- Layout */
export function Container({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cx('mx-auto w-full max-w-[1260px] px-8', className)} {...props} />;
}

export function Section({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return <section className={cx('py-24', className)} {...props} />;
}

/* --------------------------------------------------------------- Heading */
const headingSizes = {
  1: 'text-display font-normal',
  2: 'text-heading-xl font-black',
  3: 'text-heading-lg font-black',
  4: 'text-heading font-black',
} as const;

export function Heading({ level = 1, className, ...props }: React.HTMLAttributes<HTMLHeadingElement> & { level?: 1 | 2 | 3 | 4 }) {
  const Tag = (["h1","h2","h3","h4"] as const)[level - 1];
  return <Tag className={cx('font-display text-balance', headingSizes[level], className)} {...props} />;
}
```

## Do's and Don'ts

### Do
- Use `#ffffff` as the canvas and build every surface from the token table above — never invent intermediate grays
- Use #03203d exclusively for interactive moments (buttons, links, key fills) — it is the energy of the system
- Snap all spacing to the 4px base unit grid
- Use fully-rounded (pill, 9999px) radii for buttons and tags
- Default interactive transitions to 150ms with the extracted easing tokens

### Don't
- Do not introduce colors outside the 10-token palette extracted above
- Do not add springy/bounce motion — the source uses the timing functions listed under Tokens — Motion
- Do not stack multiple shadows — keep elevation minimal and let whitespace separate content

## Surfaces

| Level | Name | Value | Purpose |
|-------|------|-------|---------|
| 0 | Canvas | `#ffffff` | Page background — the base layer |
| 1 | Surface | `#0cf2b5` | Cards, nav bars, panels floating on the canvas |
| 2 | Accent fill | `#03203d` | Filled CTAs, highlight containers, brand moments |

## Elevation

- **Low:** `rgb(3, 32, 61) 4px 4px 0px 0px` (9 uses)
- **Mid:** `rgba(255, 255, 255, 0.9) 4px 4px 0px 0px` (1 uses)

## Imagery

10 raster images and 0 inline SVGs were found. Dominant aspect ratios: 0.72:1, 0.73:1, 5.58:1, 2.38:1. Photography or rendered imagery carries the visual weight.

## Assets & Media

### Image inventory

| Role | Rendered | Aspect | Fit | Loading | Alt |
|---|---|---|---|---|---|
| Content | 346×473px @1.7x · webp | 0.73:1 | contain | lazy | Capa do curso Desvendando a M… |
| Content | 346×473px @1.7x · webp | 0.73:1 | contain | lazy | Capa do curso Lições de Cálcu… |
| Content | 346×473px @1.7x · webp | 0.73:1 | contain | lazy | Capa do curso Lições de Física |
| Content | 346×473px @1.7x · webp | 0.73:1 | contain | lazy | Capa do curso Lições de Matem… |
| Thumbnail (above fold) | 176×243px @3.4x · webp | 0.72:1 | contain | — | **missing** |
| Thumbnail (above fold) | 176×243px @3.4x · webp | 0.72:1 | contain | — | **missing** |
| Thumbnail (above fold) | 176×243px @3.4x · webp | 0.72:1 | contain | — | **missing** |
| Thumbnail (above fold) | 176×243px @3.4x · webp | 0.72:1 | contain | — | **missing** |
| Logo | 228×96px @2.1x · webp | 2.38:1 | — | — | Universo Narrado |
| Logo (above fold) | 190×34px @2.5x · webp | 5.59:1 | — | — | Universo Narrado |

**Image pipeline:** 10 images; 60% ship a 2× source; 40% are lazy-loaded; 100% carry alt text; average aspect 1.38:1; formats webp ×10.

### Web fonts

| Family | Format | Weight | Display | Host |
|---|---|---|---|---|
| Young Serif | woff2 | 400 | swap | same-origin |
| Museo | woff2 | 300 | swap | same-origin |
| Museo | woff2 | 700 | swap | same-origin |
| Museo | woff2 | 900 | swap | same-origin |

The resolved fallback stacks — copy them verbatim; the fallbacks are what the page shows before the webfont lands:

```css
--font-body: Museo, ui-rounded, "Segoe UI", system-ui, sans-serif;
--font-heading: Museo, ui-rounded, "Segoe UI", system-ui, sans-serif;
```

_Headings and body share one family — the hierarchy is carried by weight and size alone._

**Font delivery:** self-hosted from `same-origin`. 4 faces registered, 4 actually loaded.

**Brand marks:** apple-touch-icon present.

## Layout

Content is centered in a ~1260px max-width container. Cards use ~24px padding. The hero heading is start-aligned.

## Page Blueprint

```text
┌──────────────────────────────────────────────────────────┐
│ HEADER                         88px · transparent on top │
├──────────────────────────────────────────────────────────┤
│ 1. HEADER                                  88px · 10% vh │
│   #ffffff · 3 cols · 1200px container                    │
├──────────────────────────────────────────────────────────┤
│ 2. HERO                                   699px · 77% vh │
│   #ffffff · 2 cols · 420px container                     │
├──────────────────────────────────────────────────────────┤
│ 3. CONTENT                                585px · 65% vh │
│   #ffffff · 720px container                              │
├──────────────────────────────────────────────────────────┤
│ 4. CONTENT                                699px · 77% vh │
│   #ffffff · 1 col · 682px container                      │
├──────────────────────────────────────────────────────────┤
│ 5. CONTENT                                746px · 83% vh │
│   #ffffff · 1 col · 454px container                      │
├──────────────────────────────────────────────────────────┤
│ 6. CONTENT                                699px · 77% vh │
│   #ffffff · 1 col · 682px container                      │
├──────────────────────────────────────────────────────────┤
│ 7. CONTENT                                699px · 77% vh │
│   #ffffff · 1 col · 454px container                      │
├──────────────────────────────────────────────────────────┤
│ 8. CONTENT                                558px · 62% vh │
│   #ffffff · 2 cols · 1200px container                    │
├──────────────────────────────────────────────────────────┤
│ 9. FOOTER                                 370px · 41% vh │
│   #ffffff · 4 cols · 1200px container                    │
├──────────────────────────────────────────────────────────┤
│ FOOTER                                 4 columns · 370px │
└──────────────────────────────────────────────────────────┘
```

| # | Band | Height | Container | Padding | Columns |
|---|---|---|---|---|---|
| 1 | Header | 88px (10% vh) | 1200px / 0px gutter | 0px | 3 |
| 2 | Hero | 699px (77% vh) | 420px / 0px gutter | 48px / 96px | 2 |
| 3 | Content | 585px (65% vh) | 720px / 0px gutter | 96px | — |
| 4 | Content | 699px (77% vh) | 682px / 0px gutter | 96px | 1 |
| 5 | Content | 746px (83% vh) | 454px / 0px gutter | 96px | 1 |
| 6 | Content | 699px (77% vh) | 682px / 0px gutter | 96px | 1 |
| 7 | Content | 699px (77% vh) | 454px / 0px gutter | 96px | 1 |
| 8 | Content | 558px (62% vh) | 1200px / 0px gutter | 96px | 2 |
| 9 | Footer | 370px (41% vh) | 1200px / 32px gutter | 64px / 32px | 4 |

_Identical on all 9 bands: background #ffffff._

### How to rebuild each band

**1 · Header** — 88px tall. Background `#ffffff`; inner surfaces use `#0cf2b5` on 100% of its elements. Content sits in a 1200px container with 0px side padding, vertical padding 0px top / 0px bottom, 3 columns at a 24px gap, items no narrower than 78px. Text is `#1c3752` at 12.2:1 against the band, set in Museo 300 15px/23px on 80% of its text and Museo 700 15px/15px on 20% of its text.

**2 · Hero** — 699px tall, about 77% of the viewport. Background `#ffffff`; inner surfaces use `#0cf2b5` on 20% of its elements and `#eaf0ff` on 20% of its elements. Content sits in a 420px container with 0px side padding, vertical padding 48px top / 96px bottom, 2 columns at a 16px gap, items no narrower than 202px. Text is `#03203d` at 16.4:1 against the band, set in Museo 700 17px/17px on 33% of its text and Museo 700 13px/20px on 17% of its text.

**3 · Content** — 585px tall, about 65% of the viewport. Background `#ffffff`; inner surfaces use `#eaf0ff` on 25% of its elements and `#f1ecff` on 25% of its elements. Content sits in a 720px container with 0px side padding, vertical padding 96px top / 96px bottom. Text is `#03203d` at 16.4:1 against the band, set in Museo 300 18px/28px on 27% of its text and Museo 700 20px/24px on 27% of its text.

**4 · Content** — 699px tall, about 77% of the viewport. Background `#ffffff`; inner surfaces use `#0cf2b5` on 50% of its elements and `#fff9d6` on 50% of its elements. Content sits in a 682px container with 0px side padding, vertical padding 96px top / 96px bottom, a single column. Text is `#1c3752` at 12.2:1 against the band, set in Museo 300 18px/26px on 43% of its text and Museo 700 13px/20px on 14% of its text.

**5 · Content** — 746px tall, about 83% of the viewport. Background `#ffffff`; inner surfaces use `#0cf2b5` on 50% of its elements and `#eaf0ff` on 50% of its elements. Content sits in a 454px container with 0px side padding, vertical padding 96px top / 96px bottom, a single column. Text is `#1c3752` at 12.2:1 against the band, set in Museo 300 18px/26px on 43% of its text and Museo 700 13px/20px on 14% of its text.

**6 · Content** — 699px tall, about 77% of the viewport. Background `#ffffff`; inner surfaces use `#0cf2b5` on 50% of its elements and `#f1ecff` on 50% of its elements. Content sits in a 682px container with 0px side padding, vertical padding 96px top / 96px bottom, a single column. Text is `#1c3752` at 12.2:1 against the band, set in Museo 300 18px/26px on 43% of its text and Museo 700 13px/20px on 14% of its text.

**7 · Content** — 699px tall, about 77% of the viewport. Background `#ffffff`; inner surfaces use `#0cf2b5` on 50% of its elements and `#f9f3e3` on 50% of its elements. Content sits in a 454px container with 0px side padding, vertical padding 96px top / 96px bottom, a single column. Text is `#1c3752` at 12.2:1 against the band, set in Museo 300 18px/26px on 38% of its text and Museo 700 17px/17px on 25% of its text.

**8 · Content** — 558px tall, about 62% of the viewport. Background `#ffffff`; inner surfaces use `#0cf2b5` on 50% of its elements and `#03203d` on 25% of its elements. Content sits in a 1200px container with 0px side padding, vertical padding 96px top / 96px bottom, 2 columns at a 24px gap, items no narrower than 588px. Text is `#03203d` at 16.4:1 against the band, set in Museo 700 17px/17px on 29% of its text and Museo 300 20px/29px on 29% of its text.

### Page chrome

- **Header** — 88px tall, `position: static`, transparent until scrolled, 1200px inner container, 32px side padding.
- **Footer** — 4 columns (grid-tracks), column widths 368 / 245 / 245 / 245px, 370px tall, padding 64px / 32px, 1200px inner container.

## Grid & Composition

**Container widths:** 1200px on 3 bands · 460px on 2 bands · 680px on 2 bands. The widest measured column is 1200px — build the shell at that width and let narrower bands opt down.

### Grid recipes

| Where | Display | Columns | Gap | Align / justify |
|---|---|---|---|---|
| `nav.nav` | flex / row | 3 | 24px | center / space-between |
| `ul.capas-hero` | grid | 2 · `repeat(2, 1fr)` | 16px | normal / normal |
| `ul.para-quem` | grid | 1 · `1fr` | 12px | normal / normal |
| `ul.para-quem` | grid | 1 · `1fr` | 12px | normal / normal |
| `ul.para-quem` | grid | 1 · `1fr` | 12px | normal / normal |
| `ul.para-quem` | grid | 1 · `1fr` | 12px | normal / normal |
| `div.grid` | grid | 2 · `repeat(2, 1fr)` | 24px | normal / normal |
| `div.footer-grid` | grid | 4 · `368px 245px 245px 245px` | 32px | normal / normal |
| `ol.trilha` | grid | 4 · `repeat(4, 1fr)` | 24px | normal / normal |
| `div.card` | flex / column | 1 | 12px | normal / normal |

_+6 further measured containers._

**Vertical rhythm:** bands sit a median 0px apart, most commonly 0px, across 9 bands and section padding clusters at 96px (top: 96px ×6, 48px ×1, 64px ×1).

## Landing Page Anatomy

The page tells a conversion story in this order — rebuild sections in this sequence:

| Order | Section | Heading / evidence | Key elements |
|-------|---------|--------------------|--------------|
| 1 | Hero | Escolha o curso pelo ponto em que você está. | CTA: "Começar Do Zero" + "Ver A Trilha" · 4 images |
| 2 | Content section | Quatro cursos, uma escada | — |
| 3 | Content section | Desvendando a Matemática | CTA: "Conhecer O Curso" · 1 images |
| 4 | Content section | Lições de Matemática | CTA: "Conhecer O Curso" · 1 images |
| 5 | Content section | Lições de Física | CTA: "Conhecer O Curso" · 1 images |
| 6 | Content section | Lições de Cálculo | CTA: "Conhecer O Curso" + "Ver O Livro" · 1 images |
| 7 | Content section | Área do aluno | CTA: "Entrar" + "Falar Com A Equipe" |

**Section flow:** hero → content → content → content → content → content → content

## Hero & Conversion

- **Headline:** "Escolha o curso pelo ponto em que você está."
- **Subheadline:** "Cada curso do Universo Narrado começa na ideia, não na fórmula. Do zero absoluto até o Cálculo do ITA e do IME, com a trilha ajustada ao seu"
- **Hero CTA pair:** "Começar Do Zero" + "Ver A Trilha"
- **Nav anatomy:** "Universo Narrado" logo · 5 links ("Cursos", "Editora", "Nossa história", "Suporte", "Entrar") · CTA: "Entrar"
- **CTA repetition:** "Conhecer O Curso" ×4, "Entrar" ×2 — the same conversion ask returns at every scroll depth
- **Full CTA copy inventory:** "Conhecer O Curso" · "Entrar" · "Começar Do Zero" · "Ver A Trilha" · "Ver O Livro" · "Falar Com A Equipe"

## Signature Devices

These patterns define the site's identity — repeat them across every new page:

1. **The Pill Button Language** — every interactive element is fully rounded (9999px radius) — buttons, tags, inputs and badges share one geometry
2. **The #0cf2b5 / Ghost Button Pair** — conversion moments always offer two identically-shaped buttons — "Começar Do Zero" first, "Ver A Trilha" second; never split them apart
3. **Single-Accent Discipline** — the entire interactive vocabulary runs on #03203d — restraint is the system; adding more hues breaks it
4. **Card-on-Canvas Contrast** — #0cf2b5 surfaces float on a #ffffff canvas — separation comes from background contrast, not shadows

## Content & Copy

### Copy per band

| Band | Eyebrow | Heading | CTA |
|---|---|---|---|
| Navigation | — | — | "Entrar" |
| Hero | Cursos | Escolha o curso pelo ponto em que você está. | "Começar Do Zero" + "Ver A Trilha" |
| Content | A trilha | Quatro cursos, uma escada | — |
| Content | DMAT · Para quem está com… | Desvendando a Matemática | "Conhecer O Curso" |
| Features | LM · Matemática completa | Lições de Matemática | "Conhecer O Curso" |
| Content | LF · Física completa | Lições de Física | "Conhecer O Curso" |
| Content | LC · O degrau mais alto | Lições de Cálculo | "Conhecer O Curso" + "Ver O Livro" |
| Content | — | Área do aluno | "Entrar" + "Falar Com A Equipe" |

_1 further band carried no headline copy._

### Navigation copy

- **Items:** "Cursos" → `/cursos` · "Editora" → `/314-editora` · "Nossa história" → `/sobre/historia` · "Suporte" → `/suporte`
- **Actions:** "Entrar" (primary)
- **Shape:** logo reads "Universo Narrado" and is an image/SVG, centered alignment

### Footer columns

- **Cursos** — Desvendando a Matemát…, Lições de Matemática, Lições de Física, Lições de Cálculo
- **Livros** — Lições de Cálculo, Guia de Fórmulas Expl…, Editora 314
- **Universo Narrado** — Área do aluno, Nossa história
- **Also in the footer** — social: whatsapp, youtube; legal line "© 2026 Universo Narrado Física e matemática ensinadas pelo porquê. Cursos, livros e aulas gratuitas do professor Felipe…"

### Voice & tone

- **Heading case:** Title Case — 47 sentence, 53 title, 0 upper across 100 headings. Match the dominant one exactly; mixing reads as a different brand.
- **Heading length:** 4.1 words on average over 15 headings — terse; write short declaratives.
- **Questions:** 7% of headlines are questions.
- **Reading level:** standard — 15.2 words per sentence, 3.8 letters per word.
- **Jargon:** low (0% of words).
- **Signature phrases:** "matem tica" ×9, "universo narrado" ×3, "curso pelo" ×2, "pelo ponto" ×2, "que voc" ×2, "voc est" ×2 — repeat them; they are the vocabulary of the brand.

**Document metadata:** title "Cursos | Universo Narrado"; description "Os cursos de física e matemática do Universo Narrado: Desvendando a Matemática, Lições de Matemática, Lições de Física e Lições de Cálculo.…"; heading hierarchy H1 ×1 · H2 ×7 · H3 ×0; lang `pt-BR`.

## Accessibility Profile

- **Contrast discipline:** 98% of measured text usage clears WCAG AA (4.5:1)
- **Focus design:** 1 :focus rules in stylesheets
- **Reduced motion:** `prefers-reduced-motion` overrides present
- **Semantics:** 4 landmarks · 12 ARIA-carrying elements · 100% of images have alt text

## Responsive

Breakpoints declared in stylesheets: `600px`, `640px`, `800px`, `960px`.

Current viewport analyzed at 1534×903 (desktop-scale view).

## Responsive Behaviour

**Strategy:** desktop-first (`max-width` queries strip down) — 0 min-width rules, 74 max-width rules.

**Ladder:** the 4 breakpoints match no standard scale — they are custom to this site.

### Breakpoint matrix

| Tier | Query | Layout | Spacing | Type | Hidden / shown |
|---|---|---|---|---|---|
| <sm | `≤600px` | height 56px | — | — | — |
| <md | `≤640px` | 1 col | space -31% | type -13% | −4 nav |
| <md | `≤800px` | 1 col | padding-bottom 24px | font-size 22px | — |
| <lg | `≤960px` | 1 col | column-gap 0px | font-size 48px | −1 |

Across the 4 stops the ladder rewrites 143 declarations in 74 rules, the heaviest being `<md` at 99. Nothing else moves — anything not in the matrix above holds at every width.

### Mobile adaptation

- **Navigation:** is swapped by width rather than by a menu button — `'.nav-links' hidden ≤640px (nav)`.
- **Grid collapse:** 14 grids drop to a single column and 1 flex row turn into columns.
- **Spacing:** shifts -31% at mobile widths — padding and gaps shrink by roughly that much, not to an arbitrary smaller value.
- **Type:** shifts -13% at mobile widths — the whole scale moves, so keep the ratios.
- **Visibility:** 5 selectors hidden and 0 revealed by width (other, nav).

### Modern CSS in play

- **`prefers-reduced-motion`** is honoured by the page itself — replicate the override, do not drop it.
- **Feature queries:** `(prefers-reduced-motion: reduce)` — progressive enhancement is deliberate here.

## Agent Prompt Guide

**Quick Color Reference**
- canvas: #ffffff
- primary text: #1c3752
- secondary text: #4a6079
- brand accent: #03203d
- surface: #0cf2b5
- gray light: #eaf0ff
- gray light 2: #f1ecff
- gray light 3: #f9f3e3

**Example Component Prompts**

1. Rebuild the full landing page in exactly this order: hero → content → content → content → content → content → content. Use the Hero & Conversion spec for the first screen, one component recipe per section, and the section rhythm from the Layout metrics.
2. Create the primary button: #0cf2b5 background, #03203d text, border-radius 12px, padding 0px 24px, font Museo 700 17px. On hover, transition background, transform, box-shadow 0.15s, 0.12s, 0.12s.
3. Create the display heading: Young Serif weight 400, 67px, line-height 1.04, letter-spacing -1.33px, #1c3752 on #ffffff.

## Quick Start

### CSS Custom Properties

```css
:root {
  /* Colors */
  --color-bg-canvas: #ffffff;
  --color-text-primary: #1c3752;
  --color-text-secondary: #4a6079;
  --color-accent: #03203d;
  --color-bg-surface: #0cf2b5;
  --color-gray-light: #eaf0ff;
  --color-gray-light-2: #f1ecff;
  --color-gray-light-3: #f9f3e3;
  --color-gray-light-4: #fff9d6;
  --color-gray-light-5: #e3e7eb;

  /* Typography — Font Families (by role) */
  --font-display: Museo, ui-rounded, "Segoe UI", system-ui, sans-serif;
  --font-body: Museo, ui-rounded, "Segoe UI", system-ui, sans-serif;

  /* Typography — Scale */
  --text-display: 67px;
  --leading-display: 1.04;
  --tracking-display: -1.33px;
  --text-heading-xl: 64px;
  --leading-heading-xl: 1.04;
  --tracking-heading-xl: -1.79px;
  --text-heading-lg: 48px;
  --leading-heading-lg: 1.08;
  --tracking-heading-lg: -1.15px;
  --text-heading: 40px;
  --leading-heading: 1.08;
  --tracking-heading: -0.96px;
  --text-heading-sm: 22px;
  --leading-heading-sm: 1.45;
  --text-subheading: 20px;
  --leading-subheading: 1.2;
  --text-body: 18px;
  --leading-body: 1.45;
  --text-small: 15px;
  --leading-small: 1.55;
  --text-caption: 13px;
  --leading-caption: 1.55;
  --tracking-caption: 1.04px;

  /* Layout */
  --page-max-width: 1260px;
  --card-padding: 24px;
  --element-gap: 10px;
  --spacing-unit: 4px;

  /* Border Radius */
  --radius-sm: 12px; /* button, card */
  --radius-md: 16px; /* card */
  --radius-lg: 28px; /* card */
  --radius-full: 9999px; /* pills */

  /* Shadows */
  --shadow-sm: rgb(3, 32, 61) 4px 4px 0px 0px;
  --shadow-md: rgba(255, 255, 255, 0.9) 4px 4px 0px 0px;

  /* Motion */
  --duration-fast: 150ms;
  --ease-custom-1: ease;

  /* Iconography */
}
```

### Tailwind v4

```css
@import "tailwindcss";

@theme {
  /* Colors → bg-*, text-*, border-* */
  --color-bg-canvas: #ffffff;
  --color-text-primary: #1c3752;
  --color-text-secondary: #4a6079;
  --color-accent: #03203d;
  --color-bg-surface: #0cf2b5;
  --color-gray-light: #eaf0ff;
  --color-gray-light-2: #f1ecff;
  --color-gray-light-3: #f9f3e3;
  --color-gray-light-4: #fff9d6;
  --color-gray-light-5: #e3e7eb;

  /* Fonts → font-display, font-body, font-mono */
  --font-display: Museo, ui-rounded, "Segoe UI", system-ui, sans-serif;
  --font-body: Museo, ui-rounded, "Segoe UI", system-ui, sans-serif;

  /* Type scale → text-display, text-body, … */
  --text-display: 67px;
  --text-display--line-height: 1.04;
  --text-display--letter-spacing: -1.33px;
  --text-heading-xl: 64px;
  --text-heading-xl--line-height: 1.04;
  --text-heading-xl--letter-spacing: -1.79px;
  --text-heading-xl--font-weight: 900;
  --text-heading-lg: 48px;
  --text-heading-lg--line-height: 1.08;
  --text-heading-lg--letter-spacing: -1.15px;
  --text-heading-lg--font-weight: 900;
  --text-heading: 40px;
  --text-heading--line-height: 1.08;
  --text-heading--letter-spacing: -0.96px;
  --text-heading--font-weight: 900;
  --text-heading-sm: 22px;
  --text-heading-sm--line-height: 1.45;
  --text-heading-sm--font-weight: 300;
  --text-subheading: 20px;
  --text-subheading--line-height: 1.2;
  --text-subheading--font-weight: 700;
  --text-body: 18px;
  --text-body--line-height: 1.45;
  --text-body--font-weight: 300;
  --text-small: 15px;
  --text-small--line-height: 1.55;
  --text-small--font-weight: 300;
  --text-caption: 13px;
  --text-caption--line-height: 1.55;
  --text-caption--letter-spacing: 1.04px;
  --text-caption--font-weight: 700;

  /* Radius → rounded-* */
  --radius-sm: 12px;
  --radius-md: 16px;
  --radius-lg: 28px;
  --radius-full: 9999px;

  /* Shadows → shadow-* */
  --shadow-sm: rgb(3, 32, 61) 4px 4px 0px 0px;
  --shadow-md: rgba(255, 255, 255, 0.9) 4px 4px 0px 0px;

  /* Easing → ease-* */
  --ease-custom-1: ease;

  /* Breakpoints → sm:, md:, lg:, … (measured from the source) */
  --breakpoint-sm: 600px;
  --breakpoint-md: 640px;
  --breakpoint-lg: 800px;
  --breakpoint-xl: 960px;
}

/* Durations have no Tailwind namespace — use as duration-(--duration-base) */
:root {
  --duration-fast: 150ms;
}
```

## Rebuild Checklist

Build in this order. Every item carries the measured numbers it needs — nothing here requires going back to the page.

- [ ] Paste the `:root` block from **Design Token System** — 37 custom properties across 5 naming groups. Nothing below should hard-code a value that exists there.
- [ ] Set the type scale: 67 / 64 / 48 / 40 / 22 / 20 / 18 / 15 / 13px over 9 steps, Museo + Young Serif.
- [ ] Set the spacing scale: 6 / 10 / 12 / 14 / 16 / 24 / 28 / 32px on a 4px base unit.
- [ ] Set the radius scale: 12px (button), 16px (card), 28px (card), pill (button).
- [ ] Define 2 elevation steps, lightest first: `rgb(3, 32, 61) 4px 4px 0px 0px`, `rgba(255, 255, 255, 0.9) 4px 4px 0px 0px`.
- [ ] Build the shell: a 1200px max-width centred container with 0px side gutters.
- [ ] Paint the canvas `#ffffff` and set the body text colour from the palette — this is a light page.
- [ ] Build the header: 88px tall.
- [ ] Fill the nav with the real labels: "Cursos", "Editora", "Nossa história", "Suporte" plus "Entrar" on the right.
- [ ] Band 1 — **Header**: 88px tall, `#ffffff` background, 1200px container, 0px top padding, 3 columns.
- [ ] Band 2 — **Hero**: 699px tall, `#ffffff` background, 420px container, 48px top padding, 2 columns. Headline: "Escolha o curso pelo ponto em que você está.".
- [ ] Band 3 — **Content**: 585px tall, `#ffffff` background, 720px container, 96px top padding. Headline: "Quatro cursos, uma escada".
- [ ] Band 4 — **Content**: 699px tall, `#ffffff` background, 682px container, 96px top padding. Headline: "Desvendando a Matemática".
- [ ] Band 5 — **Content**: 746px tall, `#ffffff` background, 454px container, 96px top padding. Headline: "Lições de Matemática".
- [ ] Band 6 — **Content**: 699px tall, `#ffffff` background, 682px container, 96px top padding. Headline: "Lições de Física".
- [ ] Band 7 — **Content**: 699px tall, `#ffffff` background, 454px container, 96px top padding. Headline: "Lições de Cálculo".
- [ ] Band 8 — **Content**: 558px tall, `#ffffff` background, 1200px container, 96px top padding, 2 columns. Headline: "Área do aluno".
- [ ] Build the primary button: `#0cf2b5` on `#03203d` text, 12px radius, 0px 24px padding, Museo 700 17px — 7 instances on the page.
- [ ] Build the secondary button: 1px solid #03203d border, 12px radius, 0px 24px padding, `#03203d` text.
- [ ] Build the footer: 4 link columns, 370px tall, 2 social icons.
- [ ] Wire hover states in the page's own language — *shadow* on 7 of 8 archetypes. Copy the deltas from the state matrix; do not invent a lift where the page tints.
- [ ] Wire focus: outline scoped to `:focus-visible`.
- [ ] Set the transition recipe: fast 150ms, easing `ease`.
- [ ] Add the breakpoint ladder: ≤600px / ≤640px / ≤800px / ≤960px, desktop-first.
- [ ] At mobile widths: collapse the nav; drop 14 grids to one column; shift spacing -31%; shift type -13%.
- [ ] Accessibility polish before shipping: 98% of text already clears 4.5:1 — fix the remainder rather than copying it; 18 tap targets sit under 44px — pad them out; there is no skip link — add one.

## Extraction Coverage

What was actually measured, and where the measurement stops. Read this before trusting a number above.

- **Scan:** 175 elements styled · viewport 1534×903px · elapsed 1958ms.
- **Deep pass:** mode `full`, 9 scroll passes over 9 planned steps of 722px.
- **Page:** 5141px tall (5.7 viewports).
- **Lazy loading:** DOM went 210 → 210 nodes.
- **Bands sampled:** 6 viewport-height slices covering the full page.
- **Stylesheets:** 1 read.
- **States & overlays:** 0 hidden surfaces revealed and measured; 8 component archetypes resolved from 20 indexed pseudo-state rules; 8 live focus probes.
- **Inventory:** 9 sections · 16 grid containers · 0 stacking layers · 10 images, 4 font faces · 9 copy bands · 37 custom properties · 4 breakpoints analysed.

### Limits reached during the scan

- 3 component/width-scoped var blocks skipped
