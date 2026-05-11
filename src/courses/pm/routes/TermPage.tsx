import { Link, Navigate, useParams } from 'react-router-dom';
import { termById, relatedTerms } from '../content';
import { useProgressStore } from '../store/progress';
import { TierBadge } from '../components/TierBadge';

export function TermPage() {
  const { id } = useParams<{ id: string }>();
  const term = id ? termById[id] : undefined;
  const isInDeck = useProgressStore((s) => s.isInDeck);
  const addToDeck = useProgressStore((s) => s.addToDeck);
  const removeFromDeck = useProgressStore((s) => s.removeFromDeck);

  if (!term) return <Navigate to="/pm/glossary" replace />;

  const inDeck = isInDeck(term.id);
  const related = relatedTerms(term.id);

  return (
    <div className="mx-auto max-w-2xl px-8 py-10">
      <Link to={`/pm/module/${term.moduleId}`} className="text-xs font-mono-term" style={{ color: 'var(--text-faint)' }}>
        {term.moduleId}
      </Link>

      <div className="mt-2 flex items-center gap-3">
        <h1 className="font-mono-term text-2xl font-semibold" style={{ color: 'var(--text)' }}>
          {term.term}
        </h1>
        <TierBadge tier={term.tier} />
      </div>
      {term.aliases && term.aliases.length > 0 && (
        <div className="mt-1 text-sm" style={{ color: 'var(--text-faint)' }}>
          aka {term.aliases.join(', ')}
        </div>
      )}

      <p className="mt-4 text-base font-medium" style={{ color: 'var(--text)' }}>
        {term.oneLiner}
      </p>
      <p className="mt-3 text-sm leading-relaxed" style={{ color: 'var(--text-dim)' }}>
        {term.full}
      </p>

      <div className="mt-6 rounded-lg border p-4" style={{ borderColor: 'var(--border)', background: 'var(--bg-sunken)' }}>
        <div className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: 'var(--text-faint)' }}>
          Dev analogy
        </div>
        <p className="mt-1.5 text-sm" style={{ color: 'var(--text)' }}>
          {term.devAnalogy}
        </p>
      </div>

      {term.leverage && (
        <div className="mt-4 rounded-lg border p-4" style={{ borderColor: 'var(--border)' }}>
          <div className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: 'var(--text-faint)' }}>
            Your leverage
          </div>
          <p className="mt-1.5 text-sm" style={{ color: 'var(--text)' }}>
            {term.leverage}
          </p>
        </div>
      )}

      {term.sayThis && (
        <div className="mt-4 rounded-lg border p-4" style={{ borderColor: 'var(--accent)', background: 'var(--accent-dim)' }}>
          <div className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: 'var(--accent-text)' }}>
            Say this in a meeting
          </div>
          <p className="mt-1.5 text-sm italic" style={{ color: 'var(--text)' }}>
            "{term.sayThis}"
          </p>
        </div>
      )}

      {term.antiPattern && (
        <div className="mt-4 rounded-lg border p-4" style={{ borderColor: 'var(--border)' }}>
          <div className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: 'var(--text-faint)' }}>
            Anti-pattern
          </div>
          <p className="mt-1.5 text-sm" style={{ color: 'var(--text-dim)' }}>
            {term.antiPattern}
          </p>
        </div>
      )}

      {related.length > 0 && (
        <div className="mt-6">
          <div className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: 'var(--text-faint)' }}>
            Related terms
          </div>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5">
            {related.map((r) => (
              <Link key={r.id} to={`/pm/term/${r.id}`} className="term-chip">
                {r.term}
              </Link>
            ))}
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => (inDeck ? removeFromDeck(term.id) : addToDeck(term.id))}
        className="mt-8 rounded px-4 py-2 text-sm font-medium"
        style={
          inDeck
            ? { border: '1px solid var(--border)', color: 'var(--text-dim)' }
            : { background: 'var(--accent)', color: '#fff' }
        }
      >
        {inDeck ? 'In review deck ✓' : 'Add to review deck'}
      </button>
    </div>
  );
}
