> **TL;DR:** Named organizations and authors, not specific article links — URLs rot, get restructured, or get taken down, and a stale link is worse than no link. Go to each org's current engineering blog and search the topic; the companies and topics below are the reliable part.

## Real-time and sync engines

| Org | Search their blog for |
|---|---|
| **Figma** | Multiplayer/collaborative editing architecture — the clearest public writing on this topic; why they built a CRDT-flavored system instead of OT, and later posts on making it reliable at scale |
| **Linear** | Their sync engine — talks and posts on local-first architecture, why the app feels instant |
| **Replicache, ElectricSQL, Triplit, RxDB** | General-purpose sync-engine docs — read the architecture pages even if you don't use the product |
| **Ink & Switch** | "Local-first software" — the essay that named and shaped the local-first movement; their research site is the primary source |

## Data model and scale

| Org | Search their blog for |
|---|---|
| **Notion** | Their block-based data model, and later posts on scaling that model to hundreds of billions of rows |
| **Discord** | Message-storage architecture migrations (MongoDB → Cassandra → ScyllaDB) — a real "how to migrate a database without downtime" case study, told twice, years apart |
| **Stripe** | Idempotency keys (the canonical treatment — pair with chapter 9 of this course) and their "expand-contract" pattern for safe schema migrations |

## Rendering, performance, edge

| Org | Search their blog for |
|---|---|
| **Vercel** | Rendering-strategy explainers, App Router internals, Speed Insights posts on real-world INP/Web Vitals data |
| **Netflix** | Their performance case studies — notably a logged-out-homepage rewrite that dropped TTI from over a second to a couple hundred milliseconds by asking "does this page actually need React" |
| **Cloudflare** | Edge compute architecture, HTTP/3 and QUIC, TLS internals — the most relentlessly technical blog on this list |
| **Pinterest** | Performance-to-business-metrics case studies, and an honest PWA retrospective (what worked, what they walked back) |

## Design systems and component architecture

| Org | Search their blog for |
|---|---|
| **Airbnb** | Their original Design Language System post (an early, influential case for design tokens), and their React Native adoption-then-retreat retrospective |
| **Shopify** | Polaris (their public design system docs), plus frontend/monorepo engineering posts |

## Observability, reliability, migrations

| Org | Search their blog for |
|---|---|
| **Sentry** | Deep-dives on what actually happens across a `fetch()` call, and posts explaining why source maps/breadcrumbs/trace propagation work the way they do |
| **Slack** | Their desktop-app rearchitecture away from Electron, and debugging-methodology write-ups |
| **Uber** | Real-time, geographically-distributed systems case studies; monorepo/build-tooling posts |
| **GitHub** | Large-scale frontend migrations (their jQuery removal, their React/TypeScript adoption) |

## Individual engineers worth following directly

Rather than linking specific posts, follow these people's own sites for current writing:

- **Addy Osmani** — performance, ecosystem trends
- **Josh Comeau** — frontend animation, CSS architecture, React internals
- **Dan Abramov** — React internals, from one of the people who built them
- **Jake Archibald** — service workers, browser internals, performance
- **Lin Clark** — accessible, illustrated deep-dives (notably on WebAssembly)

## How to use this list

Don't read linearly. High-leverage starting order: Figma's multiplayer architecture → Linear's sync engine → Notion's data model → Discord's message-storage migrations → Stripe's idempotency post. That's a few hours of reading that will reshape how you think about the boundary between frontend state and the systems behind it — the rest is depth for when a specific topic comes up in your own work.

**Read the originals, not summaries.** Third-party rewrites of engineering blog posts are everywhere and reliably lose the specifics that made the original worth reading.
