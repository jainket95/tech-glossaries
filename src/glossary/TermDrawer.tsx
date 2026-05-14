import { useEffect } from 'react';
import { useGlossaryStore } from './store';
import { findTermById, relatedTerms } from './registry';

// Mounted once per course Layout (be/fe) — reads global glossary UI state,
// renders nothing when no term is open. Styled via .term-drawer* classes in
// each course's own global.css (plain CSS, not Tailwind, to match how
// be/fe are already built — unlike PM's Tailwind-based equivalent).
export function TermDrawer() {
  const termId = useGlossaryStore((s) => s.openTermId);
  const closeTerm = useGlossaryStore((s) => s.closeTerm);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') closeTerm();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [closeTerm]);

  if (!termId) return null;
  const term = findTermById(termId);
  if (!term) return null;

  const related = relatedTerms(term.id);

  return (
    <div className="term-drawer">
      <button
        type="button"
        aria-label="Close term drawer"
        className="term-drawer__overlay"
        onClick={closeTerm}
      />
      <aside className="term-drawer__panel">
        <div className="term-drawer__head">
          <div>
            <div className="term-drawer__title">{term.term}</div>
            {term.aliases && term.aliases.length > 0 && (
              <div className="term-drawer__aka">aka {term.aliases.join(', ')}</div>
            )}
          </div>
          <button type="button" onClick={closeTerm} className="term-drawer__close">
            Esc
          </button>
        </div>

        <p className="term-drawer__oneliner">{term.oneLiner}</p>
        <p className="term-drawer__full">{term.full}</p>

        {related.length > 0 && (
          <div className="term-drawer__related">
            <div className="term-drawer__label">Related</div>
            <div className="term-drawer__related-list">
              {related.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  className="term-chip"
                  onClick={() => useGlossaryStore.getState().openTerm(r.id)}
                >
                  {r.term}
                </button>
              ))}
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
