import { useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { moduleById } from '../content';
import { useProgressStore } from '../store/progress';

export function Quiz() {
  const { id } = useParams<{ id: string }>();
  const module = id ? moduleById[id] : undefined;
  const setQuizScore = useProgressStore((s) => s.setQuizScore);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [matchAnswers, setMatchAnswers] = useState<Record<string, Record<number, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  if (!module) return <Navigate to="/pm" replace />;
  const mod = module;

  function selectMcq(qid: string, idx: number) {
    if (submitted) return;
    setAnswers((a) => ({ ...a, [qid]: idx }));
  }

  function selectMatch(qid: string, pairIndex: number, value: string) {
    if (submitted) return;
    setMatchAnswers((m) => ({ ...m, [qid]: { ...(m[qid] ?? {}), [pairIndex]: value } }));
  }

  function score(): number {
    let correct = 0;
    for (const q of mod.quiz) {
      if (q.kind === 'mcq' || q.kind === 'scenario') {
        if (answers[q.id] === q.answer) correct++;
      } else {
        const given = matchAnswers[q.id] ?? {};
        const allRight = q.pairs.every(([left], i) => given[i] === left);
        if (allRight) correct++;
      }
    }
    return Math.round((correct / mod.quiz.length) * 100);
  }

  function handleSubmit() {
    const s = score();
    setQuizScore(mod.id, s);
    setSubmitted(true);
  }

  const finalScore = submitted ? score() : null;
  const allAnswered = mod.quiz.every((q) =>
    q.kind === 'match'
      ? Object.keys(matchAnswers[q.id] ?? {}).length === q.pairs.length
      : answers[q.id] !== undefined
  );

  return (
    <div className="mx-auto max-w-2xl px-8 py-10">
      <Link to={`/pm/module/${module.id}`} className="text-xs font-mono-term" style={{ color: 'var(--text-faint)' }}>
        {module.id}
      </Link>
      <h1 className="mt-2 text-xl font-semibold" style={{ color: 'var(--text)' }}>
        {module.title} — Quiz
      </h1>

      {submitted && finalScore !== null && (
        <div
          className="mt-4 rounded-lg border p-4 text-sm font-medium"
          style={{
            borderColor: finalScore >= 70 ? 'var(--accent)' : 'var(--border)',
            background: finalScore >= 70 ? 'var(--accent-dim)' : 'var(--bg-sunken)',
            color: 'var(--text)',
          }}
        >
          Score: {finalScore}% {finalScore >= 70 ? '— passed' : '— retake to pass (need 70%)'}
        </div>
      )}

      <div className="mt-6 space-y-6">
        {module.quiz.map((q, i) => (
          <div key={q.id} className="rounded-lg border p-4" style={{ borderColor: 'var(--border)' }}>
            <div className="text-sm font-medium" style={{ color: 'var(--text)' }}>
              {i + 1}. {q.prompt}
            </div>

            {(q.kind === 'mcq' || q.kind === 'scenario') && (
              <div className="mt-3 space-y-1.5">
                {q.options.map((opt, oi) => {
                  const isSelected = answers[q.id] === oi;
                  const isCorrect = q.answer === oi;
                  const showState = submitted;
                  return (
                    <button
                      key={oi}
                      type="button"
                      disabled={submitted}
                      onClick={() => selectMcq(q.id, oi)}
                      className="block w-full rounded border px-3 py-2 text-left text-sm"
                      style={{
                        borderColor: showState && isCorrect ? 'var(--accent)' : 'var(--border)',
                        background: isSelected
                          ? showState
                            ? isCorrect
                              ? 'var(--accent-dim)'
                              : 'var(--bg-sunken)'
                            : 'var(--bg-sunken)'
                          : 'transparent',
                        color: 'var(--text)',
                      }}
                    >
                      {opt}
                      {showState && isCorrect ? ' ✓' : ''}
                      {showState && isSelected && !isCorrect ? ' ✗' : ''}
                    </button>
                  );
                })}
              </div>
            )}

            {q.kind === 'match' && (
              <div className="mt-3 space-y-2">
                {q.pairs.map(([left, right], pi) => (
                  <div key={pi} className="flex items-center gap-2 text-sm">
                    <span className="w-1/2" style={{ color: 'var(--text)' }}>
                      {right}
                    </span>
                    <select
                      disabled={submitted}
                      value={matchAnswers[q.id]?.[pi] ?? ''}
                      onChange={(e) => selectMatch(q.id, pi, e.target.value)}
                      className="w-1/2 rounded border px-2 py-1 text-sm"
                      style={{ borderColor: 'var(--border)', background: 'var(--bg-raised)', color: 'var(--text)' }}
                    >
                      <option value="" disabled>
                        Match...
                      </option>
                      {q.pairs.map(([l], li) => (
                        <option key={li} value={l}>
                          {l}
                        </option>
                      ))}
                    </select>
                    {submitted && (
                      <span style={{ color: matchAnswers[q.id]?.[pi] === left ? 'var(--accent-text)' : 'var(--text-faint)' }}>
                        {matchAnswers[q.id]?.[pi] === left ? '✓' : `✗ (${left})`}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}

            {submitted && (
              <p className="mt-3 text-xs" style={{ color: 'var(--text-dim)' }}>
                {q.explain}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 flex gap-3">
        {!submitted ? (
          <button
            type="button"
            disabled={!allAnswered}
            onClick={handleSubmit}
            className="rounded px-4 py-2 text-sm font-medium disabled:opacity-40"
            style={{ background: 'var(--accent)', color: '#fff' }}
          >
            Submit
          </button>
        ) : (
          <button
            type="button"
            onClick={() => {
              setSubmitted(false);
              setAnswers({});
              setMatchAnswers({});
            }}
            className="rounded border px-4 py-2 text-sm font-medium"
            style={{ borderColor: 'var(--border)', color: 'var(--text)' }}
          >
            Retake
          </button>
        )}
        <Link
          to={`/pm/module/${module.id}`}
          className="rounded border px-4 py-2 text-sm font-medium"
          style={{ borderColor: 'var(--border)', color: 'var(--text)' }}
        >
          Back to module
        </Link>
      </div>
    </div>
  );
}
