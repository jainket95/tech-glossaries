import { useEffect } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { modules } from '../content';
import { useUiStore, applyTheme, clearTheme } from '../store/ui';
import { useProgressStore } from '../store/progress';
import { computeModuleProgress } from '../lib/moduleProgress';
import { TermDrawer } from './TermDrawer';
import { CommandPalette } from './CommandPalette';

const NAV = [
  { to: '/pm', label: 'Dashboard' },
  { to: '/pm/glossary', label: 'Glossary' },
  { to: '/pm/review', label: 'Review' },
  { to: '/pm/leverage', label: 'Leverage' },
  { to: '/pm/map', label: 'Map' },
];

export function Layout() {
  const theme = useUiStore((s) => s.theme);
  const setTheme = useUiStore((s) => s.setTheme);
  const setPaletteOpen = useUiStore((s) => s.setPaletteOpen);
  const progress = useProgressStore();
  const location = useLocation();

  useEffect(() => {
    applyTheme(theme);
    // Leaving PM (unmount, e.g. via the "← All glossaries" link) restores
    // the app's light default instead of leaking PM's chosen theme onto the
    // landing page and the other courses.
    return () => clearTheme();
  }, [theme]);

  useEffect(() => {
    if (theme !== 'system') return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => applyTheme('system');
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [theme]);

  function cycleTheme() {
    setTheme(theme === 'system' ? 'light' : theme === 'light' ? 'dark' : 'system');
  }

  function exportData() {
    const json = progress.exportJson();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pm-for-engineers-progress.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  const activeModuleId = location.pathname.match(/\/module\/(pm-l\d+)/)?.[1];

  return (
    <div className="flex min-h-screen">
      <aside
        className="sticky top-0 flex h-screen w-56 shrink-0 flex-col border-r"
        style={{ borderColor: 'var(--border)', background: 'var(--bg-raised)' }}
      >
        <div className="px-4 py-4">
          <div className="text-sm font-semibold" style={{ color: 'var(--text)' }}>
            PM for Engineers
          </div>
          <div className="mt-0.5 text-[11px]" style={{ color: 'var(--text-faint)' }}>
            product vocabulary for devs
          </div>
        </div>

        <Link
          to="/"
          className="mx-2 mb-1 block rounded px-2.5 py-1.5 text-[12px]"
          style={{ color: 'var(--text-dim)' }}
        >
          ← All glossaries
        </Link>

        <nav className="px-2">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/pm'}
              className={({ isActive }) =>
                `mb-0.5 block rounded px-2.5 py-1.5 text-[13px] ${isActive ? 'font-medium' : ''}`
              }
              style={({ isActive }) => ({
                color: isActive ? 'var(--text)' : 'var(--text-dim)',
                background: isActive ? 'var(--bg-sunken)' : 'transparent',
              })}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-4 flex-1 overflow-y-auto px-2 pb-2">
          <div className="px-2.5 pb-1 text-[10px] font-semibold uppercase tracking-wide" style={{ color: 'var(--text-faint)' }}>
            Modules
          </div>
          {modules.map((m) => {
            const p = computeModuleProgress(m, progress);
            const isActive = m.id === activeModuleId;
            return (
              <NavLink
                key={m.id}
                to={`/pm/module/${m.id}`}
                className="flex items-center gap-2 rounded px-2.5 py-1.5 text-[13px]"
                style={{
                  color: isActive ? 'var(--text)' : 'var(--text-dim)',
                  background: isActive ? 'var(--bg-sunken)' : 'transparent',
                }}
              >
                <span
                  className="font-mono-term w-6 shrink-0 text-[11px]"
                  style={{ color: p.complete ? 'var(--accent-text)' : 'var(--text-faint)' }}
                >
                  L{m.order}
                </span>
                <span className="truncate">{m.title}</span>
                {p.complete && (
                  <span className="ml-auto text-[10px]" style={{ color: 'var(--accent-text)' }}>
                    ✓
                  </span>
                )}
              </NavLink>
            );
          })}
        </div>

        <div className="border-t px-2 py-2" style={{ borderColor: 'var(--border)' }}>
          <button
            type="button"
            onClick={() => setPaletteOpen(true)}
            className="mb-1 flex w-full items-center justify-between rounded px-2.5 py-1.5 text-[13px]"
            style={{ color: 'var(--text-dim)' }}
          >
            <span>Search</span>
            <kbd
              className="font-mono-term rounded border px-1.5 py-0.5 text-[10px]"
              style={{ borderColor: 'var(--border)', color: 'var(--text-faint)' }}
            >
              ⌘K
            </kbd>
          </button>
          <button
            type="button"
            onClick={cycleTheme}
            className="mb-1 flex w-full items-center justify-between rounded px-2.5 py-1.5 text-[13px]"
            style={{ color: 'var(--text-dim)' }}
          >
            <span>Theme</span>
            <span className="text-[11px] capitalize" style={{ color: 'var(--text-faint)' }}>
              {theme}
            </span>
          </button>
          <button
            type="button"
            onClick={exportData}
            className="flex w-full items-center justify-between rounded px-2.5 py-1.5 text-[13px]"
            style={{ color: 'var(--text-dim)' }}
          >
            <span>Export progress</span>
          </button>
        </div>
      </aside>

      <main className="min-w-0 flex-1">
        <Outlet />
      </main>

      <TermDrawer />
      <CommandPalette />
    </div>
  );
}
