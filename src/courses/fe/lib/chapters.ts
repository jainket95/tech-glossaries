// Importing markdown as raw strings via Vite's ?raw suffix.
import rendering from "../content/01-rendering.md?raw";
import performance from "../content/02-performance.md?raw";
import state from "../content/03-state.md?raw";
import data from "../content/04-data-fetching.md?raw";
import components from "../content/05-component-architecture.md?raw";
import reliability from "../content/06-reliability.md?raw";
import security from "../content/07-security.md?raw";
import crossCutting from "../content/08-cross-cutting.md?raw";
import primitives from "../content/09-system-design-primitives.md?raw";
import blogs from "../content/10-engineering-blogs.md?raw";
import studyPlan from "../content/11-study-plan.md?raw";

export type Chapter = {
  slug: string;
  number: string;
  title: string;
  tagline: string;
  content: string;
};

export const chapters: Chapter[] = [
  {
    slug: "rendering",
    number: "01",
    title: "Rendering Strategy",
    tagline: "Where work happens — and when",
    content: rendering,
  },
  {
    slug: "performance",
    number: "02",
    title: "Performance & Core Web Vitals",
    tagline: "The levers that move LCP, INP, CLS",
    content: performance,
  },
  {
    slug: "state",
    number: "03",
    title: "State Architecture",
    tagline: "Four kinds of state, four lifecycles",
    content: state,
  },
  {
    slug: "data-fetching",
    number: "04",
    title: "Data Fetching & Networking",
    tagline: "REST, GraphQL, real-time, offline",
    content: data,
  },
  {
    slug: "component-architecture",
    number: "05",
    title: "Component Architecture",
    tagline: "Composition that survives a hundred consumers",
    content: components,
  },
  {
    slug: "reliability",
    number: "06",
    title: "Reliability & Observability",
    tagline: "When (not if) things break in production",
    content: reliability,
  },
  {
    slug: "security",
    number: "07",
    title: "Security on the Client",
    tagline: "XSS, CSRF, CSP, tokens, OAuth",
    content: security,
  },
  {
    slug: "cross-cutting",
    number: "08",
    title: "Cross-cutting Concerns",
    tagline: "i18n, theming, RTL, accessibility",
    content: crossCutting,
  },
  {
    slug: "primitives",
    number: "09",
    title: "Shared System Design Primitives",
    tagline: "Caching, queuing, idempotency, consistency",
    content: primitives,
  },
  {
    slug: "engineering-blogs",
    number: "10",
    title: "Engineering Blog Reading List",
    tagline: "Curated posts from the teams that built it",
    content: blogs,
  },
  {
    slug: "study-plan",
    number: "11",
    title: "8-Week Study Plan",
    tagline: "Tying the room together",
    content: studyPlan,
  },
];

export function findChapter(slug: string | undefined): Chapter | undefined {
  if (!slug) return chapters[0];
  return chapters.find((c) => c.slug === slug);
}
