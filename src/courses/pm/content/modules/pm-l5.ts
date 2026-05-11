import type { Module } from '../../types';

export const module: Module = {
  id: 'pm-l5',
  domain: 'pm',
  order: 5,
  title: 'Execution & delivery',
  subtitle: 'Scrum vs. Kanban vs. Shape Up, appetite instead of estimate, and shipping without releasing.',
  why:
    'Shape Up\'s "appetite" reframes estimation as the single most stressful PM-to-engineer interaction most developers have. Knowing the vocabulary of execution models means you can propose a better process, not just survive whichever one you\'ve inherited.',
  estMinutes: 60,
  lessons: [
    {
      id: 'pm-l5-lesson-1',
      title: 'Scrum, Kanban, and Shape Up: three different answers to "how do we sequence work"',
      body: `| | Scrum | Kanban | Shape Up |
|---|---|---|---|
| Unit | Fixed sprint (1-2 weeks) | Continuous flow | Fixed appetite (2 or 6 weeks) |
| Limits what | Time (the sprint) | WIP per stage | Scope, to fit the time |
| Best for | Synchronized expectations, predictable work | Steady, unpredictably-sized work (support, platform) | Rejecting the estimate-then-track model entirely |
| Cost | Friction when priorities change mid-sprint | No forced check-in point | Requires real scope-cutting discipline |

Kanban's WIP limit caps how many items sit in a column at once — forcing the team to finish work before starting more, instead of starting many things and finishing none promptly.

Shape Up's inversion is the one worth sitting with: instead of estimating how long a predetermined solution takes, appetite fixes the time first and designs the solution to fit inside it. "How long will this take" becomes "given this budget, what's the best version we can ship" — a design constraint accepted up front, not a guess about the future.

> This reframes the single most common source of engineer-PM friction. Under Scrum, an estimate that's wrong carries an implicit judgment. Under an appetite, there's no wrong estimate to be caught on — the only open question is how much scope fits, and cutting scope to fit is normal, not a failure.

Two shaping techniques, deliberately low-fidelity so the conversation stays about structure, not pixels: breadboarding maps the places, actions, and connections in a flow without specifying visual layout. A fat-marker sketch is a deliberately crude sketch — too crude to invite bikeshedding over spacing or color.

No model is universally correct. What matters is recognizing which one your team is actually running — the vocabulary for pushing back on scope or timeline looks completely different in each.`,
      keyTerms: ['scrum', 'kanban', 'shape-up', 'appetite', 'wip-limit', 'breadboarding', 'fat-marker-sketch'],
    },
    {
      id: 'pm-l5-lesson-2',
      title: 'Appetite instead of estimate: negotiating scope, not time',
      body: `| | Estimate-based | Appetite-based |
|---|---|---|
| Running long, the conversation is about | Schedule — more time, more people, push the deadline | Scope — what can we cut, right now |
| Those options are | Slow, political, rarely available short-notice | Available immediately, by design |

Scope hammering is the active, ongoing practice of cutting a project's scope to fit its appetite as new information emerges — not one painful conversation right before the deadline. Scope is a lever pulled continuously, not a spec locked at kickoff and defended until unworkable. A scope-hammered feature that ships smaller than envisioned isn't a failure — it's the process working as designed.

The circuit breaker is what makes that credible rather than aspirational: an explicit rule that if a project isn't converging by roughly the midpoint of its appetite, it gets stopped, reassessed, and re-scoped or killed — not allowed to quietly run over indefinitely while everyone hopes it comes together. Without one, "fixed appetite" quietly becomes "fixed appetite, except when it doesn't, which is often."

> **Say this:** "Given a two-week appetite, here's what I think we can ship well — the full version you're describing is probably a six-week appetite." Not a refusal, not a guess dressed as commitment — an honest translation of scope into the currency the model runs on, putting the time-vs-scope tradeoff where it belongs.

The transferable habit: re-express any open-ended "how long will this take" as an appetite-and-scope conversation — name a time budget, describe what fits inside it, be explicit about what gets cut first if it's tight.`,
      keyTerms: ['appetite', 'scope-hammering', 'circuit-breaker'],
    },
    {
      id: 'pm-l5-lesson-3',
      title: 'Vertical slices, tracer bullets, and the MVP/MLP/MMP family',
      body: `| | Vertical slice | Horizontal slice |
|---|---|---|
| Cuts through | Every layer — frontend, backend, DB — for one narrow piece of real functionality | One entire layer (the whole API) before touching any other |
| Surfaces integration problems | Immediately | Only at the end, when everything finally connects for the first time |

A team that builds the whole schema, then the whole API, then the whole UI, discovers whether the pieces fit together only after all three are "done" — often the worst possible time.

A tracer bullet is a disciplined, minimal, real, end-to-end vertical slice built to prove the path works — not thrown away like a prototype, but extended. The name comes from tracer ammunition: it shows a shooter in real time whether they're on target, adjusting live instead of firing blind. A walking skeleton is the same idea aimed at architecture rather than one feature — the thinnest deployable version proving the frontend can talk to the backend, deploys work, the pieces connect — before investing in any real feature logic.

The MVP/MLP/MMP family clarifies "minimum," a word used loosely and inconsistently:

| | Floor | Optimizes for |
|---|---|---|
| MVP (Minimum Viable Product) | Viability | Learning speed — may be intentionally rough |
| MLP (Minimum Lovable Product) | Viability + quality/delight | Not muddying the signal with a bad first impression |
| MMP (Minimum Marketable Product) | Viability + go-to-market readiness | A real marketing push |

> **Ask this:** "When you say MVP, do you mean something we're testing quietly with a handful of users, or something ready to point real marketing traffic at?" A stakeholder asking for an "MVP" often means an MLP or MMP — resolving that mismatch in one sentence beats a sprint built to the wrong bar of quality.`,
      keyTerms: ['vertical-slice', 'horizontal-slice', 'tracer-bullet', 'mvp', 'mlp', 'mmp', 'walking-skeleton'],
    },
    {
      id: 'pm-l5-lesson-4',
      title: 'Release decoupled from deploy: flags, dark launches, and canaries',
      body: `Separate deploy (code reaching production) from release (a feature becoming visible to users). Treating them as one event is what makes releases feel risky and infrequent; decoupling them lets a team deploy constantly and release deliberately.

\`\`\`mermaid
flowchart LR
  A[Feature flag\\ncode merged, dark] --> B[Dark launch\\nreal load, invisible UI]
  B --> C[Canary release\\nsmall % of real traffic]
  C --> D[Full rollout]
  D -.->|something's wrong| E[Kill switch\\nemergency, one-click off]
\`\`\`

| | What it is |
|---|---|
| Feature flag | A runtime toggle controlling whether a code path is active — on for 1% of users, internal only, or instantly off, with zero deploy pipeline involvement |
| Dark launch | Fully deployed, running behind a flag, invisible to users — validates real-world performance under real load before anyone sees it |
| Canary release | A small percentage of real traffic first, closely monitored, ramping to full only if healthy — named for canaries used in coal mines as an early gas-detection warning |
| Kill switch | An emergency, ideally one-click way to disable a feature post-release — designed to be pulled under pressure by whoever's on call, no nuance required |

> **Say this:** "Given the risk here, I'd want this behind a flag with a canary rollout and an obvious kill switch, not a straight deploy." Signals real operational maturity, and it's entirely within your domain to propose.

Two terms round this out. Product debt is the accumulated cost of features shipped but never fully finished, polished, or deprecated — the product-strategy equivalent of technical debt. A deprecation policy is the explicit plan for when an old flag or flow gets removed — without one, dark-launched variants accumulate indefinitely, becoming product debt themselves.`,
      keyTerms: ['feature-flag', 'dark-launch', 'canary-release', 'kill-switch', 'product-debt', 'deprecation-policy'],
    },
  ],
  terms: [
    {
      id: 'scrum',
      domain: 'pm',
      term: 'Scrum',
      moduleId: 'pm-l5',
      tier: 1,
      oneLiner: 'Fixed-length sprints with a committed scope, daily standups, and end-of-sprint review.',
      full:
        'Scrum organizes work into fixed-length sprints, typically one or two weeks, with a committed set of stories pulled in at the start and reviewed at the end, alongside a daily standup and retrospective. Its core promise is predictability through a regular cadence, at the cost of friction when priorities genuinely need to shift mid-sprint.',
      devAnalogy: 'It\'s like a fixed release train with a locked scope per train departure — predictable timing, but changing what\'s on a given train mid-cycle is disruptive by design.',
      leverage: 'You can push back on mid-sprint scope additions by naming that they break the sprint\'s commitment model, which is a legitimate process objection, not just personal resistance to extra work.',
      sayThis: 'Adding this mid-sprint breaks our commitment for this cycle — should it go into next sprint, or does something else come out?',
      antiPattern: 'A team keeps adding "quick" items mid-sprint without removing anything else, so the sprint commitment becomes meaningless and burndown charts stop reflecting reality.',
      related: ['kanban', 'shape-up', 'sprint-planning'],
    },
    {
      id: 'kanban',
      domain: 'pm',
      term: 'Kanban',
      moduleId: 'pm-l5',
      tier: 2,
      oneLiner: 'Continuous flow of work through stages, limited by explicit work-in-progress caps.',
      full:
        'Kanban replaces fixed-length sprints with continuous flow through defined stages, each capped by a work-in-progress limit that forces finishing work before starting more. It tends to suit teams with a steady stream of unpredictably-sized work better than Scrum\'s batch-and-commit rhythm, since there\'s no sprint boundary forcing an artificial wait-or-interrupt decision.',
      devAnalogy: 'It\'s like a queue with a bounded buffer size — once the buffer\'s full, nothing new starts until something finishes, which keeps work-in-progress honest instead of letting everything start at once.',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'A Kanban board\'s WIP limits are set so generously, or ignored so routinely, that everyone works on several things at once and nothing actually finishes promptly.',
      related: ['scrum', 'shape-up', 'wip-limit'],
    },
    {
      id: 'shape-up',
      domain: 'pm',
      term: 'Shape Up',
      moduleId: 'pm-l5',
      tier: 1,
      oneLiner: 'A process that fixes the time budget first, then shapes the solution to fit it.',
      full:
        'Shape Up, developed at Basecamp, starts from a fixed appetite — a time budget the team is willing to spend — and designs the solution to fit inside it, rather than estimating how long a predetermined solution will take. It inverts the usual estimation question from "how long will this take" into "given this budget, what\'s the best version we can ship."',
      devAnalogy: 'It\'s like setting a fixed performance budget for a page and designing within it, rather than building the feature first and hoping it happens to fit the budget afterward.',
      leverage: 'You can propose the appetite conversation directly instead of giving a single-number estimate, which reframes an open-ended guess into an honest scope negotiation.',
      sayThis: 'Given a two-week appetite, here\'s what I think we can ship well — the full version is probably closer to six weeks.',
      antiPattern: 'A team adopts Shape Up\'s vocabulary but keeps treating the appetite as a soft estimate that quietly extends when work runs long, losing the entire discipline the fixed budget was meant to enforce.',
      related: ['appetite', 'scope-hammering', 'circuit-breaker'],
    },
    {
      id: 'appetite',
      domain: 'pm',
      term: 'Appetite',
      moduleId: 'pm-l5',
      tier: 1,
      oneLiner: 'A fixed time budget for a problem, decided before the solution is fully shaped.',
      full:
        'Appetite is Shape Up\'s core unit of planning: a fixed amount of time — often two or six weeks — the team is willing to spend on a problem, set before the solution is fully designed, so that scope is negotiated to fit the time rather than time being estimated to fit a fixed scope.',
      devAnalogy: 'It\'s like deciding a hard timebox for a spike up front, then scoping what fits inside it, instead of scoping the work first and hoping the timebox happens to match.',
      leverage: 'You can name an honest appetite for a piece of work instead of a single-number estimate, which shifts the negotiation from "will this guess be wrong" to "what fits in this budget."',
      sayThis: 'What\'s our appetite for this — how much time are we actually willing to spend before we\'d rather cut scope?',
      antiPattern: 'A team states an appetite but never actually holds to it, quietly extending the timeline instead of cutting scope, which erodes the trust that makes the appetite model work at all.',
      related: ['shape-up', 'scope-hammering', 'circuit-breaker'],
    },
    {
      id: 'breadboarding',
      domain: 'pm',
      term: 'Breadboarding',
      moduleId: 'pm-l5',
      tier: 3,
      oneLiner: 'Mapping a flow\'s places, actions, and connections without specifying visual layout.',
      full:
        'Breadboarding is a Shape Up shaping technique that maps the places, affordances, and connections within a flow — screens, the actions available, and where they lead — deliberately without specifying visual design, keeping the shaping conversation about structure rather than pixels.',
      devAnalogy: 'It\'s like sketching a state machine or flow diagram before designing any actual UI, focused purely on states and transitions rather than appearance.',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'A shaping session jumps straight to a polished mockup, and the conversation gets stuck debating colors and spacing instead of whether the underlying flow and structure actually make sense.',
      related: ['fat-marker-sketch', 'shape-up'],
    },
    {
      id: 'fat-marker-sketch',
      domain: 'pm',
      term: 'Fat-marker sketch',
      moduleId: 'pm-l5',
      tier: 3,
      oneLiner: 'A deliberately crude sketch that can\'t render fine detail, avoiding premature polish debates.',
      full:
        'A fat-marker sketch is a deliberately low-fidelity visual sketch, drawn as if with a wide marker incapable of fine detail, used in Shape Up-style shaping to communicate rough layout intent without inviting premature feedback about exact spacing, color, or pixel-level decisions that would be wasted before the direction is settled.',
      devAnalogy: 'It\'s like writing pseudocode instead of real code during initial design — deliberately too coarse to bikeshed over syntax, keeping the conversation on structure and approach.',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'A team shows a high-fidelity mockup during early shaping, and the review devolves into detailed visual feedback on a direction that might get thrown out entirely once real scoping starts.',
      related: ['breadboarding', 'shape-up'],
    },
    {
      id: 'circuit-breaker',
      domain: 'pm',
      term: 'Circuit breaker',
      moduleId: 'pm-l5',
      tier: 1,
      oneLiner: 'A rule that stops and reassesses a project not converging by its midpoint.',
      full:
        'A circuit breaker is an explicit rule that a project not converging by roughly the midpoint of its appetite gets stopped and reassessed — re-scoped more aggressively or killed outright — rather than allowed to run over its time budget indefinitely on the hope it will come together. Without one, a fixed appetite quietly becomes a soft, unenforced estimate.',
      devAnalogy: 'It\'s like an automatic build timeout that kills a hung CI job instead of letting it run indefinitely on the assumption it\'ll eventually finish.',
      leverage: 'You can advocate for an explicit circuit breaker on any appetite-bounded project, which protects you from open-ended crunch disguised as ordinary commitment.',
      sayThis: 'We\'re past the midpoint and not converging — should we trigger the circuit breaker and cut scope now, before we\'re out of runway entirely?',
      antiPattern: 'A project with a stated appetite runs well past its budget with no formal checkpoint to reassess, and the team ends up in an unplanned, undiscussed crunch to hit a deadline nobody actually renegotiated.',
      related: ['appetite', 'scope-hammering'],
    },
    {
      id: 'scope-hammering',
      domain: 'pm',
      term: 'Scope hammering',
      moduleId: 'pm-l5',
      tier: 2,
      oneLiner: 'Actively cutting scope throughout a project to keep it fitting its fixed time budget.',
      full:
        'Scope hammering is the ongoing practice of cutting a project\'s scope to fit its fixed appetite as new information emerges during the build, treating scope as a continuously adjustable lever rather than a spec locked at kickoff and defended until it becomes obviously unworkable.',
      devAnalogy: 'It\'s like continuously trimming a PR\'s scope down as review reveals complexity, instead of stubbornly defending the original plan until it blows the timeline.',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'A team treats an initial spec as fixed and defends it until the deadline is nearly missed, instead of continuously cutting scope earlier when it becomes clear the full version won\'t fit the budget.',
      related: ['appetite', 'circuit-breaker'],
    },
    {
      id: 'mvp',
      domain: 'pm',
      term: 'MVP',
      aliases: ['Minimum Viable Product'],
      moduleId: 'pm-l5',
      tier: 1,
      oneLiner: 'The smallest version that validates a core hypothesis with real users.',
      full:
        'An MVP is the smallest version of a product or feature that lets a team validate a core hypothesis with real users, prioritizing speed of learning over completeness or polish, and it may be intentionally rough in places that aren\'t central to the hypothesis being tested.',
      devAnalogy: 'It\'s like a proof-of-concept branch built to answer one specific technical question, not a production-ready implementation of the whole system.',
      leverage: 'You can ask what specific hypothesis an "MVP" is meant to validate, which often reveals the request is really for an MLP or MMP with much higher quality expectations than the term implies.',
      sayThis: 'When you say MVP, do you mean something we\'re quietly testing, or something ready to point real traffic at?',
      antiPattern: 'A stakeholder asks for an "MVP" but expects launch-ready polish, and the genuinely rough, learning-focused version the team delivers creates painful, avoidable disappointment on both sides.',
      related: ['mlp', 'mmp', 'riskiest-assumption-test'],
    },
    {
      id: 'mlp',
      domain: 'pm',
      term: 'MLP',
      aliases: ['Minimum Lovable Product'],
      moduleId: 'pm-l5',
      tier: 2,
      oneLiner: 'An MVP with a deliberate floor on quality and delight, not just viability.',
      full:
        'An MLP adds a deliberate quality and delight floor on top of an MVP\'s core viability bar, on the theory that a genuinely unlovable MVP can invalidate a good underlying idea simply by giving users a bad first impression, muddying the actual signal about whether the concept works.',
      devAnalogy: 'It\'s like a proof-of-concept that\'s also polished enough to demo to a skeptical stakeholder without the rough edges undermining the actual point being tested.',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'A team ships a technically-viable MVP so rough that early users bounce off the experience itself, and the team wrongly concludes the underlying idea failed rather than the execution.',
      related: ['mvp', 'mmp'],
    },
    {
      id: 'mmp',
      domain: 'pm',
      term: 'MMP',
      aliases: ['Minimum Marketable Product'],
      moduleId: 'pm-l5',
      tier: 2,
      oneLiner: 'The minimum bar of polish and completeness needed for a real go-to-market push.',
      full:
        'An MMP adds the floor of polish, reliability, and completeness needed for a product to be genuinely marketed and sold, rather than just tested quietly with a small group. It represents a much higher bar than an MVP or even an MLP, since it needs to hold up under real marketing traffic and sales scrutiny.',
      devAnalogy: 'It\'s like the difference between a feature behind an internal flag and one that\'s genuinely ready for a public release announcement — the second needs to hold up under real, unfiltered traffic.',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'Marketing points a real campaign at what was actually built as a rough MVP, and the resulting traffic exposes gaps that were acceptable for quiet testing but damaging for a public launch.',
      related: ['mvp', 'mlp', 'launch-tier'],
    },
    {
      id: 'walking-skeleton',
      domain: 'pm',
      term: 'Walking skeleton',
      moduleId: 'pm-l5',
      tier: 2,
      oneLiner: 'The thinnest deployable version of a system\'s architecture, before real feature logic.',
      full:
        'A walking skeleton is the thinnest possible end-to-end implementation of a system\'s overall architecture, wired together and deployable, before any real feature logic is built into it, purely to prove the pieces connect — frontend to backend, deploys actually working — before investing in the muscle and organs.',
      devAnalogy: 'It\'s like standing up a minimal "hello world" that exercises the full deploy pipeline before writing any real application logic against it.',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'A team builds out significant feature logic across several layers before ever proving the layers actually connect end to end in a real deployed environment, discovering integration gaps far later than necessary.',
      related: ['tracer-bullet', 'vertical-slice'],
    },
    {
      id: 'vertical-slice',
      domain: 'pm',
      term: 'Vertical slice',
      moduleId: 'pm-l5',
      tier: 1,
      oneLiner: 'One complete, narrow piece of functionality cut through every layer of the system.',
      full:
        'A vertical slice cuts through every layer involved — frontend, backend, database — to deliver one complete, narrow piece of real functionality end to end, surfacing integration problems between layers immediately rather than at the end of a purely layer-by-layer build.',
      devAnalogy: 'It\'s the standard advice to build one feature all the way through the stack before building every layer fully in isolation — you find out the layers actually fit together while it\'s still cheap to fix.',
      leverage: 'You can propose slicing a large feature vertically instead of horizontally, which produces something demonstrable early and surfaces integration risk while there\'s still time to adjust.',
      sayThis: 'Can we slice this vertically — one thin end-to-end path first — instead of building each layer fully before connecting them?',
      antiPattern: 'A team builds the entire database schema, then the entire API, then the entire UI, and discovers a fundamental mismatch between layers only after all three are individually "done."',
      related: ['horizontal-slice', 'tracer-bullet', 'walking-skeleton'],
    },
    {
      id: 'horizontal-slice',
      domain: 'pm',
      term: 'Horizontal slice',
      moduleId: 'pm-l5',
      tier: 3,
      oneLiner: 'Completing an entire layer of a system before touching any other layer.',
      full:
        'A horizontal slice completes an entire layer of a system — the whole backend API, for instance — before any other layer is touched, in contrast to a vertical slice, which cuts through every layer at once for one narrow piece of functionality. It delays integration testing until multiple layers are each independently "done."',
      devAnalogy: 'It\'s like fully building out a backend service\'s entire API surface before writing a single line of the frontend that will consume it.',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'A backend team completes an entire API layer based on assumptions about how the frontend will use it, only to discover a fundamental mismatch once frontend integration finally begins.',
      related: ['vertical-slice'],
    },
    {
      id: 'tracer-bullet',
      domain: 'pm',
      term: 'Tracer bullet',
      moduleId: 'pm-l5',
      tier: 2,
      oneLiner: 'A minimal, real, end-to-end implementation built to prove a path and calibrate the team.',
      full:
        'A tracer bullet is a minimal, real, end-to-end implementation built specifically to prove an architectural path works, deliberately not meant to be thrown away like a prototype but extended, giving the team live, real-time feedback on whether the approach is on target, the way tracer ammunition shows a shooter their aim.',
      devAnalogy: 'It\'s like building the thinnest real, production-quality path through a new integration first — one field, saved and displayed correctly — before adding polish or handling edge cases.',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'A team builds a throwaway prototype instead of a tracer bullet, then discovers the "quick prototype" quietly became the real implementation, carrying shortcuts that were never meant to survive contact with production.',
      related: ['vertical-slice', 'walking-skeleton'],
    },
    {
      id: 'feature-flag',
      domain: 'pm',
      term: 'Feature flag',
      moduleId: 'pm-l5',
      tier: 1,
      oneLiner: 'A runtime toggle controlling whether a code path is active, independent of deployment.',
      full:
        'A feature flag is a runtime toggle that controls whether a piece of functionality is active, decoupling deploy — code reaching production — from release — a feature becoming visible or usable to real users. It turns release from an all-or-nothing deploy event into a controllable, reversible decision.',
      devAnalogy: 'It\'s the standard mechanism for shipping dark code — merged and deployed, running in production, invisible until the flag is flipped for the audience you choose.',
      leverage: 'You can propose flagging any risky change yourself, independent of the original plan, which lets the team deploy continuously while still controlling exactly when and to whom the feature becomes visible.',
      sayThis: 'Given the risk here, I\'d want this behind a flag with a gradual rollout, not a straight deploy.',
      antiPattern: 'A risky feature ships as one big-bang deploy with no flag, so the only way to undo a problem is a full rollback or hotfix instead of instantly flipping a toggle.',
      related: ['dark-launch', 'canary-release', 'kill-switch'],
    },
    {
      id: 'dark-launch',
      domain: 'pm',
      term: 'Dark launch',
      moduleId: 'pm-l5',
      tier: 2,
      oneLiner: 'Deploying a feature fully into production, invisible to users, to test real-world behavior.',
      full:
        'A dark launch deploys a feature fully into production behind a flag, invisible to users, specifically to validate real-world performance and stability under real production conditions before anyone actually sees it — the code runs and the load is real, but the UI never renders the feature.',
      devAnalogy: 'It\'s like running new backend logic in shadow mode against real production traffic, comparing its behavior without ever serving its output to real users yet.',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'A feature is dark-launched but nobody actually monitors its behavior under real production load, wasting the entire point of the exercise, which was to validate performance before exposing it.',
      related: ['feature-flag', 'canary-release'],
    },
    {
      id: 'canary-release',
      domain: 'pm',
      term: 'Canary release',
      moduleId: 'pm-l5',
      tier: 2,
      oneLiner: 'Rolling a new version out to a small percentage of real traffic first.',
      full:
        'A canary release exposes a new version to a small percentage of real traffic first, closely monitored for errors or regressions, ramping up to full traffic only if the canary population looks healthy — named for canaries historically used in coal mines to detect danger before it reached the whole group.',
      devAnalogy: 'It\'s the deployment equivalent of a staged rollout — a small slice of real users acts as an early warning system before the change reaches everyone.',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'A canary release is technically configured but nobody actively watches its error rates before the rollout automatically proceeds to full traffic on a timer, defeating the point of the canary.',
      related: ['dark-launch', 'feature-flag', 'kill-switch'],
    },
    {
      id: 'kill-switch',
      domain: 'pm',
      term: 'Kill switch',
      moduleId: 'pm-l5',
      tier: 1,
      oneLiner: 'A fast, emergency mechanism to disable a feature immediately if something goes wrong.',
      full:
        'A kill switch is an emergency, ideally one-click mechanism to disable a feature immediately post-release if something goes wrong, distinct from a regular feature flag in that it\'s specifically designed to be pulled fast, under pressure, by whoever is on call, without needing deep familiarity with the broader flag system.',
      devAnalogy: 'It\'s like a circuit breaker pattern in a distributed system — a fast, deliberately simple mechanism to stop the bleeding immediately, with root-causing left for after the immediate danger is contained.',
      leverage: 'You can build an obvious, well-documented kill switch into any risky release, which is one of the clearest ways to demonstrate operational maturity without waiting to be asked.',
      sayThis: 'Before this ships, can we confirm the kill switch actually works and whoever\'s on call knows where it is?',
      antiPattern: 'A feature ships with a flag system too complex for whoever is on call to safely operate under pressure, so a genuine emergency turns into a slow, confused scramble instead of a fast, confident toggle.',
      related: ['feature-flag', 'canary-release'],
    },
    {
      id: 'product-debt',
      domain: 'pm',
      term: 'Product debt',
      moduleId: 'pm-l5',
      tier: 1,
      oneLiner: 'The accumulated cost of shipped features that were never finished, polished, or deprecated.',
      full:
        'Product debt is the accumulated cost of shipped features left unfinished, unpolished, or improperly deprecated — the product-strategy equivalent of technical debt, showing up as confusing half-implemented flows and inconsistent patterns instead of messy code, and just as real a drag on velocity and user trust.',
      devAnalogy: 'It\'s the product-facing sibling of technical debt — instead of messy code slowing down future changes, it\'s half-finished flows and inconsistent patterns slowing down user trust and comprehension.',
      leverage: 'You can name product debt explicitly in retros, the same way you\'d name technical debt, which gives it a real chance of being prioritized instead of remaining invisible.',
      sayThis: 'This flow was never actually finished — can we name it as product debt in the retro so it\'s visible on the backlog?',
      antiPattern: 'A half-finished feature flow accumulates confusing edge cases for years because nobody frames it as debt — it\'s just quietly "how that part of the product is," until a new hire is confused by it and asks why.',
      related: ['deprecation-policy', 'now-next-later'],
    },
    {
      id: 'deprecation-policy',
      domain: 'pm',
      term: 'Deprecation policy',
      moduleId: 'pm-l5',
      tier: 2,
      oneLiner: 'The explicit, communicated plan for how and when an old feature gets removed.',
      full:
        'A deprecation policy is the explicit, communicated plan for how and when an old feature, flag, or flow gets removed once it\'s no longer needed. Without one, feature flags and dark-launched variants tend to accumulate indefinitely, becoming their own form of product and technical debt as permanent conditionals nobody\'s confident enough to delete.',
      devAnalogy: 'It\'s like a documented plan for removing a deprecated API version, with a real sunset date, instead of leaving it running forever because nobody\'s sure who still depends on it.',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'Feature flags from experiments that ended a year ago are still live in the codebase because no deprecation policy ever forced a decision to clean them up.',
      related: ['product-debt', 'feature-flag'],
    },
    {
      id: 'wip-limit',
      domain: 'pm',
      term: 'WIP limit',
      aliases: ['work-in-progress limit'],
      moduleId: 'pm-l5',
      tier: 2,
      oneLiner: 'A cap on how many items can be in progress at one stage.',
      full:
        'A WIP limit caps how many items can be in progress at a given stage of a Kanban workflow at once, forcing the team to finish existing work before starting more, rather than starting many items in parallel and finishing none of them promptly.',
      devAnalogy: 'It\'s like a bounded queue or connection pool — capping in-flight work forces throughput to stay honest instead of letting unlimited work start and stall everything.',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'A team\'s "in progress" column grows unbounded because the WIP limit is either unset or routinely ignored, and everything moves slowly because nothing is ever prioritized to actually finish.',
      related: ['kanban'],
    },
  ],
  quiz: [
    {
      kind: 'mcq',
      id: 'pm-l5-q1',
      prompt: 'What is the core inversion Shape Up makes compared to a typical estimate-based process?',
      options: [
        'It removes the need for any planning at all',
        'It fixes the time budget first (appetite) and shapes the solution to fit it, instead of estimating how long a fixed solution will take',
        'It requires daily standups instead of weekly ones',
        'It eliminates the need for a product trio',
      ],
      answer: 1,
      explain: 'Shape Up starts from a fixed appetite and designs the solution to fit inside it, inverting the usual question from "how long will this take" into "what\'s the best version that fits this budget."',
    },
    {
      kind: 'mcq',
      id: 'pm-l5-q2',
      prompt: 'Why might a Kanban team resist adopting Scrum\'s fixed sprints?',
      options: [
        'Kanban teams never have unpredictable work',
        'A steady stream of unpredictably-sized work fits continuous flow better than Scrum\'s batch-and-commit rhythm, which forces artificial mid-sprint wait-or-interrupt decisions',
        'Scrum is strictly faster than Kanban in every case',
        'Kanban requires more meetings than Scrum',
      ],
      answer: 1,
      explain: 'Kanban\'s continuous flow, bounded by WIP limits, suits unpredictable work streams better than Scrum\'s fixed sprint boundary, which forces a binary choice about whether urgent work can wait for the next sprint.',
    },
    {
      kind: 'scenario',
      id: 'pm-l5-q3',
      prompt: 'Work is running long under an appetite-based model. What\'s the appropriate next conversation?',
      options: [
        'Ask for more time or more people to hit the original scope',
        'Cut scope to fit the fixed time budget, since the appetite was fixed by design',
        'Silently work overtime to hit the original scope and timeline',
        'Abandon the project entirely without a circuit breaker check',
      ],
      answer: 1,
      explain: 'Under an appetite model, the time budget is fixed by design; when work runs long, the conversation shifts to what scope to cut, not to extending the schedule.',
    },
    {
      kind: 'mcq',
      id: 'pm-l5-q4',
      prompt: 'What does a circuit breaker protect against in Shape Up-style planning?',
      options: [
        'A production outage caused by a bad deploy',
        'A fixed appetite quietly turning into an unenforced soft estimate, with no checkpoint to reassess or cut scope',
        'A quiz score falling below 70%',
        'A missing non-goals section in a PRD',
      ],
      answer: 1,
      explain: 'Without an explicit circuit breaker, a fixed appetite can quietly become a soft estimate that just runs over, since there\'s no forced checkpoint to reassess and cut scope before the deadline is missed.',
    },
    {
      kind: 'mcq',
      id: 'pm-l5-q5',
      prompt: 'What is the main benefit of a vertical slice over a horizontal slice?',
      options: [
        'It requires less code overall',
        'It surfaces integration problems between layers early, rather than discovering mismatches only after each full layer is independently "done"',
        'It only applies to backend systems',
        'It eliminates the need for acceptance criteria',
      ],
      answer: 1,
      explain: 'A vertical slice delivers one complete path through every layer, exposing integration issues immediately, while a horizontal slice defers that discovery until every layer is separately finished.',
    },
    {
      kind: 'scenario',
      id: 'pm-l5-q6',
      prompt: 'A stakeholder asks for an "MVP" but clearly expects launch-ready polish. What\'s the right move?',
      options: [
        'Build the roughest possible version regardless of their expectations, since that\'s the textbook definition of MVP',
        'Ask directly whether they mean something tested quietly with a few users or something ready for real marketing traffic, since they may actually mean an MLP or MMP',
        'Refuse the request until a formal PRD exists',
        'Assume MVP always means the same thing across every team and proceed without clarifying',
      ],
      answer: 1,
      explain: 'The MVP/MLP/MMP distinction resolves exactly this kind of mismatch — clarifying which bar of quality is actually expected avoids building the wrong thing and disappointing the stakeholder.',
    },
    {
      kind: 'mcq',
      id: 'pm-l5-q7',
      prompt: 'What is the purpose of decoupling deploy from release using a feature flag?',
      options: [
        'To make code reviews faster',
        'To let a team deploy code continuously while controlling, independently, when and to whom a feature actually becomes visible',
        'To avoid ever needing a kill switch',
        'To replace the need for canary releases entirely',
      ],
      answer: 1,
      explain: 'Feature flags decouple the technical act of shipping code from the product decision of exposing it to users, turning release into a controllable, reversible decision instead of an all-or-nothing deploy event.',
    },
    {
      kind: 'mcq',
      id: 'pm-l5-q8',
      prompt: 'How does a canary release differ from a plain feature flag toggle?',
      options: [
        'A canary release gradually exposes a new version to a small percentage of real traffic first, closely monitored, before ramping to everyone, rather than flipping fully on or off',
        'A canary release always requires a kill switch to be disabled',
        'A canary release is only used for mobile apps',
        'There is no meaningful difference between the two',
      ],
      answer: 0,
      explain: 'A canary release specifically gradual-rolls a new version to a small, monitored traffic slice before full rollout, whereas a plain feature flag toggle can simply be all-on or all-off for a chosen audience.',
    },
    {
      kind: 'match',
      id: 'pm-l5-q9',
      prompt: 'Match each rollout-safety term to its correct description.',
      pairs: [
        ['Feature flag', 'A runtime toggle controlling whether a code path is active'],
        ['Dark launch', 'Deploying fully into production, invisible to users, to test real behavior'],
        ['Canary release', 'Gradually exposing a new version to a small slice of real traffic'],
        ['Kill switch', 'A fast, emergency mechanism to disable a feature if something goes wrong'],
      ],
      explain: 'These four mechanisms work together but serve distinct purposes in de-risking a release, and confusing them can leave a genuinely risky change without the right safety net.',
    },
    {
      kind: 'scenario',
      id: 'pm-l5-q10',
      prompt: 'A flow has been half-finished and confusing for over a year, but nobody has flagged it. What\'s the sharpest move in the next retro?',
      options: [
        'Say nothing, since it\'s not technically a bug',
        'Name it explicitly as product debt, the same way the team would name technical debt, so it becomes visible enough to prioritize',
        'Quietly rewrite it without telling anyone',
        'Wait for a customer complaint before raising it',
      ],
      answer: 1,
      explain: 'Product debt stays invisible precisely because nobody names it; explicitly framing a half-finished flow as debt in a retro gives it a real chance of being prioritized instead of remaining "just how that part works."',
    },
  ],
  exercise: {
    id: 'pm-l5-exercise',
    title: 'Re-express your next task as an appetite',
    prompt: `Take the next non-trivial task on your plate — something you'd normally be asked to estimate in days or story points.

Instead of an estimate, write it as an **appetite**: a fixed time budget you're comfortable committing to, stated as a design constraint rather than a prediction.

Then list, in priority order, **what you'd cut first, second, and third** if the work turned out to be bigger than expected and needed to fit inside that budget — be specific about which pieces of scope, not just "cut corners" in the abstract.

Finally, name one **circuit breaker** checkpoint: a point roughly at the midpoint of your appetite where you'd stop and honestly reassess whether the current approach is converging.`,
    scaffold: `Task: ________________________________________________________

Appetite (fixed time budget): ________________________________

What I'd cut first if scope needs to shrink:
1. ___________________________________________________________
2. ___________________________________________________________
3. ___________________________________________________________

Circuit breaker checkpoint (when, and what I'd check):
_____________________________________________________________
`,
    rubric: [
      'The appetite is stated as a fixed time budget, not reframed back into a disguised estimate',
      'The cut list names specific pieces of scope, not a vague "cut corners somewhere"',
      'The cuts are ordered by what matters least to the core value, not just what\'s easiest to remove',
      'A real circuit breaker checkpoint is named with a specific time and a specific question to ask at that point',
    ],
  },
};
