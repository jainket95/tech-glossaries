import { visit } from 'unist-util-visit';
import type { Root, Text, PhrasingContent, Parent } from 'mdast';
import { termsForCourses } from './registry';
import type { GlossaryCourse } from './types';

// A term's surface forms sorted longest-first, so "consistency model" is
// tried before any shorter term that happens to be a substring of it.
function buildPattern(courses: GlossaryCourse[]) {
  const entries: { id: string; surface: string }[] = [];
  for (const t of termsForCourses(courses)) {
    entries.push({ id: t.id, surface: t.term });
    for (const alias of t.aliases ?? []) entries.push({ id: t.id, surface: alias });
  }
  entries.sort((a, b) => b.surface.length - a.surface.length);
  if (entries.length === 0) return null;
  const escaped = entries.map((e) => e.surface.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const regex = new RegExp(`\\b(${escaped.join('|')})\\b`, 'gi');
  const byLowerSurface = new Map(entries.map((e) => [e.surface.toLowerCase(), e.id]));
  return { regex, byLowerSurface };
}

type Hit = { parent: Parent; index: number; replacement: PhrasingContent[] };

// Turns the first mention of each known glossary term, per rendered
// chapter, into a `glossary:<id>` link — converted to a real `<a>` by
// mdast-util-to-hast with zero custom node types, then intercepted by the
// `a` component override in ChapterView.tsx and rendered as a clickable
// chip that opens the TermDrawer instead of navigating.
//
// Deliberately skips: text inside headings (already carry rehype-slug
// anchors — a second nested interactive element there is a bad idea) and
// text already inside a link (mdast/HTML don't allow nested <a>s). Only
// the FIRST occurrence of a given term per chapter is linked, matching the
// same "don't chip-ify every mention" behavior PM's Prose.tsx already uses
// — later mentions stay plain text.
//
// Two-pass, not mutate-while-visiting: unist-util-visit's live-mutation
// support (returning [SKIP, newIndex]) turned out to be fragile here and
// crashed inside unist-util-visit-parents on real chapter content. Instead:
// collect every hit in a first, read-only pass, then splice them into their
// parents afterward, in reverse per-parent order so earlier splices in the
// same parent don't shift the index of ones still to be applied.
// Accepts a single course (be/fe's existing call sites) or an array
// (sysdesign, which matches against the union of be+fe's terms).
export function remarkTermLinks(course: GlossaryCourse | GlossaryCourse[]) {
  const built = buildPattern(Array.isArray(course) ? course : [course]);

  return function transformer(tree: Root) {
    if (!built) return;
    const { regex, byLowerSurface } = built;
    const used = new Set<string>();
    const hits: Hit[] = [];

    visit(tree, 'text', (node: Text, index, parent) => {
      if (!parent || index === undefined) return;
      if (parent.type === 'heading' || parent.type === 'link') return;

      regex.lastIndex = 0;
      const value = node.value;
      let match: RegExpExecArray | null;
      let lastEnd = 0;
      const replacement: PhrasingContent[] = [];
      let didReplace = false;

      while ((match = regex.exec(value)) !== null) {
        const surface = match[1];
        const id = byLowerSurface.get(surface.toLowerCase());
        if (!id || used.has(id)) continue;

        if (match.index > lastEnd) {
          replacement.push({ type: 'text', value: value.slice(lastEnd, match.index) });
        }
        replacement.push({
          type: 'link',
          url: `glossary:${id}`,
          children: [{ type: 'text', value: surface }],
        });
        used.add(id);
        didReplace = true;
        lastEnd = match.index + surface.length;
      }

      if (!didReplace) return;
      if (lastEnd < value.length) {
        replacement.push({ type: 'text', value: value.slice(lastEnd) });
      }

      hits.push({ parent, index, replacement });
    });

    for (const { parent, index, replacement } of hits.reverse()) {
      parent.children.splice(index, 1, ...replacement);
    }
  };
}
