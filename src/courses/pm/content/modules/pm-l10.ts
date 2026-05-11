import type { Module } from '../../types';

export const module: Module = {
  id: 'pm-l10',
  domain: 'pm',
  order: 10,
  title: 'Org, process & influence',
  subtitle: 'Empowered vs. feature teams, RACI/DACI, pre-mortems, and earning a seat in the room.',
  why:
    'This layer decides whether your product input is actually wanted, not just tolerated. Empowered team versus feature team is the whole difference between being asked what to build and only being asked how fast you can build it.',
  estMinutes: 60,
  lessons: [
    {
      id: 'pm-l10-lesson-1',
      title: 'Outcome over output, and the empowered-vs-feature-team divide',
      body: `**Outcome over output** (popularized by Marty Cagan): a team's success should be measured by actual results — retention improving, a real problem solved — not by how much shipped.

Sounds obvious, is almost universally violated: output is trivially easy to measure (count tickets, story points, roadmap items); outcome requires the harder discipline of honestly checking whether any of it actually worked.

### The empowered team vs. feature team divide

| | Feature team | Empowered team |
|---|---|---|
| Handed | A pre-decided list of things to build | A problem or desired outcome |
| Example | "Add a progress indicator to checkout" | "Reduce checkout abandonment" |
| Latitude | Execute the list well | Figure out what to build, informed by real discovery |
| Job | Executing, not reshaping | Direct discovery, not a pre-decided solution from upstream |

> **Which kind of team are you actually on?** Be honest, not aspirational — the right move differs completely.

- **On a feature team:** discovery vocabulary (JTBD, riskiest assumption tests) has limited room — the solution's usually already decided upstream. Highest-leverage moves: catch feasibility risk early, propose an appetite instead of a raw estimate, build a genuinely excellent empty state, own the tracking plan.
- **On an empowered team:** the full toolkit becomes directly usable — the team has real latitude to change direction based on what discovery surfaces.

You can't negotiate your way into discovery latitude on a team structurally not built to grant any. But you very often can shift a specific team or PM relationship toward more empowerment over time — one well-placed, credible contribution at a time. That's the rest of this module.`,
      keyTerms: ['outcome-over-output', 'empowered-team', 'feature-team'],
    },
    {
      id: 'pm-l10-lesson-2',
      title: 'Decision frameworks: RACI, DACI, and who actually decides',
      body: `A huge fraction of friction blamed on "poor communication" is actually simpler: nobody defined who's empowered to make a given decision, so it gets debated in circles by people with opinions but no standing to close it out.

### RACI

| Role | Meaning |
|---|---|
| **R**esponsible | Who does the work |
| **A**ccountable | Who owns the outcome, final sign-off — exactly one person, or the framework collapses |
| **C**onsulted | Whose input is sought, two-way |
| **I**nformed | Who's told after the fact, one-way |

Comprehensive and precise, but heavyweight — best for larger, cross-functional, higher-stakes initiatives.

### DACI — lighter, product-native

| Role | Meaning |
|---|---|
| **D**river | Actively moves the decision forward, gathers input, pushes to resolution |
| **A**pprover | Final sign-off — same singularity rule as Accountable |
| **C**ontributor | Provides input |
| **I**nformed | Told the outcome afterward |

The Driver role is what RACI doesn't separate out — its absence is a common, specific reason decisions stall even when everyone nominally agrees on the answer.

The **single-threaded owner (STO)** (Amazon) goes further: one person with clear, singular, end-to-end ownership of an initiative, deliberately avoiding the diffusion that happens under committee ownership.

> **Say this, when a decision feels stuck for no clear reason:** "Who's the Approver here, or who's Accountable for this?" Often the honest answer is "nobody" — the real, structural, fixable problem, distinct from a genuine substantive disagreement.`,
      keyTerms: ['raci', 'daci', 'single-threaded-owner'],
    },
    {
      id: 'pm-l10-lesson-3',
      title: 'The rituals worth taking seriously: refinement, planning, retros, and the pre-mortem',
      body: `### The ritual chain

\`\`\`mermaid
flowchart LR
  A[Backlog refinement] --> B[Sprint planning]
  B --> C[Execution]
  C --> D[Retrospective]
\`\`\`

- **Backlog refinement** (grooming) — reviewing, clarifying, estimating items before planning. Where the definition-of-ready discipline actually gets enforced, or quietly skipped. Healthy refinement means ambiguity gets caught early, when it's cheap — not mid-implementation, when the engineer already building it absorbs the cost.
- **Sprint planning** — commits to specific work. Quality depends almost entirely on how much clarity refinement already produced. Vague, unrefined stories mean either committing to poorly-understood work or re-litigating scope questions that should've been resolved days earlier.
- **Retrospective** — closes the loop. Depends on psychological safety: comfort naming what went wrong (including your own role) surfaces real improvements. Only-safe-to-blame-external-factors retros ("we didn't have enough time") produce polite, useless theater.

### Two underused techniques

> **Pre-mortem:** before a risky project, the team imagines it has already failed, then works backward to identify what caused it. Surfaces risks a standard forward-looking conversation misses — imagining failure directly unlocks candor that imagining success doesn't.

> **Blameless postmortem:** after something's gone wrong, separates *what happened and why the system allowed it* from *who's to blame*. Blame-focused postmortems teach people to hide mistakes, not fix systemic causes.

- A **decision log** records significant decisions with their reasoning at the time — without one, "why did we build it this way" has to be reconstructed from fading memory months later.
- An **escalation path** is the known route for raising a blocker that isn't resolving. Without one, teams either suffer in silence or escalate chaotically. Know yours before you urgently need it.`,
      keyTerms: ['backlog-refinement', 'sprint-planning', 'retrospective', 'pre-mortem', 'blameless-postmortem', 'decision-log', 'escalation-path'],
    },
    {
      id: 'pm-l10-lesson-4',
      title: 'Disagreeing productively, and earning a real seat in the room',
      body: `**Disagree and commit** (Amazon): voice genuine disagreement clearly during a decision — then, once it's made, commit to executing it fully and in good faith. No quiet withholding, no relitigating in side conversations, no half-hearted execution that becomes a self-fulfilling case for "I told you so."

Cuts both directions:

- Actually voice disagreement when you have it — don't stay silent then quietly resist.
- Actually let go once decided through a fair process — "I disagreed at the time" isn't a standing license to under-invest.

### Ways to build the credibility that earns you a seat

| Mechanism | What it does |
|---|---|
| **Tiger team** | Small, temporary, cross-functional group for one urgent problem, more autonomy than normal structure. Being asked onto one is a real trust signal — performing well is a concentrated, visible chance to build cross-functional credibility |
| **Stakeholder management** | Understanding who has real interest/influence over your work, communicating calibrated to each — not identically to everyone, not only reactively once someone's upset |
| **Socializing a doc** | Sharing a draft one-on-one before a formal review — surfaces objections while it's still easy to change, before people publicly commit to a first reaction |

A **two-pizza team** (Amazon, roughly five to eight people) tends to be exactly the size where one person's consistent, well-placed contributions are genuinely noticeable, not lost in the noise.

None of the specific moves this course covers — a JTBD statement, an appetite instead of a raw estimate, a tracking plan before anyone asks, a pre-mortem on a risky release — require a title change or formal permission. They require noticing the right moment and having the vocabulary ready. Earning a real seat isn't one decision anyone makes on your behalf — it's the accumulated effect of a PM repeatedly noticing your input reliably makes the work better. Available starting on your next ticket.`,
      keyTerms: ['disagree-and-commit', 'tiger-team', 'stakeholder-management', 'socializing-a-doc', 'two-pizza-team'],
    },
  ],
  terms: [
    {
      id: 'outcome-over-output',
      domain: 'pm',
      term: 'Outcome over output',
      moduleId: 'pm-l10',
      tier: 1,
      oneLiner: 'Measuring success by real results produced, not by how much was shipped.',
      full:
        'Outcome over output is the principle that a team\'s success should be measured by the actual results its work produces — retention improving, a real problem solved — rather than by volume shipped. Output is trivially easy to measure; outcome requires the harder discipline of honestly checking whether shipped work actually worked.',
      devAnalogy: 'It\'s like measuring a system by whether it actually reduced incidents, not by how many alerts or dashboards were built for it — activity isn\'t the same as impact.',
      leverage: 'You can ask what outcome a piece of work is actually meant to produce before starting it, which is a fair, specific question that keeps effort pointed at results instead of just activity.',
      sayThis: 'What outcome is this actually meant to move, and how will we know afterward whether it worked?',
      antiPattern: 'A team celebrates hitting every shipped-feature target for the quarter while the actual metric those features were meant to improve stays completely flat.',
      related: ['empowered-team', 'feature-team', 'okr'],
    },
    {
      id: 'empowered-team',
      domain: 'pm',
      term: 'Empowered team',
      moduleId: 'pm-l10',
      tier: 1,
      oneLiner: 'A team given a problem or outcome to solve, with real latitude to decide how.',
      full:
        'An empowered team is given a problem or desired outcome — "reduce checkout abandonment" — and real latitude to determine what to build, informed by direct discovery work, rather than executing a fully pre-decided solution. This is the structural condition under which most of the discovery and prioritization vocabulary in this curriculum becomes directly usable.',
      devAnalogy: 'It\'s like being handed a problem statement and real architectural authority, instead of a fully specified implementation to execute exactly as written with no room to propose an alternative.',
      leverage: 'You can propose discovery-style questions — JTBD, riskiest assumptions, non-goals — with real effect on an empowered team, since the team has actual latitude to change direction based on what that vocabulary surfaces.',
      sayThis: 'Since we own this problem, not just a specific solution, can we validate the riskiest assumption before committing to this exact approach?',
      antiPattern: 'A team is nominally called "empowered" in its charter, but every actual decision still gets made upstream and handed down, so the empowerment exists only on paper.',
      related: ['feature-team', 'outcome-over-output', 'product-trio'],
    },
    {
      id: 'feature-team',
      domain: 'pm',
      term: 'Feature team',
      moduleId: 'pm-l10',
      tier: 1,
      oneLiner: 'A team handed a specific list of things to build, without latitude to reshape it.',
      full:
        'A feature team is handed a roadmap of specific things to build, generally without framing around what outcome each item is meant to produce or practical latitude to propose a different solution. On a feature team, the highest-leverage moves are execution-and-craft-focused, since the solution has typically already been decided upstream.',
      devAnalogy: 'It\'s like being handed a fully specified implementation ticket with no room to question the underlying design, only how well you execute it.',
      leverage: 'On a feature team, catching feasibility risk early, proposing an appetite, and building an excellent empty state are the moves most likely to land, since discovery-stage input has limited room to change direction.',
      sayThis: 'Given this is already scoped as a specific solution, is there room to flag a feasibility concern before I start building it?',
      antiPattern: 'An engineer on a feature team keeps proposing discovery-stage questions the team has no actual structural power to act on, producing frustration on both sides instead of the intended influence.',
      related: ['empowered-team', 'outcome-over-output'],
    },
    {
      id: 'raci',
      domain: 'pm',
      term: 'RACI',
      moduleId: 'pm-l10',
      tier: 2,
      oneLiner: 'A framework assigning Responsible, Accountable, Consulted, and Informed roles to a decision.',
      full:
        'RACI assigns four roles to a decision or piece of work: Responsible (does the work), Accountable (owns the outcome, exactly one person), Consulted (input actively sought), and Informed (told the outcome afterward). It\'s comprehensive but somewhat heavyweight, best suited to larger, cross-functional, higher-stakes initiatives.',
      devAnalogy: 'It\'s like a formal ownership and review matrix for a large system change — precise, but real overhead to maintain, so reserved for decisions where role clarity genuinely matters at scale.',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'A RACI chart lists multiple people as Accountable for the same decision, recreating exactly the ambiguity the framework was supposed to eliminate.',
      related: ['daci', 'single-threaded-owner'],
    },
    {
      id: 'daci',
      domain: 'pm',
      term: 'DACI',
      moduleId: 'pm-l10',
      tier: 2,
      oneLiner: 'A lighter decision framework: Driver, Approver, Contributor, Informed.',
      full:
        'DACI is a lighter-weight, product-world-native decision framework: the Driver actively moves the decision process forward, the Approver holds final sign-off, Contributors provide input, and Informed parties learn the outcome afterward. The explicit Driver role addresses a common, specific reason decisions stall even when people agree on the eventual answer.',
      devAnalogy: 'It\'s like assigning an explicit owner to drive a design discussion to a real conclusion, instead of letting a thread of comments drift indefinitely with no one responsible for closing it.',
      leverage: 'You can ask who the Driver or Approver is on a stalled decision, which often reveals the real, structural, fixable reason it\'s stuck rather than a genuine substantive disagreement.',
      sayThis: 'Who\'s the Approver on this, or is there no one actually driving it to a decision?',
      antiPattern: 'A decision drifts for weeks in a shared doc\'s comment thread because no one has been explicitly assigned to drive it toward an actual resolution.',
      related: ['raci', 'single-threaded-owner'],
    },
    {
      id: 'single-threaded-owner',
      domain: 'pm',
      term: 'Single-threaded owner',
      aliases: ['STO'],
      moduleId: 'pm-l10',
      tier: 3,
      oneLiner: 'One person with clear, singular ownership and accountability for an initiative.',
      full:
        'A single-threaded owner has clear, singular ownership and accountability for a specific initiative end to end, deliberately avoiding the diffusion of responsibility that happens when ownership is nominally shared across a committee or multiple people with overlapping authority.',
      devAnalogy: 'It\'s like a single, clearly named on-call owner for a system, instead of a rotating or shared responsibility that no one individually feels fully accountable for.',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'An initiative is nominally owned by three people together, and when it stalls, each assumes one of the others is driving it forward.',
      related: ['raci', 'daci'],
    },
    {
      id: 'backlog-refinement',
      domain: 'pm',
      term: 'Backlog refinement',
      aliases: ['grooming'],
      moduleId: 'pm-l10',
      tier: 2,
      oneLiner: 'The recurring process of reviewing, clarifying, and estimating stories before sprint planning.',
      full:
        'Backlog refinement is the recurring process of reviewing, clarifying, and estimating backlog items before they\'re pulled into active planning, and it\'s the primary place a definition-of-ready discipline actually gets enforced — or quietly skipped under time pressure, pushing ambiguity into implementation instead.',
      devAnalogy: 'It\'s like a code review pass done before a change is even queued for merge, catching ambiguity while it\'s still cheap to fix rather than during implementation.',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'Refinement sessions get skipped under deadline pressure, and vague, under-specified stories get pulled straight into sprint planning, pushing the cost of clarifying them onto whoever implements them.',
      related: ['sprint-planning', 'definition-of-ready'],
    },
    {
      id: 'sprint-planning',
      domain: 'pm',
      term: 'Sprint planning',
      moduleId: 'pm-l10',
      tier: 2,
      oneLiner: 'The meeting where a team commits to specific work for the upcoming cycle.',
      full:
        'Sprint planning is where a team commits to specific work for the upcoming cycle, and its quality depends almost entirely on how much clarity backlog refinement already produced beforehand — a team walking in with unrefined stories either commits to poorly-understood work or burns the meeting re-litigating scope that should have already been resolved.',
      devAnalogy: 'It\'s like finalizing a release scope right before cutting the branch — it only goes smoothly if the groundwork was actually done in advance.',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'Sprint planning turns into an impromptu refinement session because the backlog wasn\'t actually refined beforehand, burning the meeting on scope clarification instead of commitment.',
      related: ['backlog-refinement', 'scrum'],
    },
    {
      id: 'retrospective',
      domain: 'pm',
      term: 'Retrospective',
      moduleId: 'pm-l10',
      tier: 2,
      oneLiner: 'A meeting closing the loop on a completed cycle, valuable only with real psychological safety.',
      full:
        'A retrospective closes the loop on a completed cycle, and its value depends heavily on psychological safety — a retro where people are genuinely comfortable naming what actually went wrong, including their own role in it, surfaces real improvements, while one where only safe, external factors get named produces polite theater that changes nothing.',
      devAnalogy: 'It\'s like an honest incident postmortem versus a sanitized status update — the value is entirely in how candid participants feel safe being.',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'A retrospective repeatedly surfaces the same safe, external complaints every cycle because no one feels safe naming the specific, more uncomfortable root cause underneath them.',
      related: ['blameless-postmortem', 'pre-mortem'],
    },
    {
      id: 'pre-mortem',
      domain: 'pm',
      term: 'Pre-mortem',
      moduleId: 'pm-l10',
      tier: 1,
      oneLiner: 'Imagining a project has already failed, then working backward to find what caused it.',
      full:
        'A pre-mortem has a team explicitly imagine, before a risky project ships, that it has already failed, then work backward from that assumed failure to identify specific causes. This deliberate inversion surfaces risks a standard, forward-looking planning conversation systematically misses, since imagining failure directly unlocks more candid thinking than imagining success.',
      devAnalogy: 'It\'s like deliberately red-teaming your own design before shipping it, imagining the outage postmortem in advance instead of only writing one after it actually happens.',
      leverage: 'You can propose running a pre-mortem on any risky release, which is a concrete, easy-to-agree-to practice that surfaces real risks a normal planning conversation tends to miss.',
      sayThis: 'Before we ship this, can we spend fifteen minutes imagining it\'s already failed and working backward from there?',
      antiPattern: 'A risky release skips any structured pre-mortem, and a risk that several people privately suspected but never voiced turns out to be exactly what caused the eventual incident.',
      related: ['blameless-postmortem', 'decision-log'],
    },
    {
      id: 'blameless-postmortem',
      domain: 'pm',
      term: 'Blameless postmortem',
      moduleId: 'pm-l10',
      tier: 2,
      oneLiner: 'Analyzing what happened after an incident without assigning individual blame.',
      full:
        'A blameless postmortem analyzes what happened after an incident, failed launch, or missed deadline, deliberately separating the analysis of the system-level cause from any assignment of individual blame — blame-focused postmortems reliably teach people to hide mistakes rather than openly investigate the actual underlying cause.',
      devAnalogy: 'It\'s the standard practice from incident response applied to product and process failures — focus on what allowed the failure, not who to blame for it.',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'A postmortem focuses on identifying who made the mistake rather than what in the process allowed it to happen, teaching the team to hide future mistakes instead of surfacing them.',
      related: ['pre-mortem', 'retrospective'],
    },
    {
      id: 'decision-log',
      domain: 'pm',
      term: 'Decision log',
      moduleId: 'pm-l10',
      tier: 2,
      oneLiner: 'A record of significant decisions with their reasoning and context at the time.',
      full:
        'A decision log records significant decisions along with their stated reasoning and context at the time, genuinely valuable months later when someone reasonably asks "why did we build it this way." Without one, that history lives only in memory and degrades as people rotate off the team or simply forget the specifics.',
      devAnalogy: 'It\'s like an architecture decision record for product and process choices, not just technical ones — a durable trail future readers can actually check.',
      leverage: 'You can propose keeping a lightweight decision log for a project you\'re on, which is a small, cheap habit that saves significant reconstruction time months later.',
      sayThis: 'Can we jot this decision and the reasoning down somewhere, so we\'re not reconstructing it from memory in six months?',
      antiPattern: 'A team spends real time months later trying to reconstruct why a decision was made, because the reasoning only ever lived in a Slack thread that\'s since scrolled out of view.',
      related: ['pre-mortem', 'escalation-path'],
    },
    {
      id: 'escalation-path',
      domain: 'pm',
      term: 'Escalation path',
      moduleId: 'pm-l10',
      tier: 2,
      oneLiner: 'The defined route for raising a concern or blocker that isn\'t getting resolved.',
      full:
        'An escalation path is the defined, known route for raising a concern or blocker that isn\'t getting resolved at the level it\'s currently stuck at. A team without a clear one either suffers silently as blockers fester, or escalates chaotically in ways that damage trust rather than feeling like a normal, expected process.',
      devAnalogy: 'It\'s like a documented on-call escalation chain — knowing exactly who to page next when the first responder can\'t resolve something, rather than guessing under pressure.',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'A blocker sits unresolved for weeks because no one knows the actual escalation path, and by the time it finally gets raised loudly, it reads as a surprising crisis rather than a normal process step.',
      related: ['decision-log', 'single-threaded-owner'],
    },
    {
      id: 'disagree-and-commit',
      domain: 'pm',
      term: 'Disagree and commit',
      moduleId: 'pm-l10',
      tier: 1,
      oneLiner: 'Voicing real disagreement during a decision, then fully committing once it\'s made.',
      full:
        'Disagree and commit describes voicing genuine disagreement clearly during a decision, then, once the decision is actually made, committing to executing it fully and in good faith — not quietly withholding effort or relitigating the settled decision afterward. It requires both real candor beforehand and real commitment afterward.',
      devAnalogy: 'It\'s like raising a strong objection in code review, and then, once the team decides to proceed anyway, implementing the agreed approach fully rather than half-heartedly undermining it.',
      leverage: 'You can voice a genuine technical disagreement clearly and specifically during a decision, and then commit fully once it\'s made — which builds far more long-term credibility than either staying silent or quietly resisting afterward.',
      sayThis: 'I disagree with this approach for these specific reasons, but once we decide, I\'ll commit to making it work.',
      antiPattern: 'Someone stays quiet during a decision, then subtly under-invests in its execution afterward, effectively engineering the outcome they privately preferred without ever voicing the disagreement openly.',
      related: ['tiger-team', 'stakeholder-management'],
    },
    {
      id: 'tiger-team',
      domain: 'pm',
      term: 'Tiger team',
      moduleId: 'pm-l10',
      tier: 3,
      oneLiner: 'A small, temporary, cross-functional group assembled to solve one urgent problem.',
      full:
        'A tiger team is a small, temporary, often cross-functional group assembled specifically to address a single urgent or high-stakes problem, operating with more autonomy than a team\'s normal structure grants, dissolving once the problem is resolved. Being asked onto one is often a genuine signal of organizational trust.',
      devAnalogy: 'It\'s like an incident response team pulled together for a major outage — temporary, focused, and empowered to move fast, then dissolved once the fire is out.',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'A tiger team is assembled for a genuine crisis but given no real additional autonomy, so it moves at the same slow pace as normal process despite the urgency that justified forming it.',
      related: ['disagree-and-commit', 'two-pizza-team'],
    },
    {
      id: 'stakeholder-management',
      domain: 'pm',
      term: 'Stakeholder management',
      moduleId: 'pm-l10',
      tier: 2,
      oneLiner: 'Proactively communicating with people who have interest or influence over your work.',
      full:
        'Stakeholder management is the ongoing practice of understanding who has genuine interest in or influence over your work, and proactively communicating with each of them in a way calibrated to what they specifically need, rather than communicating identically with everyone or only reactively once someone is already upset.',
      devAnalogy: 'It\'s like tailoring incident updates differently for an on-call channel versus an executive summary — same underlying facts, calibrated to what each audience actually needs.',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'A stakeholder learns about a significant change affecting them only after it\'s already shipped, because no one proactively identified them as someone who needed earlier communication.',
      related: ['socializing-a-doc', 'disagree-and-commit'],
    },
    {
      id: 'socializing-a-doc',
      domain: 'pm',
      term: 'Socializing a doc',
      moduleId: 'pm-l10',
      tier: 1,
      oneLiner: 'Sharing a draft informally before a formal review, while it\'s still easy to change.',
      full:
        'Socializing a doc means sharing a draft proposal informally, one-on-one or in small groups, before a larger, more formal review, surfacing objections and gathering input while the document is still genuinely easy to change — rather than in a large meeting where people are more likely to defend a stated first reaction publicly.',
      devAnalogy: 'It\'s like getting informal feedback from a couple of trusted reviewers before opening a pull request to the whole team, catching issues while they\'re still cheap to address privately.',
      leverage: 'You can socialize a technical proposal with a few key people individually before a big review, which surfaces real objections early enough to actually incorporate them.',
      sayThis: 'Before this goes to the full review, could I get your take on it one-on-one first?',
      antiPattern: 'A proposal is unveiled cold in a large review meeting, and objections that could have been resolved privately instead turn into a public disagreement that\'s much harder to walk back.',
      related: ['stakeholder-management'],
    },
    {
      id: 'two-pizza-team',
      domain: 'pm',
      term: 'Two-pizza team',
      moduleId: 'pm-l10',
      tier: 3,
      oneLiner: 'A team small enough to be fed by two pizzas — Amazon\'s rough team-size heuristic.',
      full:
        'A two-pizza team is Amazon\'s famous rough sizing heuristic for team scale, generally around five to eight people — small enough that one person\'s consistent, well-placed contributions are genuinely noticeable, rather than getting lost in a much larger group\'s collective noise.',
      devAnalogy: 'It\'s like keeping a service\'s ownership team small enough that everyone genuinely understands the whole system, instead of diffusing ownership across a group too large for any one person to track fully.',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'A team grows well past a size where individual contributions are visible, and consistently good input starts getting lost in the noise of a group too large to track who\'s actually driving quality.',
      related: ['tiger-team', 'single-threaded-owner'],
    },
  ],
  quiz: [
    {
      kind: 'mcq',
      id: 'pm-l10-q1',
      prompt: 'Why is outcome over output described as almost universally violated in practice, despite sounding obvious?',
      options: [
        'Because outcomes are illegal to measure in most companies',
        'Because output is trivially easy to measure, while outcome requires the harder discipline of honestly checking whether shipped work actually worked',
        'Because output and outcome always move together automatically',
        'Because outcomes only matter for empowered teams, not feature teams',
      ],
      answer: 1,
      explain: 'Output metrics like shipped tickets are easy and comfortable to count; outcome requires a much harder, more uncomfortable honesty about whether the work actually produced the intended result.',
    },
    {
      kind: 'mcq',
      id: 'pm-l10-q2',
      prompt: 'On a feature team, why do discovery-stage moves like proposing a riskiest assumption test tend to land poorly?',
      options: [
        'Because feature teams never build anything risky',
        'Because the solution has typically already been decided upstream, so the team lacks the structural latitude to change direction based on discovery findings',
        'Because riskiest assumption tests only apply to empowered teams by definition',
        'Because feature teams don\'t have engineers',
      ],
      answer: 1,
      explain: 'A feature team\'s solution is usually already decided before engineering is looped in, so discovery-stage questions have limited room to actually change the outcome, unlike on an empowered team.',
    },
    {
      kind: 'scenario',
      id: 'pm-l10-q3',
      prompt: 'A decision has been debated for weeks with no resolution, and everyone seems to have an opinion. What\'s the most useful diagnostic question?',
      options: [
        'Whether the decision needs a bigger meeting',
        'Who is actually the Approver or Accountable party for this specific decision',
        'Whether the team should switch from Scrum to Kanban',
        'Whether a retrospective should be scheduled',
      ],
      answer: 1,
      explain: 'A huge fraction of stuck decisions trace back to unclear ownership rather than genuine substantive disagreement — asking who\'s actually Accountable or Approver often surfaces that structural gap directly.',
    },
    {
      kind: 'mcq',
      id: 'pm-l10-q4',
      prompt: 'Why does a pre-mortem surface risks that normal, forward-looking planning conversations tend to miss?',
      options: [
        'Because it requires more meetings than usual',
        'Imagining failure directly and vividly unlocks more candid thinking than imagining success and treating negative outcomes as unlikely tail cases',
        'Because pre-mortems are only useful for engineering-only decisions',
        'Because pre-mortems replace the need for a retrospective afterward',
      ],
      answer: 1,
      explain: 'A pre-mortem deliberately inverts the usual optimistic planning frame, and that inversion tends to surface doubts participants might otherwise stay quiet about in a conversation focused on what could go right.',
    },
    {
      kind: 'mcq',
      id: 'pm-l10-q5',
      prompt: 'What is the core reasoning behind running a blameless postmortem instead of one focused on assigning blame?',
      options: [
        'Blame-focused postmortems are faster to run',
        'Blame-focused postmortems reliably teach people to hide mistakes, while separating analysis of the system cause from blame encourages open, honest investigation',
        'Blameless postmortems are only appropriate for minor incidents',
        'Blame is always assigned correctly in blame-focused postmortems anyway',
      ],
      answer: 1,
      explain: 'Blame-focused postmortems create an incentive to hide or minimize mistakes; separating system-level analysis from individual blame is what actually surfaces the real underlying cause.',
    },
    {
      kind: 'scenario',
      id: 'pm-l10-q6',
      prompt: 'Someone stayed silent during a decision they disagreed with, then quietly under-invested in its execution afterward. What principle did this violate?',
      options: [
        'RACI',
        'Disagree and commit — real disagreement should be voiced clearly beforehand, and full commitment given once the decision is actually made',
        'The pre-mortem process',
        'Backlog refinement',
      ],
      answer: 1,
      explain: 'Disagree and commit requires voicing genuine disagreement during the decision and then committing fully once it\'s made — silently under-investing afterward violates the "commit" half of the principle.',
    },
    {
      kind: 'mcq',
      id: 'pm-l10-q7',
      prompt: 'Why is socializing a doc before a large formal review often more productive than unveiling it cold?',
      options: [
        'It avoids the need for a formal review entirely',
        'It surfaces objections and gathers input while the document is still genuinely easy to change, rather than in a setting where people defend stated first reactions publicly',
        'It only matters for documents written by junior team members',
        'It replaces the need for stakeholder management'
      ],
      answer: 1,
      explain: 'Informal, small-group feedback happens while a document is still easy to revise, whereas objections raised publicly in a large review are more likely to become entrenched positions people feel they need to defend.',
    },
    {
      kind: 'mcq',
      id: 'pm-l10-q8',
      prompt: 'What does a decision log actually protect a team from?',
      options: [
        'Slow sprint planning meetings',
        'Losing the reasoning behind a past decision to memory decay as people rotate off the team, forcing costly reconstruction later',
        'Sample ratio mismatches in experiments',
        'Missing a launch tier classification',
      ],
      answer: 1,
      explain: 'Without a decision log, the reasoning behind past decisions lives only in memory and degrades over time — a decision log preserves that context so it doesn\'t have to be expensively reconstructed later.',
    },
    {
      kind: 'match',
      id: 'pm-l10-q9',
      prompt: 'Match each term to its correct description.',
      pairs: [
        ['RACI', 'Responsible, Accountable, Consulted, Informed — a heavier framework for larger decisions'],
        ['DACI', 'Driver, Approver, Contributor, Informed — a lighter, product-native variant'],
        ['Single-threaded owner', 'One person with clear, singular ownership of an initiative'],
        ['Tiger team', 'A small, temporary group assembled to solve one urgent problem'],
      ],
      explain: 'These frameworks all address the same underlying problem — ambiguous ownership — but at different weights and for different situations, from routine decisions to urgent, time-boxed crises.',
    },
    {
      kind: 'scenario',
      id: 'pm-l10-q10',
      prompt: 'An engineer wants to earn a real seat in the product trio but isn\'t sure how. Based on this module, what\'s the actual mechanism?',
      options: [
        'Formally request a title change from their manager',
        'The accumulated, compounding effect of consistently offering well-placed, credible input that a PM notices repeatedly makes the resulting work better',
        'Wait to be assigned to a tiger team',
        'Refuse to work on any ticket without full discovery latitude first',
      ],
      answer: 1,
      explain: 'Earning a real seat in the trio isn\'t usually a single formal decision — it\'s the compounding effect of consistently offering good, credible input that a PM or team notices improves outcomes over time.',
    },
  ],
  exercise: {
    id: 'pm-l10-exercise',
    title: 'Write three questions that move your next spec review from output to outcome',
    prompt: `Think about the next spec, PRD, or ticket you're scheduled to review — a real one on your plate, not a hypothetical.

Write **three specific questions** you could ask during that review that would push the conversation from "what are we building" toward "what outcome is this meant to produce, and how will we know." Each question should be concrete enough to actually ask out loud in the meeting, not a vague principle.

For each question, note which specific term or framework from this course it draws on (JTBD, non-goals, riskiest assumption, success metric, outcome over output, or others), and briefly explain why you chose that particular angle for this particular spec.`,
    scaffold: `Spec/ticket being reviewed: __________________________________

Question 1: __________________________________________________
Framework it draws on: _______________________________________
Why this angle for this spec: ________________________________

Question 2: __________________________________________________
Framework it draws on: _______________________________________
Why this angle for this spec: ________________________________

Question 3: __________________________________________________
Framework it draws on: _______________________________________
Why this angle for this spec: ________________________________
`,
    rubric: [
      'Each question is specific and concrete enough to actually say out loud in a real meeting, not an abstract principle',
      'At least one question directly targets outcome versus output, not just scope or feasibility',
      'Each question is explicitly tied to a specific term or framework from the course, not a generic best practice',
      'The reasoning for each question is grounded in the actual spec, not generic boilerplate that could apply to any spec',
    ],
  },
};
