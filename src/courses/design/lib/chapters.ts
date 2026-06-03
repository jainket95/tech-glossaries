// Importing markdown as raw strings via Vite's ?raw suffix.
import foundations from "../content/01-foundations.md?raw";
import visualDesign from "../content/02-visual-design.md?raw";
import typography from "../content/03-typography.md?raw";
import color from "../content/04-color.md?raw";
import perception from "../content/05-perception.md?raw";
import designTokens from "../content/06-design-tokens.md?raw";
import components from "../content/07-components.md?raw";
import interactionMotion from "../content/08-interaction-motion.md?raw";
import informationArchitecture from "../content/09-information-architecture.md?raw";
import usabilityHeuristics from "../content/10-usability-heuristics.md?raw";
import accessibility from "../content/11-accessibility.md?raw";
import processCollaboration from "../content/12-process-collaboration.md?raw";
import designSystemsPractice from "../content/13-design-systems-practice.md?raw";
import readingList from "../content/14-reading-list.md?raw";
import studyPlan from "../content/15-study-plan.md?raw";

export type Chapter = {
  slug: string;
  number: string;
  title: string;
  tagline: string;
  content: string;
};

export const chapters: Chapter[] = [
  {
    slug: "foundations",
    number: "01",
    title: "Foundations: What Design Actually Is",
    tagline: "Design is a discipline of decisions, not a layer of polish. Start here.",
    content: foundations,
  },
  {
    slug: "visual-design",
    number: "02",
    title: "Visual Design: Layout, Grid, and Space",
    tagline: "Grids, spacing scales, and the mechanics of visual hierarchy.",
    content: visualDesign,
  },
  {
    slug: "typography",
    number: "03",
    title: "Typography",
    tagline: "Type as the primary tool of hierarchy, and why “pick a nice font” fails.",
    content: typography,
  },
  {
    slug: "color",
    number: "04",
    title: "Color",
    tagline: "Color theory, semantic color systems, and contrast that actually meets the bar.",
    content: color,
  },
  {
    slug: "perception",
    number: "05",
    title: "Perception & Gestalt Principles",
    tagline: "The psychology behind why some layouts just work, and others just don’t.",
    content: perception,
  },
  {
    slug: "design-tokens",
    number: "06",
    title: "Design Tokens & the Anatomy of a Design System",
    tagline: "Primitives, semantics, and components — the three-tier system under every serious product.",
    content: designTokens,
  },
  {
    slug: "components",
    number: "07",
    title: "Component Design & API Thinking",
    tagline: "A component’s design is an API. Treat it like one.",
    content: components,
  },
  {
    slug: "interaction-motion",
    number: "08",
    title: "Interaction Design & Motion",
    tagline: "States, feedback, affordances, and motion that earns its keep.",
    content: interactionMotion,
  },
  {
    slug: "information-architecture",
    number: "09",
    title: "Information Architecture & Navigation",
    tagline: "Structuring content so people can find it without thinking about it.",
    content: informationArchitecture,
  },
  {
    slug: "usability-heuristics",
    number: "10",
    title: "Usability Heuristics",
    tagline: "Nielsen’s ten heuristics, and how to run a real heuristic evaluation.",
    content: usabilityHeuristics,
  },
  {
    slug: "accessibility",
    number: "11",
    title: "Accessibility",
    tagline: "WCAG, semantics, and the frontend engineer’s actual share of the work.",
    content: accessibility,
  },
  {
    slug: "process-collaboration",
    number: "12",
    title: "Design Process & Collaboration",
    tagline: "Critique, handoff, and how to disagree with a design productively.",
    content: processCollaboration,
  },
  {
    slug: "design-systems-practice",
    number: "13",
    title: "Building and Governing a Design System",
    tagline: "Component libraries, documentation, versioning, and the org problem underneath it.",
    content: designSystemsPractice,
  },
  {
    slug: "reading-list",
    number: "14",
    title: "Design Reading List",
    tagline: "The books, blogs, and tools worth your actual time.",
    content: readingList,
  },
  {
    slug: "study-plan",
    number: "15",
    title: "Study Plan",
    tagline: "A ten-week path through all of it, with something built every week.",
    content: studyPlan,
  },
];

export function findChapter(slug?: string): Chapter | undefined {
  if (!slug) return chapters[0];
  return chapters.find((c) => c.slug === slug) ?? chapters[0];
}
