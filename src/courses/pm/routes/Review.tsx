import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { termById } from '../content';
import { useProgressStore } from '../store/progress';
import { isDue, type Grade } from '../lib/srs';
import { TierBadge } from '../components/TierBadge';

const GRADES: { grade: Grade; label: string; hint: string }[] = [
  { grade: 'again', label: 'Again', hint: 'no idea' },
  { grade: 'hard', label: 'Hard', hint: 'shaky' },
  { grade: 'good', label: 'Good', hint: 'got it' },
  { grade: 'easy', label: 'Easy', hint: 'instant' },
];

export function Review() {
  const srs = useProgressStore((s) => s.srs);
  const gradeSrsCard = useProgressStore((s) => s.gradeSrsCard);
  const [revealed, setRevealed] = useState(false);
  const [sessionDone, setSessionDone] = useState(0);

  const dueIds = useMemo(() => {
    const now = new Date();
    return Object.entries(srs)
      .filter(([, card]) => isDue(card, now))
      .map(([id]) => id)
      .filter((id) => termById[id]);
  }, [srs]);

  const current = dueIds[0];
  const term = current ? termById[current] : undefined;

  function grade(g: Grade) {
    if (!current) return;
    gradeSrsCard(current, g);
    setRevealed(false);
    setSessionDone((n) => n + 1);
  }

  const deckSize = Object.keys(srs).length;

  return (
    <div className="mx-auto max-w-xl px-8 py-10">
      <h1 className="text-xl font-semibold" style={{ color: 'var(--text)' }}>
        Review
      </h1>
      <p className="mt-1 text-sm" style={{ color: 'var(--text-dim)' }}>
        {deckSize} cards in deck · {dueIds.length} due now
        {sessionDone > 0 ? ` · ${sessionDone} reviewed this session` : ''}
      </p>

      {deckSize === 0 && (
        <div className="mt-8 rounded-lg border p-6 text-sm" style={{ borderColor: 'var(--border)', color: 'var(--text-dim)' }}>
          Your review deck is empty. Add terms from the{' '}
          <Link to="/pm/glossary" className="term-chip">
            glossary
          </Link>{' '}
          or from any term drawer.
        </div>
      )}

      {deckSize > 0 && !term && (
        <div className="mt-8 rounded-lg border p-6 text-sm" style={{ borderColor: 'var(--border)', color: 'var(--text-dim)' }}>
          Nothing due right now. Come back later, or browse the{' '}
          <Link to="/pm/glossary" className="term-chip">
            glossary
          </Link>{' '}
          to add more cards.
        </div>
      )}

      {term && (
        <div className="mt-8">
          <div
            className="flex min-h-64 flex-col items-center justify-center rounded-xl border p-8 text-center"
            style={{ borderColor: 'var(--border)', background: 'var(--bg-raised)' }}
          >
            <TierBadge tier={term.tier} />
            <div className="font-mono-term mt-4 text-2xl font-semibold" style={{ color: 'var(--text)' }}>
              {term.term}
            </div>

            {!revealed ? (
              <button
                type="button"
                onClick={() => setRevealed(true)}
                className="mt-6 rounded px-4 py-2 text-sm font-medium"
                style={{ background: 'var(--accent)', color: '#fff' }}
              >
                Show answer
              </button>
            ) : (
              <div className="mt-5 max-w-sm">
                <p className="text-sm font-medium" style={{ color: 'var(--text)' }}>
                  {term.oneLiner}
                </p>
                <p className="mt-3 text-sm" style={{ color: 'var(--text-dim)' }}>
                  {term.devAnalogy}
                </p>
              </div>
            )}
          </div>

          {revealed && (
            <div className="mt-4 grid grid-cols-4 gap-2">
              {GRADES.map((g) => (
                <button
                  key={g.grade}
                  type="button"
                  onClick={() => grade(g.grade)}
                  className="rounded border py-2 text-center text-sm font-medium"
                  style={{ borderColor: 'var(--border)', color: 'var(--text)' }}
                >
                  {g.label}
                  <div className="text-[10px] font-normal" style={{ color: 'var(--text-faint)' }}>
                    {g.hint}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
