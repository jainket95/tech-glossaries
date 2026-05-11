import { Link, Navigate, useParams } from 'react-router-dom';
import { moduleById } from '../content';
import { useProgressStore } from '../store/progress';
import { computeModuleProgress } from '../lib/moduleProgress';
import { TierBadge } from '../components/TierBadge';
import { useUiStore } from '../store/ui';

export function ModuleOverview() {
  const { id } = useParams<{ id: string }>();
  const progress = useProgressStore();
  const openDrawer = useUiStore((s) => s.openDrawer);
  const module = id ? moduleById[id] : undefined;

  if (!module) return <Navigate to="/pm" replace />;

  const status = computeModuleProgress(module, progress);
  const tier1Terms = module.terms.filter((t) => t.tier === 1);
  const otherTerms = module.terms.filter((t) => t.tier !== 1);

  return (
    <div className="mx-auto max-w-3xl px-8 py-10">
      <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-faint)' }}>
        <span className="font-mono-term">L{module.order}</span>
        <span>·</span>
        <span>{module.estMinutes} min</span>
        <span>·</span>
        <span>{module.terms.length} terms</span>
      </div>

      <h1 className="mt-2 text-2xl font-semibold" style={{ color: 'var(--text)' }}>
        {module.title}
      </h1>
      <p className="mt-1 text-sm" style={{ color: 'var(--text-dim)' }}>
        {module.subtitle}
      </p>

      <div className="mt-5 rounded-lg border p-4" style={{ borderColor: 'var(--border)', background: 'var(--bg-sunken)' }}>
        <div className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: 'var(--text-faint)' }}>
          Why this matters to you
        </div>
        <p className="mt-1.5 text-sm" style={{ color: 'var(--text)' }}>
          {module.why}
        </p>
      </div>

      <section className="mt-8">
        <h2 className="text-sm font-semibold" style={{ color: 'var(--text)' }}>
          Lessons
        </h2>
        <div className="mt-2 divide-y" style={{ borderColor: 'var(--border)' }}>
          {module.lessons.map((lesson, i) => {
            const read = progress.isLessonRead(lesson.id);
            return (
              <Link
                key={lesson.id}
                to={`/pm/module/${module.id}/lesson/${lesson.id}`}
                className="flex items-center gap-3 py-3"
                style={{ borderColor: 'var(--border)' }}
              >
                <span className="font-mono-term w-5 text-xs" style={{ color: 'var(--text-faint)' }}>
                  {i + 1}
                </span>
                <span className="flex-1 text-sm" style={{ color: 'var(--text)' }}>
                  {lesson.title}
                </span>
                <span
                  className="text-xs"
                  style={{ color: read ? 'var(--accent-text)' : 'var(--text-faint)' }}
                >
                  {read ? 'read' : 'unread'}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-sm font-semibold" style={{ color: 'var(--text)' }}>
          Terms in this module
        </h2>
        <div className="mt-3">
          <div className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: 'var(--text-faint)' }}>
            Tier 1 — must know
          </div>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5">
            {tier1Terms.map((t) => (
              <button key={t.id} type="button" className="term-chip" onClick={() => openDrawer(t.id)}>
                {t.term}
              </button>
            ))}
          </div>
        </div>
        {otherTerms.length > 0 && (
          <div className="mt-4">
            <div className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: 'var(--text-faint)' }}>
              Tier 2 / 3
            </div>
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5">
              {otherTerms.map((t) => (
                <button key={t.id} type="button" className="term-chip" onClick={() => openDrawer(t.id)}>
                  {t.term}
                </button>
              ))}
            </div>
          </div>
        )}
      </section>

      <div className="mt-9 flex flex-wrap items-center gap-3 border-t pt-6" style={{ borderColor: 'var(--border)' }}>
        <Link
          to={`/pm/quiz/${module.id}`}
          className="rounded px-4 py-2 text-sm font-medium"
          style={{ background: 'var(--accent)', color: '#fff' }}
        >
          Take quiz{status.quizScore !== null ? ` (best ${status.quizScore}%)` : ''}
        </Link>
        <Link
          to={`/pm/exercise/${module.exercise.id}`}
          className="rounded border px-4 py-2 text-sm font-medium"
          style={{ borderColor: 'var(--border)', color: 'var(--text)' }}
        >
          {status.exerciseDone ? 'Revisit exercise' : 'Do the exercise'}
        </Link>
        <TierBadge tier={1} />
        <span className="text-xs" style={{ color: 'var(--text-faint)' }}>
          {tier1Terms.length} tier-1 terms in this module
        </span>
      </div>
    </div>
  );
}
