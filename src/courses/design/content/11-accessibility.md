> **TL;DR:** A design mockup essentially never specifies tab order, ARIA wiring, or focus management — those decisions default to whoever writes the code. That's you. This chapter belongs to you more than any other in this course.

## WCAG's four POUR principles

| Principle | Means | Example |
|---|---|---|
| **Perceivable** | Info presentable in ways users can perceive | Alt text, contrast (ch. 4), captions |
| **Operable** | Usable by anyone | Full keyboard operability, no seizure-triggering flashes |
| **Understandable** | Predictable, readable | Same territory as heuristic #9 (error recovery) |
| **Robust** | Works with assistive tech | Valid, semantic markup a screen reader can parse |

Target **WCAG AA** — the level almost every org targets and most legal requirements reference. AAA is an aspiration for specific critical flows, not a universal bar.

## Semantic HTML: free accessibility

> **The first rule of ARIA is don't use ARIA.** Check whether a native element already does the job first.

| | `<button>` | `<div onClick>` styled to match |
|---|---|---|
| Focusable | ✅ free | Manually rebuilt |
| Keyboard (Enter/Space) | ✅ free | Manually rebuilt |
| Screen reader announcement | ✅ free | Manually rebuilt |
| Disabled handling | ✅ free | Manually rebuilt |

Easy to rebuild incompletely without noticing — it still works fine with a mouse.

## ARIA — for the gap semantic HTML can't cover

| Attribute | Use |
|---|---|
| **Landmark roles** | Let screen reader users jump between page regions |
| **`aria-label`/`labelledby`** | Accessible name for an icon-only button with no visible text |
| **`aria-describedby`** | Links a field to its validation error, announced in context |
| **`aria-live`** | Announces dynamic content that updates with no page reload |

⚠️ ARIA changes what assistive tech is *told* — never behavior. Using it *instead of* real keyboard handling, not alongside it, produces something that announces correctly but is unusable by keyboard.

## The zero-cost test you can run right now

> **Unplug your mouse.** Complete a real task using only Tab, Shift+Tab, Enter, Space. Can you always tell what has focus? Reach every control? Escape a modal?

- **Tab order** should follow visual/DOM order — `tabindex` set to arbitrary positive numbers breaks this.
- **Focus management:** a modal should trap focus while open, and return it to where it was on close — not reset to page top.

## Visual order ≠ DOM order

A screen reader traverses the **accessibility tree** (from the DOM), not the visual layout. CSS Grid/Flexbox `order` can make something appear 3rd on screen while it's 5th in the DOM — invisible to a sighted reviewer, very visible to a screen reader user. A mockup review can't catch this; only implementation review can.

## Testing

| Tool | Catches | Ceiling |
|---|---|---|
| **axe / Lighthouse** | ~30-50% of real issues — missing alt text, contrast, labels | Not a substitute for the rest |
| **Keyboard-only test** | Focus/navigation gaps | Free, 5 minutes |
| **Real screen reader** (VoiceOver, NVDA — both free) | Whether it actually makes sense | Most thorough |

## Who this is actually for

A meaningful share of your actual users have some visual, motor, auditory, or cognitive difference — permanent, temporary (a broken arm), or situational (one hand full, a noisy room). Captions help a deaf user *and* someone on a muted phone in a meeting. Keyboard support helps a motor-impaired user *and* someone whose mouse just died. Not a separate population — your existing audience, in specific moments.
