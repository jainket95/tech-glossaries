# Tech Glossary

A single reference app for six engineering-adjacent courses — product
management, backend & frontend system design, design fundamentals, forward
deployed engineering, and a 38-chapter bank of dual-track system-design
interview solutions — with a cross-linked glossary and inline architecture
diagrams throughout.

**Live:** [tech-glossary-app.vercel.app](https://tech-glossary-app.vercel.app)

## Courses

| Course | Path | What it covers |
|---|---|---|
| PM for Engineers | `/pm` | Product vocabulary and leverage plays for people who ship code — modules, spaced-repetition review, quizzes, exercises. |
| Backend System Design | `/be` | APIs, databases, caching, queues, distributed systems — every topic framed around its tradeoffs. |
| Frontend System Design | `/fe` | Rendering, performance, state, data fetching, and the primitives shared with the backend. |
| Design for Engineers | `/design` | UI/UX, design systems, and a senior designer's judgment, from a frontend engineer's seat. |
| Forward Deployed Engineering | `/fde` | Discovery, rapid prototyping, and shipping real systems inside someone else's infrastructure. |
| System Design Interview Solutions | `/system-design` | 38 frontend system-design interview questions, each solved on two connected tracks — a RADIO frontend answer and a backend answer, wired together at the API contract. |

## Features

- **Dual-track interview solutions** — every system-design question is answered with a frontend design (using the RADIO framework) *and* a backend design (its own idiomatic structure), with the API contract between them made explicit.
- **Cross-linked glossary** — technical terms in any chapter link to a shared, hoverable glossary drawer instead of a wall of definitions up front.
- **Inline architecture diagrams** — Mermaid diagrams render client-side across every course, themed to match light/dark mode.
- **PM spaced-repetition review** — the PM course has its own progress tracking, quizzes, and a review queue built on a simple SRS.

## Tech stack

- [React 19](https://react.dev) + [TypeScript](https://www.typescriptlang.org) + [Vite](https://vite.dev)
- [React Router 7](https://reactrouter.com) for client-side routing
- [Tailwind CSS 4](https://tailwindcss.com) for styling
- [Mermaid](https://mermaid.js.org) for diagrams, [react-markdown](https://github.com/remarkjs/react-markdown) + [remark](https://github.com/remarkjs/remark)/[rehype](https://github.com/rehypejs/rehype) plugins for content rendering
- [Zustand](https://zustand-demo.pmnd.rs) for the glossary drawer's UI state

## Project structure

```
src/
  courses/<id>/          # one directory per course (pm, be, fe, design, fde, sysdesign)
    components/          # Layout, Home, ChapterView (or course-specific routes for pm)
    content/             # markdown (or .ts for pm) lesson content
    lib/                 # chapter/module registries
    routes.tsx           # exports a route factory wired into src/App.tsx
    styles/global.css    # course-scoped CSS (namespaced under .course-<id>)
  glossary/              # shared term registry, remark plugin, and hover drawer
  components/Mermaid.tsx # shared Mermaid renderer used by every course
  courses/registry.ts    # course card metadata shown on the home page
```

Each course is self-contained; adding a new one means creating
`src/courses/<id>/`, exporting a route factory, wiring it into `App.tsx`, and
adding one entry to `src/courses/registry.ts`.

## Getting started

```bash
npm install
npm run dev       # start the dev server
npm run build     # typecheck + production build
npm run preview   # preview the production build locally
```

## Content validation

```bash
npm run validate           # validates PM's module/lesson content structure
npm run validate:diagrams  # parses every ```mermaid block across all courses
```

## Deployment

Deployed on Vercel. `vercel.json` rewrites all non-file routes to
`index.html` so React Router's client-side routes resolve correctly on a
direct load or refresh.

## License

The application code is MIT licensed — see [`LICENSE`](./LICENSE).

The course content itself (everything under `src/courses/*/content/**`, plus
the glossary term definitions in `src/glossary/registry.ts`) is **not**
covered by that license and remains all rights reserved.
