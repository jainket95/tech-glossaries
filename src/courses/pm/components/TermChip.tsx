import { useUiStore } from '../store/ui';

export function TermChip({ termId, label }: { termId: string; label: string }) {
  const openDrawer = useUiStore((s) => s.openDrawer);
  return (
    <button
      type="button"
      className="term-chip"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        openDrawer(termId);
      }}
    >
      {label}
    </button>
  );
}
