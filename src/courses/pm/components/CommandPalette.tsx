import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUiStore } from '../store/ui';
import { modules, allTerms, allLessons } from '../content';

type Item = { id: string; kind: 'module' | 'lesson' | 'term'; label: string; sub: string; go: () => void };

export function CommandPalette() {
  const open = useUiStore((s) => s.paletteOpen);
  const setOpen = useUiStore((s) => s.setPaletteOpen);
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen(!open);
      } else if (e.key === 'Escape' && open) {
        setOpen(false);
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, setOpen]);

  useEffect(() => {
    if (open) {
      setQuery('');
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open]);

  const items = useMemo<Item[]>(() => {
    const moduleItems: Item[] = modules.map((m) => ({
      id: m.id,
      kind: 'module',
      label: `${m.id.toUpperCase()} — ${m.title}`,
      sub: m.subtitle,
      go: () => navigate(`/pm/module/${m.id}`),
    }));
    const lessonItems: Item[] = allLessons.map((l) => ({
      id: l.id,
      kind: 'lesson',
      label: l.title,
      sub: `${l.moduleId} · lesson`,
      go: () => navigate(`/pm/module/${l.moduleId}/lesson/${l.id}`),
    }));
    const termItems: Item[] = allTerms.map((t) => ({
      id: t.id,
      kind: 'term',
      label: t.term,
      sub: t.oneLiner,
      go: () => navigate(`/pm/term/${t.id}`),
    }));
    return [...moduleItems, ...lessonItems, ...termItems];
  }, [navigate]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items.slice(0, 8);
    return items.filter((i) => i.label.toLowerCase().includes(q) || i.sub.toLowerCase().includes(q)).slice(0, 20);
  }, [items, query]);

  if (!open) return null;

  function choose(item: Item) {
    item.go();
    setOpen(false);
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center pt-[12vh]">
      <button type="button" aria-label="Close command palette" className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
      <div
        className="relative w-full max-w-lg overflow-hidden rounded-lg border shadow-xl"
        style={{ background: 'var(--bg-raised)', borderColor: 'var(--border)' }}
      >
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(0);
          }}
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown') {
              e.preventDefault();
              setActive((a) => Math.min(a + 1, filtered.length - 1));
            } else if (e.key === 'ArrowUp') {
              e.preventDefault();
              setActive((a) => Math.max(a - 1, 0));
            } else if (e.key === 'Enter' && filtered[active]) {
              choose(filtered[active]);
            }
          }}
          placeholder="Jump to a term, lesson, or module..."
          className="w-full border-b bg-transparent px-4 py-3 text-sm outline-none"
          style={{ borderColor: 'var(--border)', color: 'var(--text)' }}
        />
        <div className="max-h-80 overflow-y-auto py-1">
          {filtered.length === 0 && (
            <div className="px-4 py-6 text-center text-sm" style={{ color: 'var(--text-faint)' }}>
              No matches.
            </div>
          )}
          {filtered.map((item, i) => (
            <button
              key={`${item.kind}-${item.id}`}
              type="button"
              onClick={() => choose(item)}
              onMouseEnter={() => setActive(i)}
              className="flex w-full items-center gap-3 px-4 py-2 text-left text-sm"
              style={{ background: i === active ? 'var(--bg-sunken)' : 'transparent' }}
            >
              <span
                className="w-14 shrink-0 text-[10px] font-semibold uppercase tracking-wide"
                style={{ color: 'var(--text-faint)' }}
              >
                {item.kind}
              </span>
              <span className="flex-1 truncate">
                <span style={{ color: 'var(--text)' }}>{item.label}</span>
                <span className="ml-2 text-xs" style={{ color: 'var(--text-faint)' }}>
                  {item.sub}
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
