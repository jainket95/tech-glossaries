> **TL;DR:** Text is the majority of most screens. "Pick a nice font" fails as a request because a font choice is really a dozen smaller decisions — scale, weight, line-height, measure, pairing.

## Anatomy — the terms worth knowing

| Term | What it means |
|---|---|
| **Baseline** | The invisible line most letters sit on |
| **x-height** | Height of lowercase letters — a huge driver of perceived size/legibility |
| **Cap-height** | Height of capital letters |
| **Ascender / descender** | Parts of "h" or "p" that rise above / drop below the body |
| **Counter** | The enclosed space in "e," "o," "a" — tight counters hurt small-size legibility |
| **Tracking** | Uniform space added between *all* letters |
| **Kerning** | Space adjusted between *specific pairs* (like "AV") |

**Most useful one: x-height.** Two typefaces at the same point size can look meaningfully different in size — the number alone doesn't determine legibility.

## The type scale

A base size × a ratio generates a small, harmonious family instead of ad-hoc numbers (14, 16, 19, 22 — did anyone decide that?).

| Ratio | Name | Character |
|---|---|---|
| 1.125 | Major second | Subtle, dense UI with many levels |
| 1.25 | Major third | Common, versatile default |
| 1.333 | Perfect fourth | More dramatic contrast |
| 1.5 | Perfect fifth | Strong contrast, fewer usable steps |
| 1.618 | Golden ratio | Dramatic/editorial — too much for dense UI |

16px base × 1.25 → **16, 20, 25, 31, 39, 49**. **Rule of thumb: 4-6 distinct sizes covers most real interfaces** — reaching for a 7th or 8th usually means weight/color/spacing should be doing the work instead.

## Line-height and measure

- **Line-height (leading):** body text ≈ **1.4-1.6×** font size. Headings can go tighter (1.0-1.1×) — fewer lines to track between.
- **Measure:** **45-75 characters per line**, ~66 is the sweet spot. This is *why* body text gets a `max-width` instead of stretching full-width on a wide viewport.
- Wider measure needs *more* line-height — the eye has further to travel back to the line start.

## Pairing typefaces

> **The rule:** pair fonts that are clearly, deliberately different — not two similar-looking sans-serifs. A distinctive serif/display for headings + a clean, legible sans for body is the reliable default.

**Variable fonts** (one file, continuous weight/width range) solve this while shipping *less* data than several static files — a rare case where design quality and frontend performance point the same direction.

## Weight over size for hierarchy

Size is the first lever people reach for, and it's frequently wrong — climbing the type scale for every new importance level produces too many sizes. **Weight** (regular → medium → semibold → bold) is cheaper and subtler. Color and letter-spacing round out the toolkit. Combine 2-3 levers modestly rather than pushing one to an extreme.

## Bringing it to the browser

- Type scale → CSS custom properties / Tailwind font-size theme.
- **`rem`, not `px`** — respects a user's browser-level font-size preference; a hardcoded `px` silently overrides it.
- `clamp()` — fluid heading sizes without a wall of breakpoints: `font-size: clamp(1.5rem, 4vw, 2.5rem)`.
- **FOIT vs FOUT:** `font-display: swap` chooses FOUT (unstyled text now, swap when font arrives) over FOIT (invisible until it arrives) — almost always the better call. `<link rel="preload" as="font">` shortens the swap.
