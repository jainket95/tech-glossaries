import type { LeveragePlay } from '../types';

export const leveragePlays: LeveragePlay[] = [
  {
    id: 'own-the-tracking-plan',
    title: 'Own the tracking plan before anyone asks you to',
    situation:
      'You\'re about to build a feature and the ticket says nothing about analytics — no events, no properties, no mention of how anyone will know if it worked.',
    sayThis:
      'Before I start, can we agree on a tracking plan — what events fire, when exactly, and what question each one answers?',
    whatItGetsYou:
      'You become the de facto owner of the data model for this feature, not just its implementation. When someone later asks "did this work," you\'re the person with the answer already instrumented, not the person scrambling to add tracking after the fact. It also prevents the specific, common failure where inconsistent event naming makes a simple usage question take a data analyst half a day to answer.',
    relatedTerms: ['tracking-plan', 'event-taxonomy', 'feature-adoption-rate'],
  },
  {
    id: 'claim-usability-risk',
    title: 'Claim usability risk as your own before someone else discovers it the hard way',
    situation:
      'A design has a polished happy path but the error states, empty states, and edge cases are undefined or hand-waved as "handle gracefully."',
    sayThis:
      'This error state and empty state weren\'t in the mock — can we define them before I build them ad hoc?',
    whatItGetsYou:
      'You catch usability risk at the point it\'s cheapest to fix — before implementation — instead of after a confused user hits an undefined state in production. It also establishes you as someone who thinks about the whole flow, not just the parts that were speced, which is exactly the habit that gets you looped into design conversations earlier next time.',
    relatedTerms: ['usability-risk', 'empty-state', 'evaluative-research'],
  },
  {
    id: 'ask-for-non-goals',
    title: 'Ask for the non-goals section a PRD forgot to write',
    situation:
      'You\'ve been handed a PRD or ticket with a clear list of goals but no explicit statement of what\'s out of scope for this phase.',
    sayThis:
      'This PRD doesn\'t have a non-goals section — can I draft a few based on the stated goals, so we agree on scope before I start?',
    whatItGetsYou:
      'A pre-approved, legitimate answer for every reasonable-sounding scope addition that shows up mid-sprint, instead of absorbing scope creep one "quick addition" at a time with no one ever making an explicit tradeoff decision. Drafting it yourself, rather than just requesting it, reads as a genuine contribution rather than pushback.',
    relatedTerms: ['non-goals', 'prd', 'roadmap-tradeoff'],
  },
  {
    id: 'propose-appetite-not-estimate',
    title: 'Propose an appetite instead of a single-number estimate',
    situation:
      'You\'re asked "how long will this take" for a piece of work with real, unresolved ambiguity in its scope.',
    sayThis:
      'Given a two-week appetite for this, here\'s what I think we can ship well — the full version you\'re describing is probably closer to six weeks.',
    whatItGetsYou:
      'An honest translation of scope into time that puts the real tradeoff decision where it belongs, instead of you silently absorbing an unrealistic timeline by quietly cutting corners nobody agreed to. It also reframes cutting scope as the process working as intended, rather than a failure to hit a number.',
    relatedTerms: ['appetite', 'scope-hammering', 'shape-up'],
  },
  {
    id: 'name-product-debt-in-retros',
    title: 'Name product debt explicitly in retros, the same way you\'d name technical debt',
    situation:
      'A flow has been half-finished, confusing, or inconsistent for months, but it\'s never come up as an agenda item because it\'s "just how that part of the product is."',
    sayThis:
      'This flow was never actually finished — can we name it as product debt in the retro so it\'s visible on the backlog?',
    whatItGetsYou:
      'Product debt stays invisible precisely because nobody names it as debt — it just quietly becomes "how things are." Naming it explicitly, using language the team already applies to technical debt, gives it a real chance of being prioritized instead of remaining permanently unaddressed.',
    relatedTerms: ['product-debt', 'basic-expectation', 'deprecation-policy'],
  },
  {
    id: 'push-entitlements-server-side',
    title: 'Push entitlement checks server-side, not just hidden in the UI',
    situation:
      'A plan to gate a premium feature is described as "just hide the button for free-tier users," with no mention of backend enforcement.',
    sayThis:
      'This can\'t just hide the button — is the backend independently enforcing this entitlement too?',
    whatItGetsYou:
      'You close a real, concrete security and revenue leak before it ships, rather than after someone discovers it can be bypassed with developer tools. This is one of the clearest, most technically unambiguous places you can push back on a shortcut, because the risk isn\'t hypothetical — it\'s trivially exploitable.',
    relatedTerms: ['feature-gating', 'entitlement', 'rbac'],
  },
  {
    id: 'instrument-activation-drop-off',
    title: 'Instrument activation drop-off before arguing that onboarding needs work',
    situation:
      'You suspect the onboarding flow is losing users, but the argument for fixing it so far has been vibes, not data.',
    sayThis:
      'Can we instrument this as a funnel so we know exactly which step is losing people, instead of guessing?',
    whatItGetsYou:
      'A precise, prioritizable number — drop-off at a specific step — instead of a vague "onboarding feels clunky" complaint that\'s easy to deprioritize. Once the data exists, the case for fixing the highest-drop-off step essentially makes itself.',
    relatedTerms: ['funnel', 'drop-off', 'activation', 'time-to-value'],
  },
  {
    id: 'run-a-pre-mortem-on-a-risky-release',
    title: 'Run a pre-mortem before a genuinely risky release',
    situation:
      'A release is coming up that several people privately have a bad feeling about, but nobody has structured time set aside to actually voice those concerns.',
    sayThis:
      'Before we ship this, can we spend fifteen minutes imagining it\'s already failed and working backward from there?',
    whatItGetsYou:
      'A structured, low-cost way to surface risks that a normal, optimistic planning conversation tends to miss — imagining failure directly unlocks more candid input than asking "any concerns?" in a room full of people reluctant to be the one who raises a doubt.',
    relatedTerms: ['pre-mortem', 'circuit-breaker', 'kill-switch'],
  },
  {
    id: 'reframe-a-solution-shaped-ticket',
    title: 'Reframe a solution-shaped ticket as the problem underneath it',
    situation:
      'A ticket arrives specifying an exact implementation with no stated problem, and you suspect a different approach might serve the same need better.',
    sayThis:
      'What\'s the underlying problem here, in one sentence, without naming this specific solution?',
    whatItGetsYou:
      'A real chance to propose a better, cheaper, or more robust alternative before implementation locks in the first idea someone had. It also often reveals that the requester hadn\'t fully thought through the problem themselves, which is valuable information either way.',
    relatedTerms: ['problem-space', 'solution-space', 'jtbd'],
  },
  {
    id: 'volunteer-for-the-product-trio',
    title: 'Volunteer to be looped in earlier, before the design is locked',
    situation:
      'You keep receiving specs and designs only after they\'ve already been finalized and approved, leaving little room to raise a feasibility concern without reopening settled decisions.',
    sayThis:
      'Could I be looped in earlier on discovery for this, before the design is locked, rather than reviewing it once it\'s finished?',
    whatItGetsYou:
      'Feasibility concerns get raised while assumptions are still being shaped, which is dramatically less disruptive and more welcome than raising the same concern after everyone has already signed off. Consistently asking this, and delivering good input once you\'re in the room, is the actual mechanism by which engineers earn a lasting seat in the product trio.',
    relatedTerms: ['product-trio', 'feasibility-risk', 'empowered-team'],
  },
  {
    id: 'challenge-an-output-shaped-kr',
    title: 'Challenge a key result that\'s really a disguised output',
    situation:
      'An OKR\'s key result reads like a shipped-feature checklist — "launch the new onboarding flow" — rather than a measurable outcome.',
    sayThis:
      'Is this key result an actual outcome, or is it really just a list of things we plan to ship?',
    whatItGetsYou:
      'This is a genuinely valuable, specific contribution in a planning review, not a gotcha — teams write output-shaped key results by accident under time pressure far more often than deliberately, and naming the pattern tends to get a grateful response, because everyone involved actually wants the OKR to mean something.',
    relatedTerms: ['okr', 'outcome-over-output', 'success-metric'],
  },
  {
    id: 'propose-a-fake-door-instead-of-building',
    title: 'Propose a fake door instead of committing to a full build',
    situation:
      'A team is about to invest real engineering time in a feature whose actual desirability has never been validated with real users.',
    sayThis:
      'Before we build the real thing, what if we shipped the entry point and measured clicks for two weeks?',
    whatItGetsYou:
      'A technically credible, product-savvy alternative to "build it and see" that validates desirability at a fraction of the engineering cost. It positions you as someone who cares about not wasting the team\'s effort on unvalidated bets, which is a distinct and valuable reputation from simply being a fast builder.',
    relatedTerms: ['fake-door', 'desirability-risk', 'riskiest-assumption-test'],
  },
  {
    id: 'own-the-empty-state-design',
    title: 'Own the empty-state design instead of shipping a generic filler screen',
    situation:
      'A feature is close to done, and the only thing left is what a user sees before they\'ve created any content — currently a bare, unhelpful blank screen.',
    sayThis:
      'This deserves a real empty state that teaches the next step, not a generic filler screen — can I design it as part of this ticket?',
    whatItGetsYou:
      'Direct ownership over one of the highest-leverage, most under-invested screens in the product — a new user\'s literal first impression, arriving before they\'ve had any chance to experience real value. It\'s squarely a frontend decision, and doing it well measurably moves activation.',
    relatedTerms: ['empty-state', 'activation', 'progressive-disclosure'],
  },
  {
    id: 'ask-what-happens-if-nobody-uses-it',
    title: 'Ask what happens to a feature if nobody ends up using it',
    situation:
      'A feature is being built with real conviction but no stated plan for what happens if usage turns out to be low after launch.',
    sayThis:
      'If usage is low after a quarter, what\'s our plan — iterate, sunset, or leave it as-is indefinitely?',
    whatItGetsYou:
      'A concrete commitment, made before launch, to actually revisit the decision later — which prevents an unsuccessful feature from lingering indefinitely as unowned product debt because nobody wants to be the one who proposes removing it. Asking this before building also occasionally surfaces that the feature\'s success criteria were never actually defined.',
    relatedTerms: ['product-debt', 'sunset-notice', 'success-metric'],
  },
  {
    id: 'propose-guardrail-metrics',
    title: 'Propose the guardrail metrics for an experiment you\'re implementing',
    situation:
      'An experiment brief names a primary metric but nobody has considered what else the change could plausibly damage while winning on that metric.',
    sayThis:
      'What could this variant break while it\'s busy winning on the primary metric — what should we guardrail?',
    whatItGetsYou:
      'You often have the clearest technical view of what else a UI change could plausibly affect, since you\'re the one implementing it — proposing guardrails yourself catches a whole class of "won on paper, quietly damaging in practice" outcomes before they ship.',
    relatedTerms: ['guardrail-metric', 'primary-metric', 'experiment-brief'],
  },
];
