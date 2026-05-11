import type { Module } from '../../types';

export const module: Module = {
  id: 'pm-l6',
  domain: 'pm',
  order: 6,
  title: 'Measurement: product\'s observability layer',
  subtitle: 'North Star metrics, OKRs, HEART, activation, and event taxonomy as schema design.',
  why:
    'You write the instrumentation. A bad event taxonomy means the company literally cannot measure what it built — that\'s a frontend architecture failure wearing a product-analytics costume, and you\'re the one positioned to prevent it.',
  estMinutes: 65,
  lessons: [
    {
      id: 'pm-l6-lesson-1',
      title: 'North Star metrics and the input/output distinction',
      body: `A **North Star metric** is the single measure a company treats as its best proxy for durable customer value — not revenue (too lagging), but something upstream that predicts it. Airbnb: nights booked. Spotify: time spent listening.

- Captures real customer value, not company convenience
- Sensitive enough to product changes that a team can see its own work move it

### Input vs. output metrics

| | Input metric | Output metric |
|---|---|---|
| Examples | Page load time, onboarding completion, items created | Revenue, retention, North Star movement |
| Speed | Immediate, controllable | Lagging, slow to respond |
| Who controls it | A team, directly | Influenced by many factors at once |
| Use for | Day-to-day goals | Long-term health |

> **Key insight:** set goals on input metrics you actually control, and trust the causal chain to the output metric — not the other way around.

**Leading** and **lagging indicators** overlap heavily with input/output but aren't identical:

- A **leading indicator** moves before the outcome and gives early warning — a drop in onboarding completion this week predicts a retention problem a month out.
- A **lagging indicator** only confirms what already happened — churn rate can't warn you, it can only report the damage.

\`\`\`mermaid
flowchart LR
  A[Leading indicator moves] --> B[Early warning,\\ntime to react]
  C[Lagging indicator moves] --> D[Confirms damage\\nalready happened]
\`\`\`

For a frontend engineer, this reframes work that looks like pure implementation detail. Page load time and onboarding completion are input, leading metrics your team directly controls.

> **Say this:** "This input metric is a leading indicator for our North Star, and we have direct control over it — unlike most levers on this roadmap."

⚠️ **The trap:** a North Star (or input metric) that's easy to move but doesn't track real value. Optimizing signups instead of activated, retained users is the classic example — signups are trivially inflated by anything that lowers friction, whether or not the product delivers value once someone's inside.`,
      keyTerms: ['north-star-metric', 'input-metric', 'output-metric', 'leading-indicator', 'lagging-indicator'],
    },
    {
      id: 'pm-l6-lesson-2',
      title: 'OKRs done right: key results are outcomes, not a list of shipped features',
      body: `**OKRs** — Objectives and Key Results — pair a qualitative, ambitious Objective with a small set of measurable Key Results that prove it was actually achieved.

⚠️ **The most common failure:** writing key results as a list of shipped features, not outcomes.

| Weak key result | Strong key result |
|---|---|
| "Launch the new onboarding flow" | "Increase onboarding completion from 60% to 75%" |
| Proves nothing — shipping isn't the same as working | A measurable change in the world |

A key result phrased as output can hit 100% while the objective completely fails. A key result phrased as outcome keeps the team accountable after the ship date — the number isn't done moving just because the code is deployed.

### OKR vs. KPI

| | OKR (Key Result) | KPI |
|---|---|---|
| Tied to | A specific, time-boxed goal cycle | Ongoing, continuous |
| Example | "Increase MAU 20% this quarter" | Uptime, average response time |
| Retires | Often, once the cycle ends | No — always being watched |

> **Say this:** "Is this key result an actual outcome, or is it really a shipped-feature list?"

This question tends to land as genuinely useful, not a gotcha — teams write output-shaped key results by accident, under time pressure, and are usually grateful to have it named.

⚠️ **The other trap:** a key result that hits its number by damaging something the objective never meant to sacrifice — "reduce page load time" hit by silently dropping content, or "increase adoption" hit by making a feature harder to avoid rather than more valuable. You're often the first to notice when the fastest path to a number and the actual spirit of the objective have diverged, whether it's a North Star metric or a single sprint goal — flag it before the number gets reported as a win.`,
      keyTerms: ['okr', 'kpi', 'north-star-metric'],
    },
    {
      id: 'pm-l6-lesson-3',
      title: 'HEART, AARRR, and the metrics a frontend engineer directly owns',
      body: `### HEART framework (Google)

| Dimension | Measures |
|---|---|
| Happiness | Satisfaction — surveys, ratings |
| Engagement | Depth/frequency — sessions per week |
| Adoption | New users or new feature usage |
| Retention | Whether users keep coming back |
| Task success | Can users actually complete what they came to do |

Generic business metrics like revenue say nothing about whether the actual UX is good — HEART gives that its own home.

### AARRR ("pirate metrics") — the lifecycle funnel

\`\`\`mermaid
flowchart LR
  A[Acquisition\\nhow users find it] --> B[Activation\\nfirst real value]
  B --> C[Retention\\ndo they come back]
  C --> D[Referral\\ndo they bring others]
  D --> E[Revenue\\ndoes it monetize]
\`\`\`

A lot of confused prioritization debates are really disagreements about which AARRR stage deserves investment right now — without anyone naming it.

### Activation — your highest-leverage stage

**Activation**: the moment a new user experiences real value for the first time — not signup, not login.

- The **aha moment** is the specific instant within activation a user seems to "get it" — found by looking for a usage behavior that correlates with retention (Facebook: 7 friends in 10 days).
- **Time-to-value** measures how long it takes to reach the aha moment — almost entirely a frontend/onboarding metric. Backend can return data instantly; if the UI takes five confusing steps, time-to-value is five confusing steps long.

> **Say this:** "Streamlining this onboarding step should reduce time-to-value, one of our strongest predictors of retention."

### Retention vocabulary

| Term | What it does |
|---|---|
| **Retention curve** | % of users still active over time — shape matters more than any one point: flattens = durable core, keeps declining = not sticky yet |
| **Cohort analysis** | Groups users by signup period, tracks separately — without it, a retention win can't be told apart from an unrelated shift |
| **DAU/WAU/MAU** | Daily/weekly/monthly active users — the baseline engagement scale |
| **Stickiness** | DAU/MAU ratio — how often people actually engage, not just how many exist |`,
      keyTerms: ['heart-framework', 'aarrr', 'activation', 'aha-moment', 'time-to-value', 'retention-curve', 'cohort-analysis', 'dau-wau-mau', 'stickiness'],
    },
    {
      id: 'pm-l6-lesson-4',
      title: 'Event taxonomy as schema design: the instrumentation architecture nobody else can own',
      body: `### Funnels: finding where users get stuck

A **funnel** visualizes the sequence toward a goal (view → add to cart → checkout), showing what percentage continues at each step.

- **Drop-off** — the percentage lost at one specific step. More actionable than a vague overall **conversion rate**, because it tells you exactly where to look first.

\`\`\`mermaid
flowchart LR
  A[View: 100%] --> B[Add to cart: 40%]
  B --> C[Checkout: 32%]
  C --> D[Purchase: 28%]
\`\`\`

> **Say this:** "Can we instrument this as a funnel, so we know exactly which step is losing people instead of guessing?"

### Event taxonomy is schema design

An **event taxonomy** is the structured, consistent naming/property scheme for every trackable action. You write the tracking calls — you're the de facto owner of this data model, whether the org chart says so or not.

- Consistent verb-object naming: \`item_added\`, not a mix of \`AddItem\`/\`item-add\`/\`added_item\`
- Consistent property names across similar events
- Enough context per event to answer the questions people will eventually ask

⚠️ **The default failure mode:** events added ad hoc, feature by feature, no shared convention. 18 months later, "how many users use feature X" needs half a day of data-analyst archaeology — because the feature is tracked under three inconsistently-named events, one of which silently stopped firing after a refactor.

A **tracking plan** prevents this: documented, reviewed, written *before* implementation — every event, its properties, exactly when it fires, and what question it answers. This is frontend architecture work: you're the one who knows exactly when an action completes versus merely starts.

> **Say this:** "Before I build this, can we agree on a tracking plan — what fires, when exactly, and what question each event answers?"

Two more terms that depend entirely on the taxonomy being sound: **identity resolution** (correctly associating events from the same real person across sessions, devices, and login states) and **feature adoption rate** (the percentage of eligible users who've actually used a feature). Owning the tracking plan proactively, before anyone asks, is one of the highest-leverage moves available — whoever defines what gets measured has real influence over what counts as success.`,
      keyTerms: ['event-taxonomy', 'tracking-plan', 'funnel', 'drop-off', 'conversion-rate', 'identity-resolution', 'feature-adoption-rate'],
    },
  ],
  terms: [
    {
      id: 'north-star-metric',
      domain: 'pm',
      term: 'North Star metric',
      moduleId: 'pm-l6',
      tier: 1,
      oneLiner: 'The single measure a company treats as its best proxy for durable customer value.',
      full:
        'A North Star metric is the one measure a company chooses as its best upstream proxy for durable value delivered to customers, sensitive enough to product changes that teams can see their work move it, unlike a lagging, company-wide number like total revenue. Airbnb\'s nights booked and Spotify\'s time spent listening are canonical examples.',
      devAnalogy: 'It\'s like a single, well-chosen health-check metric for a whole system — not every possible signal, but the one number that reliably tells you if things are actually going well.',
      leverage: 'You can tie frontend work directly to the North Star by naming which input metric it moves, which is a substantially stronger prioritization argument than an appeal to craft alone.',
      sayThis: 'How does this initiative connect to our North Star — through which input metric, specifically?',
      antiPattern: 'A company picks a North Star metric that\'s easy to move but doesn\'t track real value, like raw signups, which can be inflated without the underlying product actually getting better.',
      related: ['input-metric', 'output-metric', 'okr'],
    },
    {
      id: 'input-metric',
      domain: 'pm',
      term: 'Input metric',
      moduleId: 'pm-l6',
      tier: 1,
      oneLiner: 'A controllable, immediate lever a team believes drives an output metric upward.',
      full:
        'An input metric is a controllable, near-term lever — page load time, onboarding completion, items created — that a team believes drives an output metric like retention or revenue upward. Teams should generally set goals on input metrics they actually control, trusting the causal chain to the output rather than goaling directly on a lagging output number nobody has direct enough control over.',
      devAnalogy: 'It\'s like optimizing a specific, measurable bottleneck metric you actually control, trusting it improves overall system throughput, rather than trying to directly will overall throughput upward.',
      leverage: 'Page load time and onboarding completion are input metrics you directly control, which lets you argue for performance work using the same causal language the roadmap already runs on.',
      sayThis: 'This is an input metric we directly control, and it feeds our North Star — that\'s a stronger case than "this is good practice."',
      antiPattern: 'A team sets a goal directly on an output metric like revenue with no plan for which input metrics they\'ll actually move to get there, leaving the goal with no concrete, controllable lever behind it.',
      related: ['output-metric', 'leading-indicator', 'north-star-metric'],
    },
    {
      id: 'output-metric',
      domain: 'pm',
      term: 'Output metric',
      moduleId: 'pm-l6',
      tier: 2,
      oneLiner: 'A lagging end result — revenue, retention — influenced by many factors at once.',
      full:
        'An output metric is a lagging, high-level end result — revenue, retention, North Star movement — that a company ultimately cares about but that responds slowly and is influenced by many factors simultaneously, making it a poor tool for day-to-day team decisions even though it\'s the right thing to care about long-term.',
      devAnalogy: 'It\'s like a system-wide SLA number that reflects overall health but is too slow and too multi-causal to debug a specific incident against directly.',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'A team sets a weekly goal directly on an output metric that only moves meaningfully over a quarter, producing constant, meaningless week-to-week noise instead of an actionable signal.',
      related: ['input-metric', 'lagging-indicator'],
    },
    {
      id: 'leading-indicator',
      domain: 'pm',
      term: 'Leading indicator',
      moduleId: 'pm-l6',
      tier: 2,
      oneLiner: 'A metric that moves before the outcome it predicts, giving early warning.',
      full:
        'A leading indicator moves before the outcome it\'s associated with, giving a team early warning while there\'s still time to react — a drop in onboarding completion this week is a leading indicator of a retention problem that won\'t show up in retention numbers for another month.',
      devAnalogy: 'It\'s like a canary metric that warns you a system is degrading before the full outage actually happens, giving you time to intervene rather than just react afterward.',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'A team only watches lagging indicators like monthly churn, discovering a problem weeks after it started, long after the point where a leading indicator would have given them time to act.',
      related: ['lagging-indicator', 'input-metric'],
    },
    {
      id: 'lagging-indicator',
      domain: 'pm',
      term: 'Lagging indicator',
      moduleId: 'pm-l6',
      tier: 3,
      oneLiner: 'A metric that confirms an outcome only after it has already happened.',
      full:
        'A lagging indicator confirms an outcome that has already occurred — churn rate is a lagging indicator, definitionally unable to signal a problem until a customer has already left. Lagging indicators are still important to track for long-term accountability, but they\'re poor tools for catching a problem while there\'s still time to change the outcome.',
      devAnalogy: 'It\'s like a postmortem metric that confirms an incident happened, as opposed to a real-time alert that could have caught it while it was still developing.',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'A team celebrates a healthy lagging indicator this quarter without noticing the leading indicators underneath it have already started declining, mistaking a delayed signal for genuine current health.',
      related: ['leading-indicator', 'output-metric'],
    },
    {
      id: 'okr',
      domain: 'pm',
      term: 'OKR',
      aliases: ['Objectives and Key Results'],
      moduleId: 'pm-l6',
      tier: 1,
      oneLiner: 'A qualitative Objective paired with measurable Key Results that prove it was achieved.',
      full:
        'OKRs pair a qualitative, ambitious Objective with a small set of measurable Key Results that prove the objective was actually achieved. The most common failure mode is writing key results as a list of shipped features rather than as outcomes — "launch the new onboarding flow" proves nothing, while "increase onboarding completion from 60% to 75%" holds the team accountable to whether the work actually worked.',
      devAnalogy: 'It\'s like the difference between a task list and an actual test suite — a task list confirms work happened, a test confirms the work produced the intended result.',
      leverage: 'You can ask whether a key result is really an outcome or a disguised shipped-feature list, which is a genuinely valuable, specific contribution in planning reviews, not a gotcha.',
      sayThis: 'Is this key result an actual outcome, or is it really just a list of things we plan to ship?',
      antiPattern: 'A team hits every key result at 100% by shipping everything on the list, while the objective it was supposed to serve shows no real improvement, because none of the key results measured whether the shipped work actually worked.',
      related: ['kpi', 'north-star-metric', 'success-metric'],
    },
    {
      id: 'kpi',
      domain: 'pm',
      term: 'KPI',
      aliases: ['Key Performance Indicator'],
      moduleId: 'pm-l6',
      tier: 2,
      oneLiner: 'An ongoing, standing metric tracked continuously to monitor system or process health.',
      full:
        'A KPI is an ongoing, continuously tracked metric used to monitor the health of a system or process, distinct from an OKR key result, which is typically tied to a specific, time-boxed goal-setting cycle and often retires once the cycle ends or the target is hit.',
      devAnalogy: 'It\'s like an always-on dashboard metric — uptime, error rate — as opposed to a specific, dated target set for one particular quarter\'s goals.',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'A standing KPI like uptime gets treated as a one-time OKR key result and quietly stops being monitored once the quarter ends, even though the underlying system health still needs continuous tracking.',
      related: ['okr'],
    },
    {
      id: 'heart-framework',
      domain: 'pm',
      term: 'HEART framework',
      moduleId: 'pm-l6',
      tier: 1,
      oneLiner: 'A five-dimension UX metric framework: Happiness, Engagement, Adoption, Retention, Task success.',
      full:
        'The HEART framework structures UX-specific measurement across Happiness, Engagement, Adoption, Retention, and Task success, giving important UX quality signals — like whether users can actually complete what they came to do — a home in a metrics dashboard that generic business metrics like revenue don\'t provide on their own.',
      devAnalogy: 'It\'s like a dedicated UX observability dashboard layered on top of general business metrics, surfacing signals that a revenue chart alone would never reveal.',
      leverage: 'You can propose a Task success metric for a specific flow you own, which gives UX quality a concrete number instead of leaving it as a subjective "feels clunky" impression.',
      sayThis: 'Do we have a Task success metric for this flow, or are we only tracking business outcomes downstream of it?',
      antiPattern: 'A product with healthy revenue and retention numbers has a genuinely broken, high-friction core flow that no dashboard surfaces, because nobody built a Task success metric to catch it.',
      related: ['aarrr', 'activation'],
    },
    {
      id: 'aarrr',
      domain: 'pm',
      term: 'AARRR',
      aliases: ['Pirate metrics'],
      moduleId: 'pm-l6',
      tier: 2,
      oneLiner: 'The lifecycle funnel: Acquisition, Activation, Retention, Referral, Revenue.',
      full:
        'AARRR maps the customer lifecycle funnel across Acquisition, Activation, Retention, Referral, and Revenue, giving teams a shared map for locating exactly which stage a given metric or initiative belongs to, since many confused prioritization debates are really disagreements about which lifecycle stage deserves investment right now.',
      devAnalogy: 'It\'s like a request lifecycle diagram — entry, first meaningful response, repeat calls, referrals from other services, monetized usage — mapped for a whole customer relationship instead of a single request.',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'A roadmap debate argues past itself for an hour because one side is really advocating for acquisition investment and the other for retention investment, and nobody has named which AARRR stage they\'re each actually prioritizing.',
      related: ['activation', 'heart-framework'],
    },
    {
      id: 'activation',
      domain: 'pm',
      term: 'Activation',
      moduleId: 'pm-l6',
      tier: 1,
      oneLiner: 'The point where a new user experiences the product\'s real value for the first time.',
      full:
        'Activation is the moment a new user genuinely experiences a product\'s value for the first time — not signing up or logging in, but the point where the thing the product actually does becomes tangible to them. It\'s a stage frontend engineering has enormous, often underappreciated leverage over, since onboarding and first-run UI decisions largely determine how quickly and reliably it happens.',
      devAnalogy: 'It\'s the product equivalent of "hello world" actually working the first time a developer tries your library — the moment the value stops being theoretical and becomes real.',
      leverage: 'Onboarding and first-run UI decisions are activation-metric decisions in disguise — you can frame streamlining a confusing first-run flow directly in terms of improving activation.',
      sayThis: 'This onboarding friction is likely costing us activation — can we treat fixing it as a metric-moving change, not just a polish item?',
      antiPattern: 'A confusing first-run experience quietly suppresses activation for months, and because nobody\'s framing onboarding polish as an activation-metric problem, it never gets prioritized against flashier feature work.',
      related: ['aha-moment', 'time-to-value', 'aarrr'],
    },
    {
      id: 'aha-moment',
      domain: 'pm',
      term: 'Aha moment',
      moduleId: 'pm-l6',
      tier: 2,
      oneLiner: 'The specific instant within activation when a user seems to grasp the product\'s value.',
      full:
        'The aha moment is the specific, identifiable instant within activation when a user seems to genuinely understand a product\'s value, often discovered by finding a usage behavior that strongly correlates with long-term retention — Facebook\'s finding that users adding seven friends in ten days stuck around dramatically more is the canonical example.',
      devAnalogy: 'It\'s like finding the specific log event that reliably predicts whether a session will succeed or fail, and then designing the whole flow to reach that event as fast as possible.',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'A team never identifies its actual aha moment through usage data and instead guesses at what "value" means for onboarding, optimizing a flow toward a moment that doesn\'t actually correlate with retention.',
      related: ['activation', 'time-to-value'],
    },
    {
      id: 'time-to-value',
      domain: 'pm',
      term: 'Time-to-value',
      moduleId: 'pm-l6',
      tier: 1,
      oneLiner: 'How long it takes a new user to reach the product\'s aha moment.',
      full:
        'Time-to-value measures how long a new user takes to reach the aha moment, and it is almost entirely a frontend and onboarding-design metric — backend data can return instantly, but if the UI takes five confusing steps to surface it, time-to-value is five confusing steps long regardless of API latency.',
      devAnalogy: 'It\'s like time-to-first-byte for perceived value instead of network response — the backend being fast doesn\'t help if the UI path to showing real value is long and confusing.',
      leverage: 'Reducing onboarding steps or clarifying a first-run flow directly reduces time-to-value, which you can frame as moving one of the strongest predictors of retention available to the team.',
      sayThis: 'Streamlining this step should directly reduce time-to-value, which is one of our strongest predictors of retention.',
      antiPattern: 'A team focuses entirely on backend latency to improve "speed" while a slow, confusing onboarding flow dominates actual time-to-value, leaving the metric that matters most for retention untouched.',
      related: ['activation', 'aha-moment'],
    },
    {
      id: 'retention-curve',
      domain: 'pm',
      term: 'Retention curve',
      moduleId: 'pm-l6',
      tier: 2,
      oneLiner: 'A plot of the percentage of users still active at increasing time since signup.',
      full:
        'A retention curve plots the percentage of users still active at increasing time intervals after signup, and its shape matters more than any single point on it — a curve that flattens at a non-zero level indicates a durable retained core, while one that keeps declining toward zero indicates the product isn\'t durably sticky yet, however good early numbers look.',
      devAnalogy: 'It\'s like a decay curve for cache hit rate over time — what matters isn\'t the value at any one moment, it\'s whether the curve levels off or keeps dropping toward zero.',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'A team celebrates strong early retention numbers without checking whether the curve actually flattens, missing that it\'s still declining toward zero over a longer horizon.',
      related: ['cohort-analysis', 'dau-wau-mau'],
    },
    {
      id: 'cohort-analysis',
      domain: 'pm',
      term: 'Cohort analysis',
      moduleId: 'pm-l6',
      tier: 2,
      oneLiner: 'Grouping users by shared signup period or trait and tracking each group over time.',
      full:
        'Cohort analysis groups users by a shared characteristic, typically signup period, and tracks each group separately over time, which is what makes retention curves meaningful in the first place — blending all users together hides whether a recent product change actually improved retention for new cohorts or just coincided with an unrelated shift.',
      devAnalogy: 'It\'s like comparing performance metrics grouped by deploy version instead of blending all traffic together, so a regression in one version doesn\'t get hidden by averaging against a healthier one.',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'A retention improvement gets credited to a recent feature launch without cohort analysis confirming it, when the real cause was an unrelated seasonal shift blended into the aggregate numbers.',
      related: ['retention-curve'],
    },
    {
      id: 'dau-wau-mau',
      domain: 'pm',
      term: 'DAU/WAU/MAU',
      moduleId: 'pm-l6',
      tier: 2,
      oneLiner: 'Daily, weekly, and monthly active user counts, the standard engagement measures.',
      full:
        'DAU, WAU, and MAU count daily, weekly, and monthly active users respectively, forming the standard baseline for measuring engagement scale and, through their ratio, engagement frequency relative to the broadest active-user window.',
      devAnalogy: 'It\'s like measuring request volume at different time granularities — daily, weekly, monthly — to understand both scale and usage rhythm, not just a single flat total.',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'A team reports MAU growth as unambiguous success while DAU/MAU stickiness is quietly declining, meaning the product is reaching more people but engaging each of them less often.',
      related: ['stickiness', 'retention-curve'],
    },
    {
      id: 'stickiness',
      domain: 'pm',
      term: 'Stickiness',
      moduleId: 'pm-l6',
      tier: 3,
      oneLiner: 'The ratio of daily to monthly active users, showing how frequently users actually engage.',
      full:
        'Stickiness, typically expressed as the DAU/MAU ratio, measures how frequently an average user engages relative to the broadest window that counts them as active at all, distinguishing a product reaching many people occasionally from one that keeps a smaller group deeply engaged day to day.',
      devAnalogy: 'It\'s like distinguishing a service with high total request volume from one with genuinely consistent, repeated usage from the same clients — scale and frequency are different questions.',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'A product optimizes purely for growing MAU while stickiness quietly declines, ending up with a large but shallow, easily-churned user base rather than a durably engaged one.',
      related: ['dau-wau-mau', 'retention-curve'],
    },
    {
      id: 'funnel',
      domain: 'pm',
      term: 'Funnel',
      moduleId: 'pm-l6',
      tier: 1,
      oneLiner: 'A visualized sequence of steps toward a goal, showing what percent continues at each step.',
      full:
        'A funnel visualizes the sequence of steps a user takes toward a specific goal — viewing, adding to cart, checking out — showing what percentage of users continue at each step, and it is the standard tool teams use to locate exactly where users are getting stuck in a flow.',
      devAnalogy: 'It\'s like a distributed trace through a multi-step request pipeline, showing exactly which stage drops or slows requests, instead of just a single aggregate success rate.',
      leverage: 'You can instrument a funnel for any flow you own, which turns a vague "this flow feels clunky" concern into a precise, prioritizable drop-off number at a specific step.',
      sayThis: 'Can we instrument this as a funnel so we know exactly which step is losing people, instead of guessing?',
      antiPattern: 'A team knows a flow\'s overall conversion rate is low but has no funnel instrumentation to show which specific step is causing it, so every proposed fix is a guess rather than evidence-driven.',
      related: ['drop-off', 'conversion-rate'],
    },
    {
      id: 'drop-off',
      domain: 'pm',
      term: 'Drop-off',
      moduleId: 'pm-l6',
      tier: 2,
      oneLiner: 'The percentage of users lost at a specific step of a funnel.',
      full:
        'Drop-off is the percentage of users lost at one specific funnel step, and it\'s more actionable than an overall conversion rate, because a sharp drop-off at a particular step gives a team something precise to investigate, rather than a vague low number that could be caused by problems anywhere in the flow.',
      devAnalogy: 'It\'s like knowing exactly which middleware in a request chain is rejecting requests, rather than just knowing the overall request success rate.',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'A team investigates a low overall conversion rate by guessing which step is the problem, instead of instrumenting per-step drop-off and finding the actual answer directly.',
      related: ['funnel', 'conversion-rate'],
    },
    {
      id: 'conversion-rate',
      domain: 'pm',
      term: 'Conversion rate',
      moduleId: 'pm-l6',
      tier: 3,
      oneLiner: 'The percentage of users who complete a defined goal out of those who started it.',
      full:
        'Conversion rate is the percentage of users who complete a defined goal — a purchase, a signup — out of those who started the process, useful as a headline number but too coarse on its own to diagnose where in a multi-step flow the losses are actually happening.',
      devAnalogy: 'It\'s like an overall pass rate for a test suite — useful as a summary, but you still need per-test results to know which specific case is actually failing.',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'A dashboard reports conversion rate prominently but provides no per-step breakdown, so a real regression in one specific step gets buried in an otherwise stable-looking aggregate number.',
      related: ['funnel', 'drop-off'],
    },
    {
      id: 'event-taxonomy',
      domain: 'pm',
      term: 'Event taxonomy',
      moduleId: 'pm-l6',
      tier: 1,
      oneLiner: 'The structured, consistent naming and property scheme for every trackable product action.',
      full:
        'Event taxonomy is the structured, consistent naming and property scheme for every trackable action in a product, and it is effectively schema design for analytics — the frontend engineer who writes the tracking calls is the de facto owner of this data model, whether or not the org chart formally assigns that ownership.',
      devAnalogy: 'It\'s like designing a consistent database schema instead of letting every feature team add ad hoc, inconsistently-named tables — the cost of skipping design work shows up later as expensive archaeology.',
      leverage: 'You are the de facto owner of the event taxonomy for anything you instrument — proactively proposing a naming convention before events get added ad hoc is a genuinely high-leverage move.',
      sayThis: 'Before we add more events, can we agree on a naming convention, so we\'re not reconstructing this taxonomy from scratch in a year?',
      antiPattern: 'Events get added ad hoc by whoever\'s building each feature that week, with no shared convention, until answering "how many users use feature X" requires a data analyst\'s half-day of archaeology across three inconsistently-named events.',
      related: ['tracking-plan', 'identity-resolution'],
    },
    {
      id: 'tracking-plan',
      domain: 'pm',
      term: 'Tracking plan',
      moduleId: 'pm-l6',
      tier: 1,
      oneLiner: 'A documented spec of every event a feature fires and what question it answers.',
      full:
        'A tracking plan documents every event a feature will fire — its properties, exactly when it fires, and what question it\'s meant to answer — written and agreed upon before implementation rather than reverse-engineered from whatever got shipped. Writing one is squarely frontend architecture work, since only the implementer knows precisely when an action actually completes versus merely starts.',
      devAnalogy: 'It\'s like an API contract written before implementation, specifying exactly what each endpoint returns and when, instead of letting the implementation define the contract retroactively and inconsistently.',
      leverage: 'You can write and propose a tracking plan for any feature you\'re building, before anyone asks, which is one of the clearest ways to own how the product gets measured, not just how it looks.',
      sayThis: 'Before I build this, can we agree on a tracking plan — what events fire, when exactly, and what question each one answers?',
      antiPattern: 'A feature ships with tracking added as an afterthought, firing at the wrong moment or under the wrong conditions, producing data that looks plausible on a dashboard but quietly answers the wrong question.',
      related: ['event-taxonomy', 'feature-adoption-rate'],
    },
    {
      id: 'identity-resolution',
      domain: 'pm',
      term: 'Identity resolution',
      moduleId: 'pm-l6',
      tier: 3,
      oneLiner: 'Correctly associating events from the same real person across sessions and devices.',
      full:
        'Identity resolution is the practice of correctly associating events from the same real person across multiple sessions, devices, and before-and-after-login states, so that analytics reflect one coherent user journey instead of several disconnected fragments that undercount real engagement and distort funnel and retention numbers.',
      devAnalogy: 'It\'s like correctly stitching a distributed trace back together across service boundaries, instead of seeing a series of disconnected spans that individually make no sense.',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'A user who signs up on mobile and later logs in on desktop is tracked as two separate people, silently inflating acquisition numbers and understating true retention.',
      related: ['event-taxonomy', 'tracking-plan'],
    },
    {
      id: 'feature-adoption-rate',
      domain: 'pm',
      term: 'Feature adoption rate',
      moduleId: 'pm-l6',
      tier: 2,
      oneLiner: 'The percentage of eligible users who have actually used a given feature.',
      full:
        'Feature adoption rate is the percentage of eligible users who have actually used a given feature within a defined period, and it depends entirely on the underlying event taxonomy being sound — an inconsistently tracked feature will produce an adoption number that looks precise but is quietly wrong.',
      devAnalogy: 'It\'s like measuring what fraction of eligible callers actually use a new API endpoint versus the old one, which only means anything if the calls are being tracked consistently and completely.',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'A feature\'s adoption rate is reported confidently even though its tracking was added inconsistently across two redesigns, quietly undercounting real usage and misleading a prioritization decision.',
      related: ['tracking-plan', 'event-taxonomy'],
    },
  ],
  quiz: [
    {
      kind: 'mcq',
      id: 'pm-l6-q1',
      prompt: 'Why do teams generally set goals on input metrics rather than directly on output metrics?',
      options: [
        'Output metrics are illegal to use as goals in most companies',
        'Input metrics are more immediate and controllable, while output metrics are lagging and influenced by too many factors for day-to-day decisions',
        'Input metrics are always more important than output metrics',
        'Output metrics can only be measured once per year',
      ],
      answer: 1,
      explain: 'Output metrics lag and are influenced by many factors at once, making them poor tools for day-to-day team decisions, while input metrics are controllable, near-term levers a team can directly act on.',
    },
    {
      kind: 'mcq',
      id: 'pm-l6-q2',
      prompt: 'What\'s the most common way OKRs get done badly?',
      options: [
        'Setting too few objectives per quarter',
        'Writing key results as a list of shipped features rather than as measurable outcomes those features are meant to produce',
        'Reviewing OKRs too frequently',
        'Using KPIs instead of OKRs entirely',
      ],
      answer: 1,
      explain: 'A key result phrased as a shipped feature can be hit at 100% while the actual objective fails, because shipping something is not the same as it working — outcome-phrased key results hold the team accountable to results.',
    },
    {
      kind: 'scenario',
      id: 'pm-l6-q3',
      prompt: 'A confusing first-run onboarding flow is deprioritized as "just polish." What\'s the sharpest reframing?',
      options: [
        'Accept the deprioritization since polish is subjective',
        'Frame it explicitly as a time-to-value and activation problem, tying it to one of the strongest known predictors of retention',
        'Insist the flow be rebuilt from scratch immediately',
        'Wait for a customer complaint before raising it again',
      ],
      answer: 1,
      explain: 'Reframing onboarding friction as a time-to-value and activation issue connects a specific, ownable frontend change to metrics the company already claims to care about, which is far more persuasive than an appeal to polish.',
    },
    {
      kind: 'mcq',
      id: 'pm-l6-q4',
      prompt: 'What distinguishes a leading indicator from a lagging indicator?',
      options: [
        'A leading indicator moves before the outcome it predicts, giving early warning; a lagging indicator only confirms an outcome after it has already happened',
        'Leading indicators are always more accurate than lagging indicators',
        'Lagging indicators are only used in enterprise software',
        'There is no meaningful difference between the two',
      ],
      answer: 0,
      explain: 'A leading indicator provides early warning while there\'s still time to react, while a lagging indicator, like churn, can only confirm a problem after it has already cost the business a customer.',
    },
    {
      kind: 'mcq',
      id: 'pm-l6-q5',
      prompt: 'Why is event taxonomy described as "schema design" in this module?',
      options: [
        'Because analytics events are stored in the same database as application data',
        'Because it requires the same structured, consistent-naming discipline as database schema design, and the engineer writing tracking calls is its de facto owner',
        'Because event taxonomy has nothing to do with frontend engineering',
        'Because only backend engineers can define event names',
      ],
      answer: 1,
      explain: 'A sound event taxonomy requires the same consistent, deliberate naming discipline as any schema design, and because frontend engineers write the actual tracking calls, they end up as its de facto owners.',
    },
    {
      kind: 'scenario',
      id: 'pm-l6-q6',
      prompt: 'A team wants to know why an otherwise-decent conversion rate isn\'t higher. What should they build first?',
      options: [
        'A single aggregate conversion number, since it already answers the question',
        'A funnel with per-step drop-off, so they know exactly which step is losing the most users instead of guessing',
        'A North Star metric redefinition',
        'A new OKR objective for the quarter',
      ],
      answer: 1,
      explain: 'An overall conversion rate is too coarse to diagnose where in a multi-step flow users are actually getting stuck — a funnel with per-step drop-off gives a precise, actionable target for investigation.',
    },
    {
      kind: 'mcq',
      id: 'pm-l6-q7',
      prompt: 'What is the "aha moment" in product analytics?',
      options: [
        'The moment a user signs up for an account',
        'The specific, identifiable instant within activation when a user seems to genuinely understand the product\'s value, often found via a behavior correlated with retention',
        'The moment a user churns',
        'A synonym for the North Star metric',
      ],
      answer: 1,
      explain: 'The aha moment is discovered by finding a specific usage behavior that strongly correlates with long-term retention, like Facebook\'s finding about adding seven friends in ten days.',
    },
    {
      kind: 'mcq',
      id: 'pm-l6-q8',
      prompt: 'Why does cohort analysis matter for interpreting a retention curve correctly?',
      options: [
        'It doesn\'t — retention curves are meaningful without it',
        'Blending all users together hides whether a recent product change actually improved retention for new cohorts, or just coincided with an unrelated shift',
        'Cohort analysis only applies to revenue metrics',
        'It replaces the need for a North Star metric',
      ],
      answer: 1,
      explain: 'Without grouping users by shared signup period, a retention improvement could be misattributed to a recent change when it was really caused by something unrelated affecting the blended aggregate.',
    },
    {
      kind: 'match',
      id: 'pm-l6-q9',
      prompt: 'Match each term to its correct definition.',
      pairs: [
        ['Input metric', 'A controllable, near-term lever believed to drive an output metric'],
        ['KPI', 'An ongoing, standing metric tracked continuously, not tied to one cycle'],
        ['Tracking plan', 'A documented spec of events, properties, and the question each answers'],
        ['Feature adoption rate', 'The percentage of eligible users who have actually used a feature'],
      ],
      explain: 'These four terms are commonly conflated because they all relate to measurement, but each answers a distinctly different question about what to track and how.',
    },
    {
      kind: 'scenario',
      id: 'pm-l6-q10',
      prompt: 'Events for a feature were added ad hoc by different engineers over eighteen months with no shared naming convention. What is the most likely consequence?',
      options: [
        'Nothing — analytics tools automatically reconcile inconsistent event names',
        'Answering a basic usage question requires significant data-analyst archaeology, because the feature is tracked under several inconsistently-named events',
        'The company\'s North Star metric becomes automatically invalid',
        'The feature will stop working in production',
      ],
      answer: 1,
      explain: 'Ad hoc event naming with no shared convention is the default mechanism by which a company ends up with a technically-present but practically unusable analytics data model.',
    },
  ],
  exercise: {
    id: 'pm-l6-exercise',
    title: 'Write a tracking plan for a feature you own',
    prompt: `Pick a feature you built, are building, or maintain regularly.

Write a **tracking plan**: list every event that should fire for this feature, and for each one specify its **name** (using a consistent verb-object convention), its **properties**, exactly **when** it fires (be precise about the triggering moment, not just "on completion"), and **what question** this event is meant to answer for someone looking at the data later.

Then check your own taxonomy: are your event names consistent with each other? Would a stranger reading only the event names understand what each one means without the description?`,
    scaffold: `Feature: ______________________________________________________

Event 1: name: _______________  properties: _______________
  fires when: _______________________________________________
  answers the question: _____________________________________

Event 2: name: _______________  properties: _______________
  fires when: _______________________________________________
  answers the question: _____________________________________

Event 3: name: _______________  properties: _______________
  fires when: _______________________________________________
  answers the question: _____________________________________

Naming consistency check (any mismatches found?):
`,
    rubric: [
      'Every event name follows the same verb-object naming convention',
      'Each event\'s trigger moment is specific enough that two engineers would fire it at exactly the same point',
      'Each event states a real question it answers, not just a description of what it tracks',
      'At least one edge case is considered — what happens if the action is abandoned partway through',
    ],
  },
};
