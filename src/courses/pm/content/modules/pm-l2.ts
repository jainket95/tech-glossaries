import type { Module } from '../../types';

export const module: Module = {
  id: 'pm-l2',
  domain: 'pm',
  order: 2,
  title: 'Discovery: finding the real problem',
  subtitle: 'Problem space vs. solution space, the four risks, and validating before you build.',
  why:
    'You are the one who notices the flow is wrong, the edge case nobody scoped, the assumption baked into a mock that won\'t survive real data. Discovery gives you the vocabulary to raise that before code exists, instead of after a sprint is spent building the wrong thing well.',
  estMinutes: 60,
  lessons: [
    {
      id: 'pm-l2-lesson-1',
      title: 'Problem space vs. solution space: the distinction almost every bad ticket collapses',
      body: `Nearly every dysfunctional planning conversation traces to one collapsed distinction, silently merged into one.

| | Problem space | Solution space |
|---|---|---|
| What it is | What's wrong for the user, no fix named | The specific implementation chosen |
| Example | "Users can't find last week's failed jobs among hundreds of successful ones" | "Add a filter dropdown to the reports page" |
| Once written this way | Multiple fixes stay comparable | The team stops evaluating alternatives — the language forecloses them |

You're usually handed tickets already in solution space, and the framing becomes "build this specific thing" rather than "solve this problem." Fine when the solution is well-understood and low-risk. Expensive when it isn't — you build the wrong thing with excellent craftsmanship, and craftsmanship doesn't rescue a wrong bet, it just makes it more expensive to unwind.

> **Say this:** "What's the underlying problem this solves, in one sentence, without naming the solution?" If the requester can't answer, that's real information about how validated the ticket is.

\`\`\`mermaid
flowchart TD
  A[Desired outcome] --> B[Opportunities\\nproblems, no fix attached]
  B --> C[Candidate solutions]
  C --> D[Experiments to test each]
\`\`\`

That's the Opportunity Solution Tree (OST) — it keeps problem space and solution space visibly separate, and makes it obvious when a team jumped straight from outcome to solution with no opportunity in between. Handed a bare solution, ask what opportunity it addresses — sometimes the answer exists but was never written down; sometimes it's "we're not sure yet," which is exactly the moment to validate cheaply, the subject of the rest of this module.

Continuous discovery, popularized by Teresa Torres, treats this research as an ongoing weekly habit — not a phase completed once before a project. Teams that research once build confidently on assumptions that quietly go stale; teams that treat it as continuous catch drift while it's still cheap to fix.`,
      keyTerms: ['problem-space', 'solution-space', 'continuous-discovery', 'opportunity-solution-tree', 'opportunity'],
    },
    {
      id: 'pm-l2-lesson-2',
      title: 'Generative vs. evaluative research, and the interview skill worth stealing',
      body: `Discovery research splits into two modes that get confused constantly, because both involve "talking to users."

| | Generative research | Evaluative research |
|---|---|---|
| When | Before you know what to build | Once a candidate solution or prototype exists |
| Aims to | Surface problems, unmet needs, real user language | Test whether that specific thing solves the problem |
| Run too early/late | — | Showing a mockup before understanding the problem produces polite, solution-biased "looks nice!" feedback |

The core skill of generative research is the customer interview — and the core failure mode is asking people what they want. People are bad at predicting future behavior, good at describing past behavior in detail.

> **Ask this:** "Tell me about the last time you had to reconcile numbers before a board meeting" — real, situated detail. Not: "Would you like a feature that reconciles numbers automatically?" — a hopeful guess dressed up as data.

Two techniques get past the surface-level answer, which is usually a symptom, not the problem:

- Five whys — repeatedly ask "why" downward. "Why didn't you use export" → a few "whys" later → "because I don't trust the numbers it produces." Completely different problem than a hard-to-find button.
- Laddering — repeatedly ask "why does that matter" upward from a stated preference. "I want a darker theme" might ladder to reduced eye strain, or to the tool feeling less consumer-grade — two different design implications from the same request.

An opportunity is what generative research surfaces: a specific, evidenced problem, distinct from any fix. "Users lose confidence in exported numbers when totals don't match what they see on screen" is an opportunity; "users want better exports" is a vague wish.

Reading a research summary and asking "was this generative or evaluative" tells you immediately how much weight the finding should carry.`,
      keyTerms: ['generative-research', 'evaluative-research', 'customer-interview', 'five-whys', 'laddering', 'opportunity'],
    },
    {
      id: 'pm-l2-lesson-3',
      title: 'The four risks: which one is actually yours to own',
      body: `Marty Cagan's four product risks tell you, precisely, which conversations in a project are actually your domain.

| Risk | Asks | Usually assigned to | Actually best caught by |
|---|---|---|---|
| Desirability risk | Does anyone actually want this? | PM | — |
| Viability risk | Does this work for the business? | PM + leadership | — |
| Feasibility risk | Can the team actually build it? | Engineering | **You** — first and earliest |
| Usability risk | Can people who want it figure out how to use it? | Design | **You** — you wire every edge/error/empty state a mock leaves undefined |

> **Say this:** "I'm worried about feasibility — this assumes sub-second updates from a system that batches nightly." Actionable, technically backed. "I don't love this" invites a taste debate instead.

Also watch for a risk category skipped entirely, not just gotten wrong:

- A gorgeous, feasible, usable feature nobody asked for skipped desirability risk.
- A wildly desired feature that costs more per user than the business can sustain skipped viability risk.

Desirability and viability take longer to check, so deadline pressure skips them disproportionately — feasibility and usability get exercised for free just by building and testing the thing. That's exactly why they're most likely to be silently assumed rather than checked, even though they're not "your" risks to own outright.`,
      keyTerms: ['desirability-risk', 'viability-risk', 'feasibility-risk', 'usability-risk'],
    },
    {
      id: 'pm-l2-lesson-4',
      title: 'Validating without building: fake doors, smoke tests, and Wizard of Oz',
      body: `Building the real thing is the most expensive possible way to learn you were wrong. A handful of lightweight techniques test the riskiest assumption first, before spending weeks on the real build.

| Technique | What happens | Disclosed to users? |
|---|---|---|
| Fake door | A button/link for a feature that doesn't exist; measures click-through | No — leads to "not yet available" |
| Smoke test | A minimal landing page or ad for an unbuilt product; measures signups | No |
| Concierge test | A team member manually delivers the outcome by hand, for real users | Usually yes — "we'll set this up manually while we validate" |
| Wizard of Oz test | Looks fully automated; a human secretly produces the responses | No — the illusion is the point |

Fake door and smoke test are close cousins measuring interest. Concierge test and Wizard of Oz test both deliver the real outcome by hand — the difference is disclosure: concierge is usually open about the manual work, Wizard of Oz deliberately preserves the illusion, because it's testing the real experience of the eventual automated version, not just whether the outcome is wanted.

> **Say this:** "Before we build the real integration, what if we shipped the button and measured clicks for two weeks?" Technically credible, and it signals you care about not burning engineering time on unvalidated bets.

The honest limit: these validate desirability and sometimes usability — not feasibility or viability. A fake door tells you people want the feature, not that you can build it reliably at a cost the business can sustain. Check the cheapest, riskiest assumption first; invest real engineering time once it survives contact with real users.`,
      keyTerms: ['fake-door', 'smoke-test', 'concierge-test', 'wizard-of-oz'],
    },
    {
      id: 'pm-l2-lesson-5',
      title: 'Assumption mapping and the riskiest assumption test',
      body: `Every plan rests on assumptions that rarely get named, because naming them takes discipline and the plan feels obviously right in the room. Assumption mapping makes the stack explicit: list every belief the plan depends on, then plot each on two axes.

\`\`\`mermaid
flowchart TD
  A{Important if wrong?} -->|No| B[Don't bother validating]
  A -->|Yes| C{Well evidenced?}
  C -->|Yes| D[Safe to proceed]
  C -->|No| E[Riskiest assumption test]
\`\`\`

That last quadrant — important and poorly evidenced — is where the riskiest assumption test (RAT) comes from: name the single most consequential, least-evidenced assumption, and design the cheapest possible experiment to test only that one first. Not validate everything (slow, diffuse) or validate nothing (fast, reckless) — test the one that would hurt most if wrong.

**Worked example.** A "related items" recommendation feature, justified by "this will increase engagement," depends on: users noticing the module (usability/desirability), recommendations actually being relevant given current data quality (feasibility), computing them fast enough not to slow the page (feasibility), and increased clicks translating to a business outcome anyone cares about (viability). Laid out this way, "will the recommendations even be relevant given our data" is usually both the most consequential and the least evidenced — worth a manual concierge test before building the real pipeline. Not naming it clearly is itself a desirability risk hiding in plain sight.

This closes the module's loop: problem/solution space stop you jumping to a fix; continuous research keeps your understanding current; the four risks tell you which doubt is legitimately yours; fake doors and concierge tests give you cheap ways to check the riskiest one; assumption mapping ties it together. One question, asked before a sprint starts — "what's this plan assuming, and which assumption would hurt most if wrong?" — prevents more wasted engineering time than almost any other habit in this curriculum.`,
      keyTerms: ['assumption-mapping', 'riskiest-assumption-test', 'desirability-risk'],
    },
  ],
  terms: [
    {
      id: 'continuous-discovery',
      domain: 'pm',
      term: 'Continuous discovery',
      moduleId: 'pm-l2',
      tier: 1,
      oneLiner: 'Treating user and data research as an ongoing weekly habit, not a one-time phase.',
      full:
        'Continuous discovery is the practice of maintaining regular, frequent touchpoints with real users and real data throughout a product\'s life, rather than treating discovery as a single phase completed before a big project starts. Teams that only research once tend to build on assumptions that quietly go stale; teams that research continuously catch drift while it is still cheap to correct.',
      devAnalogy: 'It\'s like running continuous integration instead of a single pre-launch QA pass — small, frequent checks catch drift early instead of discovering it all at once, expensively, right before release.',
      leverage: 'You can advocate for including engineers in even brief, recurring user touchpoints, since seeing real usage regularly changes how you scope edge cases far more than reading a research summary secondhand.',
      sayThis: 'When did we last actually talk to a user about this, and was it before or after we locked the current plan?',
      antiPattern: 'A team runs one big research push before a major initiative kicks off, then builds for two quarters on assumptions from that single round without checking whether anything has changed.',
      related: ['generative-research', 'opportunity-solution-tree', 'customer-interview'],
    },
    {
      id: 'opportunity-solution-tree',
      domain: 'pm',
      term: 'Opportunity Solution Tree',
      aliases: ['OST'],
      moduleId: 'pm-l2',
      tier: 1,
      oneLiner: 'A visual map from outcome to opportunities to candidate solutions to experiments.',
      full:
        'The Opportunity Solution Tree is a visual discovery tool with a desired outcome at the top, branching down into opportunities discovered through research, then candidate solutions for each opportunity, then experiments to test each solution. It keeps problem space and solution space visibly separate, exposing when a team has jumped straight from outcome to solution with no evidenced opportunity in between.',
      devAnalogy: 'It\'s like a dependency graph that forces you to show your work — you can\'t point at a leaf node solution without tracing it back through an actual documented problem, the way a good PR links back to an issue rather than appearing out of nowhere.',
      leverage: 'When a ticket arrives as a bare solution, you can ask what opportunity it traces back to on the tree, which either surfaces a real answer or reveals the gap honestly.',
      sayThis: 'What opportunity is this solution addressing, and were other solutions considered for the same opportunity?',
      antiPattern: 'A team builds an OST once for a leadership presentation, then never touches it again, so it becomes a static diagram instead of the living planning tool it was designed to be.',
      related: ['problem-space', 'solution-space', 'opportunity'],
    },
    {
      id: 'generative-research',
      domain: 'pm',
      term: 'Generative research',
      moduleId: 'pm-l2',
      tier: 1,
      oneLiner: 'Open-ended research done before a solution exists, aimed at surfacing real problems.',
      full:
        'Generative research explores user problems, needs, and language without steering toward any particular solution, typically conducted before a team has committed to a specific fix. It is the discovery mode that produces opportunities rather than validated designs, and running it too late — after a solution is already chosen — tends to produce biased, solution-flattering feedback instead of genuine problem discovery.',
      devAnalogy: 'It\'s like profiling a system before deciding what to optimize — you gather real evidence about where the actual bottlenecks are before committing to a specific fix, instead of guessing and hoping.',
      leverage: 'You can ask whether a planned research session is happening before or after a solution was chosen, since that alone tells you whether it can still surface a different problem framing.',
      sayThis: 'Is this generative — are we still open to the problem being something else — or have we already picked the solution?',
      antiPattern: 'A team shows users a finished mockup and calls the resulting polite feedback "research," when the session was actually evaluative and happened far too late to surface a different, better problem framing.',
      related: ['evaluative-research', 'customer-interview', 'continuous-discovery'],
    },
    {
      id: 'evaluative-research',
      domain: 'pm',
      term: 'Evaluative research',
      moduleId: 'pm-l2',
      tier: 2,
      oneLiner: 'Testing a specific candidate solution or prototype against real users.',
      full:
        'Evaluative research tests whether a specific proposed solution, mockup, or working prototype actually solves the problem for real people, and it only makes sense once a candidate solution exists to test. Running evaluative research in place of generative research skips the step of confirming the team understood the underlying problem correctly in the first place.',
      devAnalogy: 'It\'s like running an A/B test on a specific implementation versus doing open-ended exploratory profiling — evaluative research assumes you already picked a direction and are now checking whether it actually works.',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'A team runs evaluative usability testing on a prototype and treats positive feedback as proof the underlying problem was correctly understood, when the study never actually tested that.',
      related: ['generative-research', 'usability-risk'],
    },
    {
      id: 'problem-space',
      domain: 'pm',
      term: 'Problem space',
      moduleId: 'pm-l2',
      tier: 1,
      oneLiner: 'What\'s actually wrong for the user, described without naming any particular fix.',
      full:
        'Problem space is the description of a user\'s difficulty, need, or unmet goal stated independently of any proposed solution, which keeps multiple candidate fixes genuinely open for comparison. Writing a ticket in problem-space language, rather than jumping straight to a specific implementation, is what allows a team to evaluate real alternatives instead of just executing the first idea someone had.',
      devAnalogy: 'It\'s the difference between a bug report that describes the observed broken behavior versus one that prescribes the exact line of code to change — the first lets you find the real root cause, the second assumes it.',
      leverage: 'You can ask for the problem-space version of any solution-shaped ticket before starting, which often surfaces alternative approaches worth a two-minute conversation before code gets written.',
      sayThis: 'What\'s the underlying problem here, in one sentence, without naming this specific solution?',
      antiPattern: 'A backlog fills up entirely with solution-shaped tickets, so the team loses the ability to compare alternatives because every ticket already assumes its own answer.',
      related: ['solution-space', 'opportunity-solution-tree', 'opportunity'],
    },
    {
      id: 'solution-space',
      domain: 'pm',
      term: 'Solution space',
      moduleId: 'pm-l2',
      tier: 2,
      oneLiner: 'The specific implementation chosen to address a problem, as distinct from the problem itself.',
      full:
        'Solution space is the realm of specific proposed fixes — a filter dropdown, a new page, a redesigned flow — as opposed to the problem those fixes are meant to address. Once a request is written in solution-space language, teams tend to stop evaluating alternatives, because the framing itself has already foreclosed them.',
      devAnalogy: 'It\'s like a ticket that specifies the exact function signature to add, rather than the behavior that\'s missing — technically actionable, but it may have quietly locked in an implementation before anyone checked it was the right one.',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'A stakeholder insists on a specific solution-space request without ever explaining the underlying problem, and the team builds it faithfully only to find it doesn\'t actually solve what the stakeholder needed.',
      related: ['problem-space', 'opportunity-solution-tree'],
    },
    {
      id: 'assumption-mapping',
      domain: 'pm',
      term: 'Assumption mapping',
      moduleId: 'pm-l2',
      tier: 1,
      oneLiner: 'Listing every belief a plan depends on, then sorting by importance and evidence.',
      full:
        'Assumption mapping makes explicit every belief a plan quietly depends on being true, then plots each on two axes — how consequential it would be if wrong, and how much evidence currently supports it. The result reliably surfaces the assumptions that are both important and poorly evidenced, which are the ones worth testing before committing real engineering time.',
      devAnalogy: 'It\'s like listing every implicit dependency and invariant a system relies on before a big refactor, instead of discovering them one at a time in production.',
      leverage: 'You can run an informal assumption map on any ambiguous ticket in five minutes before starting, which often surfaces a technical assumption nobody else in the room was positioned to catch.',
      sayThis: 'What is this plan assuming that we haven\'t actually checked yet?',
      antiPattern: 'A team proceeds confidently on a plan where the most consequential assumption was never stated out loud, so nobody realizes it was never validated until the feature ships and underperforms.',
      related: ['riskiest-assumption-test', 'desirability-risk'],
    },
    {
      id: 'riskiest-assumption-test',
      domain: 'pm',
      term: 'Riskiest assumption test',
      aliases: ['RAT'],
      moduleId: 'pm-l2',
      tier: 1,
      oneLiner: 'Designing the cheapest experiment to test the single most consequential, least-evidenced assumption.',
      full:
        'A riskiest assumption test targets the one assumption that is both most consequential if wrong and least supported by current evidence, and designs the cheapest possible experiment to check it before investing further. The discipline is restraint: rather than validating everything or nothing, a team names and tests exactly the assumption that would hurt most if it turned out to be false.',
      devAnalogy: 'It\'s like writing the one spike or proof-of-concept that tests the scariest unknown in a technical design before committing to the full build, instead of prototyping every minor detail equally.',
      leverage: 'You are often best positioned to spot which assumption is a feasibility risk versus a desirability one, which changes who should design the test and how cheap it can be.',
      sayThis: 'If we\'re only going to test one thing before building this, what should it be?',
      antiPattern: 'A team spends a sprint validating several low-stakes assumptions thoroughly while the one assumption that could sink the whole plan goes untested because nobody named it as the riskiest.',
      related: ['assumption-mapping', 'fake-door'],
    },
    {
      id: 'desirability-risk',
      domain: 'pm',
      term: 'Desirability risk',
      moduleId: 'pm-l2',
      tier: 1,
      oneLiner: 'The risk that nobody actually wants what the team is about to build.',
      full:
        'Desirability risk is the possibility that a planned feature or product, even if built well, does not address a real, sufficiently strong user need. It is one of Marty Cagan\'s four product risks, and it is disproportionately skipped under deadline pressure because checking it well takes longer than building the thing and hoping.',
      devAnalogy: 'It\'s the product-level version of asking "will anyone actually import this library" before spending a quarter building a beautifully engineered one nobody needed.',
      leverage: 'You can flag when a plan has clearly validated feasibility and usability but never actually checked desirability, and propose a cheap test like a fake door before committing full build time.',
      sayThis: 'Have we checked that people actually want this, or have we only checked that we can build it?',
      antiPattern: 'A gorgeous, technically impressive feature ships to near-zero adoption because the team validated that it could be built well but never validated that anyone was asking for it.',
      related: ['viability-risk', 'feasibility-risk', 'usability-risk'],
    },
    {
      id: 'viability-risk',
      domain: 'pm',
      term: 'Viability risk',
      moduleId: 'pm-l2',
      tier: 2,
      oneLiner: 'The risk that a solution doesn\'t work for the business — cost, pricing, or legal.',
      full:
        'Viability risk covers whether a planned feature or product can sustainably work within the business\'s constraints — cost to operate, pricing model, legal or regulatory exposure, and sales or support capacity. A feature can be desirable, feasible, and usable, and still fail if it costs more per user to run than the business model can sustain.',
      devAnalogy: 'It\'s the product-level equivalent of a technically elegant solution that happens to be too expensive to run at production scale — correct and unaffordable at once.',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'A team ships a heavily-used feature that quietly costs more in infrastructure per active user than the plan the business built around it can sustain, and nobody notices until the margin impact shows up in finance.',
      related: ['desirability-risk', 'feasibility-risk'],
    },
    {
      id: 'feasibility-risk',
      domain: 'pm',
      term: 'Feasibility risk',
      moduleId: 'pm-l2',
      tier: 1,
      oneLiner: 'The risk that the team can\'t actually build this with current time, skill, or technology.',
      full:
        'Feasibility risk is the possibility that a plan cannot actually be executed given current technical constraints, team skills, timeline, or available technology. It is the risk category engineers are most directly positioned to catch early, and naming it specifically — rather than a vague sense of discomfort — is what turns technical pushback into an actionable, credible flag.',
      devAnalogy: 'It\'s the risk you already assess instinctively in every technical design review — whether the proposed approach can actually be built with the systems and time available, just applied one level earlier, before the design is finalized.',
      leverage: 'You are usually the earliest and most credible voice on feasibility risk — naming it specifically, with the technical reason attached, is one of the highest-leverage things you can do in a planning review.',
      sayThis: 'I\'m worried about feasibility here specifically — this assumes X, and the system we have actually does Y.',
      antiPattern: 'A plan is presented as fully scoped and ready to build, but the engineer with the clearest view of the real technical constraint isn\'t looped in until after the plan is already public.',
      related: ['desirability-risk', 'usability-risk'],
    },
    {
      id: 'usability-risk',
      domain: 'pm',
      term: 'Usability risk',
      moduleId: 'pm-l2',
      tier: 1,
      oneLiner: 'The risk that people who want this still can\'t figure out how to use it.',
      full:
        'Usability risk is the possibility that users who genuinely want a feature still fail to use it successfully, often because of confusing flows, unclear states, or edge cases that weren\'t designed for. It frequently shows up first in error states, empty states, and edge cases — exactly the parts of a design that get the least attention because they aren\'t the happy path.',
      devAnalogy: 'It\'s the product equivalent of an API that works perfectly in the documented case but throws confusing errors on every edge case a real caller will eventually hit.',
      leverage: 'You wire up every edge case, error state, and empty state a mock doesn\'t fully specify, which makes you one of the first people to actually encounter usability risk in practice, before a single user does.',
      sayThis: 'This error state and empty state weren\'t in the mock — can we define them before I build them ad hoc?',
      antiPattern: 'A design review approves the happy-path flow in detail but leaves every error and empty state undefined, so the engineer improvises them under deadline pressure and usability quietly suffers.',
      related: ['desirability-risk', 'feasibility-risk', 'evaluative-research'],
    },
    {
      id: 'fake-door',
      domain: 'pm',
      term: 'Fake door',
      moduleId: 'pm-l2',
      tier: 1,
      oneLiner: 'A button or link for an unbuilt feature, used to measure real interest.',
      full:
        'A fake door test presents an entry point — a button, menu item, or link — for a feature that has not actually been built, then measures how many people try to use it as a cheap signal of desirability before any real engineering investment happens. Clicking through typically leads to a short explanation and an option to register interest, rather than the real feature.',
      devAnalogy: 'It\'s like shipping a disabled, not-yet-wired API endpoint to measure real call volume before investing in building the actual implementation behind it.',
      leverage: 'You can propose a fake door as a lightweight, fast-to-build alternative whenever a feature\'s desirability is unproven but the plan is heading straight to a full build.',
      sayThis: 'Before we build the real thing, what if we shipped the entry point and measured clicks for two weeks?',
      antiPattern: 'A team is afraid a fake door will disappoint users who click it, so they skip validation entirely and build the full feature, only to discover click-through would have predicted the low adoption.',
      related: ['smoke-test', 'concierge-test', 'riskiest-assumption-test'],
    },
    {
      id: 'smoke-test',
      domain: 'pm',
      term: 'Smoke test (product)',
      moduleId: 'pm-l2',
      tier: 2,
      oneLiner: 'A landing page or ad for a product that doesn\'t exist yet, measuring signup interest.',
      full:
        'A product smoke test presents a minimal landing page, ad, or announcement describing a feature or product that hasn\'t been built, and measures signups, waitlist joins, or click-through as an early desirability signal before committing engineering resources. The term is borrowed from electrical engineering, where a smoke test checks whether a circuit visibly smokes before running a full functional test.',
      devAnalogy: 'It\'s the product equivalent of a smoke test in a CI pipeline — a fast, cheap check for an obvious failure before running the full, expensive test suite of actually building the thing.',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'A team builds a full landing page and ad campaign for a smoke test but never defines in advance what signup rate would count as a pass, so the results get interpreted however is most convenient afterward.',
      related: ['fake-door', 'concierge-test'],
    },
    {
      id: 'concierge-test',
      domain: 'pm',
      term: 'Concierge test',
      moduleId: 'pm-l2',
      tier: 2,
      oneLiner: 'Manually delivering a feature\'s outcome by hand, openly, before automating it.',
      full:
        'A concierge test has a team member personally, openly perform the work a future feature would automate, for a small number of real users, to validate that the outcome is genuinely valuable before investing in building the automated version. Unlike a Wizard of Oz test, the manual delivery is typically disclosed rather than disguised as an automated system.',
      devAnalogy: 'It\'s like manually running a script by hand for a handful of real users before investing in a scheduled, automated production job — you learn whether the output is actually valuable before building the pipeline.',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'A team skips the manual concierge step and builds full automation first, discovering only after launch that the automated output doesn\'t match what users actually needed from the manual version.',
      related: ['wizard-of-oz', 'fake-door'],
    },
    {
      id: 'wizard-of-oz',
      domain: 'pm',
      term: 'Wizard of Oz test',
      moduleId: 'pm-l2',
      tier: 2,
      oneLiner: 'A product that looks automated to users but is secretly operated by a human.',
      full:
        'A Wizard of Oz test presents users with what appears to be a fully automated product experience, while a human behind the scenes actually produces the responses or outcomes manually. Unlike a concierge test, the manual operation is deliberately hidden, so the technique tests the real user experience of the eventual automated version, not just whether the underlying outcome is wanted.',
      devAnalogy: 'It\'s like manually crafting API responses behind a real endpoint to test how client code and users react to realistic behavior, before building the actual backend logic that will eventually generate those responses.',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'A Wizard of Oz test is run so long, and so profitably, that the team keeps delaying building the real automation, quietly turning a validation technique into an unsustainable permanent operations cost.',
      related: ['concierge-test', 'fake-door'],
    },
    {
      id: 'five-whys',
      domain: 'pm',
      term: 'Five whys',
      moduleId: 'pm-l2',
      tier: 2,
      oneLiner: 'Repeatedly asking "why" to move from a surface symptom toward a root cause.',
      full:
        'Five whys is a root-cause technique, borrowed from manufacturing, that repeatedly asks "why" in response to each answer until the conversation reaches something closer to an actual underlying cause rather than a surface symptom. In discovery interviews it prevents a team from treating the first stated reason as the real problem, which is often just the most available explanation, not the deepest one.',
      devAnalogy: 'It\'s the same instinct as root-causing a production incident instead of patching the first visible symptom — "why did it fail" gets asked repeatedly until the actual root cause surfaces.',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'An interview stops at the first stated reason for a behavior and treats it as the root cause, missing a deeper and more actionable problem one or two "whys" further down.',
      related: ['laddering', 'customer-interview'],
    },
    {
      id: 'laddering',
      domain: 'pm',
      term: 'Laddering',
      moduleId: 'pm-l2',
      tier: 3,
      oneLiner: 'Repeatedly asking "why does that matter" to climb from preference to underlying value.',
      full:
        'Laddering starts from a user\'s stated preference and repeatedly asks why it matters to them, climbing from a surface-level request toward the underlying value, motivation, or job it actually serves. A request for "a darker theme" might ladder up to reduced eye strain, or to the product feeling more professional and less consumer-grade — two different underlying values with different design implications.',
      devAnalogy: 'It\'s like tracing a feature request up through its actual business justification, one level at a time, until you find the real goal it\'s meant to serve rather than the literal thing requested.',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'A team implements a literal feature request exactly as stated without laddering up to the underlying value, and later discovers a much simpler solution would have satisfied the real motivation.',
      related: ['five-whys', 'customer-interview'],
    },
    {
      id: 'customer-interview',
      domain: 'pm',
      term: 'Customer interview',
      moduleId: 'pm-l2',
      tier: 2,
      oneLiner: 'A structured conversation about a user\'s past behavior, not their predicted future wants.',
      full:
        'A customer interview is a structured research conversation focused on specific past situations and behavior rather than hypothetical future preferences, because people are generally more reliable describing what they actually did than predicting what they would want. Asking about "the last time X happened, in detail" produces sharper, more usable evidence than asking whether someone would like a proposed feature.',
      devAnalogy: 'It\'s like debugging from an actual production log of what happened rather than asking a user to guess, after the fact, what they think might have gone wrong.',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'An interview asks "would you use a feature that does X" and treats the enthusiastic hypothetical answer as strong evidence, when hypothetical enthusiasm is a weak predictor of real future behavior.',
      related: ['generative-research', 'five-whys', 'laddering'],
    },
    {
      id: 'opportunity',
      domain: 'pm',
      term: 'Opportunity',
      moduleId: 'pm-l2',
      tier: 2,
      oneLiner: 'A specific, evidenced problem or unmet need, stated without a proposed fix attached.',
      full:
        'An opportunity is a precisely stated problem, need, or unmet desire surfaced through research, deliberately written without a proposed solution attached, so that multiple candidate solutions can later be compared fairly against it. "Users lose confidence in exported numbers when totals don\'t match what they see on screen" is an opportunity; "users want better exports" is too vague to be one.',
      devAnalogy: 'It\'s like a precisely written bug report that documents observed behavior versus expected behavior without prescribing the fix, leaving the actual solution open for engineering judgment.',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'Interview notes get compressed into vague wish-list bullets like "users want it to be easier," losing the specific, actionable evidence that made the original research valuable.',
      related: ['problem-space', 'opportunity-solution-tree'],
    },
  ],
  quiz: [
    {
      kind: 'mcq',
      id: 'pm-l2-q1',
      prompt: 'Which of these is written in problem space rather than solution space?',
      options: [
        'Add a filter dropdown to the reports page',
        'Users can\'t find last week\'s failed jobs among hundreds of successful ones',
        'Build a saved-search feature for the reports page',
        'Change the default sort order on the reports table',
      ],
      answer: 1,
      explain: 'The other three options each name a specific implementation; only the second describes the underlying difficulty without presupposing which fix should solve it, leaving room to compare real alternatives.',
    },
    {
      kind: 'mcq',
      id: 'pm-l2-q2',
      prompt: 'A team runs one big user research push before a major initiative and then builds for two quarters without checking back in. What discovery principle does this violate?',
      options: [
        'The Opportunity Solution Tree, which requires research to happen only once',
        'Continuous discovery, which treats research as an ongoing habit rather than a single upfront phase',
        'The riskiest assumption test, which only applies to feasibility risk',
        'Evaluative research, which should always come before generative research',
      ],
      answer: 1,
      explain: 'Continuous discovery specifically warns against treating research as a one-time phase, since assumptions that were true when the research was done can quietly go stale over a long build.',
    },
    {
      kind: 'scenario',
      id: 'pm-l2-q3',
      prompt:
        'You\'re asked to build a feature that assumes an internal system can return live, sub-second updates, but you know that system currently only batches nightly. Which risk should you name explicitly?',
      options: [
        'Desirability risk',
        'Viability risk',
        'Feasibility risk',
        'Usability risk',
      ],
      answer: 2,
      explain: 'This is a direct feasibility concern — whether the plan can actually be built given the real technical constraints — and it is a risk engineers are best positioned to catch and name specifically.',
    },
    {
      kind: 'mcq',
      id: 'pm-l2-q4',
      prompt: 'Why might a beautifully built, technically impressive feature still fail after launch?',
      options: [
        'It can\'t fail if feasibility risk was fully addressed',
        'It may have skipped desirability risk entirely — being buildable well doesn\'t mean anyone actually wanted it',
        'Usability risk only applies to consumer products, not this case',
        'Viability risk is irrelevant once a feature has shipped',
      ],
      answer: 1,
      explain: 'A feature can be feasible, usable, and well-crafted while still failing if desirability risk was never actually validated — building something well doesn\'t confirm anyone needed it.',
    },
    {
      kind: 'scenario',
      id: 'pm-l2-q5',
      prompt:
        'A PM wants to build a full Slack export integration to test whether users want it. What\'s a cheaper way to validate desirability first?',
      options: [
        'Skip validation and build the full integration since it\'s the only way to know for sure',
        'Run a fake door test: ship an "Export to Slack" button that measures clicks before any integration is built',
        'Survey the engineering team about whether they personally would use it',
        'Wait until a competitor ships the same feature before deciding',
      ],
      answer: 1,
      explain: 'A fake door measures real click-through interest for a small fraction of the cost of building the full integration, testing desirability before committing serious engineering time.',
    },
    {
      kind: 'mcq',
      id: 'pm-l2-q6',
      prompt: 'What distinguishes a Wizard of Oz test from a concierge test?',
      options: [
        'A Wizard of Oz test is always more expensive to run',
        'A Wizard of Oz test disguises manual human effort as automation, while a concierge test is typically delivered openly by hand',
        'A concierge test can only be used for enterprise products',
        'There is no meaningful difference between the two techniques',
      ],
      answer: 1,
      explain: 'The key distinction is disclosure: Wizard of Oz deliberately preserves the illusion of automation to test the real automated experience, while concierge is usually openly manual.',
    },
    {
      kind: 'mcq',
      id: 'pm-l2-q7',
      prompt: 'In a customer interview, why is "tell me about the last time this happened" generally better than "would you use a feature that does X"?',
      options: [
        'It takes less time to ask',
        'People are generally more reliable describing specific past behavior than predicting their own future behavior',
        'It avoids the need for generative research entirely',
        'It only works for evaluative research sessions',
      ],
      answer: 1,
      explain: 'Hypothetical questions about future preferences tend to produce hopeful, unreliable guesses, while questions about specific past situations produce concrete, more trustworthy evidence.',
    },
    {
      kind: 'mcq',
      id: 'pm-l2-q8',
      prompt: 'What is the point of assumption mapping\'s two axes (importance and evidence)?',
      options: [
        'To rank features by how much they will cost to build',
        'To surface the assumptions that are both consequential if wrong and currently unsupported by evidence, which are the ones worth testing first',
        'To decide which team member should own each assumption',
        'To calculate a RICE score for the initiative',
      ],
      answer: 1,
      explain: 'Plotting assumptions by importance and evidence reliably isolates the "important but poorly evidenced" quadrant, which is exactly what a riskiest assumption test should target first.',
    },
    {
      kind: 'match',
      id: 'pm-l2-q9',
      prompt: 'Match each validation technique to its correct description.',
      pairs: [
        ['Fake door', 'A button or link for a feature that doesn\'t exist yet, measuring click interest'],
        ['Smoke test', 'A landing page or ad for an unbuilt product, measuring signup interest'],
        ['Concierge test', 'Manually delivering the outcome by hand, openly, before automating it'],
        ['Wizard of Oz', 'A product that looks automated but is secretly operated by a human'],
      ],
      explain: 'These four techniques are often confused because they all avoid building the real thing, but they differ in what they test and whether the manual effort is disclosed to users.',
    },
    {
      kind: 'scenario',
      id: 'pm-l2-q10',
      prompt:
        'A ticket arrives with no research behind it and an unusually confident plan. What\'s the single most useful question to ask before starting work?',
      options: [
        'How many story points should this be estimated at?',
        'What is this plan assuming that we haven\'t actually checked yet, and what\'s the riskiest one of those assumptions?',
        'Which design system components should be used?',
        'Whether the ticket has been approved by a director',
      ],
      answer: 1,
      explain: 'Naming the plan\'s riskiest, least-evidenced assumption is the single question most likely to prevent wasted engineering effort, and it\'s a question anyone on the team, including engineers, can credibly ask.',
    },
  ],
  exercise: {
    id: 'pm-l2-exercise',
    title: 'Map the assumptions behind a current ticket',
    prompt: `Pick a ticket you're currently working on, or one that's next in your queue.

List out at least **five assumptions** the plan depends on being true — about user behavior, technical feasibility, data quality, business viability, or timing. Be specific; "this will work" is not an assumption, "the underlying search index returns results in under 200ms for queries like this" is.

For each assumption, rate its **importance** (how much it would hurt if wrong: low / medium / high) and its **evidence** (how much real support it currently has: none / anecdotal / validated).

Identify the single **riskiest assumption** — important and poorly evidenced — and write one sentence describing the cheapest experiment you could run to test it before writing more code.`,
    scaffold: `Ticket: ______________________________________________

Assumptions:
1. ________________________________ — importance: ___  evidence: ___
2. ________________________________ — importance: ___  evidence: ___
3. ________________________________ — importance: ___  evidence: ___
4. ________________________________ — importance: ___  evidence: ___
5. ________________________________ — importance: ___  evidence: ___

Riskiest assumption: _____________________________________________

Cheapest test for it: ____________________________________________
`,
    rubric: [
      'At least five assumptions are listed, and each is specific rather than a vague restatement of the ticket',
      'Every assumption is rated on both importance and evidence, not just one axis',
      'The chosen riskiest assumption is genuinely both high-importance and low-evidence, not just the scariest-sounding one',
      'The proposed test is cheaper than building the full solution, and would actually produce evidence one way or the other',
    ],
  },
};
