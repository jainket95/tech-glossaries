// Importing markdown as raw strings via Vite's ?raw suffix.
import foundations from "../content/01-foundations.md?raw";
import fdeMindset from "../content/02-fde-mindset.md?raw";
import discovery from "../content/03-discovery.md?raw";
import stakeholdersTrust from "../content/04-stakeholders-trust.md?raw";
import rapidPrototyping from "../content/05-rapid-prototyping.md?raw";
import dataIntegration from "../content/06-data-integration.md?raw";
import clientEnvironments from "../content/07-client-environments.md?raw";
import technicalJudgment from "../content/08-technical-judgment.md?raw";
import operationalization from "../content/09-operationalization.md?raw";
import communication from "../content/10-communication.md?raw";
import feedbackToProduct from "../content/11-feedback-to-product.md?raw";
import travelOnsite from "../content/12-travel-onsite.md?raw";
import careerPath from "../content/13-career-path.md?raw";
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
    title: "Foundations: What a Forward Deployed Engineer Actually Is",
    tagline: "Origins, definition, and why the role is booming right now.",
    content: foundations,
  },
  {
    slug: "fde-mindset",
    number: "02",
    title: "The FDE Mindset: Outcomes Over Elegance",
    tagline: "Demo-driven development, build vs. configure vs. escalate, and staying calm when it breaks.",
    content: fdeMindset,
  },
  {
    slug: "discovery",
    number: "03",
    title: "Discovery: Turning Ambiguous Asks into Scoped Work",
    tagline: "The first week isn't a build week — it's the highest-leverage listening you'll do.",
    content: discovery,
  },
  {
    slug: "stakeholders-trust",
    number: "04",
    title: "Reading the Room: Stakeholders and Trust",
    tagline: "Economic buyer, technical champion, end user — and how trust actually gets built.",
    content: stakeholdersTrust,
  },
  {
    slug: "rapid-prototyping",
    number: "05",
    title: "Rapid Prototyping and Demo-Driven Development",
    tagline: "Build-measure-show, what's safe to fake, and demoing honestly.",
    content: rapidPrototyping,
  },
  {
    slug: "data-integration",
    number: "06",
    title: "Data Integration in the Wild",
    tagline: "Messy client data is usually the real bottleneck, not the model.",
    content: dataIntegration,
  },
  {
    slug: "client-environments",
    number: "07",
    title: "Working Inside Client Environments",
    tagline: "Security, compliance, on-prem and air-gapped realities — you're a guest in someone else's house.",
    content: clientEnvironments,
  },
  {
    slug: "technical-judgment",
    number: "08",
    title: "Technical Judgment Under Ambiguity",
    tagline: "Build vs. configure vs. escalate, technical debt in the field, and when to say no.",
    content: technicalJudgment,
  },
  {
    slug: "operationalization",
    number: "09",
    title: "Deployment, Handoff, and Operationalization",
    tagline: "Closing the gap between an impressive demo and a client team running it alone.",
    content: operationalization,
  },
  {
    slug: "communication",
    number: "10",
    title: "Communication as the Core Skill",
    tagline: "Writing non-engineers read, translating tradeoffs, and escalating bad news well.",
    content: communication,
  },
  {
    slug: "feedback-to-product",
    number: "11",
    title: "The Feedback Loop Back to Product",
    tagline: "Escalating patterns, not one-offs, and the tension between hacks and platform features.",
    content: feedbackToProduct,
  },
  {
    slug: "travel-onsite",
    number: "12",
    title: "Travel, Logistics, and the On-Site Reality",
    tagline: "What the job is actually like, and how to avoid burning out doing it.",
    content: travelOnsite,
  },
  {
    slug: "career-path",
    number: "13",
    title: "Career Path: Building Toward (or Beyond) FDE",
    tagline: "Skills accumulated, common exit paths, and how to break in.",
    content: careerPath,
  },
  {
    slug: "reading-list",
    number: "14",
    title: "FDE Reading List",
    tagline: "The books worth your actual time, and where to track the role as it evolves.",
    content: readingList,
  },
  {
    slug: "study-plan",
    number: "15",
    title: "Study Plan",
    tagline: "A ten-week path through all of it, with something practiced every week.",
    content: studyPlan,
  },
];

export function findChapter(slug?: string): Chapter | undefined {
  if (!slug) return chapters[0];
  return chapters.find((c) => c.slug === slug) ?? chapters[0];
}
