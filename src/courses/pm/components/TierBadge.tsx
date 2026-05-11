import type { Tier } from '../types';

const LABEL: Record<Tier, string> = { 1: 'tier 1 · must know', 2: 'tier 2 · should know', 3: 'tier 3 · nice to know' };

export function TierBadge({ tier }: { tier: Tier }) {
  return (
    <span
      className="rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide"
      style={
        tier === 1
          ? { background: 'var(--accent-dim)', color: 'var(--accent-text)' }
          : { background: 'var(--bg-sunken)', color: 'var(--text-faint)' }
      }
    >
      {LABEL[tier]}
    </span>
  );
}
