import type { SrsCard } from '../types';

export type Grade = 'again' | 'hard' | 'good' | 'easy';

const GRADE_QUALITY: Record<Grade, number> = {
  again: 0,
  hard: 3,
  good: 4,
  easy: 5,
};

export function newCard(now: Date): SrsCard {
  return { ease: 2.5, interval: 0, due: now.toISOString(), reps: 0 };
}

/** SM-2 lite: same core update rule as SuperMemo-2, collapsed to four grades. */
export function gradeCard(card: SrsCard, grade: Grade, now: Date): SrsCard {
  const quality = GRADE_QUALITY[grade];
  let { ease, interval, reps } = card;

  if (quality < 3) {
    reps = 0;
    interval = 1;
  } else {
    reps += 1;
    if (reps === 1) interval = 1;
    else if (reps === 2) interval = 6;
    else interval = Math.round(interval * ease);
  }

  ease = Math.max(1.3, ease + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)));

  const due = new Date(now);
  due.setDate(due.getDate() + interval);

  return { ease, interval, reps, due: due.toISOString() };
}

export function isDue(card: SrsCard, now: Date): boolean {
  return new Date(card.due).getTime() <= now.getTime();
}
