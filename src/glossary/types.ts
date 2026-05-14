// Shared glossary for be/fe (and any future react-markdown-based course that
// opts in). Distinct from PM's own Term type in src/courses/pm/types.ts —
// PM's terms are tied to PM's module/lesson schema and rendered through its
// own hand-rolled Prose.tsx; this registry is course-agnostic and rendered
// via the remark plugin in src/glossary/remarkTermLinks.ts.
export type GlossaryCourse = 'be' | 'fe';

export type GlossaryTerm = {
  id: string; // kebab-case, globally unique
  term: string; // display name, matched case-insensitively in chapter text
  aliases?: string[]; // alternate surface forms that should also match (e.g. "QPS" for "queries-per-second")
  courses: GlossaryCourse[]; // which course(s) this term is eligible to be linked in
  oneLiner: string; // <= 15 words, meeting-safe definition
  full: string; // 2-4 sentences
  related?: string[]; // other term ids
};
