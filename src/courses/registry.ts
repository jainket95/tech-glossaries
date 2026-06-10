export type CourseMeta = {
  id: string;
  title: string;
  tagline: string;
  accent: string;
  path: string; // e.g. '/pm' — must match the path segment mounted in App.tsx
};

// Each course registers its card metadata here. To add a new course later
// (e.g. UI/UX for senior development): create src/courses/<id>/, export a
// route factory from its routes.tsx, wire that factory into App.tsx, and
// add one entry here.
export const courses: CourseMeta[] = [
  {
    id: 'pm',
    title: 'PM for Engineers',
    tagline: 'Product vocabulary and leverage plays for people who ship code.',
    accent: '#1d5b8f',
    path: '/pm',
  },
  {
    id: 'be',
    title: 'Backend System Design',
    tagline:
      'APIs, databases, caching, queues, distributed systems — every topic framed around its tradeoffs.',
    accent: '#1d5b8f',
    path: '/be',
  },
  {
    id: 'fe',
    title: 'Frontend System Design',
    tagline: 'Rendering, performance, state, data, and the primitives shared with the backend.',
    accent: '#1d5b8f',
    path: '/fe',
  },
  {
    id: 'design',
    title: 'Design for Engineers',
    tagline:
      'UI/UX, design systems, and roughly 80% of a senior designer’s judgment, from a frontend engineer’s seat.',
    accent: '#1d5b8f',
    path: '/design',
  },
  {
    id: 'fde',
    title: 'Forward Deployed Engineering',
    tagline:
      'Discovery, rapid prototyping, and shipping real systems inside someone else’s infrastructure — the fastest-growing role in enterprise software.',
    accent: '#1d5b8f',
    path: '/fde',
  },
];
