import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUiStore } from '../store/ui';
import { useProgressStore } from '../store/progress';
import { termById, relatedTerms } from '../content';
import { TierBadge } from './TierBadge';

export function TermDrawer() {
  const termId = useUiStore((s) => s.drawerTermId);
  const closeDrawer = useUiStore((s) => s.closeDrawer);
  const isInDeck = useProgressStore((s) => s.isInDeck);
  const addToDeck = useProgressStore((s) => s.addToDeck);
  const removeFromDeck = useProgressStore((s) => s.removeFromDeck);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') closeDrawer();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [closeDrawer]);

  if (!termId) return null;
  const term = termById[termId];
  if (!term) return null;

  const inDeck = isInDeck(term.id);
  const related = relatedTerms(term.id);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button
        type="button"
        aria-label="Close term drawer"
        className="absolute inset-0 bg-black/30"
        onClick={closeDrawer}
      />
      <aside
        className="relative h-full w-full max-w-md overflow-y-auto border-l p-6"
        style={{ background: 'var(--bg-raised)', borderColor: 'var(--border)' }}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="font-mono-term text-lg font-semibold" style={{ color: 'var(--text)' }}>
              {term.term}
            </div>
            {term.aliases && term.aliases.length > 0 && (
              <div className="mt-0.5 text-xs" style={{ color: 'var(--text-faint)' }}>
                aka {term.aliases.join(', ')}
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={closeDrawer}
            className="rounded px-2 py-1 text-xs"
            style={{ color: 'var(--text-dim)', border: '1px solid var(--border)' }}
          >
            Esc
          </button>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <TierBadge tier={term.tier} />
          <Link
            to={`/pm/module/${term.moduleId}`}
            className="text-xs font-mono-term"
            style={{ color: 'var(--text-faint)' }}
            onClick={closeDrawer}
          >
            {term.moduleId}
          </Link>
        </div>

        <p className="mt-4 text-sm font-medium" style={{ color: 'var(--text)' }}>
          {term.oneLiner}
        </p>

        <p className="mt-3 text-sm" style={{ color: 'var(--text-dim)' }}>
          {term.full}
        </p>

        <div className="mt-4 rounded border p-3" style={{ borderColor: 'var(--border)', background: 'var(--bg-sunken)' }}>
          <div className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: 'var(--text-faint)' }}>
            Dev analogy
          </div>
          <p className="mt-1 text-sm" style={{ color: 'var(--text)' }}>
            {term.devAnalogy}
          </p>
        </div>

        {term.leverage && (
          <div className="mt-3 rounded border p-3" style={{ borderColor: 'var(--border)' }}>
            <div className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: 'var(--text-faint)' }}>
              Your leverage
            </div>
            <p className="mt-1 text-sm" style={{ color: 'var(--text)' }}>
              {term.leverage}
            </p>
          </div>
        )}

        {term.sayThis && (
          <div className="mt-3 rounded border p-3" style={{ borderColor: 'var(--accent)', background: 'var(--accent-dim)' }}>
            <div className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: 'var(--accent-text)' }}>
              Say this
            </div>
            <p className="mt-1 text-sm italic" style={{ color: 'var(--text)' }}>
              "{term.sayThis}"
            </p>
          </div>
        )}

        {term.antiPattern && (
          <div className="mt-3 rounded border p-3" style={{ borderColor: 'var(--border)' }}>
            <div className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: 'var(--text-faint)' }}>
              Anti-pattern
            </div>
            <p className="mt-1 text-sm" style={{ color: 'var(--text-dim)' }}>
              {term.antiPattern}
            </p>
          </div>
        )}

        {related.length > 0 && (
          <div className="mt-4">
            <div className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: 'var(--text-faint)' }}>
              Related
            </div>
            <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
              {related.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  className="term-chip"
                  onClick={() => useUiStore.getState().openDrawer(r.id)}
                >
                  {r.term}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6 flex gap-2">
          <button
            type="button"
            onClick={() => (inDeck ? removeFromDeck(term.id) : addToDeck(term.id))}
            className="rounded px-3 py-1.5 text-xs font-medium"
            style={
              inDeck
                ? { border: '1px solid var(--border)', color: 'var(--text-dim)' }
                : { background: 'var(--accent)', color: '#fff' }
            }
          >
            {inDeck ? 'In review deck ✓' : 'Add to review deck'}
          </button>
          <Link
            to={`/pm/term/${term.id}`}
            onClick={closeDrawer}
            className="rounded px-3 py-1.5 text-xs font-medium"
            style={{ border: '1px solid var(--border)', color: 'var(--text-dim)' }}
          >
            Full page
          </Link>
        </div>
      </aside>
    </div>
  );
}
