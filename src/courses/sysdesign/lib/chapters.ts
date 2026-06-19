// Importing markdown as raw strings via Vite's ?raw suffix.
import chatMessaging from '../content/chat-messaging.md?raw';

export type Part = 'components' | 'applications' | 'emerging';

export const PART_LABELS: Record<Part, string> = {
  components: 'Part 1 · UI Component Design',
  applications: 'Part 2 · Full Application Design',
  emerging: 'Part 3 · Emerging Questions (2025-26)',
};

export type Chapter = {
  slug: string;
  number: string;
  title: string;
  tagline: string;
  part: Part;
  difficulty: string;
  content: string;
};

// Numbers match the source question bank's own numbering (1-30), not
// sequential within this file — kept in bank order here for readability.
export const chapters: Chapter[] = [
  {
    slug: 'chat-messaging',
    number: '11',
    title: 'Chat / Messaging',
    tagline: 'Real-time 1:1 and group chat — Messenger, Slack, WhatsApp.',
    part: 'applications',
    difficulty: 'Hard',
    content: chatMessaging,
  },
];

export function findChapter(slug?: string): Chapter | undefined {
  if (!slug) return chapters[0];
  return chapters.find((c) => c.slug === slug) ?? chapters[0];
}

export function chaptersByPart(part: Part): Chapter[] {
  return chapters.filter((c) => c.part === part).sort((a, b) => Number(a.number) - Number(b.number));
}
