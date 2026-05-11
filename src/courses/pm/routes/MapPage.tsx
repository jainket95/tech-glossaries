import { Link } from 'react-router-dom';
import { modules } from '../content';
import { useProgressStore } from '../store/progress';
import { computeModuleProgress } from '../lib/moduleProgress';

export function MapPage() {
  const progress = useProgressStore();

  return (
    <div className="mx-auto max-w-2xl px-8 py-10">
      <h1 className="text-xl font-semibold" style={{ color: 'var(--text)' }}>
        Layer map
      </h1>
      <p className="mt-1 text-sm" style={{ color: 'var(--text-dim)' }}>
        Strategy at the top, execution mechanics underneath, org gravity at the base.
      </p>

      <div className="mt-8 flex flex-col gap-2">
        {modules.map((m) => {
          const status = computeModuleProgress(m, progress);
          return (
            <Link
              key={m.id}
              to={`/pm/module/${m.id}`}
              className="flex items-center gap-4 rounded-lg border px-4 py-3"
              style={{
                borderColor: status.complete ? 'var(--accent)' : 'var(--border)',
                background: 'var(--bg-raised)',
              }}
            >
              <span className="font-mono-term w-9 shrink-0 text-sm" style={{ color: 'var(--accent-text)' }}>
                L{m.order}
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium" style={{ color: 'var(--text)' }}>
                  {m.title}
                </div>
                <div className="truncate text-xs" style={{ color: 'var(--text-faint)' }}>
                  {m.subtitle}
                </div>
              </div>
              <div
                className="h-1.5 w-24 shrink-0 overflow-hidden rounded-full"
                style={{ background: 'var(--bg-sunken)' }}
              >
                <div
                  className="h-full rounded-full"
                  style={{ width: `${Math.round(status.fractionDone * 100)}%`, background: 'var(--accent)' }}
                />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
