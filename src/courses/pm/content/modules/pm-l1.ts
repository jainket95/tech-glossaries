import type { Module } from '../../types';

export const module: Module = {
  id: 'pm-l1',
  domain: 'pm',
  order: 1,
  title: 'Strategy: what the product is for',
  subtitle: 'Vision, mission, positioning, JTBD, and the vocabulary of "why we build this."',
  why:
    'Your UI is the surface of a strategy, even when nobody says so out loud. Knowing the vocabulary of strategy means fewer "why are we building this" moments, and it means you can spot when a ticket contradicts the stated direction before you write a line of code.',
  estMinutes: 55,
  lessons: [
    {
      id: 'pm-l1-lesson-1',
      title: 'Vision, mission, and strategy: the chain of command for decisions',
      body: `Every product decision, from a button's copy to a two-quarter roadmap, is supposed to trace back to something bigger than the ticket. Most teams use these three words interchangeably — that's exactly why standups go sideways.

\`\`\`mermaid
flowchart LR
  A[Vision\\n~10yr, unmeasurable] --> B[Mission\\nongoing charter]
  B --> C[Strategy\\nthis period's bet]
\`\`\`

| | Vision | Mission | Strategy |
|---|---|---|---|
| Horizon | ~10 years | Ongoing, indefinite | This period only |
| Changes | Almost never | Rarely | Every planning cycle |
| Dev analog | "Why this system exists at all" | A service's charter | This quarter's architecture bet, including what you rejected |

A strategy that doesn't name a trade-off isn't a strategy — it's a wish list.

- A strategic bet is the specific, falsifiable wager inside the strategy. "Self-serve onboarding will out-convert sales-assisted for our segment" is a bet; "we want to grow" is not.
- North-star alignment checks that an initiative actually moves the company's single best proxy metric for durable value — not just any metric that happens to go up.

> **Say this:** "Which part of the strategy does this serve?" One of the most respected questions a frontend engineer can ask — it's the question PMs are supposed to ask themselves and often haven't, under deadline pressure.

A huge share of "why are we building this" friction is a strategy gap wearing a spec problem's clothes. If a roadmap slide shows a vision at the top and a pile of Jira epics at the bottom with nothing connecting them, that's a wish list — and it will reprioritize unpredictably in six weeks. Naming that pattern calmly, instead of accepting the wish list or dismissing the whole exercise as "product theater," is a rare and valuable skill on an engineering team.`,
      keyTerms: ['vision', 'mission', 'strategy', 'strategic-bet', 'north-star-alignment'],
    },
    {
      id: 'pm-l1-lesson-2',
      title: 'Positioning and your ICP: who this is for, and who it is deliberately not for',
      body: `**Positioning** answers "for whom, and instead of what." It's the most underrated document in product — it should govern every UI trade-off: what's above the fold, what gets a settings page versus a hidden flag, what an error message assumes the reader already knows.

| Term | What it is | Bad version |
|---|---|---|
| Positioning | The stated answer to "for whom, instead of what" | Undefined — every design review becomes a taste argument |
| ICP | The specific account/user the product is built for right now | "Everyone" |
| Persona | A research-grounded archetype keeping the team aligned | Invented in one workshop, laminated, never revisited |
| Value proposition | The provable outcome claim, in the customer's terms | A feature list restated as a benefit |

A feature is "real-time collaborative editing." A value proposition is "your team stops losing an hour a day to version-conflict threads." You're frequently the last line of defense on whether it survives contact with the product — a speed claim dies quietly if checkout takes four seconds to render.

> **Say this:** "Who is the ICP for this, and would this same design serve someone outside it well?" Surfaces scope creep, and turns "this feels like too many options" into "this toggle only matters to 3% of our ICP" — a much stronger argument.

Positioning also explains why two competitors building the same category look opposite: positioned against "manual spreadsheets," a product optimizes for a five-minute aha moment; positioned against "the incumbent enterprise suite," it optimizes for admin controls and audit trails. Knowing which one you're positioned against tells you, before a single design review, roughly what "good" looks like for the next feature you touch.`,
      keyTerms: ['positioning', 'icp', 'persona', 'value-proposition'],
    },
    {
      id: 'pm-l1-lesson-3',
      title: 'Jobs to be done: a requirements tool disguised as a research method',
      body: `People don't want your product — they want to make progress on something in their life, and they "hire" your product the way they'd hire a contractor or a competitor's tool. That's what JTBD, Jobs to Be Done, actually names.

> **The canonical shape:** "When [situation], I want to [motivation], so I can [expected outcome]." No feature, no UI, no company name. A job statement should survive being read by a stranger who's never heard of your product.

| | Feature request | Job statement (JTBD) |
|---|---|---|
| Example | "Users want a faster export" | "When I'm about to walk into a board meeting, I want last night's numbers paste-ready, so I can look prepared without a morning of reformatting" |
| Constrains | Almost nothing | Format must survive pasting; "fast" means "before the meeting," not "under 200ms" |

The biggest competitor to most products isn't a rival — it's non-consumption: the customer doing nothing (a spreadsheet, a coworker, ignoring the problem). Understanding why a non-consumer loses to "nothing" is often more useful than competitive analysis against products that already won the business.

Build vs. buy lives downstream of the same thinking: a well-understood job tells you whether an off-the-shelf tool covers it, or whether it's specific enough to your users that only custom software fits.

> **Say this:** "What job is this hired for?" A ticket that says "add a dashboard" could mean a triage job (density, recency) or a credibility job (precision, citations) — two nearly opposite dashboards. Asking this before opening a design tool saves entire iteration cycles, and it's a question PMs respect because it's their own tool used correctly.`,
      keyTerms: ['jtbd', 'non-consumption', 'build-vs-buy'],
    },
    {
      id: 'pm-l1-lesson-4',
      title: 'Moats and wedges: how companies defend ground and take new ground',
      body: `\`\`\`mermaid
flowchart LR
  A[Wedge\\nnarrow, easy first yes] --> B[Prove value]
  B --> C[Land-and-expand\\nmore seats, more scope]
  C --> D[Moat\\ndurably hard to displace]
\`\`\`

| | Moat | Wedge |
|---|---|---|
| What it is | Structural durability — data that compounds, integrations, switching costs | A narrow, cheap-to-evaluate entry point |
| Not this | "We're better today" — erodes the moment a competitor ships a comparable feature | A broad platform pitch requiring a committee |
| Built to | Last, and deepen | Be replaced once it proves out |

You build more moat than you get credit for. Any state that only makes sense against a user's accumulated history — saved views, custom dashboards, configured integrations — is moat, and it lives disproportionately in the UI. Deciding whether "reset to defaults" nukes a saved layout or just a theme is a moat decision, whether or not anyone frames it that way.

Land-and-expand is the motion that follows a successful wedge: land with one use case, prove value, then expand seats and scope within the same account. That's why a tool that started as "just" a shared doc or "just" a Slack bot ends up with a whole admin console years later.

> **Say this:** "Is this meant to stay this narrow, or is it a wedge for something bigger?" A feature that looks under-scoped and a deliberate wedge look identical from the ticket — but demand completely different engineering postures. Over-engineering a wedge for extensibility it doesn't need yet is a real cost, not diligence.

TAM/SAM/SOM is the sanity check on ambition underneath both: Total, Serviceable, and Obtainable market, narrowing from "everyone who could theoretically want this" to "who we could realistically win." A wedge strategy targets a slice of SOM smaller than the whole TAM — a feature of the plan, not a failure of ambition.`,
      keyTerms: ['moat', 'wedge', 'land-and-expand', 'tam-sam-som'],
    },
    {
      id: 'pm-l1-lesson-5',
      title: 'Product-market fit: the sanity check underneath every roadmap argument',
      body: `Product-market fit is a threshold, not a metric you compute directly — which is exactly why teams argue about whether they have it. Marc Andreessen's description is still the clearest: before PMF, the market doesn't pull the product out of you. After PMF, it does.

> **Key proxy:** the Sean Ellis test surveys active users with "how would you feel if you could no longer use this product?" Once roughly 40% answer "very disappointed," a product has a real shot at durable growth. The exact number matters less than the discipline — asking real users in a structured, repeatable way, not inferring fit from internal vibes.

| | Pre-PMF | Post-PMF |
|---|---|---|
| Priority | Speed of learning | Reliability, performance |
| Debt | Tolerable — the risk is building the wrong thing slowly | Now costly — real load, real trust at stake |
| Growth signal | Pushed, via marketing | Pulled — capacity becomes the bottleneck |

A lot of "why don't we just fix this properly" friction between engineers and PMs is really a disagreement about which side of PMF the team believes it's on, unstated.

This closes the module's loop: vision sets direction, mission sets the charter, strategy sets this period's bet, positioning and ICP define who it's aimed at, JTBD defines the job it needs to win, moats and wedges describe how it's defended and expanded — and PMF is the checkpoint telling you whether the bet is landing. When any link is missing, you'll feel it as friction in a ticket long before anyone names the actual gap. Being able to name it is most of this module's value.`,
      keyTerms: ['product-market-fit', 'sean-ellis-test', 'strategy', 'jtbd'],
    },
  ],
  terms: [
    {
      id: 'vision',
      domain: 'pm',
      term: 'Vision',
      moduleId: 'pm-l1',
      tier: 1,
      oneLiner: 'The unmeasurable, long-horizon end state the company is betting the world will reach.',
      full:
        'Vision is the aspirational, decade-scale description of the world a company is trying to help create if its bets pay off. It is deliberately unmeasurable and rarely revisited quarter to quarter, functioning as a compass heading rather than a plan, and it should stay stable even as strategy underneath it changes repeatedly.',
      devAnalogy: 'The vision is the "why this system exists at all" line in an architecture doc — foundational, rarely rewritten, and not something you re-justify every sprint.',
      leverage: 'You can use the vision as a tiebreaker when two reasonable technical approaches both satisfy the current ticket but pull the product in different long-term directions.',
      sayThis: 'Does this direction still serve the vision, or are we optimizing for a metric that drifted away from it?',
      antiPattern: 'Teams write an inspiring vision once, put it on a slide, and then let quarterly OKRs get set with zero connection back to it, so the vision becomes decoration instead of a decision filter.',
      related: ['mission', 'strategy', 'north-star-alignment'],
    },
    {
      id: 'mission',
      domain: 'pm',
      term: 'Mission',
      moduleId: 'pm-l1',
      tier: 1,
      oneLiner: 'The ongoing, present-tense job the company has assigned itself in service of the vision.',
      full:
        'Mission describes what the company does, continuously, right now, as its contribution toward the vision. Unlike vision, it is stated in active, present terms — "we help X do Y" — and it stays stable across many strategies and roadmaps, functioning like a charter that outlives any single plan.',
      devAnalogy: 'The mission is like a service\'s charter or ownership boundary — it says what this system is responsible for, in ongoing terms, independent of what sprint is currently running.',
      leverage: 'When scope creep threatens a feature, you can check whether the added scope still sits inside the mission\'s boundary or quietly expands the team\'s job description without anyone deciding that on purpose.',
      sayThis: 'Is this still inside our mission, or are we picking up a job that belongs to a different team?',
      antiPattern: 'A team\'s actual day-to-day work drifts far from its stated mission because no one revisits the mission when new stakeholders start requesting adjacent work, and eventually the mission statement describes a team that no longer exists.',
      related: ['vision', 'strategy'],
    },
    {
      id: 'strategy',
      domain: 'pm',
      term: 'Strategy',
      moduleId: 'pm-l1',
      tier: 1,
      oneLiner: 'The current, time-boxed bet about how to make progress on the mission given today\'s constraints.',
      full:
        'Strategy is the specific, falsifiable approach a team commits to for a defined period, chosen from among several plausible alternatives given current resources, market conditions, and competitive position. A real strategy names what it is choosing not to do, because a plan with no rejected alternative is a wish list, not a strategy.',
      devAnalogy: 'Strategy is the technical approach you picked for this quarter\'s architecture, including the alternative you explicitly rejected and why — not the eternal system design, just this period\'s bet.',
      leverage: 'You can ask, for any sizable ticket, "which part of the current strategy does this serve" — if nobody can answer in under thirty seconds, the ticket likely came from the backlog rather than the plan.',
      sayThis: 'What alternative did we reject when we chose this strategy, and has anything changed that should make us revisit it?',
      antiPattern: 'A roadmap slide lists a vision at the top and a pile of Jira epics at the bottom with no strategy connecting them, so the roadmap reprioritizes unpredictably every time a loud stakeholder shows up.',
      related: ['strategic-bet', 'vision', 'mission'],
    },
    {
      id: 'positioning',
      domain: 'pm',
      term: 'Positioning',
      moduleId: 'pm-l1',
      tier: 2,
      oneLiner: 'The stated answer to "for whom, and instead of what," that should govern UI trade-offs.',
      full:
        'Positioning defines who a product is for and what alternative it is meant to replace in the customer\'s mind, and it is one of the most concrete, testable artifacts in product strategy. Good positioning changes what belongs above the fold, how dense a screen can be, and what an interface is allowed to assume the user already knows.',
      devAnalogy: 'Positioning is like choosing your target runtime and audience for a library — an API designed for framework authors looks nothing like one designed for app developers, even if it does the same underlying thing.',
      leverage: 'When a design review turns into an argument about tone, density, or jargon, you can ask whether the disagreement is actually about positioning rather than visual taste.',
      sayThis: 'Who is this positioned against, and does this design still make sense for that comparison?',
      antiPattern: 'A product tries to be positioned for both technical power users and total beginners in the same primary flow, producing an interface that satisfies neither and confuses both.',
      related: ['icp', 'value-proposition', 'persona'],
    },
    {
      id: 'icp',
      domain: 'pm',
      term: 'ICP',
      aliases: ['Ideal Customer Profile'],
      moduleId: 'pm-l1',
      tier: 1,
      oneLiner: 'The specific kind of account or user the product is built for right now.',
      full:
        'ICP, Ideal Customer Profile, describes the concrete characteristics of the customer a product is currently optimized to serve — company size, role, use case, technical sophistication — specific enough that a team could recognize a matching account in a support queue or sales pipeline. Features and complexity decisions should be evaluated against whether they serve the ICP well, not against a generic "some users want this."',
      devAnalogy: 'The ICP is like a target platform matrix for a library — you support certain runtimes and configurations deliberately and well, rather than trying to work acceptably everywhere at once.',
      leverage: 'You can push back on a low-value toggle or edge case by naming what fraction of the ICP it actually serves, which is a much stronger argument than "this feels like too many options."',
      sayThis: 'Who is the ICP for this feature, and would this same design still make sense for someone outside it?',
      antiPattern: 'A team builds every requested option to avoid saying no to anyone, and the product slowly stops serving its actual ICP well because it is busy serving everyone adequately.',
      related: ['persona', 'positioning', 'value-proposition'],
    },
    {
      id: 'persona',
      domain: 'pm',
      term: 'Persona',
      moduleId: 'pm-l1',
      tier: 2,
      oneLiner: 'A research-grounded archetype used to keep a team\'s "who we build for" model consistent.',
      full:
        'A persona is a semi-fictional composite of a real user segment, built from actual research rather than invented in a workshop, used to keep a cross-functional team aligned on who a decision is meant to serve. Good personas compress interview and usage data into a shared reference; bad ones are guesses laminated into a poster and never revisited.',
      devAnalogy: 'A persona is like a canonical test fixture representing a real class of user data — useful exactly to the extent it reflects actual production patterns, and misleading the moment it drifts from reality.',
      leverage: 'You can ask whether a proposed persona is grounded in interview or usage data, or is a guess — and treat guessed personas with proportionally less design authority.',
      sayThis: 'Is this persona built from real interviews or usage data, or is it something we assumed?',
      antiPattern: 'A team invents a persona in a single workshop, gives it a name and a stock photo, and then treats its assumed preferences as settled fact for years without ever validating them against real users.',
      related: ['icp', 'positioning'],
    },
    {
      id: 'jtbd',
      domain: 'pm',
      term: 'JTBD',
      aliases: ['Jobs to Be Done'],
      moduleId: 'pm-l1',
      tier: 1,
      oneLiner: 'The framework that a product is "hired" to make progress on someone\'s job.',
      full:
        'Jobs to Be Done reframes a feature request as a job statement — "when [situation], I want to [motivation], so I can [outcome]" — stated without reference to the product itself. This framing constrains a solution far more usefully than a feature name does, because it captures the situation and desired outcome that any real solution has to satisfy.',
      devAnalogy: 'A job statement is like a well-written user story\'s acceptance criteria written from first principles — it specifies the behavior a solution must satisfy without presupposing the implementation.',
      leverage: 'For any ambiguous ticket, you can ask what job it is hired to do, in situation-motivation-outcome form, before opening a design tool — it often reveals the ticket is solving the wrong job entirely.',
      sayThis: 'What job is this hired for — what\'s the situation and the outcome the user actually needs?',
      antiPattern: 'A ticket says "add a dashboard" with no job attached, so three different dashboards get half-built in parallel because triage, reporting, and troubleshooting are actually three different jobs.',
      related: ['non-consumption', 'build-vs-buy', 'value-proposition'],
    },
    {
      id: 'value-proposition',
      domain: 'pm',
      term: 'Value proposition',
      moduleId: 'pm-l1',
      tier: 1,
      oneLiner: 'The specific, provable claim about the outcome a customer gets, stated in their terms.',
      full:
        'A value proposition states the concrete outcome a customer receives, framed around their problem rather than a list of features. "Real-time collaborative editing" is a feature; "your team stops losing an hour a day to version-conflict threads" is a value proposition, because it names the cost removed rather than the mechanism that removes it.',
      devAnalogy: 'The value proposition is like the README\'s first paragraph for a library — it should state the problem solved, not enumerate every exported function.',
      leverage: 'You are often the last line of defense on whether a value proposition survives contact with the real product — a "we\'re fast" claim dies quietly if your checkout flow takes four seconds to paint.',
      sayThis: 'Does the current implementation still deliver the value proposition, or just the feature that was supposed to produce it?',
      antiPattern: 'Marketing ships a value proposition around speed or simplicity that the actual product experience quietly fails to deliver, and support absorbs the resulting complaints instead of the gap getting fixed.',
      related: ['jtbd', 'positioning', 'icp'],
    },
    {
      id: 'tam-sam-som',
      domain: 'pm',
      term: 'TAM/SAM/SOM',
      moduleId: 'pm-l1',
      tier: 2,
      oneLiner: 'Total, serviceable, and obtainable market size, narrowing from theoretical to realistic.',
      full:
        'TAM/SAM/SOM narrows market opportunity in three steps: Total Addressable Market is everyone who could theoretically want the product, Serviceable Addressable Market is the portion reachable given the current product and go-to-market, and Serviceable Obtainable Market is the realistic slice winnable given current resources and competition. A wedge strategy usually targets a deliberately small slice of SOM first.',
      devAnalogy: 'TAM/SAM/SOM is like narrowing "every possible user of the internet" down to "the subset our current infrastructure and support model can actually serve well" before sizing a launch.',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'A roadmap slide cites the full TAM to justify scope the current product and team can\'t realistically serve, inflating expectations that later look like broken promises.',
      related: ['moat', 'wedge', 'land-and-expand'],
    },
    {
      id: 'moat',
      domain: 'pm',
      term: 'Moat',
      moduleId: 'pm-l1',
      tier: 1,
      oneLiner: 'Whatever makes a product durably hard to displace once a customer has adopted it.',
      full:
        'A moat is a structural source of durability against competition — accumulated data, switching costs, integrations, or network effects — as opposed to a temporary feature advantage that a competitor can copy in a release cycle. A mediocre product with a real moat routinely beats a superior product without one.',
      devAnalogy: 'Moat is like accumulated production data and integration surface area that would take a competitor years to replicate, even if they cloned your entire codebase overnight.',
      leverage: 'Saved views, custom dashboards, and any per-user accumulated state you build are literal moat — decisions like "does reset-to-defaults wipe this" are moat decisions whether or not anyone frames them that way.',
      sayThis: 'Does this feature widen our moat, or is it just catching up to parity with competitors?',
      antiPattern: 'A team celebrates shipping a feature a competitor already has, mistaking parity for progress, while the actual moat-building work of deepening data and integration lock-in goes unfunded.',
      related: ['wedge', 'land-and-expand', 'tam-sam-som'],
    },
    {
      id: 'wedge',
      domain: 'pm',
      term: 'Wedge',
      moduleId: 'pm-l1',
      tier: 2,
      oneLiner: 'A deliberately narrow entry point used to earn a first, easy yes from a customer.',
      full:
        'A wedge is a narrow, specific product entry point — often a single killer use case — designed to be easy to evaluate and easy to say yes to, in contrast to a broad platform pitch that requires committee buy-in. The wedge is meant to be replaced or expanded on later, not to be the final shape of the product.',
      devAnalogy: 'A wedge feature is like a minimal single-purpose CLI tool that later grows into a platform — building it with heavy extensibility from day one is often wasted effort against the actual bet being tested.',
      leverage: 'You can ask whether a narrow-looking feature is under-scoped or a deliberate wedge, because the answer changes how much abstraction is worth building today versus waiting on.',
      sayThis: 'Is this meant to stay this narrow, or is it a wedge we\'ll expand once it proves out?',
      antiPattern: 'Engineers over-generalize a deliberate wedge feature "to be safe," spending weeks on extensibility the product strategy never asked for and may abandon if the wedge doesn\'t land.',
      related: ['moat', 'land-and-expand', 'tam-sam-som'],
    },
    {
      id: 'land-and-expand',
      domain: 'pm',
      term: 'Land-and-expand',
      moduleId: 'pm-l1',
      tier: 2,
      oneLiner: 'Winning a small foothold in an account, then growing seats and scope from there.',
      full:
        'Land-and-expand is the growth motion that follows a successful wedge: enter an account with a small team or single use case, prove value quickly, then expand seat count, feature footprint, or organizational reach within the same customer over time. It explains why many tools start narrow and accumulate broad platform surface years later.',
      devAnalogy: 'Land-and-expand is like a library that starts with a tiny focused API and later grows a full plugin ecosystem once the core proves itself with real adopters.',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'A team tries to sell the fully-expanded platform vision on day one instead of proving the narrow wedge first, and the harder, broader pitch stalls deals that a focused wedge would have closed.',
      related: ['wedge', 'moat'],
    },
    {
      id: 'product-market-fit',
      domain: 'pm',
      term: 'Product-market fit',
      aliases: ['PMF'],
      moduleId: 'pm-l1',
      tier: 1,
      oneLiner: 'The point where demand pulls harder than the team can currently supply.',
      full:
        'Product-market fit is the threshold at which a product satisfies real market demand well enough that growth becomes a capacity problem rather than a persuasion problem. Before PMF, the market has to be pushed toward the product; after PMF, it pulls — visible in usage growth without proportional marketing spend and customers who feel the pain of outages because they now depend on the product.',
      devAnalogy: 'PMF is like the moment a service goes from "nobody notices if it\'s down" to "an outage generates real incident traffic" — evidence of genuine dependency, not a metric you compute directly.',
      leverage: 'Whether the team believes it\'s pre- or post-PMF should change what "good engineering" means right now — speed of learning versus reliability and paying down debt — and you can ask which one the team believes it\'s optimizing for.',
      sayThis: 'Are we optimizing for speed of learning or for reliability right now, and does that match where we think we are on PMF?',
      antiPattern: 'A team keeps building new acquisition features to chase growth while ignoring that existing users are churning, mistaking top-of-funnel activity for evidence of fit that doesn\'t actually exist yet.',
      related: ['sean-ellis-test', 'jtbd'],
    },
    {
      id: 'sean-ellis-test',
      domain: 'pm',
      term: 'Sean Ellis test',
      moduleId: 'pm-l1',
      tier: 2,
      oneLiner: 'Surveying users on how disappointed they\'d be without the product, as a PMF proxy.',
      full:
        'The Sean Ellis test surveys active users with "how would you feel if you could no longer use this product," and treats roughly 40% answering "very disappointed" as a rough signal of durable product-market fit. It matters less for the exact threshold than for forcing a team to ask real users in a structured, repeatable way instead of inferring fit from internal enthusiasm.',
      devAnalogy: 'It\'s like running a structured user survey the way you\'d run a load test — a repeatable, quantified check instead of trusting that "it feels fast" is true for everyone.',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'A team declares product-market fit based on a handful of enthusiastic customer calls rather than a structured survey across the actual active user base, and invests in growth prematurely.',
      related: ['product-market-fit'],
    },
    {
      id: 'build-vs-buy',
      domain: 'pm',
      term: 'Build vs. buy',
      moduleId: 'pm-l1',
      tier: 2,
      oneLiner: 'Deciding whether a job is generic enough to buy or specific enough to build.',
      full:
        'Build-vs-buy is the decision of whether to construct a capability in-house or adopt an existing tool or vendor, and it is fundamentally a strategic call about differentiation, not just a cost comparison. A job that is common across companies is usually a buy; a job specific to what makes this product distinctive from competitors is usually a build.',
      devAnalogy: 'It\'s the same judgment call as choosing a well-maintained open-source library over rolling your own, except the "library" here might be an entire vendor product, and the stakes include vendor lock-in and roadmap dependency.',
      leverage: 'You often have the clearest technical view of true build cost and hidden maintenance burden, which makes your input to a build-vs-buy call more load-bearing than it might feel in the room.',
      sayThis: 'Is this a job that differentiates us, or a generic capability we\'d be reinventing worse than a vendor already has?',
      antiPattern: 'A team builds a generic, non-differentiating capability in-house because "we can do it better," and it quietly consumes years of maintenance that never shows up as differentiated value to customers.',
      related: ['jtbd'],
    },
    {
      id: 'north-star-alignment',
      domain: 'pm',
      term: 'North-star alignment',
      moduleId: 'pm-l1',
      tier: 3,
      oneLiner: 'Checking that an initiative actually moves the company\'s chosen proxy metric for value.',
      full:
        'North-star alignment is the discipline of verifying that a proposed initiative genuinely moves the metric a company has chosen as its best single proxy for durable value delivered, rather than moving a metric that merely looks good in a report. It is a check applied at the initiative level, distinct from picking the north-star metric itself.',
      devAnalogy: 'It\'s like checking that a performance optimization actually improves the metric users feel, such as time-to-interactive, rather than a vanity number like bundle size that doesn\'t translate to perceived speed.',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'A team ships a feature that moves an easy-to-game secondary metric while the actual north-star metric stays flat, and the improvement gets celebrated before anyone checks the metric that matters.',
      related: ['vision', 'strategy'],
    },
    {
      id: 'strategic-bet',
      domain: 'pm',
      term: 'Strategic bet',
      moduleId: 'pm-l1',
      tier: 2,
      oneLiner: 'A specific, falsifiable wager embedded in a strategy, capable of being proven wrong.',
      full:
        'A strategic bet is the falsifiable claim inside a strategy — for example, "self-serve onboarding will out-convert sales-assisted for our current segment" — as opposed to a vague aspiration like "we want to grow." Good teams state bets precisely enough that they can be shown wrong, and they revisit them out loud when evidence contradicts them rather than quietly redefining success.',
      devAnalogy: 'A strategic bet is like a hypothesis in a design doc\'s "alternatives considered" section — specific enough that a future reader could tell whether it held up.',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'A roadmap cites a strategic bet that data has already contradicted, but no one revisits the plan because admitting the bet was wrong feels riskier than continuing to fund it.',
      related: ['strategy', 'vision'],
    },
    {
      id: 'non-consumption',
      domain: 'pm',
      term: 'Non-consumption',
      moduleId: 'pm-l1',
      tier: 3,
      oneLiner: 'The state of a customer solving their problem with nothing, not with a competitor.',
      full:
        'Non-consumption describes people who currently address a job with no real solution at all — a spreadsheet, a coworker\'s favor, or simply not solving it — rather than with a competing product. For many products, non-consumption is a bigger opportunity and a tougher competitor than any named rival, because it requires a much lower-effort first job to convert.',
      devAnalogy: 'It\'s like the difference between competing against another well-optimized API and competing against a team that currently does the task by hand — the second is a much larger but very differently-shaped opportunity.',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'Onboarding is designed assuming the motivation level of someone already comparing competitors, which silently excludes the much larger group of non-consumers who needed an easier first job to complete.',
      related: ['jtbd'],
    },
  ],
  quiz: [
    {
      kind: 'mcq',
      id: 'pm-l1-q1',
      prompt: 'A PM says "our vision changed this quarter." What should that tell you?',
      options: [
        'Nothing unusual — visions are meant to shift with each roadmap cycle',
        'Something is off, since vision is meant to be a stable, decade-scale compass, not a quarterly variable',
        'The team has just defined its strategy for the first time',
        'The mission statement is now obsolete and needs to be rewritten',
      ],
      answer: 1,
      explain: 'Vision is deliberately long-horizon and stable; if it is changing quarterly, what actually changed is more likely the strategy, and conflating the two is a common source of confusion.',
    },
    {
      kind: 'mcq',
      id: 'pm-l1-q2',
      prompt: 'Which statement is written as a JTBD job statement rather than a feature request?',
      options: [
        'We need a CSV export button on the reports page',
        'When I\'m about to walk into a board meeting, I want last night\'s numbers in a paste-ready format, so I can look prepared without a morning of reformatting',
        'Users have asked for faster exports several times in support tickets',
        'The export feature should support Excel and PDF formats',
      ],
      answer: 1,
      explain: 'A job statement follows the situation, motivation, outcome shape and never mentions the product or feature itself, letting the actual constraints of the situation drive the solution.',
    },
    {
      kind: 'scenario',
      id: 'pm-l1-q3',
      prompt:
        'A ticket asks you to add five configuration toggles nobody on the team can explain the purpose of. What is the sharpest question to ask before building?',
      options: [
        'Whether the toggles can be implemented with a feature flag system',
        'Who the ICP is for this feature, and whether this design still serves someone outside it well',
        'Whether the design team has approved the visual layout',
        'How long the toggles will take to build compared to a simpler alternative',
      ],
      answer: 1,
      explain: 'Naming the ICP turns a vague "too many options" objection into a concrete, defensible argument about who the complexity actually serves, which is far more persuasive in a planning conversation.',
    },
    {
      kind: 'mcq',
      id: 'pm-l1-q4',
      prompt: 'What differentiates a moat from a merely-good feature?',
      options: [
        'A moat is any feature that took more than a sprint to build',
        'A moat is structural and durable, like accumulated data or switching costs, and cannot be copied in a single release cycle',
        'A moat is any feature the marketing team highlights in a launch',
        'A moat only applies to enterprise products, never to consumer ones',
      ],
      answer: 1,
      explain: 'A moat is a structural source of durability — accumulated data, integrations, network effects, or switching costs — as opposed to a temporary advantage a competitor could match with one release.',
    },
    {
      kind: 'mcq',
      id: 'pm-l1-q5',
      prompt: 'Why might a "wedge" feature look under-scoped when you first read the ticket?',
      options: [
        'Because the PM ran out of time to write full requirements',
        'Because a wedge is deliberately narrow on purpose, meant to be an easy first yes before expanding, not the final shape of the product',
        'Because wedges are always technical debt that should be rejected',
        'Because wedges only apply to consumer products, not B2B',
      ],
      answer: 1,
      explain: 'A wedge is intentionally narrow to make evaluation and adoption easy — over-building it for extensibility before the wedge proves out is often wasted effort against the actual strategic bet.',
    },
    {
      kind: 'scenario',
      id: 'pm-l1-q6',
      prompt:
        'Support tickets show growing usage without any increase in marketing spend, and outages now generate real complaint volume. What does this most likely indicate?',
      options: [
        'The product has likely reached product-market fit, since demand is pulling rather than being pushed',
        'The marketing team has stopped doing its job',
        'The product is definitely past its TAM and needs a new market',
        'The team should immediately raise prices',
      ],
      answer: 0,
      explain: 'Usage growth without proportional marketing spend, plus real dependency shown through outage complaints, are classic signs the market is pulling the product rather than the team pushing it — a PMF signal.',
    },
    {
      kind: 'mcq',
      id: 'pm-l1-q7',
      prompt: 'What is the main point of the Sean Ellis test?',
      options: [
        'It replaces the need for a north-star metric entirely',
        'It forces a structured, repeatable survey of real users instead of relying on internal enthusiasm to judge product-market fit',
        'It measures technical performance of the product under load',
        'It is used exclusively to price enterprise contracts',
      ],
      answer: 1,
      explain: 'The exact 40% threshold matters less than the discipline: asking real active users in a structured, repeatable way rather than inferring fit from a few enthusiastic calls or internal opinion.',
    },
    {
      kind: 'mcq',
      id: 'pm-l1-q8',
      prompt: 'A generic capability, common across many companies and not core to what makes your product distinctive, is usually best handled how?',
      options: [
        'Build it in-house so the team fully controls the roadmap',
        'Buy or adopt an existing tool, since it doesn\'t differentiate the product and building it would mostly accumulate unrewarded maintenance',
        'Ignore the capability entirely regardless of customer need',
        'Outsource it to a contractor without any vendor evaluation',
      ],
      answer: 1,
      explain: 'Build-vs-buy is fundamentally about differentiation: generic, non-differentiating jobs are usually better bought, reserving build effort for the capabilities that actually distinguish the product.',
    },
    {
      kind: 'match',
      id: 'pm-l1-q9',
      prompt: 'Match each term to its correct definition.',
      pairs: [
        ['Positioning', 'The stated answer to "for whom, and instead of what"'],
        ['ICP', 'The specific kind of account or user the product currently serves best'],
        ['Value proposition', 'The provable outcome claim, stated in the customer\'s terms'],
        ['Non-consumption', 'The customer solving their problem with nothing, not a rival product'],
      ],
      explain: 'These four terms are frequently confused with one another because they all describe "who the product is for," but each answers a distinct strategic question.',
    },
    {
      kind: 'mcq',
      id: 'pm-l1-q10',
      prompt: 'Why is TAM/SAM/SOM narrowing useful, rather than just citing the largest possible market size?',
      options: [
        'Because investors only care about SOM, never TAM',
        'Because it forces an honest distinction between theoretical opportunity and what the current product and team can realistically win, preventing scope inflated by an unrealistic market number',
        'Because TAM is illegal to mention in public roadmap documents',
        'Because SAM and SOM are always identical in practice',
      ],
      answer: 1,
      explain: 'Narrowing from TAM to SAM to SOM keeps ambition honest — a roadmap that cites only the full TAM tends to justify scope the current product and go-to-market can\'t actually serve yet.',
    },
  ],
  exercise: {
    id: 'pm-l1-exercise',
    title: 'Write the JTBD statement for your most recently shipped feature',
    prompt: `Pick the most recent feature or meaningful change you personally shipped — a real one, not a hypothetical.

Write its **Jobs to Be Done** statement using the situation → motivation → outcome shape from this module: "When [situation], I want to [motivation], so I can [expected outcome]." Do not mention your product, your company, or the feature's name anywhere in the statement — if you can't write it without naming the feature, that's a sign the job wasn't clearly understood before the work started.

Then answer two follow-up questions in your own words:
1. Does the interface you actually shipped match the job you just wrote down, or does it assume a different situation or outcome than the one you described?
2. Who is the **non-consumer** for this feature — the person who currently gets this job done with nothing, a workaround, or a competitor — and would this job statement still make sense for them?`,
    scaffold: `Feature: (name it here, for your own reference only — keep it out of the statement below)

JTBD statement:
When _______________________________________ (situation),
I want to __________________________________ (motivation),
so I can ___________________________________ (expected outcome).

Does the shipped interface match this job? (yes/no, and why)


Who is the non-consumer for this job, and does the statement still hold for them?
`,
    rubric: [
      'The job statement never mentions the product, company, or feature name',
      'The situation is specific enough that a stranger could recognize it in their own life',
      'The outcome describes a result the user cares about, not a system behavior',
      'You honestly identified at least one gap between the job and what was actually shipped',
      'You named a real non-consumer, not just a competitor\'s existing customer',
    ],
  },
};
