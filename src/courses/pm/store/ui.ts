import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'light' | 'dark' | 'system';

type UiState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  drawerTermId: string | null;
  openDrawer: (termId: string) => void;
  closeDrawer: () => void;
  paletteOpen: boolean;
  setPaletteOpen: (open: boolean) => void;
};

export const useUiStore = create<UiState>()(
  persist(
    (set) => ({
      theme: 'light',
      setTheme: (theme) => set({ theme }),
      drawerTermId: null,
      openDrawer: (termId) => set({ drawerTermId: termId }),
      closeDrawer: () => set({ drawerTermId: null }),
      paletteOpen: false,
      setPaletteOpen: (open) => set({ paletteOpen: open }),
    }),
    {
      name: 'pm-for-engineers-ui',
      version: 1,
      // v0 defaulted `theme` to 'system', which relied on a global OS-driven
      // dark stylesheet that no longer exists (removed from src/index.css —
      // three of the four courses in this app are light-only, so an
      // app-wide auto-dark default no longer makes sense). Map any
      // previously-persisted 'system' to 'light' so machines with a dark OS
      // theme don't keep reproducing the old "boots in dark mode" bug.
      migrate: (persisted) => {
        const state = persisted as { theme?: Theme };
        if (state?.theme === 'system') return { theme: 'light' };
        return state;
      },
      partialize: (state) => ({ theme: state.theme }),
    }
  )
);

// Applies PM's theme to <html data-theme>. 'system' is resolved here (not
// via CSS media query) so the effect stays scoped to PM's own lifetime —
// see clearTheme() and src/courses/pm/components/Layout.tsx.
export function applyTheme(theme: Theme) {
  const resolved =
    theme === 'system'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
      : theme;
  document.documentElement.setAttribute('data-theme', resolved);
}

// Removes PM's theme override so the landing page and the other courses
// (which are light-only) fall back to the app's light default, instead of
// inheriting whatever PM last set.
export function clearTheme() {
  document.documentElement.removeAttribute('data-theme');
}
