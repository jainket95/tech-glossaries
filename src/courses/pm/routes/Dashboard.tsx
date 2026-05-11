import { Link } from 'react-router-dom';
import { modules } from '../content';
import { useProgressStore } from '../store/progress';
import { computeModuleProgress } from '../lib/moduleProgress';
import { ProgressRing } from '../components/ProgressRing';
import { isDue } from '../lib/srs';

export function Dashboard() {
  const progress = useProgressStore();

  const dueCount = Object.values(progress.srs).filter((c) => isDue(c, new Date())).length;
  const statuses = modules.map((m) => ({ module: m, status: computeModuleProgress(m, progress) }));
  const nextModule =
    statuses.find((s) => !s.status.complete && s.status.fractionDone > 0) ??
    statuses.find((s) => !s.status.complete) ??
    statuses[0];
  const overallDone = statuses.filter((s) => s.status.complete).length;

  return (
    <div className="mx-auto max-w-4xl px-8 py-10">
      <div className="flex items-baseline justify-between">
        <h1 className="text-xl font-semibold" style={{ color: 'var(--text)' }}>
          Dashboard
        </h1>
        <div className="text-sm" style={{ color: 'var(--text-dim)' }}>
          {overallDone} / {modules.length} modules complete
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        {nextModule && (
          <Link
            to={`/pm/module/${nextModule.module.id}`}
            className="rounded px-4 py-2.5 text-sm font-medium"
            style={{ background: 'var(--accent)', color: '#fff' }}
          >
            Continue — {nextModule.module.title}
          </Link>
        )}
        <Link
          to="/pm/review"
          className="rounded border px-4 py-2.5 text-sm font-medium"
          style={{ borderColor: 'var(--border)', color: 'var(--text)' }}
        >
          Review ({dueCount} due)
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {statuses.map(({ module, status }) => (
          <Link
            key={module.id}
            to={`/pm/module/${module.id}`}
            className="flex items-center gap-3 rounded-lg border p-4"
            style={{ borderColor: 'var(--border)', background: 'var(--bg-raised)' }}
          >
            <ProgressRing fraction={status.fractionDone} complete={status.complete} />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="font-mono-term text-xs" style={{ color: 'var(--text-faint)' }}>
                  L{module.order}
                </span>
                <span className="truncate text-sm font-medium" style={{ color: 'var(--text)' }}>
                  {module.title}
                </span>
              </div>
              <div className="mt-0.5 truncate text-xs" style={{ color: 'var(--text-dim)' }}>
                {status.lessonsRead}/{status.lessonsTotal} lessons
                {status.quizScore !== null ? ` · quiz ${status.quizScore}%` : ' · quiz not taken'}
                {status.exerciseDone ? ' · exercise done' : ''}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
