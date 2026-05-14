import type { GlossaryCourse, GlossaryTerm } from './types';

// Seed set only — per the agreed scope, this registry is populated
// incrementally as new content (starting with the dual-track system-design
// solutions) is written, not backfilled against the existing 26 be/fe
// chapters. The two entries below exist to give the matching plugin
// (remarkTermLinks.ts) real, in-content terms to validate against.
export const terms: GlossaryTerm[] = [
  {
    id: 'idempotency',
    term: 'Idempotency',
    aliases: ['idempotent'],
    courses: ['be', 'fe'],
    oneLiner: 'Applying an operation once looks the same as applying it many times.',
    full: 'An operation is idempotent if repeating it produces the same end state as doing it once — DELETE /user/123 is idempotent, POST /orders is not. Idempotency keys let a client safely retry a non-idempotent mutation: the server caches the response against a client-generated key and returns the cached result on retry instead of re-processing.',
    related: ['consistency-model'],
  },
  {
    id: 'consistency-model',
    term: 'Consistency model',
    aliases: ['eventual consistency', 'strong consistency'],
    courses: ['be', 'fe'],
    oneLiner: 'Defines what a reader sees relative to recent writes when data is replicated.',
    full: 'Ranges from strong/linearizable (every read sees the latest write) to eventual (replicas converge only if writes stop, with no bound on "eventually"). The right model is chosen by the cost of being wrong for that specific data, not a general preference for "strong" or "fast."',
    related: ['idempotency'],
  },
];

const byId = new Map(terms.map((t) => [t.id, t]));

export function findTermById(id: string): GlossaryTerm | undefined {
  return byId.get(id);
}

export function termsForCourse(course: GlossaryCourse): GlossaryTerm[] {
  return terms.filter((t) => t.courses.includes(course));
}

// sysdesign reuses be+fe's combined term set rather than tagging every term
// a third time — its content is fundamentally be/fe concepts applied to
// interview questions, not a distinct vocabulary of its own.
export function termsForCourses(courses: GlossaryCourse[]): GlossaryTerm[] {
  const seen = new Set<string>();
  const out: GlossaryTerm[] = [];
  for (const t of terms) {
    if (seen.has(t.id)) continue;
    if (t.courses.some((c) => courses.includes(c))) {
      seen.add(t.id);
      out.push(t);
    }
  }
  return out;
}

export function relatedTerms(id: string): GlossaryTerm[] {
  const term = byId.get(id);
  if (!term?.related) return [];
  return term.related.map((r) => byId.get(r)).filter((t): t is GlossaryTerm => Boolean(t));
}
