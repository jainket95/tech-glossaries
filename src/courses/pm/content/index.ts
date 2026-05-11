import type { Module, Term, Lesson } from '../types';

import { module as pmL1 } from './modules/pm-l1';
import { module as pmL2 } from './modules/pm-l2';
import { module as pmL3 } from './modules/pm-l3';
import { module as pmL4 } from './modules/pm-l4';
import { module as pmL5 } from './modules/pm-l5';
import { module as pmL6 } from './modules/pm-l6';
import { module as pmL7 } from './modules/pm-l7';
import { module as pmL8 } from './modules/pm-l8';
import { module as pmL9 } from './modules/pm-l9';
import { module as pmL10 } from './modules/pm-l10';

export { leveragePlays } from './leverage';

export const modules: Module[] = [pmL1, pmL2, pmL3, pmL4, pmL5, pmL6, pmL7, pmL8, pmL9, pmL10].sort(
  (a, b) => a.order - b.order
);

export const moduleById: Record<string, Module> = Object.fromEntries(modules.map((m) => [m.id, m]));

export const allTerms: Term[] = modules.flatMap((m) => m.terms);

export const termById: Record<string, Term> = Object.fromEntries(allTerms.map((t) => [t.id, t]));

type LessonWithModule = Lesson & { moduleId: string; moduleOrder: number; lessonIndex: number };

export const allLessons: LessonWithModule[] = modules.flatMap((m) =>
  m.lessons.map((l, i) => ({ ...l, moduleId: m.id, moduleOrder: m.order, lessonIndex: i }))
);

export const lessonById: Record<string, LessonWithModule> = Object.fromEntries(
  allLessons.map((l) => [l.id, l])
);

export function getModuleLessons(moduleId: string): Lesson[] {
  return moduleById[moduleId]?.lessons ?? [];
}

export function relatedTerms(termId: string): Term[] {
  const term = termById[termId];
  if (!term) return [];
  return term.related.map((id) => termById[id]).filter((t): t is Term => Boolean(t));
}

export const exerciseModuleById: Record<string, Module> = Object.fromEntries(
  modules.map((m) => [m.exercise.id, m])
);

export function searchTerms(query: string): Term[] {
  const q = query.trim().toLowerCase();
  if (!q) return allTerms;
  return allTerms.filter((t) => {
    if (t.term.toLowerCase().includes(q)) return true;
    if (t.oneLiner.toLowerCase().includes(q)) return true;
    if (t.aliases?.some((a) => a.toLowerCase().includes(q))) return true;
    return false;
  });
}
