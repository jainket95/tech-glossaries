// Importing markdown as raw strings via Vite's ?raw suffix.
import foundations from "../content/01-foundations.md?raw";
import apis from "../content/02-api-design.md?raw";
import databases from "../content/03-databases.md?raw";
import dataModeling from "../content/04-data-modeling.md?raw";
import caching from "../content/05-caching.md?raw";
import queues from "../content/06-queues-streaming.md?raw";
import distributed from "../content/07-distributed-systems.md?raw";
import consistency from "../content/08-consistency-consensus.md?raw";
import scaling from "../content/09-scaling.md?raw";
import architecture from "../content/10-architecture.md?raw";
import reliability from "../content/11-reliability.md?raw";
import observability from "../content/12-observability.md?raw";
import security from "../content/13-security.md?raw";
import blogs from "../content/14-engineering-blogs.md?raw";
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
    title: "Foundations & Tradeoffs",
    tagline: "Latency, throughput, and the cost of everything",
    content: foundations,
  },
  {
    slug: "api-design",
    number: "02",
    title: "API Design",
    tagline: "Contracts between services and clients",
    content: apis,
  },
  {
    slug: "databases",
    number: "03",
    title: "Databases",
    tagline: "Storage engines, indexes, transactions",
    content: databases,
  },
  {
    slug: "data-modeling",
    number: "04",
    title: "Data Modeling & Schema Design",
    tagline: "Shaping data for the queries you'll run",
    content: dataModeling,
  },
  {
    slug: "caching",
    number: "05",
    title: "Caching",
    tagline: "Fast, stale, or both",
    content: caching,
  },
  {
    slug: "queues-streaming",
    number: "06",
    title: "Queues & Streaming",
    tagline: "Decoupling producers from consumers",
    content: queues,
  },
  {
    slug: "distributed-systems",
    number: "07",
    title: "Distributed Systems",
    tagline: "When one machine isn't enough",
    content: distributed,
  },
  {
    slug: "consistency-consensus",
    number: "08",
    title: "Consistency & Consensus",
    tagline: "Agreement in the presence of failure",
    content: consistency,
  },
  {
    slug: "scaling",
    number: "09",
    title: "Scaling",
    tagline: "Replication, sharding, load balancing",
    content: scaling,
  },
  {
    slug: "architecture",
    number: "10",
    title: "Architecture Patterns",
    tagline: "Monolith, microservices, event-driven, DDD",
    content: architecture,
  },
  {
    slug: "reliability",
    number: "11",
    title: "Reliability & Resilience",
    tagline: "Designing for failure as the default",
    content: reliability,
  },
  {
    slug: "observability",
    number: "12",
    title: "Observability & Operations",
    tagline: "Knowing what production is doing",
    content: observability,
  },
  {
    slug: "security",
    number: "13",
    title: "Backend Security",
    tagline: "Authn, authz, secrets, attack surface",
    content: security,
  },
  {
    slug: "engineering-blogs",
    number: "14",
    title: "Engineering Blog Reading List",
    tagline: "Curated posts from teams operating at scale",
    content: blogs,
  },
  {
    slug: "study-plan",
    number: "15",
    title: "12-Week Study Plan",
    tagline: "A path through the whole glossary",
    content: studyPlan,
  },
];

export function findChapter(slug: string | undefined): Chapter | undefined {
  if (!slug) return chapters[0];
  return chapters.find((c) => c.slug === slug);
}
