import { useEffect, useId, useRef, useState } from 'react';
import mermaid from 'mermaid';

// mermaid's 'base' theme derives several text-color variables from the
// primary/secondary/tertiary colors above (textColor, nodeTextColor,
// titleColor, edgeLabelBackground, etc. — see mermaid.js.org/config/
// theming.html) — but that derivation isn't reliable when only a partial
// themeVariables override is supplied, which produced a real bug: edge
// labels (the "Yes"/"No" text on `-->|label|` arrows) rendered using
// mermaid's own underived default rather than anything set here, showing
// as pale/illegible text regardless of light or dark mode. Every
// text-bearing variable is now set explicitly instead of relying on
// mermaid's derivation.
const LIGHT_VARS = {
  background: '#f4f6f8',
  primaryColor: '#eaeef2',
  primaryTextColor: '#14181d',
  primaryBorderColor: '#a9b4c0',
  lineColor: '#66717e',
  secondaryColor: '#e8edf1',
  secondaryTextColor: '#14181d',
  secondaryBorderColor: '#a9b4c0',
  tertiaryColor: '#cbdcec',
  tertiaryTextColor: '#14181d',
  tertiaryBorderColor: '#a9b4c0',
  textColor: '#14181d',
  nodeTextColor: '#14181d',
  titleColor: '#14181d',
  edgeLabelBackground: '#f4f6f8',
  noteBkgColor: '#eaeef2',
  noteTextColor: '#14181d',
  noteBorderColor: '#a9b4c0',
  fontSize: '15px',
};

// Only PM has a dark theme (data-theme="dark" on <html>) — be/fe/design/fde
// are light-only. These values match PM's dark palette in src/index.css.
const DARK_VARS = {
  background: '#191917',
  primaryColor: '#191917',
  primaryTextColor: '#e9e7e1',
  primaryBorderColor: '#3c3a35',
  lineColor: '#a3a099',
  secondaryColor: '#0c0c0b',
  secondaryTextColor: '#e9e7e1',
  secondaryBorderColor: '#3c3a35',
  tertiaryColor: '#e3703f26',
  tertiaryTextColor: '#e9e7e1',
  tertiaryBorderColor: '#3c3a35',
  textColor: '#e9e7e1',
  nodeTextColor: '#e9e7e1',
  titleColor: '#e9e7e1',
  edgeLabelBackground: '#191917',
  noteBkgColor: '#191917',
  noteTextColor: '#e9e7e1',
  noteBorderColor: '#3c3a35',
  fontSize: '15px',
};

function isDark() {
  if (typeof document === 'undefined') return false;
  return document.documentElement.getAttribute('data-theme') === 'dark';
}

function init(dark: boolean) {
  mermaid.initialize({
    startOnLoad: false,
    theme: 'base',
    fontFamily: '"DM Sans", -apple-system, BlinkMacSystemFont, sans-serif',
    themeVariables: dark ? DARK_VARS : LIGHT_VARS,
    flowchart: { curve: 'basis', padding: 12 },
    securityLevel: 'strict',
  });
}

// Renders a fenced ```mermaid code block as an inline SVG diagram, client-side.
// Used by every course's ChapterView as the `pre` override for react-markdown,
// and by PM's Prose.tsx for the same fenced-block syntax.
export function Mermaid({ chart }: { chart: string }) {
  const id = useId().replace(/:/g, '-');
  const ref = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [dark, setDark] = useState(() => isDark());

  // PM's theme toggle can flip data-theme while a diagram already on screen
  // — re-render it instead of leaving a stale-colored diagram behind.
  useEffect(() => {
    const observer = new MutationObserver(() => setDark(isDark()));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let cancelled = false;
    // The page loads DM Sans with font-display: swap (index.html), so on a
    // cold load mermaid can measure + box a node's label in the fallback
    // system font, then have DM Sans swap in wider/taller a moment later —
    // the text overflows the now-too-small box and gets clipped by the
    // SVG's default overflow: hidden (visible as text cropped at the
    // bottom/right of a node). Waiting for the real font before rendering
    // means mermaid always measures with final glyph metrics.
    const fontsReady =
      typeof document !== 'undefined' && document.fonts ? document.fonts.ready : Promise.resolve();
    fontsReady
      .then(() => {
        if (cancelled) return;
        init(dark);
        return mermaid.render(`mmd-${id}-${dark ? 'd' : 'l'}`, chart.trim());
      })
      .then((result) => {
        if (!cancelled && result && ref.current) ref.current.innerHTML = result.svg;
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err.message : String(err));
      });
    return () => {
      cancelled = true;
    };
  }, [chart, id, dark]);

  if (error) {
    return (
      <pre className="mermaid-error">
        <code>{chart}</code>
      </pre>
    );
  }

  return <div className="mermaid-diagram" ref={ref} />;
}
