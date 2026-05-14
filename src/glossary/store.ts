import { create } from 'zustand';

// No persistence — unlike PM's ui store, there's nothing here worth
// surviving a reload (which term's drawer was open is transient UI state).
type GlossaryUiState = {
  openTermId: string | null;
  openTerm: (id: string) => void;
  closeTerm: () => void;
};

export const useGlossaryStore = create<GlossaryUiState>()((set) => ({
  openTermId: null,
  openTerm: (id) => set({ openTermId: id }),
  closeTerm: () => set({ openTermId: null }),
}));
