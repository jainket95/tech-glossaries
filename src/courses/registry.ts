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
export const courses: CourseMeta[] = [];
