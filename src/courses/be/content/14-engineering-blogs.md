> **TL;DR:** How to read engineering writing: read for the *decision*, not the technology. Every good post has a tradeoff — find the bill. A post that reads as "we did this and everything was great" deserves skepticism. Ask "would this apply to a system my size?" — the honest answer is often no, and noticing that is the lesson.

Unlike a curated link list, this chapter points at **companies and organizations worth following directly**, plus durable books — matching this app's policy elsewhere of not citing specific article URLs, which rot and can misattribute. Go to each organization's current engineering blog and search their archive for the topic; the posts below describe what to look for.

## Companies whose engineering writing is consistently worth reading

| Company | Look for posts on |
|---|---|
| **Discord** | Database evolution at scale (their MongoDB → Cassandra → ScyllaDB story is the canonical illustration of ch. 3's storage-engine tradeoffs and ch. 9's hot-partition problem) |
| **Stripe** | Idempotency, API versioning, rate limiting, zero-downtime migrations (expand-contract, ch. 4) — Stripe's engineering blog is unusually dense with the exact tradeoffs this glossary covers |
| **Notion** | Sharding Postgres at scale, and the recursive "block" data model behind their product flexibility |
| **Amazon** | The **Builders' Library** — a curated collection from Amazon's principal engineers on timeouts, retries and backoff, circuit breaking, caching, load shedding, avoiding cascading failures. Close to a canonical text for chapters 7 and 11. |
| **Cloudflare** | Their engineering blog and public post-incident reports are unusually detailed and honest — a free lesson in how distributed systems actually fail, and the blameless-postmortem practice of ch. 12 |
| **Netflix** | Global caching at scale (EVCache), chaos engineering (Chaos Monkey's origin) |
| **Uber** | Their account of moving from a monolith to many services, including the honest operational costs — a direct companion to ch. 10 |
| **Shopify** | The **modular monolith** — one of the largest Rails monoliths in the world, kept as one deploy rather than split into microservices. The best real-world argument for ch. 10's middle path. |
| **Segment** | Their well-known reversal — moved *back* from microservices to a monolith when operational cost outweighed the benefit at their scale. Essential counter-narrative to cargo-culting microservices. |
| **Khan Academy** | Incrementally extracting services from a monolith — the strangler-fig pattern (ch. 10) in practice, including *when not* to extract |

## Individuals and independent sources

- **Kyle Kingsbury's Jepsen analyses** — rigorously test distributed databases' consistency claims under partition and failure, and repeatedly find the real guarantees weaker than the marketing. The fastest way to make ch. 8's consistency models concrete, and to build healthy skepticism toward any database's claims.
- **Marc Brooker** (AWS principal engineer) writes clearly about the genuinely hard parts of distributed systems — consistency, time and clocks, retries — excellent companion reading for chapters 7 and 8.
- **Jay Kreps's "The Log"** essay — the foundational long-form text for ch. 6's queue-vs-stream distinction and the log as a primitive. Long, worth the sitting.

## Books worth the long investment

Blog posts teach tactically; a few books restructure how you think.

| Book | Covers |
|---|---|
| **Designing Data-Intensive Applications** — Martin Kleppmann | The single most recommended book in backend engineering. The long-form, rigorous version of chapters 3, 6, 7, 8, 9 — storage engines, replication, partitioning, transactions, consistency, consensus. Read this one if you read only one. |
| **Database Internals** — Alex Petrov | How databases work underneath — storage engines, B-trees/LSM-trees. The natural next step after Kleppmann for ch. 3. |
| **Release It!** — Michael Nygård | The origin of the resilience patterns in ch. 11 — circuit breakers, bulkheads, stability antipatterns |
| **Fundamentals of Software Architecture** — Mark Richards & Neal Ford | A grounded, tradeoff-centered survey of architectural styles — the long version of ch. 10 |
| **Understanding Distributed Systems** — Roberto Vitillo | A more approachable on-ramp to chapters 7-8 than Kleppmann, for building intuition first |
| **Site Reliability Engineering** and **The SRE Workbook** — Google, free to read online | The canonical texts for chapters 1, 11, 12 — SLIs/SLOs/SLAs, error budgets, on-call, blameless postmortems |

## Aggregators worth following

**InfoQ**, **High Scalability** (a long-running architecture write-up archive), **ByteByteGo** (accessible system-design breakdowns, best paired with deeper primary sources), and **Papers We Love** for when you're ready to go from engineering blogs to the original research papers (Dynamo, Spanner, Bigtable, Raft, MapReduce, GFS).

## A closing note

Do not try to read all of this at once, and do not read passively. The study plan in the next chapter weaves a subset of these organizations into a week-by-week path. Reading about a tradeoff teaches you it exists; making the tradeoff yourself, in code, is what teaches you to weigh it.
