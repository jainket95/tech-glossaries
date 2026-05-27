> **TL;DR:** i18n, theming, RTL, and accessibility touch every component. Retrofitting any of them costs ~10x more than designing for them from day one.

## i18n — Internationalization

The technical prep for multi-language support (not translation itself — that's localization).

| Piece | What it is |
|---|---|
| **Locale** | Language + region (`en-US` vs `en-GB` — spelling, dates, units differ) |
| **Translation files** | Key-value per locale (`{"issues.title": "Issues"}`) |
| **Library** | react-i18next, FormatJS/react-intl, Lingui, next-intl, Tolgee |

**Pluralization is not `n === 1 ? "item" : "items"`.** English has 2 forms, Russian 3, Arabic 6. Use ICU **MessageFormat**:

```
{count, plural, =0 {No items} one {# item} other {# items}}
```

Every serious i18n library supports this; the translator handles the language's rules, you just call `t("itemCount", { count })`. The same mechanism handles gender-dependent strings and ordinals.

**Formatting:** the native `Intl` API is excellent and needs no library — `Intl.DateTimeFormat`, `Intl.NumberFormat` (currency too: `$1,000.00` US vs `1.000,00 €` Germany), `Intl.RelativeTimeFormat`, `Intl.PluralRules`.

⚠️ **The string-composition trap:** `${name} liked your post` breaks for languages with different word order. Always pass the whole sentence with placeholders: `t("notifications.like", { name })`.

Real apps store translations in a **Translation Management System** (Crowdin, Lokalise, Phrase) — not the repo — so translators work independently and sync back via integration.

## l10n — Localization (the translators' job, with technical pieces)

- **Address/postal formats** — "ZIP code" isn't universal; validation rules differ by country.
- **Names** — "first + last" isn't universal (family-name-first, single names, multiple surnames). Default to one "Full name" field unless you specifically need split.
- **Phone numbers** — use **libphonenumber**, never assume `+1`/10-digit.
- **Calendars** — most of the world uses Gregorian, but Japan/Thailand/Saudi Arabia/Iran and others may need local calendars.

## RTL — Right-to-Left

Arabic, Hebrew, Persian, Urdu. `<html dir="rtl">`, then **use logical CSS properties**, not physical:

| Physical (avoid) | Logical (use) |
|---|---|
| `margin-left` | `margin-inline-start` |
| `padding-right` | `padding-inline-end` |
| `left: 10px` | `inset-inline-start: 10px` |
| `text-align: left` | `text-align: start` |

Logical properties flip automatically with document direction — old codebases hardcoding `padding-left` everywhere are the worst retrofit case. **Icons:** most stay the same; directional ones (next arrow, back button) should flip. **Test** by toggling `dir="rtl"` on your dev environment occasionally — many layout bugs only surface mirrored.

## Theming

Foundation is design tokens (ch. 5). Two light/dark implementations:

- **CSS variables driven by a class/attribute** — `[data-theme="dark"] { --bg: #1c1814; }`, toggled by JS. Works for SSR.
- **`prefers-color-scheme` media query** — respects OS setting, no per-app override.

> **Combine both:** respect OS by default, allow a stored user override, applied via an inline `<head>` script *before* first paint — otherwise you get "flash of incorrect theme" (FOART).

**Multi-brand** (white-label) uses the same token mechanism, one token set per tenant, loaded by subdomain/path — the discipline is that *every* visual decision is a token, or it breaks the moment you swap themes.

Also respect: `prefers-reduced-motion` (scope all animation durations under a variable set to `0s`), `prefers-contrast`/Forced Colors Mode (test in DevTools — transparent backgrounds and color-only states tend to break).

## Accessibility as architecture

A `<div onclick>` instead of a `<button>` means no keyboard focus, no screen-reader role, no Enter/Space handling — fixing every instance at the end is a six-month project.

**WCAG 2.2, POUR:**

| Principle | Means |
|---|---|
| **Perceivable** | Alt text, sufficient contrast, captions |
| **Operable** | Full keyboard access, no time traps, no seizure-triggering flashes |
| **Understandable** | Clear labels, predictable behavior, error identification |
| **Robust** | Reliably interpreted by assistive tech |

**Semantic HTML gets you 80% of accessibility for free:** `<button>` not `<div role="button">`, `<a href>` not `<span onclick>`, `<nav>`/`<main>`/`<header>` as landmarks, proper `<h1>`-`<h6>` hierarchy, `<label for>` on fields.

**ARIA — only when semantic HTML can't cover it:**

| Attribute | Use |
|---|---|
| `aria-label` / `aria-labelledby` | Accessible name when there's no visible text |
| `aria-describedby` | Additional description (form hints) |
| `aria-expanded`/`selected`/`pressed`/`checked` | State indicators |
| `aria-live` | Region whose changes get announced (`polite` queues, `assertive` interrupts) |

> **The first rule of ARIA: don't use ARIA if you don't have to.** A `<button>` beats `role="button"` every time.

**Focus management** — the most under-loved area:
- Every interactive element must be keyboard-focusable, with a *visible* focus indicator (never `outline: none` without a replacement).
- Tab order = DOM order; avoid `tabindex > 0`.
- Modals trap focus (Tab cycles within), Escape closes, focus returns to the trigger.
- A skip link ("Skip to main content") for keyboard users.

**Testing:**

| Layer | Catches | Ceiling |
|---|---|---|
| **axe / Lighthouse a11y** | ~30% of real issues automatically | Not a substitute for the rest |
| **Screen reader** (NVDA, VoiceOver, TalkBack) | Whether it actually makes sense | 5 minutes surfaces ~90% of issues |
| **Color contrast tools** | WCAG AA: 4.5:1 normal text, 3:1 large | — |

**Common patterns worth using a library for** (Radix, React Aria) rather than hand-rolling: modal dialog (focus trap + `aria-modal`), combobox/autocomplete, tabs, disclosure/accordion, toast (`aria-live="polite"`, non-focus-stealing).

## The discipline that holds

Bake cross-cutting concerns into the primitives, not application code: a `<Button>` has an accessible name by default; a `<TextField>` associates its `<label>`; layout primitives use logical CSS properties; text components derive color from theme tokens. Once the primitives handle it, everything built on them inherits it — without that baseline, every screen re-solves it, badly.
