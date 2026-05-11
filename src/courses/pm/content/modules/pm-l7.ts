import type { Module } from '../../types';

export const module: Module = {
  id: 'pm-l7',
  domain: 'pm',
  order: 7,
  title: 'Experimentation',
  subtitle: 'Hypotheses, guardrails, statistical significance, and when not to A/B test at all.',
  why:
    'You implement the variants, and you\'re usually the first person positioned to spot a sample ratio mismatch or a broken instrumentation before a bad experiment result gets shipped as a real decision.',
  estMinutes: 60,
  lessons: [
    {
      id: 'pm-l7-lesson-1',
      title: 'Hypothesis, control, and variant: the shape of a real experiment',
      body: `An **A/B test** compares a **control** (current experience) against one or more **variants** (proposed changes), randomly splitting real users and measuring the difference. A **multivariate test** extends this to multiple changed elements at once — finds interaction effects a series of single A/B tests would miss, at the cost of needing much more traffic per combination.

The control's entire value is being genuinely representative of "what would've happened anyway" — same random assignment, same time period as the variant, never "however things looked last month."

### The hypothesis shape

> **Formula:** "If we [change], then [metric] will [direction] because [reasoning]."

| Real hypothesis | Not a hypothesis |
|---|---|
| "If we move the CTA above the fold, signup conversion increases, because users don't scroll far enough to see it" | "Let's test moving the CTA and see what happens" |
| Falsifiable, specific metric + direction, stated reasoning | No theory of change — the team learns less no matter what happens |

- **Primary metric** — the single metric the hypothesis is about, decided *before* launch. Picking it after the fact lets a team find something that moved favorably by pure chance.
- **Guardrail metric** — watched alongside the primary, to catch a variant that wins on its primary metric while quietly damaging something else (conversion up, average order value down; engagement up, unsubscribes up).

> **Say this:** "What's the hypothesis, and is everything we need to measure it already tracked?"

You're the one building the tracking the experiment's answer depends on. A hypothesis naming an untracked metric, or a guardrail nobody thought to track, is a gap you can catch before launch — not after two weeks of results nobody can fully trust.`,
      keyTerms: ['ab-test', 'multivariate-test', 'control', 'variant', 'hypothesis', 'primary-metric', 'guardrail-metric'],
    },
    {
      id: 'pm-l7-lesson-2',
      title: 'Significance without a stats degree: what the numbers are actually claiming',
      body: `**Statistical significance** claims an observed difference is unlikely to be random chance. The standard measure is a **p-value** — roughly, the probability of seeing a difference this large if there were truly no real difference. Below 0.05 is conventionally called "significant."

> ⚠️ **What it does NOT mean:** how large or practically meaningful the effect is — only that it's probably real.

| Can happen | Why it's confusing |
|---|---|
| A statistically significant 0.1% conversion lift | Real, not noise — and far too small to justify the engineering cost |
| A large, real effect that fails to reach significance | Sample size was too small to detect it — absence of significance is not absence of effect |

A **confidence interval** gives a range instead of a point estimate — "95% CI: +2% to +8%" is more honest than a bare "+5%." A wide interval, even around a promising estimate, means more data is needed.

### Deciding power before the experiment runs

- **Minimum detectable effect (MDE)** — decided in advance: given the traffic and duration available, what's the smallest effect this test can reliably detect?
- **Statistical power** — the test's actual ability to detect a real effect of that size, given sample size, MDE, and metric variance.
- **Underpowered test** — not enough traffic/time for the MDE the hypothesis implies. Reports "not significant" whether the true effect is zero or real-but-modest — indistinguishable from the inside.

> **Before shipping an experiment, ask:** did anyone calculate the required sample size for the implied MDE, given current traffic? If not, expect an ambiguous result that gets misread as "it didn't work" when the honest read is "we couldn't tell."`,
      keyTerms: ['statistical-significance', 'p-value', 'confidence-interval', 'minimum-detectable-effect', 'statistical-power', 'underpowered-test'],
    },
    {
      id: 'pm-l7-lesson-3',
      title: 'The peeking problem, novelty effects, and other ways experiments lie to you',
      body: `### Five ways experiments quietly lie to you

**1. The peeking problem.** Checking results early and stopping the moment they look significant. Feels harmless — it isn't: random noise crosses a significance threshold at some point in almost any running experiment, purely by chance. Stopping there is fishing for a lucky moment, not measuring a stable effect.

> **Fix:** commit to a sample size/duration in advance and hold to it — or use a method built for valid early stopping.

**2 & 3. Novelty and primacy effects — opposite directions, same problem.**

| Effect | What happens | Why |
|---|---|---|
| **Novelty effect** | Variant performs well early, fades over time | New and attention-grabbing, not actually better |
| **Primacy effect** | Variant performs worse early, improves over time | Existing users confused by unfamiliarity |

Run experiments long enough to let both settle before trusting the number — especially for anything existing users interact with repeatedly.

**4. Skipping the holdout group.** A **holdout group** is a small segment deliberately kept on the old experience, much longer than a typical test, specifically to measure true long-term effect once novelty/primacy fade. More expensive to maintain — reserved for genuinely high-stakes changes.

**5. Sample ratio mismatch (SRM).** The actual traffic split doesn't match the intended one — 45/55 instead of 50/50. Almost always a randomization/assignment bug, not a finding, and it silently invalidates results if unnoticed.

> **You're the best-positioned person to catch an SRM** — you implemented the assignment logic. Check the actual split before anyone interprets results as meaningful.

### When *not* to A/B test

- Traffic too small to ever reach significance in a reasonable timeframe
- An obviously correct direction (fixing something outright broken, legal compliance)
- A genuinely novel feature with no sensible "control" to randomize against

Knowing when an experiment is the wrong tool is as valuable as running one well — often the moment for a fake door or a concierge test instead.`,
      keyTerms: ['peeking-problem', 'novelty-effect', 'primacy-effect', 'holdout-group', 'sample-ratio-mismatch'],
    },
    {
      id: 'pm-l7-lesson-4',
      title: 'Feature-flag platforms and writing an experiment brief that actually gets built right',
      body: `A **feature-flag platform** (LaunchDarkly, Optimizely, Statsig, or homegrown) is the infrastructure that makes A/B testing possible at real scale: defining variants, assigning users consistently across sessions, targeting segments, reporting results.

⚠️ **A rollout flag is not the same as an experiment flag.** An experiment needs *sticky* assignment (same user sees the same variant the whole test, not a coin flip per page load) and properly logged assignment events. A simple on/off rollout flag doesn't guarantee either.

This is squarely your domain — implementation bugs here are one of the most common causes of untrustworthy results:

- Inconsistent assignment contaminates both groups, quietly erasing the difference being measured.
- Non-random assignment (correlated with the outcome — account age, geography) can produce a **sample ratio mismatch** or a biased comparison that looks real but isn't.

### The experiment brief

Ties the whole module together into something a team can execute and honestly evaluate:

- Hypothesis (if/then/because)
- Primary metric + source of truth
- Guardrail metrics
- MDE + required sample size/duration
- Segments included/excluded
- The decision rule — what result ships the variant, keeps control, or extends the test

> Writing this *before* implementation prevents the most common failure in applied experimentation: deciding what counts as success only after seeing which outcome is convenient.

> **Say this (proposing to co-write the brief):** you're the one who'll build the instrumentation it depends on — you can catch gaps between what it claims it'll measure and what's actually feasible, before those gaps become unanswerable two weeks into a live test.`,
      keyTerms: ['feature-flag-platform', 'experiment-brief', 'sample-ratio-mismatch'],
    },
  ],
  terms: [
    {
      id: 'ab-test',
      domain: 'pm',
      term: 'A/B test',
      moduleId: 'pm-l7',
      tier: 1,
      oneLiner: 'Randomly splitting users between a control and a variant to measure a real difference.',
      full:
        'An A/B test randomly splits real users between a control (the current experience) and one or more variants (proposed changes), measuring the difference in outcomes to determine whether a change genuinely improves a chosen metric rather than just seeming to based on gut feel or a small sample of feedback.',
      devAnalogy: 'It\'s like a controlled benchmark comparing two implementations under identical real traffic conditions, instead of trusting an isolated, unrepresentative local test.',
      leverage: 'You implement the variant and the assignment logic, which makes you the first line of defense against subtle bugs that silently invalidate the entire experiment\'s results.',
      sayThis: 'Before I build this variant, what\'s the hypothesis, and is everything we need to measure it already instrumented?',
      antiPattern: 'A variant ships based on a vague hope it\'ll be better, with no stated hypothesis or pre-decided primary metric, so whatever number moves afterward gets used to justify the decision retroactively.',
      related: ['control', 'variant', 'hypothesis'],
    },
    {
      id: 'multivariate-test',
      domain: 'pm',
      term: 'Multivariate test',
      moduleId: 'pm-l7',
      tier: 3,
      oneLiner: 'Testing multiple changed elements and their combinations at once, not just one variable.',
      full:
        'A multivariate test extends A/B testing to multiple changed elements simultaneously, testing combinations rather than a single change in isolation, which can surface interaction effects a series of single-variable tests would miss, at the cost of needing substantially more traffic to reach a reliable conclusion for every combination.',
      devAnalogy: 'It\'s like testing several interacting configuration flags together instead of one at a time, at the cost of needing far more combinations of real traffic to reach a confident conclusion about each one.',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'A team runs a multivariate test without enough traffic to reach significance on most of the resulting combinations, producing a pile of inconclusive comparisons instead of one confident answer.',
      related: ['ab-test'],
    },
    {
      id: 'control',
      domain: 'pm',
      term: 'Control',
      moduleId: 'pm-l7',
      tier: 2,
      oneLiner: 'The unchanged, current experience that every variant is measured against.',
      full:
        'The control is the unchanged, current experience serving as the baseline every variant is compared to, and its value depends entirely on being genuinely representative of "what would have happened anyway" — which requires the same random assignment and time period as the variant, not a comparison against a different historical period.',
      devAnalogy: 'It\'s like the baseline branch in a performance comparison — the number only means something if it was measured under the exact same conditions as the change being evaluated.',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'A variant\'s results get compared against last month\'s numbers instead of a true randomized control running concurrently, contaminating the comparison with any unrelated change that happened in between.',
      related: ['variant', 'ab-test'],
    },
    {
      id: 'variant',
      domain: 'pm',
      term: 'Variant',
      moduleId: 'pm-l7',
      tier: 2,
      oneLiner: 'A version being tested against the control in an experiment.',
      full:
        'A variant is any version being tested against the control in an experiment, and a well-run test starts from a specific hypothesis about what the variant should do differently, rather than a vague hope that it will simply perform better.',
      devAnalogy: 'It\'s like a feature-flagged code path being compared live against the existing implementation, rather than swapped in wholesale on faith that it\'s an improvement.',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'Several unrelated changes get bundled into a single variant, so even a clear winning result can\'t say which specific change actually drove the improvement.',
      related: ['control', 'hypothesis'],
    },
    {
      id: 'hypothesis',
      domain: 'pm',
      term: 'Hypothesis',
      moduleId: 'pm-l7',
      tier: 1,
      oneLiner: '"If we [change], then [metric] will [direction] because [reasoning]" — a falsifiable claim.',
      full:
        'A well-formed hypothesis states a specific, falsifiable claim in the form "if we [change], then [metric] will [direction] because [reasoning]," grounding the experiment in a theory of change that can itself be confirmed or refuted, rather than a vague hope that a variant will simply do better.',
      devAnalogy: 'It\'s like a specific, falsifiable bug hypothesis before debugging — "this fails because X" — rather than randomly changing code and seeing what happens to work.',
      leverage: 'You can ask for the explicit if/then/because hypothesis before building any variant, which is a specific, technically grounded request that immediately improves the quality of the resulting experiment.',
      sayThis: 'What\'s the specific hypothesis here — what change, what metric, what direction, and why do we think that\'ll happen?',
      antiPattern: '"Let\'s test moving the button and see what happens" ships as an experiment with no stated theory of change, so even a significant result teaches the team very little about why it happened.',
      related: ['primary-metric', 'guardrail-metric', 'ab-test'],
    },
    {
      id: 'primary-metric',
      domain: 'pm',
      term: 'Primary metric',
      moduleId: 'pm-l7',
      tier: 1,
      oneLiner: 'The single metric a hypothesis is actually about, decided before the experiment launches.',
      full:
        'The primary metric is the one metric an experiment\'s hypothesis is actually about, chosen before the experiment launches. Deciding it in advance matters because a team free to pick whichever metric moved favorably after the fact can almost always find something that improved by chance alone, even in a genuinely useless variant.',
      devAnalogy: 'It\'s like declaring which specific benchmark a performance change is meant to improve before running it, instead of scanning every metric afterward for one that happened to move.',
      leverage: 'You can insist the primary metric be named and instrumented before you build a variant, which prevents the experiment from being retroactively redefined around whatever happened to move.',
      sayThis: 'What\'s the primary metric, specifically, and is it already instrumented before I start building this variant?',
      antiPattern: 'An experiment\'s primary metric is quietly redefined after results come in, cherry-picking whichever number moved favorably, which turns a controlled experiment into confirmation bias with extra steps.',
      related: ['hypothesis', 'guardrail-metric'],
    },
    {
      id: 'guardrail-metric',
      domain: 'pm',
      term: 'Guardrail metric',
      moduleId: 'pm-l7',
      tier: 1,
      oneLiner: 'A secondary metric watched to catch a variant damaging something the primary metric misses.',
      full:
        'A guardrail metric is a metric watched alongside the primary one specifically to catch a variant that wins its main goal while quietly damaging something else the team cares about — a checkout redesign that lifts conversion but tanks average order value is a classic guardrail-catch scenario the primary metric alone would miss.',
      devAnalogy: 'It\'s like a set of regression checks run alongside a performance optimization, to make sure a faster path didn\'t quietly break correctness elsewhere.',
      leverage: 'You can propose the guardrail metrics for an experiment you\'re implementing, since you often have the clearest view of what else a change could plausibly affect beyond its stated goal.',
      sayThis: 'What could this variant break while it\'s busy winning on the primary metric — what should we guardrail?',
      antiPattern: 'A notification change ships after winning on short-term engagement, with nobody watching unsubscribe rate as a guardrail, and the real cost only surfaces weeks later in a completely different metric.',
      related: ['primary-metric', 'hypothesis'],
    },
    {
      id: 'statistical-significance',
      domain: 'pm',
      term: 'Statistical significance',
      moduleId: 'pm-l7',
      tier: 1,
      oneLiner: 'The claim that an observed difference is unlikely to be pure random chance.',
      full:
        'Statistical significance is the claim that an observed difference between control and variant is unlikely to have occurred by random chance alone. It says nothing about how large or practically meaningful the effect is — only that the observed gap is probably real, not noise.',
      devAnalogy: 'It\'s like a test passing consistently across many runs instead of once — evidence the result is real, not a fluke, but silent on whether the difference actually matters in practice.',
      leverage: 'You can ask whether a "significant" result is actually large enough to be worth the engineering cost of shipping and maintaining it, since significance alone never answers that question.',
      sayThis: 'This is significant, but is it big enough to be worth building and maintaining long-term?',
      antiPattern: 'A statistically significant but tiny effect gets treated as a major win, ignoring that "real" and "large enough to matter" are two entirely separate questions.',
      related: ['p-value', 'confidence-interval'],
    },
    {
      id: 'p-value',
      domain: 'pm',
      term: 'P-value',
      moduleId: 'pm-l7',
      tier: 2,
      oneLiner: 'Roughly, the odds of seeing this large a gap if there were no real effect.',
      full:
        'A p-value roughly estimates the probability of observing a difference this large, or larger, if there were truly no real difference between control and variant. A p-value below a chosen threshold, conventionally 0.05, is typically called statistically significant, though the threshold itself is a convention, not a law of nature.',
      devAnalogy: 'It\'s like a confidence score on a flaky test failure — how likely is this result to be a fluke versus a real signal — without telling you how serious the underlying issue actually is.',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'A p-value of exactly 0.049 is treated as a clear win and 0.051 as a clear loss, when the difference between them is far less meaningful than the arbitrary threshold implies.',
      related: ['statistical-significance', 'confidence-interval'],
    },
    {
      id: 'confidence-interval',
      domain: 'pm',
      term: 'Confidence interval',
      moduleId: 'pm-l7',
      tier: 2,
      oneLiner: 'A range for the true effect size, more honest than a single point estimate.',
      full:
        'A confidence interval gives a range for the true effect size rather than a single point estimate — a 95% interval of "+2% to +8%" is a more honest, more complete claim than a bare "+5%," because it shows the actual uncertainty instead of hiding it behind false precision.',
      devAnalogy: 'It\'s like reporting a latency range under load instead of a single average number that hides how much the real experience varies.',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'A promising point estimate gets reported and celebrated without mentioning its confidence interval is extremely wide, which would have signaled the result isn\'t settled yet.',
      related: ['statistical-significance', 'p-value'],
    },
    {
      id: 'minimum-detectable-effect',
      domain: 'pm',
      term: 'Minimum detectable effect',
      aliases: ['MDE'],
      moduleId: 'pm-l7',
      tier: 2,
      oneLiner: 'The smallest effect size an experiment can reliably detect, given its traffic and duration.',
      full:
        'The minimum detectable effect is decided before an experiment runs: given the available traffic and planned duration, what\'s the smallest effect size the test can reliably detect at all? A test with insufficient traffic for its MDE will report "not significant" regardless of whether the true effect is genuinely zero or a real, modest improvement.',
      devAnalogy: 'It\'s like knowing the smallest latency regression your load test setup can actually detect before running it, so you don\'t mistake "below detection threshold" for "no regression exists."',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'An experiment launches with no MDE calculation, runs for two weeks with modest traffic, and returns an ambiguous "no significant difference" that gets misread as proof the change didn\'t work.',
      related: ['statistical-power', 'underpowered-test'],
    },
    {
      id: 'statistical-power',
      domain: 'pm',
      term: 'Statistical power',
      moduleId: 'pm-l7',
      tier: 3,
      oneLiner: 'An experiment\'s actual ability to detect a real effect, if one truly exists.',
      full:
        'Statistical power is an experiment\'s ability to detect a real effect of the assumed minimum detectable effect size, depending on sample size, the chosen MDE, and the variance of the underlying metric. A test can run correctly and still be nearly incapable of finding a real, meaningful difference if it\'s underpowered for the effect size it\'s actually looking for.',
      devAnalogy: 'It\'s like the sensitivity of a monitoring alert — set too insensitive, and a real problem simply won\'t trigger it, no matter how correctly the alert itself is configured.',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'An experiment is declared inconclusive and quietly dropped, when the real issue was that it never had enough statistical power to detect an effect of the size the hypothesis actually predicted.',
      related: ['minimum-detectable-effect', 'underpowered-test'],
    },
    {
      id: 'underpowered-test',
      domain: 'pm',
      term: 'Underpowered test',
      moduleId: 'pm-l7',
      tier: 2,
      oneLiner: 'An experiment run without enough traffic or time to reliably detect its claimed effect.',
      full:
        'An underpowered test is run without enough traffic or duration to reliably detect the effect size its hypothesis is actually claiming, producing an ambiguous "not significant" result that gets misread as "the change didn\'t work" when the honest conclusion is "we couldn\'t tell either way."',
      devAnalogy: 'It\'s like running a load test with far too little traffic to expose a real bottleneck, then concluding the system has no bottleneck at all.',
      leverage: 'You can ask whether anyone calculated the required sample size for the claimed effect before an experiment launches, which is a fair, specific question that prevents a common and avoidable waste of a test cycle.',
      sayThis: 'Given our traffic, do we actually have enough power to detect the effect size this hypothesis is claiming?',
      antiPattern: 'A team runs an experiment for the standard two weeks regardless of traffic volume, without ever checking whether that duration provides enough statistical power for the effect being tested.',
      related: ['minimum-detectable-effect', 'statistical-power'],
    },
    {
      id: 'peeking-problem',
      domain: 'pm',
      term: 'Peeking problem',
      moduleId: 'pm-l7',
      tier: 1,
      oneLiner: 'Checking results early and stopping the moment they look significant, inflating false positives.',
      full:
        'The peeking problem occurs when a team checks experiment results before reaching the predetermined sample size or duration and stops early the moment a result looks significant. This inflates false positive rates, because random noise crosses a significance threshold at some point in almost any running experiment purely by chance.',
      devAnalogy: 'It\'s like stopping a flaky test the moment it happens to pass instead of letting the full suite run, mistaking a lucky moment for a stable result.',
      leverage: 'You can propose committing to a pre-decided sample size or duration before an experiment launches, which is a simple, concrete safeguard against the peeking problem that\'s easy to agree to in advance.',
      sayThis: 'Can we commit to a sample size or end date now, before we start looking, so we\'re not tempted to stop early the moment it looks good?',
      antiPattern: 'A team checks a live experiment daily and ships the variant the first day it crosses a significance threshold, without realizing that threshold-crossing moments happen by chance even for genuinely null effects.',
      related: ['statistical-significance', 'sample-ratio-mismatch'],
    },
    {
      id: 'novelty-effect',
      domain: 'pm',
      term: 'Novelty effect',
      moduleId: 'pm-l7',
      tier: 2,
      oneLiner: 'A variant performing well early simply for being new, with the lift fading over time.',
      full:
        'The novelty effect describes a variant that performs well initially simply because it\'s new and attention-grabbing, with that lift fading as users get used to it — a redesign might spike engagement in week one from pure curiosity, settling back toward or below baseline by week three.',
      devAnalogy: 'It\'s like a temporary spike in usage right after any visible change ships, driven by curiosity rather than the change actually being better, that fades once the novelty wears off.',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'A redesign\'s strong first-week engagement numbers get shipped as a permanent win without running long enough to see whether the lift was just novelty fading back to baseline.',
      related: ['primacy-effect', 'holdout-group'],
    },
    {
      id: 'primacy-effect',
      domain: 'pm',
      term: 'Primacy effect',
      moduleId: 'pm-l7',
      tier: 3,
      oneLiner: 'A variant performing worse early simply because existing users are confused by unfamiliarity.',
      full:
        'The primacy effect describes a change that initially performs worse than the control simply because existing users are confused by its unfamiliarity, with performance improving as they adjust — independent of whether the change is actually better in the long run, and the opposite pattern from a novelty effect.',
      devAnalogy: 'It\'s like a temporary support-ticket spike right after a UI change ships, caused purely by users relearning a familiar flow, that fades once they adjust.',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'A genuinely better redesign gets killed after one rough week of confused-user metrics, without anyone considering that the dip might be a fading primacy effect rather than a real problem with the change.',
      related: ['novelty-effect', 'holdout-group'],
    },
    {
      id: 'holdout-group',
      domain: 'pm',
      term: 'Holdout group',
      moduleId: 'pm-l7',
      tier: 3,
      oneLiner: 'A segment kept on the old experience long-term to measure a change\'s true durable effect.',
      full:
        'A holdout group is a segment of users deliberately kept on the old experience for an extended period, much longer than a typical experiment, specifically to measure a change\'s true long-term effect once novelty and primacy effects have fully faded — distinguishing a durable improvement from a short-term spike a standard experiment window would miss entirely.',
      devAnalogy: 'It\'s like keeping a small slice of production traffic permanently on an old code path specifically to measure long-run drift, rather than assuming a two-week comparison tells the whole story.',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'A high-stakes change rolls out to everyone based purely on a two-week experiment, with no holdout group to confirm the improvement is durable once novelty effects fade months later.',
      related: ['novelty-effect', 'primacy-effect'],
    },
    {
      id: 'sample-ratio-mismatch',
      domain: 'pm',
      term: 'Sample ratio mismatch',
      aliases: ['SRM'],
      moduleId: 'pm-l7',
      tier: 1,
      oneLiner: 'When the actual traffic split between control and variant doesn\'t match the intended split.',
      full:
        'A sample ratio mismatch occurs when the actual traffic split between control and variant doesn\'t match the intended split — 45/55 instead of 50/50 — which almost always indicates a bug in randomization or assignment logic rather than a legitimate finding, and it silently invalidates the experiment\'s results if it goes unnoticed.',
      devAnalogy: 'It\'s like a load balancer silently sending traffic unevenly to two backend versions when it was configured for an even split — a bug in the routing, not a signal about which backend is better.',
      leverage: 'You are usually the first person able to check whether the actual assignment split matches the intended one, since you implemented the assignment logic — checking for SRM should be routine before trusting any result.',
      sayThis: 'Before we interpret this result, can we confirm the actual traffic split matches what we intended — has anyone checked for a sample ratio mismatch?',
      antiPattern: 'An experiment\'s results get analyzed and shipped on without ever checking whether the actual traffic split matched the intended one, missing a silent assignment bug that invalidated the whole comparison.',
      related: ['peeking-problem', 'feature-flag-platform'],
    },
    {
      id: 'feature-flag-platform',
      domain: 'pm',
      term: 'Feature-flag platform',
      moduleId: 'pm-l7',
      tier: 2,
      oneLiner: 'Infrastructure for defining variants, assigning users consistently, and reporting results.',
      full:
        'A feature-flag platform is dedicated infrastructure for defining experiment variants, assigning users to them consistently across sessions, targeting specific segments, and reporting results — distinct from a simple rollout flag, since a genuine experiment needs sticky assignment and properly logged assignment events for later analysis.',
      devAnalogy: 'It\'s like the difference between an ad hoc if-statement and a real, purpose-built experimentation service — the latter guarantees the consistent assignment and logging a valid experiment actually depends on.',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'A rollout-style flag with no consistent, sticky assignment is reused for an actual experiment, and users flip between control and variant across sessions, contaminating the comparison the experiment was supposed to make.',
      related: ['sample-ratio-mismatch', 'experiment-brief'],
    },
    {
      id: 'experiment-brief',
      domain: 'pm',
      term: 'Experiment brief',
      moduleId: 'pm-l7',
      tier: 1,
      oneLiner: 'The document stating hypothesis, primary metric, guardrails, and decision rule before building.',
      full:
        'An experiment brief ties an experiment together into something a team can execute and later evaluate honestly: the hypothesis, primary metric, guardrail metrics, minimum detectable effect, included segments, and the planned decision rule — all written before implementation, which prevents deciding what counts as success only after seeing which outcome is most convenient.',
      devAnalogy: 'It\'s like a design doc written before implementation instead of after — it forces the key decisions into the open while they\'re still cheap to change, rather than reconstructing them retroactively to justify what shipped.',
      leverage: 'You can propose writing, or co-writing, the experiment brief for a UI change you\'re implementing, which positions you to catch gaps between what the brief claims it\'ll measure and what\'s actually feasible to measure.',
      sayThis: 'Can we write the experiment brief together before I start, so we agree on the decision rule before we see any results?',
      antiPattern: 'An experiment\'s "we\'ll measure engagement" plan turns out, mid-test, to have no specific event or window defined, and the team realizes only after two weeks that they can\'t actually answer their own question.',
      related: ['hypothesis', 'primary-metric', 'guardrail-metric'],
    },
  ],
  quiz: [
    {
      kind: 'mcq',
      id: 'pm-l7-q1',
      prompt: 'What makes "if we move the CTA above the fold, then signup conversion will increase, because users don\'t scroll far enough to see it" a real hypothesis?',
      options: [
        'It mentions a UI element',
        'It states a specific change, a specific metric and direction, and a stated reasoning that could itself be wrong in an informative way',
        'It is phrased as a question',
        'It avoids naming any metric at all',
      ],
      answer: 1,
      explain: 'A well-formed hypothesis names the change, the metric, the expected direction, and the reasoning behind it — all of which make the claim falsifiable and genuinely informative regardless of the outcome.',
    },
    {
      kind: 'mcq',
      id: 'pm-l7-q2',
      prompt: 'Why is choosing a primary metric before an experiment launches important?',
      options: [
        'It\'s a legal requirement in most companies',
        'A team free to pick whichever metric moved favorably after the fact can almost always find something that improved by chance, even in a useless variant',
        'It has no real effect on the experiment\'s validity',
        'It only matters for multivariate tests, not simple A/B tests',
      ],
      answer: 1,
      explain: 'Deciding the primary metric in advance prevents the team from cherry-picking whichever metric happened to move favorably after seeing the results, which would otherwise turn a controlled experiment into confirmation bias.',
    },
    {
      kind: 'scenario',
      id: 'pm-l7-q3',
      prompt: 'A checkout redesign wins on conversion rate but nobody is watching average order value. What\'s missing?',
      options: [
        'A larger sample size',
        'A guardrail metric, which would catch the variant winning on its primary goal while potentially damaging something else the team cares about',
        'A confidence interval',
        'A holdout group',
      ],
      answer: 1,
      explain: 'This is exactly the scenario a guardrail metric is meant to catch — a variant that wins its stated goal while quietly damaging something else, which the primary metric alone would never reveal.',
    },
    {
      kind: 'mcq',
      id: 'pm-l7-q4',
      prompt: 'What does statistical significance actually tell you, and what does it NOT tell you?',
      options: [
        'It tells you the effect is real and also how large or meaningful it is',
        'It tells you the observed difference is unlikely to be random chance, but says nothing about whether the effect is large enough to matter',
        'It tells you the effect is definitely false',
        'It only applies to guardrail metrics, not primary metrics',
      ],
      answer: 1,
      explain: 'Statistical significance addresses whether an effect is probably real, not whether it\'s big enough to be worth acting on — a tiny but statistically real effect can still be too small to justify the engineering cost of shipping it.',
    },
    {
      kind: 'scenario',
      id: 'pm-l7-q5',
      prompt: 'An experiment reports "not significant" after two weeks on a low-traffic page. What\'s the most likely honest interpretation?',
      options: [
        'The change definitely had no effect',
        'The test may have been underpowered for its minimum detectable effect, meaning the honest conclusion is "we couldn\'t tell," not "it didn\'t work"',
        'The hypothesis must have been poorly written',
        'The guardrail metric was violated',
      ],
      answer: 1,
      explain: 'Low traffic on a page can produce an underpowered test that\'s functionally incapable of detecting a real, modest effect — "not significant" in that context means "we couldn\'t tell," not "no effect exists."',
    },
    {
      kind: 'mcq',
      id: 'pm-l7-q6',
      prompt: 'Why does checking experiment results daily and stopping the moment they look significant cause a problem?',
      options: [
        'It has no real downside as long as the result is eventually significant',
        'This is the peeking problem — random noise crosses a significance threshold at some point in almost any running experiment by chance, so stopping there inflates false positives',
        'It only matters for multivariate tests',
        'It is required by most statistical methods',
      ],
      answer: 1,
      explain: 'The peeking problem inflates false positive rates because noise alone will cross a significance threshold at some point during a running experiment; stopping the moment that happens isn\'t measuring a stable effect.',
    },
    {
      kind: 'mcq',
      id: 'pm-l7-q7',
      prompt: 'What distinguishes a novelty effect from a primacy effect?',
      options: [
        'A novelty effect is a temporary lift from a change being new; a primacy effect is a temporary dip from users being confused by unfamiliarity',
        'They are two names for the exact same phenomenon',
        'A primacy effect only applies to pricing pages',
        'A novelty effect always signals a genuinely worse variant',
      ],
      answer: 0,
      explain: 'Novelty and primacy effects pull in opposite directions early in an experiment\'s life — one from curiosity temporarily inflating engagement, the other from confusion temporarily suppressing it — and both fade over time.',
    },
    {
      kind: 'scenario',
      id: 'pm-l7-q8',
      prompt: 'An experiment shows a 45/55 split instead of the intended 50/50. What should happen next?',
      options: [
        'Interpret the results as usual, since a small imbalance rarely matters',
        'Treat it as a likely sample ratio mismatch caused by an assignment bug, and investigate before trusting any result from the experiment',
        'Immediately ship the variant that received more traffic',
        'Assume the guardrail metric failed',
      ],
      answer: 1,
      explain: 'A sample ratio mismatch almost always indicates a bug in randomization or assignment logic, and it silently invalidates the comparison if it goes unchecked — it should be investigated before trusting any result.',
    },
    {
      kind: 'match',
      id: 'pm-l7-q9',
      prompt: 'Match each term to its correct description.',
      pairs: [
        ['Minimum detectable effect', 'The smallest effect size an experiment can reliably detect'],
        ['Holdout group', 'A segment kept on the old experience long-term to measure durable impact'],
        ['Experiment brief', 'The document stating hypothesis, metrics, and decision rule in advance'],
        ['Feature-flag platform', 'Infrastructure for consistent variant assignment and result reporting'],
      ],
      explain: 'These four terms are the operational backbone of running a trustworthy experiment, from planning through execution to long-term verification.',
    },
    {
      kind: 'scenario',
      id: 'pm-l7-q10',
      prompt: 'A team wants to A/B test a change affecting 0.1% of total traffic, with no realistic path to significance within a year. What\'s the better move?',
      options: [
        'Run the A/B test anyway for as long as it takes',
        'Recognize this as a case where A/B testing is the wrong tool, and consider a cheaper validation method or just ship the change if the direction is uncontroversial',
        'Increase the sample size by including unrelated traffic',
        'Lower the significance threshold until the test passes',
      ],
      answer: 1,
      explain: 'Not every change should be A/B tested — extremely low-traffic changes may never reach significance in a reasonable timeframe, and recognizing that is as valuable a skill as running a good experiment.',
    },
  ],
  exercise: {
    id: 'pm-l7-exercise',
    title: 'Write an experiment brief for a UI change you\'d like to make',
    prompt: `Pick a UI change you genuinely believe would improve something — real or hypothetical, but specific.

Write a one-paragraph **experiment brief** covering: the **hypothesis** in if/then/because form, the **primary metric** and how it's currently tracked (or would need to be), one **guardrail metric** that could plausibly be damaged by this change even if the primary metric improves, and a rough guess at the **minimum detectable effect** you'd need to see for this to be worth shipping, given your best estimate of available traffic.

Then write one sentence stating your **decision rule**: what specific result would make you ship it, keep the control, or extend the test.`,
    scaffold: `Change: ______________________________________________________

Hypothesis:
If we ______________________________________________________,
then _______________________________________________________
will _______________________________________________________
because ____________________________________________________.

Primary metric: ______________________________________________
Currently tracked? (yes/no, and how): ________________________

Guardrail metric: ____________________________________________
Why this could be damaged even if the primary metric wins: ___

Minimum detectable effect (rough guess): _____________________

Decision rule: ________________________________________________
`,
    rubric: [
      'The hypothesis follows the if/then/because shape and names a specific direction, not just "will improve"',
      'The guardrail metric is genuinely plausible, not a token afterthought unrelated to the actual risk',
      'The minimum detectable effect estimate is grounded in a real guess about traffic, not skipped entirely',
      'The decision rule states a specific result that would trigger shipping, not shipping, or extending the test',
    ],
  },
};
