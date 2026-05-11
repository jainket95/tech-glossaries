import { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { exerciseModuleById } from '../content';
import { useProgressStore } from '../store/progress';
import { Prose } from '../components/Prose';

export function Exercise() {
  const { id } = useParams<{ id: string }>();
  const module = id ? exerciseModuleById[id] : undefined;
  const draft = useProgressStore((s) => (module ? s.exerciseDrafts[module.exercise.id] ?? '' : ''));
  const setExerciseDraft = useProgressStore((s) => s.setExerciseDraft);
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const [text, setText] = useState(draft);

  useEffect(() => {
    setText(draft);
  }, [draft]);

  if (!module) return <Navigate to="/pm" replace />;
  const exercise = module.exercise;

  return (
    <div className="mx-auto max-w-2xl px-8 py-10">
      <Link to={`/pm/module/${module.id}`} className="text-xs font-mono-term" style={{ color: 'var(--text-faint)' }}>
        {module.id}
      </Link>
      <h1 className="mt-2 text-xl font-semibold" style={{ color: 'var(--text)' }}>
        {exercise.title}
      </h1>

      <div className="mt-4">
        <Prose body={exercise.prompt} keyTerms={[]} />
      </div>

      <div className="mt-6">
        <div className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: 'var(--text-faint)' }}>
          Your draft
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={() => setExerciseDraft(exercise.id, text)}
          placeholder={exercise.scaffold}
          rows={12}
          className="mt-2 w-full rounded-lg border p-3 font-mono-term text-sm outline-none"
          style={{ borderColor: 'var(--border)', background: 'var(--bg-raised)', color: 'var(--text)' }}
        />
        <button
          type="button"
          onClick={() => setExerciseDraft(exercise.id, text)}
          className="mt-2 rounded px-3 py-1.5 text-xs font-medium"
          style={{ background: 'var(--accent)', color: '#fff' }}
        >
          Save draft
        </button>
      </div>

      <div className="mt-8">
        <div className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: 'var(--text-faint)' }}>
          Self-check
        </div>
        <div className="mt-2 space-y-2">
          {exercise.rubric.map((r, i) => (
            <label key={i} className="flex items-start gap-2 text-sm" style={{ color: 'var(--text)' }}>
              <input
                type="checkbox"
                checked={Boolean(checked[i])}
                onChange={(e) => setChecked((c) => ({ ...c, [i]: e.target.checked }))}
                className="mt-0.5"
              />
              <span>{r}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
