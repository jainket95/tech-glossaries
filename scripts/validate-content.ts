import { readdirSync, readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import path from 'node:path';
import type { Module, Term, LeveragePlay, QuizQuestion } from '../src/courses/pm/types.ts';

const ROOT = path.resolve(import.meta.dirname, '..');
const MODULES_DIR = path.join(ROOT, 'src/courses/pm/content/modules');
const LEVERAGE_FILE = path.join(ROOT, 'src/courses/pm/content/leverage.ts');
const CONTENT_DIR = path.join(ROOT, 'src/courses/pm/content');

const errors: string[] = [];
const fail = (msg: string) => errors.push(msg);

function wordCount(text: string): number {
  return text
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

// ---------------------------------------------------------------------------
// Load modules
// ---------------------------------------------------------------------------

let moduleFiles: string[] = [];
try {
  moduleFiles = readdirSync(MODULES_DIR)
    .filter((f) => f.endsWith('.ts'))
    .sort();
} catch {
  fail(`Cannot read modules directory: ${MODULES_DIR}`);
}

const modules: Module[] = [];

for (const file of moduleFiles) {
  const full = path.join(MODULES_DIR, file);
  try {
    const mod = await import(pathToFileURL(full).href);
    if (!mod.module) {
      fail(`${file}: does not export "module"`);
      continue;
    }
    modules.push(mod.module as Module);
  } catch (e) {
    fail(`${file}: failed to import — ${(e as Error).message}`);
  }
}

// ---------------------------------------------------------------------------
// Load leverage plays
// ---------------------------------------------------------------------------

let leveragePlays: LeveragePlay[] = [];
try {
  const mod = await import(pathToFileURL(LEVERAGE_FILE).href);
  if (!mod.leveragePlays) {
    fail('leverage.ts: does not export "leveragePlays"');
  } else {
    leveragePlays = mod.leveragePlays as LeveragePlay[];
  }
} catch (e) {
  fail(`leverage.ts: failed to import — ${(e as Error).message}`);
}

// ---------------------------------------------------------------------------
// Module id / order checks
// ---------------------------------------------------------------------------

const expectedIds = Array.from({ length: 10 }, (_, i) => `pm-l${i + 1}`);
const foundIds = modules.map((m) => m.id).sort();

if (modules.length !== 10) {
  fail(`Expected exactly 10 modules, found ${modules.length} (${foundIds.join(', ') || 'none'})`);
}

for (const id of expectedIds) {
  if (!modules.find((m) => m.id === id)) {
    fail(`Missing module with id "${id}"`);
  }
}

const orders = modules.map((m) => m.order).sort((a, b) => a - b);
const expectedOrders = modules.map((_, i) => i + 1);
if (JSON.stringify(orders) !== JSON.stringify(expectedOrders) && modules.length > 0) {
  fail(`Module orders must be 1..${modules.length} with no gaps, found: [${orders.join(', ')}]`);
}

// ---------------------------------------------------------------------------
// Build global term index
// ---------------------------------------------------------------------------

const allTerms: Term[] = modules.flatMap((m) => m.terms ?? []);
const termIndex = new Map<string, Term>();
const termIdCounts = new Map<string, number>();
const termStringCounts = new Map<string, string[]>(); // term string -> module ids

for (const t of allTerms) {
  termIdCounts.set(t.id, (termIdCounts.get(t.id) ?? 0) + 1);
  if (!termIndex.has(t.id)) termIndex.set(t.id, t);
  const key = t.term.trim().toLowerCase();
  const list = termStringCounts.get(key) ?? [];
  list.push(t.moduleId);
  termStringCounts.set(key, list);
}

for (const [id, count] of termIdCounts) {
  if (count > 1) fail(`Term id "${id}" is duplicated (${count} occurrences)`);
}

for (const [term, mods] of termStringCounts) {
  if (mods.length > 1) fail(`Term string "${term}" duplicated across modules: ${mods.join(', ')}`);
}

// ---------------------------------------------------------------------------
// Per-module checks
// ---------------------------------------------------------------------------

type ModuleStats = {
  id: string;
  lessonCount: number;
  avgLessonWords: number;
  termCount: number;
  tier1Count: number;
  quizCount: number;
};

const stats: ModuleStats[] = [];

const FORBIDDEN_SUBSTRINGS = ['todo', 'placeholder', 'lorem', 'coming soon'];

function scanForbidden(context: string, value: unknown) {
  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (trimmed === '...') {
      fail(`${context}: field value is literally "..."`);
    }
    const lower = value.toLowerCase();
    for (const bad of FORBIDDEN_SUBSTRINGS) {
      if (lower.includes(bad)) {
        fail(`${context}: contains forbidden string "${bad}"`);
      }
    }
  } else if (Array.isArray(value)) {
    value.forEach((v, i) => scanForbidden(`${context}[${i}]`, v));
  } else if (value && typeof value === 'object') {
    for (const [k, v] of Object.entries(value)) {
      scanForbidden(`${context}.${k}`, v);
    }
  }
}

for (const m of modules) {
  const ctx = m.id;
  scanForbidden(ctx, m);

  const lessons = m.lessons ?? [];
  if (lessons.length < 3) fail(`${ctx}: expected >= 3 lessons, found ${lessons.length}`);

  let totalWords = 0;
  for (const lesson of lessons) {
    const words = wordCount(lesson.body ?? '');
    totalWords += words;
    // Range reflects the 2026-08 visual-format rewrite (callouts/tables/
    // mermaid diagrams over essay-density prose) — real distribution across
    // all 50 lessons post-rewrite is 234-356 words. Old range was [350, 800],
    // calibrated to the prior prose-only format.
    if (words < 180 || words > 450) {
      fail(`${ctx}/${lesson.id}: lesson body word count ${words} outside [180, 450]`);
    }
    if (!lesson.title || !lesson.title.trim()) {
      fail(`${ctx}/${lesson.id}: missing title`);
    }
    if (!lesson.keyTerms || lesson.keyTerms.length < 3) {
      fail(`${ctx}/${lesson.id}: expected >= 3 keyTerms, found ${lesson.keyTerms?.length ?? 0}`);
    }
    for (const kt of lesson.keyTerms ?? []) {
      if (!termIndex.has(kt)) {
        fail(`${ctx}/${lesson.id}: keyTerm "${kt}" does not resolve to a real Term`);
      }
    }
  }

  const terms = m.terms ?? [];
  if (terms.length < 18 || terms.length > 24) {
    fail(`${ctx}: expected 18-24 terms, found ${terms.length}`);
  }

  let tier1Count = 0;
  for (const t of terms) {
    const tctx = `${ctx}/term:${t.id || '(no id)'}`;
    if (!t.id || !t.id.trim()) fail(`${tctx}: missing id`);
    if (!t.term || !t.term.trim()) fail(`${tctx}: missing term`);
    if (!t.oneLiner || !t.oneLiner.trim()) fail(`${tctx}: missing oneLiner`);
    if (!t.full || !t.full.trim()) fail(`${tctx}: missing full`);
    if (!t.devAnalogy || !t.devAnalogy.trim()) fail(`${tctx}: missing devAnalogy`);

    if (t.oneLiner && wordCount(t.oneLiner) > 15) {
      fail(`${tctx}: oneLiner exceeds 15 words (${wordCount(t.oneLiner)})`);
    }
    if (t.full && wordCount(t.full) < 25) {
      fail(`${tctx}: full definition under 25 words (${wordCount(t.full)})`);
    }
    if (t.devAnalogy && wordCount(t.devAnalogy) < 8) {
      fail(`${tctx}: devAnalogy under 8 words (${wordCount(t.devAnalogy)})`);
    }

    if (t.tier === 1) {
      tier1Count++;
      if (!t.sayThis || !t.sayThis.trim()) fail(`${tctx}: tier-1 term missing sayThis`);
      if (!t.leverage || !t.leverage.trim()) fail(`${tctx}: tier-1 term missing leverage`);
    }

    for (const rel of t.related ?? []) {
      if (rel === t.id) fail(`${tctx}: related contains self-reference`);
      else if (!termIndex.has(rel)) fail(`${tctx}: related id "${rel}" does not resolve to a real Term`);
    }
  }

  if (tier1Count < 6) {
    fail(`${ctx}: expected >= 6 tier-1 terms, found ${tier1Count}`);
  }

  const quiz = m.quiz ?? [];
  if (quiz.length < 8) fail(`${ctx}: expected >= 8 quiz questions, found ${quiz.length}`);

  for (const q of quiz as QuizQuestion[]) {
    const qctx = `${ctx}/quiz:${q.id}`;
    if (!q.prompt || !q.prompt.trim()) fail(`${qctx}: missing prompt`);
    if (!q.explain || !q.explain.trim()) fail(`${qctx}: missing explain`);
    if (q.explain && wordCount(q.explain) < 15) {
      fail(`${qctx}: explain under 15 words (${wordCount(q.explain)})`);
    }
    if (q.kind === 'mcq' || q.kind === 'scenario') {
      if (q.answer < 0 || q.answer >= q.options.length) {
        fail(`${qctx}: answer index ${q.answer} out of range for ${q.options.length} options`);
      }
      const lowerOpts = q.options.map((o) => o.trim().toLowerCase());
      const dupSet = new Set<string>();
      for (const o of lowerOpts) {
        if (dupSet.has(o)) fail(`${qctx}: duplicate option string "${o}"`);
        dupSet.add(o);
      }
    } else if (q.kind === 'match') {
      if (!q.pairs || q.pairs.length < 2) fail(`${qctx}: match question needs >= 2 pairs`);
    }
  }

  const ex = m.exercise;
  if (!ex) {
    fail(`${ctx}: missing exercise`);
  } else {
    if (!ex.prompt || !ex.prompt.trim()) fail(`${ctx}/exercise: missing prompt`);
    if (!ex.scaffold || !ex.scaffold.trim()) fail(`${ctx}/exercise: missing scaffold`);
    if (!ex.rubric || ex.rubric.length < 3 || ex.rubric.length > 5) {
      fail(`${ctx}/exercise: rubric must have 3-5 bullets, found ${ex.rubric?.length ?? 0}`);
    }
  }

  stats.push({
    id: m.id,
    lessonCount: lessons.length,
    avgLessonWords: lessons.length ? Math.round(totalWords / lessons.length) : 0,
    termCount: terms.length,
    tier1Count,
    quizCount: quiz.length,
  });
}

// ---------------------------------------------------------------------------
// Leverage plays
// ---------------------------------------------------------------------------

scanForbidden('leverage', leveragePlays);

if (leveragePlays.length < 14) {
  fail(`leverage.ts: expected >= 14 plays, found ${leveragePlays.length}`);
}

for (const p of leveragePlays) {
  const pctx = `leverage/${p.id || '(no id)'}`;
  if (!p.id || !p.id.trim()) fail(`${pctx}: missing id`);
  if (!p.title || !p.title.trim()) fail(`${pctx}: missing title`);
  if (!p.situation || !p.situation.trim()) fail(`${pctx}: missing situation`);
  if (!p.sayThis || !p.sayThis.trim()) fail(`${pctx}: missing sayThis`);
  if (!p.whatItGetsYou || !p.whatItGetsYou.trim()) fail(`${pctx}: missing whatItGetsYou`);
  if (!p.relatedTerms || p.relatedTerms.length === 0) {
    fail(`${pctx}: missing relatedTerms`);
  } else {
    for (const rt of p.relatedTerms) {
      if (!termIndex.has(rt)) fail(`${pctx}: relatedTerm "${rt}" does not resolve to a real Term`);
    }
  }
}

// ---------------------------------------------------------------------------
// Global forbidden-string scan across /src/content (raw file text)
// ---------------------------------------------------------------------------

function walk(dir: string): string[] {
  let out: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) out = out.concat(walk(p));
    else if (entry.isFile() && entry.name.endsWith('.ts')) out.push(p);
  }
  return out;
}

try {
  for (const file of walk(CONTENT_DIR)) {
    const text = readFileSync(file, 'utf-8');
    const lower = text.toLowerCase();
    for (const bad of FORBIDDEN_SUBSTRINGS) {
      if (lower.includes(bad)) {
        fail(`${path.relative(ROOT, file)}: raw file contains forbidden string "${bad}"`);
      }
    }
  }
} catch (e) {
  fail(`Global scan failed: ${(e as Error).message}`);
}

// ---------------------------------------------------------------------------
// Report
// ---------------------------------------------------------------------------

if (errors.length > 0) {
  console.error(`\n✗ VALIDATION FAILED — ${errors.length} error(s)\n`);
  for (const e of errors) console.error(`  - ${e}`);
  console.error('');
  process.exit(1);
}

console.log('\n✓ VALIDATION PASSED\n');
console.log(
  'module   lessons  avg-words  terms  tier1  quiz'
);
console.log('-------  -------  ---------  -----  -----  ----');
for (const s of stats) {
  console.log(
    `${s.id.padEnd(7)}  ${String(s.lessonCount).padEnd(7)}  ${String(s.avgLessonWords).padEnd(9)}  ${String(
      s.termCount
    ).padEnd(5)}  ${String(s.tier1Count).padEnd(5)}  ${s.quizCount}`
  );
}
console.log(`\nleverage plays: ${leveragePlays.length}`);
console.log('');
