import type { Module } from '../../types';

export const module: Module = {
  id: 'pm-l9',
  domain: 'pm',
  order: 9,
  title: 'Go-to-market & lifecycle',
  subtitle: 'Launch tiers, design partners, enablement, changelogs, and voice-of-customer loops.',
  why:
    'Launch tiers determine your polish budget, and the beta-to-GA ladder tells you exactly how scrutinized your work will be — knowing where a feature sits on that ladder changes what "done" should actually mean for it.',
  estMinutes: 55,
  lessons: [
    {
      id: 'pm-l9-lesson-1',
      title: 'Launch tiers and the beta-to-GA ladder: what "done" actually means',
      body: `A **launch tier** is a company's internal classification of how significant a release is — Tier 1 (major, cross-functional), Tier 2 (notable), Tier 3 (minor, changelog line only). Not every feature deserves, or can sustainably get, the same cross-functional attention.

> **Why it matters to you:** it tells you how much polish, edge-case coverage, and documentation is actually proportionate. Over-polishing Tier 3 wastes effort; under-polishing Tier 1 creates a visible gap between the announcement and the shipped reality.

### The beta-to-GA ladder is a scrutiny scale, not a readiness scale

\`\`\`mermaid
flowchart LR
  A["Private beta\\nsmall group,\\nexplicitly unfinished"] --> B["Early access\\nwider pool,\\nfirmer commitment"]
  B --> C["General availability\\nproduction-grade,\\nfull support"]
\`\`\`

- **Private beta** — small, hand-selected, explicitly framed as likely to change. Buys real latitude to break things and iterate without reputational cost.
- **Early access program** — wider pool, firmer commitment, still lower polish expectations than GA.
- **General availability (GA)** — genuine expectation of production reliability, complete docs, full support. No more "still working on X."

⚠️ **The trap:** a feature can be technically finished — every test passing — and still wrong for GA, because GA isn't a statement about the code. It's a statement about organizational readiness: does support know how to handle tickets, does sales know how to position it, does documentation cover edge cases a beta's forgiving user group never triggered.

A **design partner** — a customer working closely with the team during early development — is valuable specifically during private beta because they surface exactly these organizational-readiness gaps, using the product the way a real, less forgiving customer eventually will.

> **Ask this:** "Which rung of the ladder is this feature actually on?" Polishing every edge case for a private beta that's expected to change is wasted effort. Shipping GA with known rough edges because "it's basically the beta plus a flag flip" is a real, visible risk support and sales will feel first.`,
      keyTerms: ['launch-tier', 'private-beta', 'early-access-program', 'general-availability', 'design-partner'],
    },
    {
      id: 'pm-l9-lesson-2',
      title: 'Enablement: why support and sales need lead time you might not think to give them',
      body: `**Enablement** prepares customer-facing teams — support, sales, customer success — with what they need to do their job on a new feature: what it does, who it's for, how to demo it, known limitations, predictable customer questions.

⚠️ Enablement is frequently squeezed into the days before launch. A support team learning about a feature the same day customers do gives worse, slower, less consistent answers.

**Product marketing** owns the enablement materials (one-pagers, demo scripts, FAQs) — but the raw information often has to come from engineering, since product marketing rarely has deep enough visibility into edge cases and failure modes to write accurate material alone.

> **A confidently-wrong support answer is usually a symptom of enablement material written without engineering input** — not a training failure on support's part.

> **Say this (proactively, near launch):** offer to write a short "known limitations and edge cases" doc for enablement. Small time investment, measurably better launch experience.

### Where this feeds downstream

- **Customer success** owns the ongoing relationship after the sale — distinct from support, which reacts to specific issues.
- A **health score** flags accounts at risk of churning or ripe for expansion — usually built from usage patterns, ticket volume/sentiment, engagement trends. Your tracking-plan decisions feed these scores, whether you ever see the downstream use or not.
- A **QBR** (Quarterly Business Review) is a structured check-in for larger accounts, reviewing usage/outcomes/roadmap alignment directly with the customer — one of the main channels real feedback reaches product in the first place.

A launch that goes poorly for one enterprise customer doesn't just generate a ticket — it can resurface, amplified, in a QBR months later as a renewal-risk conversation.`,
      keyTerms: ['enablement', 'product-marketing', 'customer-success', 'health-score', 'qbr'],
    },
    {
      id: 'pm-l9-lesson-3',
      title: 'Changelogs and in-app messaging: the announcement is also a product surface',
      body: `A **changelog** is the running public record of what shipped and when; **release notes** are the write-up for one specific release. These read as documentation but function as a real product surface:

| Too technical | Too vague |
|---|---|
| Loses non-technical users who'd benefit but don't recognize the jargon | "Various improvements and bug fixes" fails power users tracking exactly what changed |

**In-app messaging** (banners, tooltips, modals, changelog widgets) puts an announcement in front of a user at the moment they're using the relevant part of the product — more effective than an email competing with an inbox.

⚠️ **The tradeoff:** it's also the easiest surface to overuse into noise. Five unrelated banners in one session trains users to dismiss everything, destroying the channel for every future announcement — including the important ones.

> **This needs real design treatment, not a checkbox:**
> - Frequency capping — don't stack unrelated announcements in one session
> - Relevance targeting — show it only to users who'd plausibly care
> - Genuine dismissibility — respected afterward, not reappearing every session

Getting this system right once, as reusable infrastructure, matters more than any single announcement it carries.

### Voice of customer and the feedback loop

**Voice of customer (VoC)** systematically collects and routes feedback from every channel — tickets, QBRs, sales calls, in-app surveys, reviews — instead of letting it scatter across disconnected tools where the same feedback gets rediscovered independently by three teams in three quarters.

A **feedback loop** closes the circuit by telling customers their feedback led to a real change — "you asked, we built it" — which measurably increases willingness to keep giving feedback. Feedback that disappears into a void trains customers to stop bothering.

**Roadmap confidence level** states how firm a commitment actually is. "This is planned for next quarter" and "this is something we're exploring" carry very different implied commitment — conflating the two, even unintentionally, is one of the most common ways a customer ends up feeling genuinely misled.`,
      keyTerms: ['changelog', 'release-notes', 'in-app-messaging', 'voice-of-customer', 'feedback-loop', 'roadmap-confidence-level'],
    },
    {
      id: 'pm-l9-lesson-4',
      title: 'Sunsetting well: the underrated skill of ending something responsibly',
      body: `Every product accumulates features that outlive their usefulness. How a company handles removing them says as much about product maturity as how it handles shipping — arguably more, since a launch starts with goodwill and a deprecation starts by taking something away.

A **sunset notice** is the formal advance communication that a feature/API/product is being discontinued.

> **The one variable that determines the reaction: lead time.**
> - Real advance warning + a clear migration path reads as responsible stewardship.
> - Two weeks' notice + no alternative reads as abandonment — even with identical underlying reasoning.

A **migration path** is the concrete plan for how affected users move to the replacement. "Here's the new thing, figure it out yourself" isn't a migration path — it's a sunset notice wearing one's name.

A real migration path has:

- A specific timeline
- Direct assistance or tooling for the transition
- A real answer for users whose use case doesn't map cleanly onto the replacement — the piece most often skipped under time pressure

### The connection to product debt

**Product debt**: a feature that should've been sunsetted but lingers because nobody wants to own the uncomfortable, low-glory work of running a proper deprecation. Every flag or legacy flow that persists past its useful life adds compounding maintenance surface while providing shrinking value.

> **Say this:** proposing and driving a well-run deprecation — real timeline, real communication, real migration path — is one of the more underrated ways to demonstrate product judgment. It's unglamorous work most people avoid volunteering for, which is exactly what makes doing it well a rare, valued signal.`,
      keyTerms: ['sunset-notice', 'migration-path', 'product-debt'],
    },
  ],
  terms: [
    {
      id: 'launch-tier',
      domain: 'pm',
      term: 'Launch tier',
      moduleId: 'pm-l9',
      tier: 1,
      oneLiner: 'A company\'s internal classification of how significant a release is, from minor to major.',
      full:
        'A launch tier classifies a release\'s significance — Tier 1 major and company-wide, down to Tier 3 minor with just a changelog line — determining how much cross-functional coordination and polish is proportionate. Over-polishing a low-tier launch wastes effort; under-polishing a high-tier one creates a visible gap between the announcement\'s ambition and the shipped reality.',
      devAnalogy: 'It\'s like a change-severity classification for a deploy — a hotfix and a major version bump both ship code, but they deserve very different amounts of process and scrutiny.',
      leverage: 'You can ask what launch tier a feature is before deciding how much polish and edge-case coverage is actually proportionate to invest, rather than guessing or defaulting to maximum effort every time.',
      sayThis: 'What launch tier is this — does that change how much polish is actually worth investing before we ship?',
      antiPattern: 'A Tier 3 internal-facing tweak gets weeks of polish that a Tier 1 launch needed more urgently, while the actual major release ships with rough edges because the effort was misallocated.',
      related: ['private-beta', 'general-availability', 'early-access-program'],
    },
    {
      id: 'general-availability',
      domain: 'pm',
      term: 'General availability',
      aliases: ['GA'],
      moduleId: 'pm-l9',
      tier: 1,
      oneLiner: 'The point where a feature is available to all eligible customers with production-grade expectations.',
      full:
        'General availability is the point where a feature is available to all eligible customers with a genuine expectation of production-grade reliability, complete documentation, and full support coverage. GA is a statement about organizational readiness, not just code readiness — whether support, sales, and documentation are actually prepared, not just whether the tests pass.',
      devAnalogy: 'It\'s like promoting a feature flag from an internal-only rollout to 100% of production traffic with no remaining caveats — a statement of full confidence, not a technical detail.',
      leverage: 'You can flag when a feature is technically finished but organizationally unready for GA — support untrained, documentation missing — since that gap is a real, visible risk independent of code quality.',
      sayThis: 'The code is ready, but is support actually prepared to handle tickets on this before we call it GA?',
      antiPattern: 'A feature is technically finished and pushed to GA, but support has no documentation and hasn\'t been briefed, so early tickets get inconsistent, sometimes wrong answers.',
      related: ['launch-tier', 'private-beta', 'early-access-program'],
    },
    {
      id: 'private-beta',
      domain: 'pm',
      term: 'Private beta',
      moduleId: 'pm-l9',
      tier: 2,
      oneLiner: 'A small, hand-selected group given access, explicitly framed as unfinished and likely to change.',
      full:
        'A private beta offers a feature to a small, often hand-selected group of users, explicitly framed as unfinished and likely to change. This framing buys the team real latitude to break things, gather feedback, and iterate quickly, without the reputational cost of those changes hitting a broader customer base or being treated as broken promises.',
      devAnalogy: 'It\'s like a feature deployed only to internal or opt-in users with clear "this will change" expectations set, giving room to break things safely before wider exposure.',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'A private beta group is treated the same as GA customers in terms of stability commitments, defeating the entire point of having a low-scrutiny space to iterate freely.',
      related: ['general-availability', 'design-partner'],
    },
    {
      id: 'early-access-program',
      domain: 'pm',
      term: 'Early access program',
      aliases: ['EAP'],
      moduleId: 'pm-l9',
      tier: 3,
      oneLiner: 'A wider pool than beta, signaling a firmer commitment but still lower completeness expectations.',
      full:
        'An early access program widens the beta pool somewhat and usually signals a firmer commitment to shipping something close to the current shape, but still carries lower expectations around completeness and polish than a fully general release, sitting between private beta and GA on the maturity ladder.',
      devAnalogy: 'It\'s like a release candidate available to a broader audience than an internal alpha, but still explicitly not the final, fully supported release.',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'An early access program is marketed with GA-level confidence and polish claims, setting expectations the feature\'s actual maturity can\'t yet support.',
      related: ['private-beta', 'general-availability'],
    },
    {
      id: 'design-partner',
      domain: 'pm',
      term: 'Design partner',
      moduleId: 'pm-l9',
      tier: 2,
      oneLiner: 'A customer who works closely with the team during early development in exchange for influence.',
      full:
        'A design partner is a customer who works closely with a team during early development, often in exchange for early access and real influence over direction. Design partners are especially valuable during private beta because they surface organizational-readiness gaps a purely internal QA pass would miss, using the product the way a real, less forgiving customer eventually will.',
      devAnalogy: 'It\'s like a trusted early adopter of a library who reports real integration friction before the public API is finalized, catching issues an internal test suite alone would never surface.',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'A team skips design partners entirely and relies only on internal QA before a major launch, missing the exact class of real-world integration issues design partners are best positioned to surface.',
      related: ['private-beta', 'general-availability'],
    },
    {
      id: 'enablement',
      domain: 'pm',
      term: 'Enablement',
      moduleId: 'pm-l9',
      tier: 1,
      oneLiner: 'Preparing support, sales, and success teams with what they need before a feature launches.',
      full:
        'Enablement prepares customer-facing teams — support, sales, customer success — with the knowledge and materials needed to actually do their jobs on a new feature. It\'s frequently squeezed into the days right before launch, and that timing mismatch is one of the most common, avoidable sources of a bad launch experience.',
      devAnalogy: 'It\'s like writing real documentation and runbooks before an on-call team needs to handle a new service, instead of expecting them to reverse-engineer behavior from an incident.',
      leverage: 'You can proactively offer to write a short "known limitations and edge cases" doc for enablement before launch, which is a small investment that measurably improves the actual customer experience around launch.',
      sayThis: 'Before this ships, can I write a short known-limitations doc for support, so they\'re not guessing when tickets come in?',
      antiPattern: 'Support learns about a new feature the same day customers do, and a specific wrong answer to an early ticket gets escalated, all because enablement material was written without real engineering input.',
      related: ['product-marketing', 'launch-tier'],
    },
    {
      id: 'product-marketing',
      domain: 'pm',
      term: 'Product marketing',
      moduleId: 'pm-l9',
      tier: 3,
      oneLiner: 'The function responsible for enablement material, positioning, and launch messaging.',
      full:
        'Product marketing is the function most directly responsible for creating enablement material — one-pagers, demo scripts, FAQs, competitive positioning — but the raw information those materials are built from very often has to come from engineering, since product marketing rarely has deep enough technical visibility into a feature\'s real edge cases and limitations on its own.',
      devAnalogy: 'It\'s like a technical writer who needs direct input from the engineer who built a system to write documentation that\'s actually accurate, rather than guessing from the outside.',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'Product marketing writes launch messaging with no direct engineering input, and the resulting claims about a feature\'s capabilities turn out to be subtly inaccurate once real customers start using it.',
      related: ['enablement'],
    },
    {
      id: 'customer-success',
      domain: 'pm',
      term: 'Customer success',
      moduleId: 'pm-l9',
      tier: 3,
      oneLiner: 'The team responsible for a customer\'s ongoing relationship and outcomes after the sale.',
      full:
        'Customer success is responsible for a customer\'s ongoing relationship and outcomes after the sale closes, distinct from support, which typically responds reactively to specific issues. Product usage data frequently feeds directly into customer success workflows like health scoring, connecting your instrumentation decisions to teams you may never directly interact with.',
      devAnalogy: 'It\'s like a proactive monitoring team that watches account health trends over time, distinct from an on-call team that only responds to specific alerts as they fire.',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'A product usage signal that customer success relies on for health scoring silently breaks after a frontend refactor, and nobody realizes until account health data has been wrong for weeks.',
      related: ['health-score', 'qbr'],
    },
    {
      id: 'health-score',
      domain: 'pm',
      term: 'Health score',
      moduleId: 'pm-l9',
      tier: 3,
      oneLiner: 'A composite metric flagging accounts at risk of churning or ripe for expansion.',
      full:
        'A health score is a composite metric customer success teams use to flag accounts at risk of churning or ripe for expansion, typically built from usage patterns, support ticket volume and sentiment, and engagement trends. Product usage data instrumented for entirely different purposes is frequently a core input, linking tracking-plan decisions to downstream customer success workflows.',
      devAnalogy: 'It\'s like a composite alerting score built from multiple underlying signals, rather than a single metric — its accuracy depends entirely on the quality of each input feeding it.',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'A health score quietly degrades in accuracy after an underlying usage event stops firing correctly, and customer success acts on stale, misleading signals without realizing the input broke.',
      related: ['customer-success', 'qbr'],
    },
    {
      id: 'qbr',
      domain: 'pm',
      term: 'QBR',
      aliases: ['Quarterly Business Review'],
      moduleId: 'pm-l9',
      tier: 3,
      oneLiner: 'A recurring, structured check-in reviewing usage, outcomes, and roadmap with a customer.',
      full:
        'A QBR is a recurring, structured check-in, typically for larger accounts, where customer success reviews usage, outcomes, and roadmap alignment directly with the customer. QBRs are one of the main channels through which real customer feedback and specific requests reach a product organization in the first place.',
      devAnalogy: 'It\'s like a regular architecture review with a key stakeholder, where recent decisions and upcoming plans get checked against real, ongoing needs rather than assumed to still be aligned.',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'A rough launch experience for one enterprise customer resurfaces months later, amplified, as a renewal-risk conversation in a QBR, connecting a small early gap to a much larger business outcome.',
      related: ['customer-success', 'health-score', 'voice-of-customer'],
    },
    {
      id: 'changelog',
      domain: 'pm',
      term: 'Changelog',
      moduleId: 'pm-l9',
      tier: 2,
      oneLiner: 'The running, typically public record of what shipped and when.',
      full:
        'A changelog is the running, typically public record of what shipped and when. It functions as a real product surface with genuine UX stakes — too technical loses non-technical users who\'d benefit from a feature, too vague fails the vocal group of power users who specifically track changelogs to understand exactly what changed.',
      devAnalogy: 'It\'s like a well-maintained CHANGELOG.md for a library — useful only if entries are specific enough to actually tell a reader what changed and why it matters to them.',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'A changelog entry reads "various improvements and bug fixes" for a genuinely significant change, failing the specific audience of power users who rely on changelogs for real detail.',
      related: ['release-notes', 'in-app-messaging'],
    },
    {
      id: 'release-notes',
      domain: 'pm',
      term: 'Release notes',
      moduleId: 'pm-l9',
      tier: 3,
      oneLiner: 'The specific write-up for one particular release or feature within a changelog.',
      full:
        'Release notes are the specific write-up for one particular release or feature, typically appearing as an entry within a broader changelog, and their clarity directly determines whether users understand what changed and whether it affects them.',
      devAnalogy: 'It\'s like a single, well-written pull request description within a larger release changelog, specific enough to stand on its own.',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'Release notes are written in internal jargon that made sense to the team that shipped the feature but means nothing to the customer reading them.',
      related: ['changelog'],
    },
    {
      id: 'in-app-messaging',
      domain: 'pm',
      term: 'In-app messaging',
      moduleId: 'pm-l9',
      tier: 1,
      oneLiner: 'Banners, tooltips, and modals that announce something at the moment a user is actually there.',
      full:
        'In-app messaging puts an announcement in front of a user at the moment they\'re actually using the relevant part of the product, generally more effective than email. It\'s also the easiest surface to overuse into resented noise, requiring frequency capping, relevance targeting, and genuinely respected dismissibility to stay valuable.',
      devAnalogy: 'It\'s like a targeted, rate-limited notification system rather than a broadcast channel — the value depends entirely on relevance and restraint, not just delivery capability.',
      leverage: 'You can build in-app messaging as reusable infrastructure with frequency capping and real dismissibility, which is a higher-leverage investment than any single announcement it will carry.',
      sayThis: 'Before we add another banner, does our messaging system actually cap frequency and respect dismissal, or will this just add to the noise?',
      antiPattern: 'A product shows five unrelated announcement banners in a single session, training users to reflexively dismiss all of them without reading a single one, including genuinely important future announcements.',
      related: ['changelog', 'feedback-loop'],
    },
    {
      id: 'voice-of-customer',
      domain: 'pm',
      term: 'Voice of customer',
      aliases: ['VoC'],
      moduleId: 'pm-l9',
      tier: 2,
      oneLiner: 'Systematically collecting and routing customer feedback from every channel into one actionable form.',
      full:
        'Voice of customer is the discipline of systematically collecting, organizing, and routing customer feedback from every channel it arrives through — support, QBRs, sales calls, reviews — into a form product teams can actually act on, rather than letting it scatter across disconnected tools where the same feedback gets independently rediscovered repeatedly.',
      devAnalogy: 'It\'s like centralizing scattered error reports from multiple monitoring tools into one dashboard, instead of each team independently rediscovering the same underlying issue.',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'The same specific piece of customer feedback gets independently rediscovered by three different teams across three different quarters because no shared VoC system routes it anywhere central.',
      related: ['feedback-loop', 'qbr'],
    },
    {
      id: 'feedback-loop',
      domain: 'pm',
      term: 'Feedback loop',
      moduleId: 'pm-l9',
      tier: 2,
      oneLiner: 'Informing customers when their feedback actually led to a real change.',
      full:
        'A feedback loop closes the circuit by informing customers when their feedback actually led to a real change — "you asked, we built it" — which measurably increases customers\' willingness to keep giving feedback, since feedback that visibly disappears into a void trains customers to stop bothering.',
      devAnalogy: 'It\'s like closing a bug report with a comment linking the fix, instead of silently resolving it with no visible connection back to the original report.',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'A customer\'s specific feature request quietly ships months later with no acknowledgment connecting it back to their original feedback, and they never learn their input actually mattered.',
      related: ['voice-of-customer'],
    },
    {
      id: 'roadmap-confidence-level',
      domain: 'pm',
      term: 'Roadmap confidence level',
      moduleId: 'pm-l9',
      tier: 2,
      oneLiner: 'An explicit statement of how firm a customer-facing roadmap commitment actually is.',
      full:
        'Roadmap confidence level is an explicit statement of how firm a roadmap commitment actually is, closely related to Now/Next/Later but applied specifically to external, customer-facing communication. Conflating "actively exploring" with "planned for next quarter" in what a customer hears is one of the most common, avoidable sources of a customer feeling genuinely misled.',
      devAnalogy: 'It\'s like clearly labeling an API as experimental versus stable, so callers know exactly how much to rely on it before building against it.',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'A customer hears "this is planned for next quarter" in a QBR when the internal reality was "we\'re exploring this," and the resulting gap between expectation and delivery reads as a broken promise.',
      related: ['now-next-later', 'voice-of-customer'],
    },
    {
      id: 'sunset-notice',
      domain: 'pm',
      term: 'Sunset notice',
      moduleId: 'pm-l9',
      tier: 1,
      oneLiner: 'Formal, advance communication that a feature or product is being discontinued.',
      full:
        'A sunset notice is the formal, advance communication that a feature, API version, or product is being discontinued. Lead time is the single variable that determines whether a sunset generates goodwill-preserving relief or genuine anger — the same underlying decision reads completely differently depending on how much warning and support accompanies it.',
      devAnalogy: 'It\'s like a deprecation warning with a real removal date, published well ahead of the actual breaking change, instead of a version bump that silently removes something overnight.',
      leverage: 'You can push for real lead time on any sunset notice you\'re implementing, since the difference between two weeks\' notice and a proper runway is what determines whether users feel abandoned.',
      sayThis: 'Does this sunset notice give real lead time and a working migration path, or are we announcing a removal with nowhere for affected users to go?',
      antiPattern: 'A feature is discontinued with two weeks\' notice and no real alternative, and the underlying business reasoning being sound doesn\'t stop it from reading as an abandonment of the customer relationship.',
      related: ['migration-path', 'product-debt'],
    },
    {
      id: 'migration-path',
      domain: 'pm',
      term: 'Migration path',
      moduleId: 'pm-l9',
      tier: 1,
      oneLiner: 'The concrete plan for how affected users move from a sunsetting feature to its replacement.',
      full:
        'A migration path is the concrete, specific plan for how affected users move from a sunsetting feature to its replacement, and its quality determines whether a deprecation is experienced as a minor inconvenience or a genuine breach of trust. "Here\'s the new thing, figure it out yourself" is a sunset notice wearing a migration path\'s name, not a real one.',
      devAnalogy: 'It\'s like a real codemod and migration guide for a breaking API change, versus just announcing the breaking change and leaving every caller to figure out the fix independently.',
      leverage: 'You are often the one who understands exactly which edge cases won\'t map cleanly onto a replacement — surfacing those early is what turns a generic migration plan into one that actually works for every affected user.',
      sayThis: 'What happens to the users whose specific setup doesn\'t map cleanly onto the replacement — do we have a real answer for them?',
      antiPattern: 'A migration path covers the common case well but silently leaves users with edge-case setups to discover, on their own, that they have no real path forward at all.',
      related: ['sunset-notice', 'product-debt'],
    },
  ],
  quiz: [
    {
      kind: 'mcq',
      id: 'pm-l9-q1',
      prompt: 'Why might over-polishing a Tier 3 launch actually be a mistake?',
      options: [
        'Because Tier 3 features are never worth building',
        'Because it invests effort disproportionate to the launch\'s significance, effort that a higher-tier launch may have needed more urgently',
        'Because Tier 3 features are always deprecated within a year',
        'Because launch tiers don\'t affect how much polish is appropriate',
      ],
      answer: 1,
      explain: 'Launch tier is meant to calibrate proportionate investment — spending disproportionate polish on a minor launch can starve a higher-tier launch that actually needed that attention more.',
    },
    {
      kind: 'mcq',
      id: 'pm-l9-q2',
      prompt: 'Why is general availability described as a statement about organizational readiness, not just code readiness?',
      options: [
        'Because GA has nothing to do with the code at all',
        'Because a feature can be technically finished while support, documentation, and sales are still unprepared to handle it well',
        'Because GA only applies to internal tools',
        'Because organizational readiness is measured purely by test coverage',
      ],
      answer: 1,
      explain: 'A feature passing every test can still be wrong for GA if support has no documentation or training on it — GA is fundamentally about whether the whole organization, not just the code, is ready.',
    },
    {
      kind: 'scenario',
      id: 'pm-l9-q3',
      prompt: 'A feature launches to GA and support starts giving customers confidently wrong answers about its behavior. What\'s the most likely root cause?',
      options: [
        'The feature has a critical bug',
        'Enablement material was likely written without real engineering input, or support wasn\'t given enough lead time to actually absorb it',
        'The launch tier was set too high',
        'The changelog entry was too detailed',
      ],
      answer: 1,
      explain: 'Confidently wrong customer-facing answers are a classic symptom of enablement material written without direct engineering input, or of support learning about a feature too close to launch to actually internalize it.',
    },
    {
      kind: 'mcq',
      id: 'pm-l9-q4',
      prompt: 'Why does in-app messaging need frequency capping and relevance targeting?',
      options: [
        'Because in-app messaging is technically difficult to implement otherwise',
        'Overusing it trains users to reflexively dismiss all announcements, quietly destroying the channel\'s value even for genuinely important future messages',
        'Because email is always a better channel regardless of context',
        'Because changelogs already cover this need',
      ],
      answer: 1,
      explain: 'In-app messaging is the easiest surface to overuse into ignored noise — without frequency capping and relevance targeting, users learn to dismiss everything without reading it, including messages that actually matter.',
    },
    {
      kind: 'scenario',
      id: 'pm-l9-q5',
      prompt: 'A customer hears "planned for next quarter" in a QBR when the internal reality was "actively exploring." What went wrong?',
      options: [
        'Nothing — both phrases mean the same thing',
        'A roadmap confidence level mismatch: the stated commitment implied more certainty than the internal reality actually supported',
        'The customer misunderstood a clearly worded statement',
        'This is a normal and expected part of QBRs',
      ],
      answer: 1,
      explain: 'Conflating "actively exploring" with "planned" in customer-facing language is a classic roadmap confidence level failure — the customer reasonably hears a firmer commitment than was actually intended.',
    },
    {
      kind: 'mcq',
      id: 'pm-l9-q6',
      prompt: 'What distinguishes a real migration path from a sunset notice wearing a migration path\'s name?',
      options: [
        'A real migration path includes a specific timeline, real assistance, and an answer for edge cases that don\'t map cleanly onto the replacement',
        'A real migration path is always shorter than a sunset notice',
        'There is no meaningful difference between the two',
        'A real migration path never requires any user action',
      ],
      answer: 0,
      explain: '"Here\'s the new thing, figure it out yourself" lacks the concrete timeline, direct assistance, and edge-case coverage that make a migration path actually functional rather than nominal.',
    },
    {
      kind: 'scenario',
      id: 'pm-l9-q7',
      prompt: 'A feature that should have been sunsetted lingers indefinitely because nobody wants to own the deprecation work. What is this an example of?',
      options: [
        'A healthy, low-risk product decision',
        'Product debt accumulating specifically because deprecation work is uncomfortable and unglamorous, so nobody volunteers for it',
        'A successful land-and-expand motion',
        'A textbook example of a well-run sunset notice',
      ],
      answer: 1,
      explain: 'Lingering, unsunsetted features are a classic and specific source of product debt — the discomfort of deprecation work means it\'s chronically under-volunteered-for, even when everyone agrees it should happen.',
    },
    {
      kind: 'mcq',
      id: 'pm-l9-q8',
      prompt: 'Why are design partners especially valuable during a private beta specifically?',
      options: [
        'They pay a premium price for early access',
        'They use the product the way a real, less forgiving customer eventually will, surfacing organizational-readiness gaps internal QA would miss',
        'They replace the need for a launch tier system',
        'They only matter for Tier 3 launches',
      ],
      answer: 1,
      explain: 'Design partners engage with a product in realistic, less forgiving ways than internal QA, surfacing exactly the kind of real-world gaps that a purely internal testing process tends to miss.',
    },
    {
      kind: 'match',
      id: 'pm-l9-q9',
      prompt: 'Match each term to its correct description.',
      pairs: [
        ['Health score', 'A composite metric flagging accounts at risk of churning or ripe for expansion'],
        ['QBR', 'A recurring, structured review of usage and roadmap with a customer'],
        ['Voice of customer', 'Systematically routing feedback from every channel into an actionable form'],
        ['Feedback loop', 'Informing customers when their feedback actually led to a real change'],
      ],
      explain: 'These four terms describe the machinery through which customer input actually reaches, and gets acted on by, a product organization, and how that action gets communicated back.',
    },
    {
      kind: 'scenario',
      id: 'pm-l9-q10',
      prompt: 'A changelog entry reads "various improvements and bug fixes" for a genuinely significant change. Who does this fail, specifically?',
      options: [
        'No one — vague changelog entries are standard practice',
        'The vocal group of power users who specifically track changelogs to understand exactly what changed and why it matters to them',
        'Only new users who haven\'t used the product before',
        'It fails the sales team exclusively',
      ],
      answer: 1,
      explain: 'A changelog functions as a real product surface for power users who specifically rely on it for detail — a vague entry fails exactly that audience, even if it\'s a small fraction of total users.',
    },
  ],
  exercise: {
    id: 'pm-l9-exercise',
    title: 'Draft the in-app announcement and changelog entry for your last release',
    prompt: `Pick the most recent feature or change you shipped, however small.

Write a **changelog entry** for it — specific enough that a power user who tracks changelogs closely would understand exactly what changed and why it matters, without internal jargon.

Then write the **in-app announcement** for the same change — a short banner or tooltip copy, written for a user who is actively using the relevant part of the product right now, not reading documentation. Note who specifically should see it (relevance targeting) and how often it should show before being permanently dismissed (frequency capping).`,
    scaffold: `Change shipped: ______________________________________________

Changelog entry:
_____________________________________________________________

In-app announcement copy:
_____________________________________________________________

Who should see it (relevance targeting): _____________________

Frequency cap / dismissal behavior: ___________________________
`,
    rubric: [
      'The changelog entry is specific enough to tell a power user exactly what changed, not a vague "improvements" line',
      'The in-app copy is short enough to read in a glance and written for someone mid-task, not someone reading documentation',
      'Relevance targeting names a real, specific user segment, not "everyone"',
      'A frequency cap or dismissal rule is stated explicitly, not left implicit',
    ],
  },
};
