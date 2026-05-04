import { Link } from 'react-router-dom';
import { courses } from '../courses/registry';

export function Home() {
  return (
    <div className="mx-auto flex min-h-screen max-w-3xl flex-col px-6 py-16">
      <header className="mb-10">
        <div
          className="font-mono-term text-xs uppercase tracking-wide"
          style={{ color: 'var(--text-faint)' }}
        >
          reference library
        </div>
        <h1 className="mt-1 text-2xl font-semibold" style={{ color: 'var(--text)' }}>
          Master System Design and Product Management Glossaries
        </h1>
        <p className="mt-1 text-sm" style={{ color: 'var(--text-dim)' }}>
          Pick a track. Each one is a standalone reference you can dip into at any depth.
        </p>
      </header>

      <div className="grid gap-3">
        {courses.map((c) => (
          <Link
            key={c.id}
            to={c.path}
            className="block rounded border px-5 py-4 transition-colors"
            style={{
              borderColor: 'var(--border)',
              borderLeft: `3px solid ${c.accent}`,
              background: 'var(--bg-raised)',
            }}
          >
            <div className="font-mono-term text-base font-medium" style={{ color: c.accent }}>
              {c.title}
            </div>
            <div className="mt-1 text-sm" style={{ color: 'var(--text-dim)' }}>
              {c.tagline}
            </div>
            <div className="mt-3 text-xs" style={{ color: 'var(--text-faint)' }}>
              Open →
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
