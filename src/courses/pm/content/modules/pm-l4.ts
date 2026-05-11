import type { Module } from '../../types';

export const module: Module = {
  id: 'pm-l4',
  domain: 'pm',
  order: 4,
  title: 'Specs & planning artifacts',
  subtitle: 'PRDs, PR/FAQs, user stories, roadmaps, and the product trio.',
  why:
    'This is the document you\'re handed. Learning to read it critically — and to write the parts that are missing — turns you from someone who executes a spec into someone whose review of it actually changes what gets built.',
  estMinutes: 60,
  lessons: [
    {
      id: 'pm-l4-lesson-1',
      title: 'Anatomy of a PRD, and why non-goals matter more than goals',
      body: `A PRD (Product Requirements Document) captures what's being built, for whom, and why, before significant engineering investment. Formats vary, but a useful one reliably has a problem statement, target user, success metrics, functional requirements — and the section most PRDs skip or write last: non-goals.

> ⚠️ Non-goals — the explicit list of what this initiative is *not* trying to solve — is arguably the single most valuable section in the document. Goals tell you what success looks like; they don't tell you what to say no to when a reasonable-sounding request shows up mid-sprint. Without a stated non-goal, every adjacent improvement looks equally justified, and a "two-week feature" becomes six weeks with no single decision anyone can point to.

> **Say this** (when a non-goal is stated and someone asks for it anyway): "That's explicitly a non-goal for this phase — should we open a follow-up, or is this actually blocking?"

| Artifact | Asks | Scale |
|---|---|---|
| PRD | What should we build, and why | Full initiative |
| RFC | How should we build it, specifically, and what are the tradeoffs | A technical decision with real risk or cross-team impact |
| One-pager | Same as PRD, leaner | Small, low-risk initiatives |

A good PRD without a technical RFC risks a beautifully-scoped feature on an approach that quietly can't scale. A good RFC without a PRD risks solving, elegantly, a problem that was never the right one.

The fastest diagnostic when handed a PRD: does it have a non-goals section at all? Its absence is a leading indicator of scope creep before a line of code is written. Missing one is a contribution opportunity, not a complaint — draft three or four guesses at what's out of scope and send them back as "does this match your intent?"`,
      keyTerms: ['prd', 'non-goals', 'rfc', 'one-pager'],
    },
    {
      id: 'pm-l4-lesson-2',
      title: 'PR/FAQ and working backwards: writing the press release before the code',
      body: `Amazon's PR/FAQ inverts the usual order: before significant work begins, the team writes the internal press release announcing the *finished* product, plus an FAQ addressing hard questions — as if it's launch day. Working backwards from that imagined announcement is the underlying discipline.

> ⚠️ A press release has no room for technical detail, which is the entire point: "We built a new caching layer" is not a press release; "customers can now load their dashboard in under a second, even with a year of history" is. If the team can't write a compelling, honest one, that's a real signal, not a formality to get past.

The FAQ splits in two:

- **Customer FAQ** — anticipates confused or skeptical real-user questions ("does this work with my existing data?").
- **Internal FAQ** — the hard questions the team needs answered before committing: cost, technical risk, what happens if a key assumption is wrong.

> **Ask this**, before starting a meaningfully-sized feature: "If I had to write the one sentence a user reads about this at launch, what would it say — and does the interface I'm about to build actually deliver that sentence?" Catches a common failure: building every requirement faithfully while missing the actual customer-facing outcome, because the requirements list and the real story quietly diverged.

Also a fast lens for reviewing someone else's spec: a PRD that can't compress into an honest one-paragraph press release usually has a value proposition that was never actually nailed down.`,
      keyTerms: ['pr-faq', 'working-backwards', 'value-proposition', 'prd'],
    },
    {
      id: 'pm-l4-lesson-3',
      title: 'User stories and Given/When/Then: requirements as testable behavior',
      body: `A user story: "as a [role], I want [capability], so that [benefit]." Like JTBD, its value is in forcing the "so that" clause — without a stated benefit, it's just a feature request wearing a template, and that clause is what lets you evaluate whether a different implementation would serve the need just as well.

Acceptance criteria are the specific, testable conditions a story must satisfy to be done — where ambiguity either gets resolved before development or deferred to a confused conversation in review. Gherkin is the Given/When/Then syntax for writing them as explicit scenarios.

| | Testable | Not testable |
|---|---|---|
| Example | "Given a user with an expired session, When they submit a form, Then they see a re-auth prompt and their data is preserved" | "Handle expired sessions gracefully" |
| Why | Names the exact decision | "Gracefully" hides exactly the decision that matters |

Gherkin reads almost like a test case because that's what it's meant to become — many teams derive automated tests directly from it. When acceptance criteria are vague or missing, that's a legitimate, technical reason to ask for them: "can we write the Given/When/Then for the three trickiest edge cases before I start?"

- Definition of ready — the checklist before a story enters a sprint: acceptance criteria written, dependencies identified, design attached.
- Definition of done — the checklist before it's complete: tests passing, edge cases handled, docs updated.

Without an explicit definition of ready, teams pull half-specified stories into a sprint under pressure — pushing the cost of clarifying requirements from planning time (cheap) to implementation time (expensive, and usually falls on you).

Two estimation terms round this out: story points are a relative, unitless measure of effort, decoupled from calendar time on purpose. Velocity is average completed points per sprint — useful for planning, dangerous as a performance metric, since pressure to show high velocity just inflates point estimates. A spike is a timeboxed investigation when a story can't be honestly scoped without answering a technical unknown first — its output is knowledge, not a shippable feature.`,
      keyTerms: ['user-story', 'acceptance-criteria', 'gherkin', 'definition-of-ready', 'definition-of-done', 'story-points', 'velocity', 'spike'],
    },
    {
      id: 'pm-l4-lesson-4',
      title: 'Roadmaps that aren\'t lies: Now/Next/Later and the honest epic hierarchy',
      body: `"Feature X ships in Q3" has a well-earned reputation for becoming a lie almost immediately — not because PMs are dishonest, but because a specific date implies a confidence that rarely survives real discovery or real dependencies. Now/Next/Later trades false precision for honest uncertainty: bucket by confidence, not by date.

\`\`\`mermaid
flowchart LR
  A["Now\\nactively working"] --> B["Next\\nconfirmed, priority order"]
  B --> C["Later\\nunder consideration,\\nlooser confidence"]
\`\`\`

The hierarchy above a ticket is what makes this function:

| Level | What it is | Example |
|---|---|---|
| Theme | Broad strategic focus, often a whole planning cycle | "Improve first-week retention" |
| Initiative | A specific, scoped bet within a theme | "Redesign the onboarding checklist" |
| Epic | Spans multiple sprints, one coherent outcome — the unit on the board | — |
| User story | The tickets that make up an epic | — |

Losing track of this is how roadmap arguments get confused — debating a single story's priority when the real disagreement is whether its initiative belongs in "Now" at all.

A success metric is the specific number a theme or initiative is meant to move, stated *before* work begins — not reverse-engineered afterward to justify whatever shipped. Flag initiatives without one; it keeps the team honest about whether it actually worked.

The product trio — PM, designer, lead engineer — owns discovery and shapes decisions together, instead of a PM writing specs alone and handing them downstream. Being in the room when key assumptions are decided is a fundamentally more useful place to raise a feasibility concern than after design has already signed off. Getting invited isn't a formal decision — it's earned by a sharp feasibility flag here, a non-goals question there, a Given/When/Then offered before being asked.`,
      keyTerms: ['now-next-later', 'theme', 'initiative', 'epic', 'success-metric', 'product-trio'],
    },
  ],
  terms: [
    {
      id: 'prd',
      domain: 'pm',
      term: 'PRD',
      aliases: ['Product Requirements Document'],
      moduleId: 'pm-l4',
      tier: 1,
      oneLiner: 'The document capturing what\'s being built, for whom, and why, before major work starts.',
      full:
        'A PRD captures the problem statement, target user, success metrics, functional requirements, and ideally non-goals for an initiative before significant engineering investment begins. Its usefulness depends heavily on whether it states what\'s explicitly out of scope, not just what\'s in scope, since the goals section alone rarely prevents scope creep during implementation.',
      devAnalogy: 'It\'s like a design doc for a feature instead of a system — same purpose of forcing key decisions into the open before code gets written, just aimed at product behavior instead of architecture.',
      leverage: 'You can check whether a PRD has a non-goals section as your first diagnostic — its absence is a leading indicator of scope creep risk before a single line of code is written.',
      sayThis: 'This PRD doesn\'t have a non-goals section — can I draft a few based on the stated goals, so we agree on scope before I start?',
      antiPattern: 'A PRD lists goals in detail but never states non-goals, so every adjacent "improvement" that comes up mid-sprint looks equally justified, and scope creeps one reasonable addition at a time.',
      related: ['non-goals', 'rfc', 'one-pager'],
    },
    {
      id: 'one-pager',
      domain: 'pm',
      term: 'One-pager',
      moduleId: 'pm-l4',
      tier: 3,
      oneLiner: 'A single-page PRD used for smaller initiatives where full process is overkill.',
      full:
        'A one-pager captures the problem, proposed direction, and rough scope for a smaller initiative in a single page, avoiding the process overhead of a full PRD when the decision size doesn\'t warrant it. Using a one-pager for a decision with real cross-team dependencies or customer-facing risk is often a sign the process was under-scaled to the actual stakes involved.',
      devAnalogy: 'It\'s like a short design note for a small, contained change versus a full architecture doc — proportionate rigor for a proportionate decision.',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'A genuinely risky, cross-team decision gets a one-pager because writing a full PRD felt like too much overhead, and the missing rigor surfaces later as unresolved disagreements mid-build.',
      related: ['prd'],
    },
    {
      id: 'pr-faq',
      domain: 'pm',
      term: 'PR/FAQ',
      moduleId: 'pm-l4',
      tier: 2,
      oneLiner: 'Writing the launch press release and FAQ before building, to test the value proposition.',
      full:
        'A PR/FAQ writes the internal press release announcing a finished product, plus a customer and internal FAQ, before significant work begins, forcing clarity about customer benefit in plain language with no room for hiding behind technical detail. If the team can\'t write a compelling, honest press release for what they\'re about to build, that\'s treated as a real signal.',
      devAnalogy: 'It\'s like writing the README and changelog entry for a library before writing the code — if you can\'t describe why anyone would want it, that tells you something before you\'ve invested the effort.',
      leverage: 'You can informally ask what one sentence a user would read about a feature at launch, and check whether the interface you\'re about to build actually delivers that sentence.',
      sayThis: 'If we had to write the one sentence users read about this at launch, what would it say — and does this spec actually deliver that?',
      antiPattern: 'A team skips writing an honest press release and jumps straight to a feature list, later discovering the value proposition was never actually clear because nothing forced it into plain language.',
      related: ['working-backwards', 'value-proposition'],
    },
    {
      id: 'working-backwards',
      domain: 'pm',
      term: 'Working backwards',
      moduleId: 'pm-l4',
      tier: 2,
      oneLiner: 'Starting from the customer-facing outcome and designing the plan to reach it.',
      full:
        'Working backwards is a planning philosophy that starts from an imagined finished, customer-facing outcome and reasons backward to what needs to be built, rather than starting from current capabilities and reasoning forward toward whatever seems achievable. The PR/FAQ is its most well-known concrete artifact, but the mindset applies more broadly to any planning exercise that centers the customer outcome first.',
      devAnalogy: 'It\'s like writing the test for the desired behavior before writing the implementation — you define the outcome you\'re aiming for first, which shapes the plan rather than the plan shaping a vague outcome.',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'A plan builds forward from "what can we ship quickly" and only afterward tries to construct a customer story to justify it, producing a feature that technically works but never had a clear customer outcome driving it.',
      related: ['pr-faq'],
    },
    {
      id: 'rfc',
      domain: 'pm',
      term: 'RFC',
      aliases: ['Request for Comments'],
      moduleId: 'pm-l4',
      tier: 2,
      oneLiner: 'A proposal for a specific technical approach, circulated for structured feedback before building.',
      full:
        'An RFC proposes a specific technical approach to a problem and solicits structured feedback before implementation, typically used for decisions with significant technical risk or cross-team impact. Where a PRD asks what to build and why, an RFC asks how to build it and what the tradeoffs of that specific approach are.',
      devAnalogy: 'It\'s the same document type engineers already know from open-source and standards processes — a proposal written for public comment before it becomes the accepted approach.',
      leverage: 'You are usually the natural author of the RFC for any initiative with real technical risk, and writing it yourself is one of the clearest ways to shape the actual implementation rather than just reacting to someone else\'s.',
      sayThis: 'This has enough technical risk that I think it deserves an RFC before we commit to an approach — can I write one?',
      antiPattern: 'A technically risky initiative goes straight from PRD to implementation with no RFC, and the team discovers the chosen approach doesn\'t scale only after significant code has already been written around it.',
      related: ['prd'],
    },
    {
      id: 'non-goals',
      domain: 'pm',
      term: 'Non-goals',
      moduleId: 'pm-l4',
      tier: 1,
      oneLiner: 'The explicit list of what an initiative is deliberately not trying to solve.',
      full:
        'Non-goals state, explicitly and in advance, what an initiative is not attempting to address in its current scope, giving the team a pre-approved, legitimate answer when a reasonable-sounding request threatens to expand scope mid-build. A PRD\'s non-goals section is arguably more valuable at preventing scope creep than its goals section, since goals alone don\'t tell anyone what to say no to.',
      devAnalogy: 'It\'s like an explicit "out of scope for this PR" note in a pull request description — it doesn\'t mean the idea is bad, it means this specific change isn\'t the place for it.',
      leverage: 'You can draft the non-goals section yourself when it\'s missing, based on the stated goals, and send it back for confirmation before starting — a genuine contribution, not pushback.',
      sayThis: 'That\'s a reasonable idea, but it\'s explicitly a non-goal for this phase — should we open a follow-up, or is it actually blocking?',
      antiPattern: 'A two-week feature becomes a six-week feature one reasonable-sounding addition at a time, with no single decision anyone can point to as the cause, because nothing was ever declared out of scope.',
      related: ['prd', 'success-metric'],
    },
    {
      id: 'epic',
      domain: 'pm',
      term: 'Epic',
      moduleId: 'pm-l4',
      tier: 2,
      oneLiner: 'A body of work spanning multiple sprints with a coherent, describable outcome.',
      full:
        'An epic is a unit of work large enough to span multiple sprints but small enough to have a single coherent outcome, sitting between an initiative and individual user stories in the planning hierarchy. It\'s typically the unit that actually shows up as a card on a Now/Next/Later roadmap, with the stories underneath it representing the concrete implementation work.',
      devAnalogy: 'It\'s like a milestone in a project plan that groups several related pull requests under one describable, shippable outcome.',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'A roadmap conversation argues about a single story\'s priority when the actual disagreement is really about whether the epic it belongs to deserves a slot at all, and the mismatch in altitude confuses everyone.',
      related: ['user-story', 'initiative', 'theme'],
    },
    {
      id: 'user-story',
      domain: 'pm',
      term: 'User story',
      moduleId: 'pm-l4',
      tier: 1,
      oneLiner: '"As a [role], I want [capability], so that [benefit]" — a requirement with a benefit.',
      full:
        'A user story states a requirement from a user\'s perspective in the form "as a [role], I want [capability], so that [benefit]," and its value lies specifically in the "so that" clause, which forces a stated benefit rather than a bare feature request. That benefit clause is what lets an alternative implementation be fairly evaluated against the same underlying need.',
      devAnalogy: 'It\'s like a well-written test description that states the expected behavior and why it matters, not just what function is being called.',
      leverage: 'You can ask for the missing "so that" clause on any story that\'s just a feature request in disguise, since it\'s often the fastest way to discover a simpler implementation serves the same underlying benefit.',
      sayThis: 'What\'s the "so that" here — what benefit is this actually meant to deliver?',
      antiPattern: 'A backlog fills with stories that state a capability but never a benefit, so no one can tell whether an alternative, cheaper implementation would serve the same real need just as well.',
      related: ['acceptance-criteria', 'epic', 'jtbd'],
    },
    {
      id: 'acceptance-criteria',
      domain: 'pm',
      term: 'Acceptance criteria',
      moduleId: 'pm-l4',
      tier: 1,
      oneLiner: 'The specific, testable conditions that must hold for a story to count as done.',
      full:
        'Acceptance criteria are the concrete, testable conditions a user story must satisfy to be considered complete, and their precision is where a huge amount of ambiguity either gets resolved before development or silently deferred until a confused conversation during review. Vague criteria like "handle errors gracefully" hide exactly the decisions that determine how the feature actually behaves.',
      devAnalogy: 'Acceptance criteria are like test assertions written before the implementation — if you can\'t state them precisely, you don\'t actually know what "done" means yet.',
      leverage: 'You can ask for Given/When/Then acceptance criteria on the trickiest edge cases in a story before starting, which is a technically grounded, specific request that\'s hard to refuse.',
      sayThis: 'Can we write the Given/When/Then for the trickiest edge cases here before I start, since those are what\'s most likely to get built inconsistently otherwise?',
      antiPattern: 'A story ships with acceptance criteria like "handle errors gracefully," and the engineer ends up making a dozen unreviewed judgment calls about behavior that should have been decided during planning.',
      related: ['gherkin', 'user-story', 'definition-of-done'],
    },
    {
      id: 'gherkin',
      domain: 'pm',
      term: 'Gherkin',
      aliases: ['Given/When/Then'],
      moduleId: 'pm-l4',
      tier: 2,
      oneLiner: 'The Given/When/Then syntax for writing acceptance criteria as explicit, testable scenarios.',
      full:
        'Gherkin structures acceptance criteria as explicit scenarios in the form "Given [a starting state], When [an action happens], Then [an expected outcome occurs]," producing testable, unambiguous requirements that read almost like test cases. Many teams derive automated tests directly from Given/When/Then scenarios written during planning, which is exactly why the format is worth insisting on for tricky edge cases.',
      devAnalogy: 'It\'s literally a test case written in plain English before the code exists — the same structure as a behavior-driven test, just authored during planning instead of implementation.',
      leverage: 'You can write the Given/When/Then scenarios yourself for edge cases a spec left vague, turning a fuzzy requirement into something both you and the PM can agree is unambiguous before you build it.',
      sayThis: 'Given this starting state, when this happens, what should the user actually see — can we pin that down before I build it?',
      antiPattern: 'A team writes acceptance criteria as vague prose instead of concrete scenarios, and later derives automated tests from a shared understanding that turns out to differ between whoever wrote the story and whoever implemented it.',
      related: ['acceptance-criteria', 'user-story'],
    },
    {
      id: 'definition-of-ready',
      domain: 'pm',
      term: 'Definition of ready',
      moduleId: 'pm-l4',
      tier: 2,
      oneLiner: 'The checklist a story must satisfy before it\'s pulled into a sprint.',
      full:
        'Definition of ready is a team-level agreement about what a story must have — acceptance criteria written, dependencies identified, design attached, open questions resolved — before it\'s eligible to be pulled into a sprint. Teams without an explicit definition of ready routinely pull half-specified stories in under deadline pressure, pushing the cost of clarifying requirements from cheap planning time into expensive implementation time.',
      devAnalogy: 'It\'s like a PR template\'s checklist, but applied before work starts instead of before it\'s merged — a gate that catches missing information early rather than late.',
      leverage: 'You can ask that a story meet the team\'s definition of ready before pulling it in, which shifts the cost of clarifying vague requirements back to planning time where it belongs.',
      sayThis: 'Does this meet our definition of ready, or are we pulling it in with open questions still unresolved?',
      antiPattern: 'A team has a documented definition of ready that gets waived under deadline pressure so often that it stops functioning as a real gate and starts existing only on paper.',
      related: ['definition-of-done', 'acceptance-criteria'],
    },
    {
      id: 'definition-of-done',
      domain: 'pm',
      term: 'Definition of done',
      moduleId: 'pm-l4',
      tier: 2,
      oneLiner: 'The checklist a story must satisfy before it\'s considered actually complete.',
      full:
        'Definition of done is a team-level agreement about what "complete" means for a story — tests passing, edge cases handled, documentation updated, and whatever else the team has agreed constitutes actually finished work, as opposed to merely merged or demoed. Without an explicit definition of done, "done" quietly means different things to different people on the same team.',
      devAnalogy: 'It\'s like a release checklist that has to fully pass before a deploy is considered shipped, not just merged to main.',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'A story is marked done after a demo goes well, while tests, edge cases, and documentation are quietly left unfinished because no explicit definition of done was ever agreed on.',
      related: ['definition-of-ready', 'acceptance-criteria'],
    },
    {
      id: 'story-points',
      domain: 'pm',
      term: 'Story points',
      moduleId: 'pm-l4',
      tier: 2,
      oneLiner: 'A relative, unitless measure of a story\'s effort and complexity, decoupled from calendar time.',
      full:
        'Story points estimate a story\'s effort and complexity on a relative, unitless scale, deliberately avoiding the false precision of hour-based estimates. They only make sense as a comparison within a single team\'s shared calibration — a 5-point story on one team says nothing about a 5-point story on another.',
      devAnalogy: 'It\'s like Big-O complexity relative to other functions in the same codebase — meaningful for comparison within context, meaningless as an absolute, portable unit.',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'Story points get compared directly across two different teams as if they were an absolute unit, when they were only ever meaningful as a relative, team-specific calibration.',
      related: ['velocity', 't-shirt-sizing'],
    },
    {
      id: 'velocity',
      domain: 'pm',
      term: 'Velocity',
      moduleId: 'pm-l4',
      tier: 2,
      oneLiner: 'A team\'s average completed story points per sprint, used to forecast future capacity.',
      full:
        'Velocity is a team\'s average completed story points per sprint, useful as a planning input for forecasting realistic commitments, but dangerous when treated as a performance metric — a team pressured to show high velocity will simply inflate its point estimates rather than deliver more, which quietly destroys the number\'s usefulness for forecasting.',
      devAnalogy: 'It\'s like treating lines-of-code-per-week as a productivity metric — the moment it becomes a target, people optimize the number instead of the outcome it was meant to measure.',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'Leadership starts comparing velocity across teams as a performance ranking, and story point inflation quietly follows, rendering the metric useless for its original forecasting purpose within a quarter.',
      related: ['story-points'],
    },
    {
      id: 'spike',
      domain: 'pm',
      term: 'Spike',
      moduleId: 'pm-l4',
      tier: 2,
      oneLiner: 'A short, timeboxed investigation task used to answer a technical unknown before scoping.',
      full:
        'A spike is a timeboxed investigation used when a story can\'t be honestly estimated or scoped without first answering a specific technical unknown. Its output is knowledge — an answer, a recommendation, a de-risked estimate — not a shippable feature, and treating a spike\'s deliverable as production-ready code defeats its purpose.',
      devAnalogy: 'It\'s like a timeboxed research spike before a real implementation — you\'re explicitly not trying to ship the thing, you\'re trying to find out enough to scope it honestly.',
      leverage: 'You can propose a spike whenever a story\'s estimate is really a guess about an unresolved technical unknown, which is far more honest than a padded estimate meant to cover uncertainty silently.',
      sayThis: 'I can\'t give an honest estimate here without answering one technical question first — can we timebox a spike for that?',
      antiPattern: 'A story with a genuinely unresolved technical unknown gets estimated anyway with padding to cover the uncertainty, instead of timeboxing a spike to actually resolve the unknown before committing to a number.',
      related: ['story-points'],
    },
    {
      id: 'now-next-later',
      domain: 'pm',
      term: 'Now/Next/Later',
      moduleId: 'pm-l4',
      tier: 1,
      oneLiner: 'A roadmap format bucketing work by confidence instead of committing to false dates.',
      full:
        'Now/Next/Later buckets roadmap initiatives into what the team is actively working on, what\'s confirmed as next in priority, and what\'s under consideration for later, with explicitly looser confidence the further out a bucket sits. It trades the false precision of dated roadmaps, which rarely survive contact with real discovery and dependencies, for honest, plannable uncertainty.',
      devAnalogy: 'It\'s like a release train with a firm next release, a fairly confident following one, and an openly speculative one after that, instead of pretending all three have equally reliable ship dates.',
      leverage: 'You can push back when a "Later" item gets treated as an implicit committed date, since the whole point of the format is to signal that confidence drops the further out the bucket sits.',
      sayThis: 'That\'s in "Later," not "Now" — do we actually mean this as a commitment, or is it still speculative?',
      antiPattern: 'A "Later" bucket item gets treated by stakeholders as an implicit commitment with an assumed date, even though the whole point of the format was to signal that "Later" carries much lower confidence than "Now."',
      related: ['theme', 'initiative', 'epic'],
    },
    {
      id: 'theme',
      domain: 'pm',
      term: 'Theme',
      moduleId: 'pm-l4',
      tier: 2,
      oneLiner: 'A broad area of strategic focus spanning a whole planning cycle.',
      full:
        'A theme is a broad, strategic area of focus — such as "improve first-week retention" — that spans an entire planning cycle and contains multiple initiatives underneath it. Themes sit at the top of the planning hierarchy, above initiatives, epics, and stories, and they\'re where a roadmap\'s connection back to strategy should be most visible.',
      devAnalogy: 'It\'s like a quarter\'s architectural focus area — "reduce build times" — that several distinct, concrete projects all serve without being identical to any one of them.',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'A roadmap lists a dozen unrelated initiatives with no themes grouping them, making it impossible to tell whether the plan actually reflects a coherent strategy or just a pile of individually reasonable requests.',
      related: ['initiative', 'epic', 'now-next-later'],
    },
    {
      id: 'initiative',
      domain: 'pm',
      term: 'Initiative',
      moduleId: 'pm-l4',
      tier: 2,
      oneLiner: 'A specific, scoped bet within a theme, concrete enough to plan and staff.',
      full:
        'An initiative is a scoped, concrete bet within a broader theme — "redesign the onboarding checklist" within a "first-week retention" theme — specific enough to be planned, staffed, and eventually broken into epics and stories. It sits between the strategic altitude of a theme and the implementation altitude of an epic.',
      devAnalogy: 'It\'s like a specific project chartered to advance a broader quarterly technical focus area, concrete enough to assign an owner and a rough timeline.',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'An initiative gets approved with no stated success metric, so months later nobody can say with confidence whether it actually worked or just quietly shipped.',
      related: ['theme', 'epic', 'success-metric'],
    },
    {
      id: 'product-trio',
      domain: 'pm',
      term: 'Product trio',
      moduleId: 'pm-l4',
      tier: 1,
      oneLiner: 'The PM, designer, and lead engineer who own discovery and shape decisions together.',
      full:
        'The product trio is the small, cross-functional group — typically a product manager, a designer, and a lead engineer — that owns discovery and key shaping decisions together, rather than a PM writing specs alone and handing them downstream. Being part of the trio means raising feasibility and scope concerns while a spec\'s key assumptions are still being decided, not after they\'ve already been reviewed and approved.',
      devAnalogy: 'It\'s like being included in a design review while the architecture is still being decided, rather than being handed a finished design doc to implement and asked for sign-off after the fact.',
      leverage: 'Earning an informal seat in the trio changes when your feasibility input lands — while key assumptions are still being decided, rather than after a design is already approved and harder to unwind.',
      sayThis: 'Could I be looped in earlier on discovery for this, before the design is locked, rather than reviewing it once it\'s finished?',
      antiPattern: 'Engineering is looped in only after design and product have finalized a spec, so a fundamental feasibility issue surfaces late enough that fixing it means reopening decisions everyone thought were settled.',
      related: ['epic', 'initiative'],
    },
    {
      id: 'success-metric',
      domain: 'pm',
      term: 'Success metric',
      moduleId: 'pm-l4',
      tier: 1,
      oneLiner: 'The specific number a theme or initiative is meant to move, stated before work begins.',
      full:
        'A success metric is the specific, named number an initiative or theme is intended to move, declared in advance rather than reverse-engineered afterward to justify whatever shipped. Its absence is worth flagging gently in planning, since a metric decided ahead of time is what keeps a team honest about whether an initiative actually worked.',
      devAnalogy: 'It\'s like defining the specific benchmark a performance optimization is meant to improve before starting the work, instead of declaring victory afterward based on whatever number happened to move.',
      leverage: 'You can ask what specific number an initiative is meant to move before starting, which is a fair planning question that also protects the team from quietly redefining success after the fact.',
      sayThis: 'What specific metric is this meant to move, and by roughly how much, before we start building?',
      antiPattern: 'An initiative ships with no metric declared in advance, and success gets narrated afterward based on whatever number happened to look good, rather than measured against a real prior commitment.',
      related: ['initiative', 'non-goals'],
    },
  ],
  quiz: [
    {
      kind: 'mcq',
      id: 'pm-l4-q1',
      prompt: 'Why is a PRD\'s non-goals section often more valuable at preventing scope creep than its goals section?',
      options: [
        'Because goals sections are usually inaccurate',
        'Because goals alone don\'t tell the team what to say no to when a reasonable-sounding request shows up mid-build',
        'Because non-goals are legally required in most companies',
        'Because non-goals replace the need for acceptance criteria entirely',
      ],
      answer: 1,
      explain: 'A goals list defines what success looks like, but only an explicit non-goals list gives the team a pre-approved, legitimate reason to decline an adjacent, reasonable-sounding request during implementation.',
    },
    {
      kind: 'mcq',
      id: 'pm-l4-q2',
      prompt: 'What is the core discipline a PR/FAQ exercise forces onto a plan?',
      options: [
        'It forces the team to pick a launch date early',
        'It forces the value proposition into plain, customer-facing language with no room to hide behind technical detail',
        'It forces a full RICE score to be computed before any writing begins',
        'It replaces the need for a PRD entirely',
      ],
      answer: 1,
      explain: 'A press release has no room for technical jargon, so writing one forces clarity about the actual customer benefit in a way a feature-list-style PRD can let a team avoid.',
    },
    {
      kind: 'scenario',
      id: 'pm-l4-q3',
      prompt: 'A story\'s acceptance criteria say "handle expired sessions gracefully." What\'s the sharpest response before starting work?',
      options: [
        'Build it however seems reasonable and let review catch issues',
        'Ask to write Given/When/Then scenarios for the trickiest expired-session cases before starting, since "gracefully" is hiding the actual decisions',
        'Reject the story outright as unbuildable',
        'Assume the designer\'s mockup already covers every case implicitly',
      ],
      answer: 1,
      explain: 'Vague acceptance criteria like "gracefully" hide exactly the decisions that determine real behavior — proposing concrete Given/When/Then scenarios turns ambiguity into something both sides can agree on before code is written.',
    },
    {
      kind: 'mcq',
      id: 'pm-l4-q4',
      prompt: 'Why is velocity risky to use as a performance metric across teams?',
      options: [
        'Because velocity can only be measured once per quarter',
        'Because story points are only meaningful as a relative, team-specific calibration, so comparing velocity across teams incentivizes point inflation rather than real improvement',
        'Because velocity has no relationship to story points at all',
        'Because only senior engineers are allowed to estimate story points',
      ],
      answer: 1,
      explain: 'Story points are relative within a single team\'s own calibration; using velocity as a cross-team performance ranking pressures teams to inflate estimates, which destroys the metric\'s usefulness for forecasting.',
    },
    {
      kind: 'mcq',
      id: 'pm-l4-q5',
      prompt: 'What is a spike meant to produce?',
      options: [
        'Production-ready code for the feature being investigated',
        'Knowledge — an answer or de-risked estimate for a specific technical unknown — not a shippable feature',
        'A final RICE score for the initiative',
        'A completed PRD for the next quarter',
      ],
      answer: 1,
      explain: 'A spike is a timeboxed investigation whose deliverable is knowledge that enables honest scoping, not a shippable feature — treating its output as production code defeats the purpose of timeboxing it.',
    },
    {
      kind: 'scenario',
      id: 'pm-l4-q6',
      prompt: 'A roadmap review argues about a single story\'s priority, but the disagreement seems to run deeper. What\'s likely happening?',
      options: [
        'The team has picked the wrong story point estimate',
        'The actual disagreement is at a higher altitude — likely about whether the epic or initiative the story belongs to deserves a slot at all',
        'The PRD is missing a definition of done',
        'The team needs to switch from Now/Next/Later back to dated roadmaps',
      ],
      answer: 1,
      explain: 'Confusion in roadmap conversations often comes from arguing at the wrong altitude — a story-level disagreement that\'s really about the epic or initiative above it not having been resolved first.',
    },
    {
      kind: 'mcq',
      id: 'pm-l4-q7',
      prompt: 'Why does Now/Next/Later avoid assigning specific dates to initiatives?',
      options: [
        'Because dates are illegal to include in roadmap documents',
        'Because a specific date implies a false confidence that rarely survives contact with real discovery, dependencies, and feedback',
        'Because Now/Next/Later only applies to bug fixes, not features',
        'Because story points already convey enough timing information',
      ],
      answer: 1,
      explain: 'Now/Next/Later trades the false precision of dated roadmaps, which routinely become inaccurate, for honestly graduated confidence that\'s actually more useful to plan around.',
    },
    {
      kind: 'mcq',
      id: 'pm-l4-q8',
      prompt: 'What does being part of the product trio actually change for an engineer?',
      options: [
        'It gives the engineer sole authority to approve designs',
        'It means feasibility and scope concerns get raised while key assumptions are still being decided, rather than after a spec is already finalized',
        'It removes the need to write acceptance criteria',
        'It only applies to engineering managers, not individual contributors',
      ],
      answer: 1,
      explain: 'The product trio\'s value is timing — raising a concern while assumptions are still being shaped is far more useful and less disruptive than raising the same concern after a design has already been reviewed and approved.',
    },
    {
      kind: 'match',
      id: 'pm-l4-q9',
      prompt: 'Match each planning-hierarchy term to its correct altitude.',
      pairs: [
        ['Theme', 'A broad area of strategic focus spanning a whole planning cycle'],
        ['Initiative', 'A specific, scoped bet within a theme, concrete enough to staff'],
        ['Epic', 'A body of work spanning multiple sprints with one coherent outcome'],
        ['User story', 'A single requirement stated from a user\'s perspective with a benefit'],
      ],
      explain: 'Confusing these four altitudes is one of the most common sources of unproductive roadmap arguments — each answers a genuinely different scoping question.',
    },
    {
      kind: 'scenario',
      id: 'pm-l4-q10',
      prompt: 'An initiative is approved with no stated success metric. What\'s the risk months later?',
      options: [
        'None — success metrics are optional formalities',
        'Nobody will be able to say with confidence whether the initiative actually worked, since success will be narrated after the fact based on whatever shipped',
        'The initiative will automatically fail its RICE score',
        'The team will be unable to write a PRD for the next initiative',
      ],
      answer: 1,
      explain: 'A metric declared before work begins is what keeps a team honest about whether an initiative actually worked; without one, success tends to get narrated retroactively based on whatever happened to ship.',
    },
  ],
  exercise: {
    id: 'pm-l4-exercise',
    title: 'Rewrite a vague ticket as a mini-PRD with an explicit non-goals section',
    prompt: `Find a ticket in your backlog that's vague, solution-shaped, or missing context — the kind you'd normally just start building from best guesses.

Rewrite it as a **mini-PRD** with four sections: problem statement (in problem-space language, not solution-space), target user, success metric, and — the section that matters most for this exercise — **non-goals**: at least three specific things this ticket is deliberately not trying to solve.

Then write one Given/When/Then acceptance criterion for the trickiest edge case the original ticket left unspecified.`,
    scaffold: `Original ticket (as given): ______________________________________

Problem statement (no solution language):
_____________________________________________________________

Target user: ________________________________________________

Success metric: _____________________________________________

Non-goals:
1. ___________________________________________________________
2. ___________________________________________________________
3. ___________________________________________________________

Given/When/Then for the trickiest edge case:
Given ________________________________________________________
When _________________________________________________________
Then _________________________________________________________
`,
    rubric: [
      'The problem statement contains no mention of the eventual solution or feature name',
      'At least three non-goals are specific enough to actually prevent a real scope argument, not generic filler',
      'The success metric is a real, checkable number, not a vague aspiration',
      'The Given/When/Then scenario targets a genuine edge case the original ticket left ambiguous',
    ],
  },
};
