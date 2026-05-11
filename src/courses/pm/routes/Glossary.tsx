import { useMemo, useState } from 'react';
import { modules, allTerms } from '../content';
import type { Tier } from '../types';
import { useUiStore } from '../store/ui';
import { TierBadge } from '../components/TierBadge';

export function Glossary() {
  const [query, setQuery] = useState('');
  const [moduleFilter, setModuleFilter] = useState<string>('all');
  const [tierFilter, setTierFilter] = useState<Tier | 'all'>('all');
  const openDrawer = useUiStore((s) => s.openDrawer);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allTerms
      .filter((t) => (moduleFilter === 'all' ? true : t.moduleId === moduleFilter))
      .filter((t) => (tierFilter === 'all' ? true : t.tier === tierFilter))
      .filter((t) => {
        if (!q) return true;
        return (
          t.term.toLowerCase().includes(q) ||
          t.oneLiner.toLowerCase().includes(q) ||
          t.aliases?.some((a) => a.toLowerCase().includes(q))
        );
      })
      .sort((a, b) => a.term.localeCompare(b.term));
  }, [query, moduleFilter, tierFilter]);

  return (
    <div className="mx-auto max-w-3xl px-8 py-10">
      <h1 className="text-xl font-semibold" style={{ color: 'var(--text)' }}>
        Glossary
      </h1>
      <p className="mt-1 text-sm" style={{ color: 'var(--text-dim)' }}>
        {allTerms.length} terms across {modules.length} modules.
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search terms..."
          className="w-56 rounded border px-3 py-1.5 text-sm outline-none"
          style={{ borderColor: 'var(--border)', background: 'var(--bg-raised)', color: 'var(--text)' }}
        />
        <select
          value={moduleFilter}
          onChange={(e) => setModuleFilter(e.target.value)}
          className="rounded border px-2 py-1.5 text-sm outline-none"
          style={{ borderColor: 'var(--border)', background: 'var(--bg-raised)', color: 'var(--text)' }}
        >
          <option value="all">All modules</option>
          {modules.map((m) => (
            <option key={m.id} value={m.id}>
              {m.id.toUpperCase()} — {m.title}
            </option>
          ))}
        </select>
        <select
          value={String(tierFilter)}
          onChange={(e) => setTierFilter(e.target.value === 'all' ? 'all' : (Number(e.target.value) as Tier))}
          className="rounded border px-2 py-1.5 text-sm outline-none"
          style={{ borderColor: 'var(--border)', background: 'var(--bg-raised)', color: 'var(--text)' }}
        >
          <option value="all">All tiers</option>
          <option value="1">Tier 1</option>
          <option value="2">Tier 2</option>
          <option value="3">Tier 3</option>
        </select>
      </div>

      <div className="mt-6 divide-y" style={{ borderColor: 'var(--border)' }}>
        {filtered.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => openDrawer(t.id)}
            className="flex w-full items-start gap-3 py-3 text-left"
            style={{ borderColor: 'var(--border)' }}
          >
            <span className="font-mono-term w-28 shrink-0 truncate text-sm" style={{ color: 'var(--accent-text)' }}>
              {t.term}
            </span>
            <span className="flex-1 text-sm" style={{ color: 'var(--text-dim)' }}>
              {t.oneLiner}
            </span>
            <TierBadge tier={t.tier} />
          </button>
        ))}
        {filtered.length === 0 && (
          <div className="py-8 text-center text-sm" style={{ color: 'var(--text-faint)' }}>
            No terms match.
          </div>
        )}
      </div>
    </div>
  );
}
