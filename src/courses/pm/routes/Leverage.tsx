import { leveragePlays, termById } from '../content';
import { useUiStore } from '../store/ui';
import type { LeveragePlay } from '../types';

export function Leverage() {
  const openDrawer = useUiStore((s) => s.openDrawer);

  return (
    <div className="mx-auto max-w-3xl px-8 py-10">
      <h1 className="text-xl font-semibold" style={{ color: 'var(--text)' }}>
        Leverage plays
      </h1>
      <p className="mt-1 text-sm" style={{ color: 'var(--text-dim)' }}>
        {leveragePlays.length} concrete moves a frontend dev can make to earn product influence.
      </p>

      <div className="mt-6 space-y-4">
        {leveragePlays.map((play: LeveragePlay) => (
          <div key={play.id} className="rounded-lg border p-4" style={{ borderColor: 'var(--border)', background: 'var(--bg-raised)' }}>
            <div className="text-sm font-semibold" style={{ color: 'var(--text)' }}>
              {play.title}
            </div>
            <p className="mt-1.5 text-sm" style={{ color: 'var(--text-dim)' }}>
              {play.situation}
            </p>
            <div className="mt-3 rounded border p-3" style={{ borderColor: 'var(--accent)', background: 'var(--accent-dim)' }}>
              <div className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: 'var(--accent-text)' }}>
                Say this
              </div>
              <p className="mt-1 text-sm italic" style={{ color: 'var(--text)' }}>
                "{play.sayThis}"
              </p>
            </div>
            <p className="mt-3 text-sm" style={{ color: 'var(--text)' }}>
              <span className="font-medium">What it gets you: </span>
              {play.whatItGetsYou}
            </p>
            <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
              {play.relatedTerms.map((tid: string) => {
                const t = termById[tid];
                if (!t) return null;
                return (
                  <button key={tid} type="button" className="term-chip" onClick={() => openDrawer(tid)}>
                    {t.term}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
