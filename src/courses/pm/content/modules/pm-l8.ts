import type { Module } from '../../types';

export const module: Module = {
  id: 'pm-l8',
  domain: 'pm',
  order: 8,
  title: 'SaaS product surface & economics',
  subtitle: 'Tenancy, permissions, PLG, entitlements, and the money metrics a dev should recognize.',
  why:
    'Entitlements, gating, onboarding, and empty states are frontend code that is really product strategy in disguise. Understanding the business model underneath them changes how you build every one of those surfaces.',
  estMinutes: 65,
  lessons: [
    {
      id: 'pm-l8-lesson-1',
      title: 'Tenancy and the account model: the data structure underneath every B2B product',
      body: `**Multi-tenancy** is the architecture where one application instance serves multiple customers (**tenants**), each tenant's data logically isolated despite shared infrastructure. The alternative — a separate instance per customer — is simpler in isolation but operationally brutal at scale: every deploy/migration/fix has to happen N times.

⚠️ A bug that leaks data across the tenant boundary isn't a minor defect — it's a trust-ending incident.

- A **tenant** is typically an org/account — the boundary users, data, settings, and billing are scoped within.
- A **seat** is one licensed user within a tenant. Seat-based pricing is common, which makes seat management UI (invite/remove/reassign) a genuinely high-stakes surface, not plumbing.

### RBAC, SSO, SCIM, audit logs

| Term | What it does |
|---|---|
| **RBAC** | Role-Based Access Control — named roles (admin/editor/viewer) bundle permissions |
| **SSO** | Single Sign-On via the org's own identity provider — often a hard requirement for enterprise |
| **SCIM** | Automated provisioning/deprovisioning from the org's identity provider — access created/revoked automatically on hire/departure |
| **Audit log** | Who did what, when — a compliance necessity for enterprise, often a deal-breaker if missing |

⚠️ **A real permission boundary, not a suggestion:** a button merely hidden from a user without a role — with no backend rejection behind it — is a security gap wearing a UI costume.

> **Say this:** RBAC and audit logs aren't internal tooling — they're revenue-enabling features. Frame them that way when they compete against a flashier feature for the same sprint.`,
      keyTerms: ['multi-tenancy', 'tenant', 'seat', 'rbac', 'sso', 'audit-log'],
    },
    {
      id: 'pm-l8-lesson-2',
      title: 'PLG vs. sales-led: two completely different demands on your UI',
      body: `**Product-led growth (PLG)**: the product itself drives acquisition, conversion, expansion — minimal or no human sales interaction. The UI has to do a salesperson's whole job: communicate value, handle objections, close.

**Sales-led growth**: a human sales team drives the buying process — for larger, more complex deals a self-serve flow can't handle alone.

These place almost opposite demands on the interface.

| | PLG | Sales-led |
|---|---|---|
| Onboarding | Zero-friction, value in minutes | Can tolerate — often should have — more friction |
| Signup | Self-serve, no required "talk to sales" step | Self-serve surface generates leads, doesn't need to close alone |
| Pricing | Shown publicly | Often gated behind "contact sales" |
| Expansion lever | Nudge toward inviting teammates | Surface a path to the account manager |

- **Freemium** — a permanently free tier, monetizing only a fraction of users, using the free tier itself as the acquisition channel.
- **Reverse trial** — new users start with full premium access, then step down to the free tier's limits rather than losing access entirely. Demonstrates premium value better than a trial where users have to imagine what they're missing.

⚠️ An aggressively frictionless PLG-style signup on a product that's actually sales-led floods sales with low-intent signups that don't match the enterprise buyer profile — noise, not a channel.

> **Ask this in a design review:** "Is this a PLG or sales-led motion, and does this decision match it?" Especially true at companies running both motions for different segments, where the answer isn't obvious from the ticket alone.`,
      keyTerms: ['product-led-growth', 'sales-led-growth', 'freemium', 'reverse-trial'],
    },
    {
      id: 'pm-l8-lesson-3',
      title: 'Packaging, pricing, and entitlements: where product strategy lives in your codebase',
      body: `A **pricing tier** bundles features and usage limits at a price point (Free/Pro/Enterprise). Where a company draws the line between tiers is one of the most argued-over decisions in the business — it determines both revenue captured and what most users actually experience.

An **entitlement** is the technical implementation of that boundary: a record, tied to a tenant's subscription, that determines whether a feature/limit/capability is available right now. Entitlements are the bridge between a pricing decision and runtime behavior.

**Usage-based pricing** charges by consumption (API calls, storage, seats used) instead of a flat tier. Aligns cost with value — but needs accurate real-time tracking and clear UI, or customers get bill shock. An **overage** happens when usage exceeds the plan; how it's handled (hard block / soft warn / auto-bill the excess) is a real product decision, not just a billing detail.

### Paywalls and upgrade paths

- A **paywall** blocks/limits a feature until upgrade. How it's designed — a hard block with no context vs. a specific explanation of what's unlocked and why — is directly correlated with upgrade conversion.
- An **upgrade path** is the full flow from hitting a limit to completing an upgrade. A good one preserves context and momentum — shows the value the user was about to get, doesn't reset them to a generic pricing page.
- **Expansion revenue** (existing customers upgrading, adding seats, using more) is often more valuable than new-customer acquisition — the relationship is already de-risked.

### Feature gating: the one non-negotiable rule

**Feature gating** restricts a feature by entitlement.

\`\`\`mermaid
flowchart LR
  A[Client-side check\\nhide the button] -->|bypassable via\\ndevtools| B["Not real gating\\n(a suggestion)"]
  C[Server-side check\\nreject the request] --> D["Real gating\\n(unbypassable)"]
\`\`\`

> **Say this:** "Just hide the button for now" is a security and revenue leak waiting to be discovered, not a reasonable interim solution. Client-side gating is UX convenience layered on top of a real backend boundary — never a substitute for one.`,
      keyTerms: ['pricing-tier', 'entitlement', 'usage-based-pricing', 'paywall', 'upgrade-path', 'expansion-revenue', 'feature-gating'],
    },
    {
      id: 'pm-l8-lesson-4',
      title: 'Onboarding as a frontend discipline, and the money metrics worth recognizing',
      body: `Onboarding is where "frontend implementation" and "core product strategy" essentially merge — a new user's first minutes are built almost entirely out of frontend decisions.

**Progressive disclosure** — revealing complexity gradually as needed, not everything up front — is the central onboarding principle, and it's technical as much as design: it requires real, well-designed intermediate states, not just "everything visible" and "nothing visible yet."

### The two surfaces you own

- **Empty state** — what a user sees before creating any content. Disproportionately a new user's first real impression, before they've experienced any value. A generic "no data" message wastes that moment; a good empty state teaches — what to do next, why it matters, often a one-click way to see the feature with sample data.
- **Onboarding checklist** — structures early experience as concrete, achievable steps. Externalizes "what do I even do first" into a legible, guided sequence.

> **Say this:** naming ownership of these two surfaces explicitly is a direct, credible way to claim product influence — this is exactly where activation and time-to-value actually get won or lost.

### The money metrics you'll hear, even if you never compute them

| Metric | What it measures |
|---|---|
| **ARR/MRR** | Annual/Monthly Recurring Revenue — the core predictable-revenue health signal |
| **LTV/CAC ratio** | Lifetime Value vs. Acquisition Cost — the ratio indicates sustainability, not either number alone |
| **NRR** | Net Revenue Retention — upgrades/expansions minus downgrades/churn from existing customers. Above 100% means existing customers alone grow revenue |
| **Churn** | The rate customers/revenue are lost — the most direct threat to NRR |
| **Rule of 40** | growth rate + profit margin should be roughly 40%+ — a rough sustainability sanity check |

Recognizing these when they surface in an all-hands lets you follow — and occasionally participate in — business conversations, and explains why unglamorous features (entitlements, onboarding, retention work) keep winning prioritization fights: they're what these numbers actually move.`,
      keyTerms: ['empty-state', 'onboarding-checklist', 'progressive-disclosure', 'arr-mrr', 'ltv-cac-ratio', 'nrr', 'churn'],
    },
  ],
  terms: [
    {
      id: 'multi-tenancy',
      domain: 'pm',
      term: 'Multi-tenancy',
      moduleId: 'pm-l8',
      tier: 1,
      oneLiner: 'One application instance serving multiple customers with logically isolated data.',
      full:
        'Multi-tenancy is the architecture where a single application instance serves multiple tenants, with each tenant\'s data logically isolated despite shared underlying infrastructure. Almost every B2B SaaS product is multi-tenant, and the tenant boundary is one of the most consequential architectural decisions in the system, since a leak across it is a trust-ending incident, not a minor bug.',
      devAnalogy: 'It\'s like a shared database with strict row-level isolation between customers, instead of a separate database per customer — cheaper to operate, but the isolation boundary has to be airtight everywhere.',
      leverage: 'Any query or component you write that touches tenant-scoped data is a place the tenant boundary could leak — treating that boundary with real seriousness is squarely your job, not a backend-only concern.',
      sayThis: 'Does this query or component correctly scope to the current tenant, or could it accidentally leak across tenants?',
      antiPattern: 'A frontend component fetches data using a shared endpoint without carefully verifying the tenant scope, and a subtle bug ends up displaying one customer\'s data inside another customer\'s account.',
      related: ['tenant', 'seat', 'rbac'],
    },
    {
      id: 'tenant',
      domain: 'pm',
      term: 'Tenant',
      moduleId: 'pm-l8',
      tier: 2,
      oneLiner: 'The organization or account boundary within which users, data, and billing are scoped.',
      full:
        'A tenant is typically an organization or account — the boundary within which users, data, settings, and billing are scoped in a multi-tenant system. Understanding exactly where the tenant boundary sits in a given product is fundamental to reasoning correctly about almost any feature, since it determines whether a setting or query is account-wide or user-specific.',
      devAnalogy: 'It\'s like the top-level scope key every query and permission check should be filtered by, the same way a request is always scoped to an authenticated user.',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'A setting meant to apply per-user is implemented as tenant-wide, or vice versa, because the tenant boundary was never clearly established before the feature was built.',
      related: ['multi-tenancy', 'seat'],
    },
    {
      id: 'seat',
      domain: 'pm',
      term: 'Seat',
      moduleId: 'pm-l8',
      tier: 2,
      oneLiner: 'A single licensed user within a tenant, the basis of seat-based pricing.',
      full:
        'A seat is a single licensed user within a tenant, and seat-based pricing — charging per seat rather than a flat tenant rate or usage-based fee — is one of the most common SaaS pricing models, which makes seat management UI (inviting, removing, reassigning) a genuinely high-stakes product surface despite looking like plumbing.',
      devAnalogy: 'It\'s like a per-user license key within an account — the unit that both access control and billing are actually counted against.',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'Seat removal is built as a low-priority admin feature with minimal polish, even though a broken or confusing seat-management flow directly costs the business money on every billing cycle.',
      related: ['tenant', 'multi-tenancy'],
    },
    {
      id: 'rbac',
      domain: 'pm',
      term: 'RBAC',
      aliases: ['Role-Based Access Control'],
      moduleId: 'pm-l8',
      tier: 1,
      oneLiner: 'Bundling permissions into named roles like admin, editor, and viewer.',
      full:
        'RBAC governs what a user within a tenant can see and do through named roles that bundle permissions, rather than assigning permissions individually. RBAC UI must be simple enough for an admin to reason about, expressive enough for real organizational needs, and — critically — actually enforced by the backend, not just reflected in what the frontend chooses to render.',
      devAnalogy: 'It\'s like a role-based middleware layer on the backend — the frontend can reflect roles in the UI, but the real enforcement has to live server-side, not in conditional rendering.',
      leverage: 'You can flag when a permission is only enforced by hiding a UI element, since that\'s a security gap wearing a UI costume rather than a real access-control boundary.',
      sayThis: 'Is this permission actually enforced server-side, or are we only hiding the button on the frontend?',
      antiPattern: 'A restricted action is merely hidden from unauthorized users in the UI, while the backend endpoint still accepts the request from anyone who calls it directly, leaving a real, exploitable gap.',
      related: ['sso', 'audit-log'],
    },
    {
      id: 'sso',
      domain: 'pm',
      term: 'SSO',
      aliases: ['Single Sign-On'],
      moduleId: 'pm-l8',
      tier: 2,
      oneLiner: 'Authenticating through an organization\'s existing identity provider instead of a new password.',
      full:
        'SSO lets users authenticate through their organization\'s existing identity provider rather than a separate username and password for a given product. It\'s frequently a hard enterprise requirement rather than a nice-to-have, since many enterprise security teams simply won\'t approve a vendor that can\'t integrate with their identity system.',
      devAnalogy: 'It\'s like delegating authentication to a trusted external identity provider instead of managing credentials yourself, the same pattern as OAuth login but scoped to an entire organization\'s workforce.',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'SSO is treated as a late-stage, low-priority integration, until it turns out to be the single blocking requirement in a major enterprise deal that\'s otherwise ready to close.',
      related: ['rbac', 'audit-log'],
    },
    {
      id: 'audit-log',
      domain: 'pm',
      term: 'Audit log',
      moduleId: 'pm-l8',
      tier: 2,
      oneLiner: 'A record of who did what and when within a tenant, often a compliance requirement.',
      full:
        'An audit log records who did what and when within a tenant — permission changes, data exports, settings updates — and enterprise customers frequently require one as a genuine compliance and security necessity. Its absence can be an outright deal-breaker in enterprise sales, independent of how good the rest of the product is.',
      devAnalogy: 'It\'s like a structured, immutable event log for every sensitive state change in the system, built for compliance review rather than debugging.',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'A well-built product loses an enterprise deal late in the sales process because it has no audit log, a requirement the sales team didn\'t realize was a hard blocker until security review.',
      related: ['rbac', 'sso'],
    },
    {
      id: 'freemium',
      domain: 'pm',
      term: 'Freemium',
      moduleId: 'pm-l8',
      tier: 2,
      oneLiner: 'A permanently free tier alongside paid tiers, used as the primary acquisition channel.',
      full:
        'Freemium offers a permanently free tier alongside paid tiers, monetizing only a fraction of users while using the free tier itself as the primary acquisition and word-of-mouth channel, distinct from a time-limited trial where access eventually expires entirely rather than downgrading.',
      devAnalogy: 'It\'s like a generous free tier of an API that\'s genuinely useful on its own, functioning as a distribution channel even for users who never upgrade to the paid tier.',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'A freemium tier is made deliberately unpleasant to use in order to pressure upgrades, which undermines the free tier\'s actual purpose as a genuine acquisition and word-of-mouth channel.',
      related: ['reverse-trial', 'product-led-growth'],
    },
    {
      id: 'reverse-trial',
      domain: 'pm',
      term: 'Reverse trial',
      moduleId: 'pm-l8',
      tier: 3,
      oneLiner: 'Starting new users with full premium access, then stepping them down to a free tier.',
      full:
        'A reverse trial starts new users with full access to premium features for a limited period, then steps them down to a free tier\'s more limited feature set rather than losing access entirely, tending to demonstrate premium value more effectively than a traditional trial where a user has to imagine what they\'re missing.',
      devAnalogy: 'It\'s like shipping a feature flag defaulted on for new accounts and then flipped off after a window, instead of defaulted off and requiring an opt-in the user might never take.',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'A reverse trial ends abruptly with no clear signal to the user about what they\'re losing, so the step-down reads as a bug or a broken feature rather than an intentional part of the growth model.',
      related: ['freemium', 'product-led-growth'],
    },
    {
      id: 'product-led-growth',
      domain: 'pm',
      term: 'Product-led growth',
      aliases: ['PLG'],
      moduleId: 'pm-l8',
      tier: 1,
      oneLiner: 'A go-to-market motion where the product itself drives acquisition and conversion.',
      full:
        'Product-led growth is a go-to-market motion where the product itself is the primary driver of acquisition, conversion, and expansion, with minimal or no human sales interaction — the UI has to do the entire job a salesperson would otherwise do, which means every added friction in signup and onboarding is a direct, measurable tax on conversion.',
      devAnalogy: 'It\'s like a library designed to be adopted purely by developers reading the README and trying it, with no sales call required before anyone can start using it.',
      leverage: 'You can point to funnel drop-off data to argue against adding friction to a PLG signup or onboarding flow, since the product itself is the entire acquisition mechanism in this motion.',
      sayThis: 'Is this a PLG or sales-led motion, and does adding this step actually match how we acquire customers?',
      antiPattern: 'A PLG product adds a "talk to sales" gate in front of its core self-serve flow, adding friction that directly taxes the conversion the entire growth motion depends on.',
      related: ['sales-led-growth', 'freemium'],
    },
    {
      id: 'sales-led-growth',
      domain: 'pm',
      term: 'Sales-led growth',
      moduleId: 'pm-l8',
      tier: 2,
      oneLiner: 'A go-to-market motion where a human sales team drives the buying process.',
      full:
        'Sales-led growth relies on a human sales team to drive the buying process, typically for larger, more complex deals where a self-serve flow alone can\'t handle pricing negotiation or the buyer\'s need for direct reassurance. A sales-led product\'s self-serve surface can tolerate more friction, since it\'s meant to support the sales conversation rather than close the deal alone.',
      devAnalogy: 'It\'s like an enterprise integration that requires a real onboarding conversation before go-live, rather than a self-serve API key anyone can generate instantly.',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'An aggressively frictionless, PLG-style signup flow gets built for a product that\'s actually sold sales-led, generating a flood of low-intent signups that don\'t match the buyer profile the sales team can actually serve.',
      related: ['product-led-growth'],
    },
    {
      id: 'pricing-tier',
      domain: 'pm',
      term: 'Pricing tier',
      moduleId: 'pm-l8',
      tier: 2,
      oneLiner: 'A bundle of features and usage limits offered at a specific price point.',
      full:
        'A pricing tier bundles a specific set of features and usage limits at a specific price point — Free, Pro, Enterprise — and the boundaries drawn between tiers are among the most consequential, most argued-over decisions in the business, since they directly determine both captured revenue and what most users actually experience.',
      devAnalogy: 'It\'s like a set of API rate-limit and feature-flag configurations bundled together under a named plan, applied consistently across a tenant.',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'Tier boundaries get redrawn frequently without updating the entitlement logic consistently everywhere it\'s checked, leaving stale, contradictory access rules scattered across the codebase.',
      related: ['entitlement', 'feature-gating'],
    },
    {
      id: 'entitlement',
      domain: 'pm',
      term: 'Entitlement',
      moduleId: 'pm-l8',
      tier: 1,
      oneLiner: 'The technical record determining whether a tenant currently has access to a feature.',
      full:
        'An entitlement is the technical implementation of a pricing tier\'s boundaries: the specific record, typically tied to a tenant\'s subscription, that determines whether a given feature, limit, or capability is available right now. Entitlements are the bridge between a pricing decision made in a strategy meeting and the actual runtime behavior of the application.',
      devAnalogy: 'It\'s like a server-side authorization check keyed to a subscription record, not a client-side flag — the actual source of truth for what a tenant can currently do.',
      leverage: 'You can insist entitlement checks live in a single, server-enforced source of truth rather than scattered client-side conditionals, which prevents both security gaps and inconsistent behavior across the app.',
      sayThis: 'Is this entitlement check centralized and server-enforced, or is it a client-side conditional we\'re relying on?',
      antiPattern: 'Entitlement logic is duplicated across multiple frontend components with slightly different conditions, so a plan change updates access inconsistently depending on which screen a user happens to be on.',
      related: ['pricing-tier', 'feature-gating'],
    },
    {
      id: 'usage-based-pricing',
      domain: 'pm',
      term: 'Usage-based pricing',
      moduleId: 'pm-l8',
      tier: 2,
      oneLiner: 'Charging based on actual consumption rather than a flat tier price.',
      full:
        'Usage-based pricing charges based on actual consumption — API calls, storage, active seats — aligning cost with value delivered, but requiring accurate, real-time usage tracking and a UI that clearly communicates current usage and projected cost, since surprise bills are one of the fastest ways to destroy customer trust.',
      devAnalogy: 'It\'s like a metered billing system where the UI has to surface live usage and cost projections clearly, the same discipline as surfacing quota usage in a cloud console.',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'A usage-based product shows no running total or cost projection anywhere in the UI, so customers only discover they\'ve exceeded expectations when an unexpectedly large invoice arrives.',
      related: ['entitlement', 'pricing-tier'],
    },
    {
      id: 'paywall',
      domain: 'pm',
      term: 'Paywall',
      moduleId: 'pm-l8',
      tier: 1,
      oneLiner: 'A UI surface that blocks or limits a feature until a user upgrades.',
      full:
        'A paywall is the UI surface blocking or limiting access to a feature until a user upgrades, and how it\'s designed — a hard block with no context versus a clear, specific explanation of what upgrading unlocks and why it\'s valuable — is directly, measurably correlated with upgrade conversion rate.',
      devAnalogy: 'It\'s like a well-designed 402-style response with a clear, actionable message, instead of a bare, unexplained access-denied error that gives the user no path forward.',
      leverage: 'You can push for a paywall that explains specific value rather than just blocking access, since the design of this single screen measurably affects upgrade conversion, not just aesthetics.',
      sayThis: 'Can this paywall explain what upgrading actually unlocks, instead of just blocking access with no context?',
      antiPattern: 'A paywall shows a generic "upgrade to continue" message with no explanation of what the user is about to gain, measurably suppressing conversion compared to a paywall that explains specific value.',
      related: ['upgrade-path', 'entitlement'],
    },
    {
      id: 'upgrade-path',
      domain: 'pm',
      term: 'Upgrade path',
      moduleId: 'pm-l8',
      tier: 2,
      oneLiner: 'The flow from hitting a limit to actually completing an upgrade, preserving context.',
      full:
        'An upgrade path is the flow a user follows from hitting a limit or paywall to completing an upgrade, and a well-designed one preserves the user\'s context and momentum — showing the value they were about to get — rather than dropping them onto a generic pricing page disconnected from what they were actually trying to do.',
      devAnalogy: 'It\'s like preserving the original request\'s context through a re-authentication redirect, so the user lands back where they meant to be instead of a generic homepage after the interruption.',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'Hitting a plan limit drops a user onto a generic pricing page with no memory of what they were trying to do, losing the specific context that made the upgrade decision easy to justify.',
      related: ['paywall', 'expansion-revenue'],
    },
    {
      id: 'expansion-revenue',
      domain: 'pm',
      term: 'Expansion revenue',
      moduleId: 'pm-l8',
      tier: 2,
      oneLiner: 'Additional revenue from existing customers upgrading, adding seats, or using more.',
      full:
        'Expansion revenue is additional revenue from existing customers — upgrading tiers, adding seats, increasing usage — and it\'s frequently more valuable to a SaaS business than pure new-customer acquisition, since it comes from a relationship that\'s already established and de-risked, which is exactly why upgrade paths deserve real design attention.',
      devAnalogy: 'It\'s like optimizing the retention and upsell path of an existing integration instead of only investing in acquiring brand-new integration partners.',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'All design effort goes toward the new-signup funnel while the upgrade path for existing customers is left clunky and unpolished, even though expansion revenue is often more valuable per hour invested.',
      related: ['upgrade-path', 'nrr'],
    },
    {
      id: 'feature-gating',
      domain: 'pm',
      term: 'Feature gating',
      moduleId: 'pm-l8',
      tier: 1,
      oneLiner: 'Restricting a feature\'s availability based on entitlements, which must be server-enforced.',
      full:
        'Feature gating restricts a feature\'s availability based on entitlements. Gating implemented purely client-side — hiding a button based on plan — is not real gating, since anyone can bypass a client-side check with developer tools; real gating requires server-side enforcement, with the client-side behavior serving only as a UX convenience layered on top.',
      devAnalogy: 'It\'s the same principle as never trusting client-side validation for security — a hidden button is a UX nicety, not an actual access-control boundary, exactly like an unvalidated client-side form check.',
      leverage: 'You can flag any "just hide the button for now" plan as a real security and revenue leak, since it\'s a client-side suggestion, not enforced access control, until the backend independently checks the same boundary.',
      sayThis: 'This can\'t just hide the button — is the backend independently enforcing this entitlement too?',
      antiPattern: 'A premium feature is gated only by hiding its entry point in the frontend, and a user who inspects network requests or calls the API directly can access it without ever paying.',
      related: ['entitlement', 'paywall'],
    },
    {
      id: 'empty-state',
      domain: 'pm',
      term: 'Empty state',
      moduleId: 'pm-l8',
      tier: 1,
      oneLiner: 'What a user sees before creating content — often their very first impression.',
      full:
        'An empty state is what a user sees before they\'ve created any content or connected any data, and it\'s one of the highest-leverage, most under-invested screens in software, since it\'s disproportionately a new user\'s first real impression, arriving before they\'ve had any chance to experience value.',
      devAnalogy: 'It\'s like a well-written 404 or "no results" page that actively guides the user to a next step, instead of a bare, unhelpful blank screen that wastes a real moment of attention.',
      leverage: 'You can proactively design a real empty state for anything you build, rather than shipping a generic "nothing here yet" filler, since it\'s squarely a frontend decision with outsized influence on activation.',
      sayThis: 'This deserves a real empty state that teaches the next step, not a generic filler screen — can I design it as part of this ticket?',
      antiPattern: 'A feature ships with a bare, generic empty state, wasting one of the highest-leverage moments in the entire onboarding experience on something that teaches the user nothing about what to do next.',
      related: ['onboarding-checklist', 'progressive-disclosure', 'activation'],
    },
    {
      id: 'onboarding-checklist',
      domain: 'pm',
      term: 'Onboarding checklist',
      moduleId: 'pm-l8',
      tier: 2,
      oneLiner: 'A sequence of concrete, achievable steps guiding a new user toward activation.',
      full:
        'An onboarding checklist structures a new user\'s early experience as a sequence of concrete, achievable steps toward activation, externalizing the "what should I even do first" decision a new user otherwise has to make alone, converting an intimidating blank product into a legible, guided sequence.',
      devAnalogy: 'It\'s like a getting-started guide with checkable steps instead of a wall of documentation the reader has to self-navigate with no clear order.',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'A new user is dropped into a fully-featured, blank product with no guided sequence at all, leaving them to guess what the first productive action should be.',
      related: ['empty-state', 'progressive-disclosure'],
    },
    {
      id: 'progressive-disclosure',
      domain: 'pm',
      term: 'Progressive disclosure',
      moduleId: 'pm-l8',
      tier: 2,
      oneLiner: 'Revealing complexity gradually as a user needs it, rather than all at once.',
      full:
        'Progressive disclosure reveals complexity gradually as a user actually needs it, rather than presenting every option and setting up front. It requires deliberately building well-designed intermediate states, not just a single fully-visible view and a single empty view, and it\'s the central design principle behind good onboarding.',
      devAnalogy: 'It\'s like exposing an API\'s advanced configuration only once a caller opts into it, rather than requiring every consumer to understand every parameter from their very first call.',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'A new user\'s first screen presents every possible setting and option at once, overwhelming them before they\'ve had any chance to understand the product\'s core value.',
      related: ['empty-state', 'onboarding-checklist'],
    },
    {
      id: 'arr-mrr',
      domain: 'pm',
      term: 'ARR/MRR',
      moduleId: 'pm-l8',
      tier: 2,
      oneLiner: 'Annual and Monthly Recurring Revenue, the core predictable-revenue health signal.',
      full:
        'ARR and MRR measure the predictable, recurring portion of revenue on an annual or monthly basis, the core health signal most SaaS businesses are actually built around, distinct from one-time or highly variable revenue that doesn\'t reliably recur period over period.',
      devAnalogy: 'It\'s like a steady-state throughput number for a system, as opposed to a one-time burst — the number that tells you what to actually expect going forward, not a single spike.',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'A one-time enterprise deal gets folded into ARR projections as if it were recurring, inflating the metric\'s apparent health beyond what the underlying revenue base actually supports.',
      related: ['nrr', 'churn'],
    },
    {
      id: 'ltv-cac-ratio',
      domain: 'pm',
      term: 'LTV/CAC ratio',
      moduleId: 'pm-l8',
      tier: 2,
      oneLiner: 'Customer Lifetime Value divided by Customer Acquisition Cost, a sustainability signal.',
      full:
        'The LTV/CAC ratio compares Customer Lifetime Value against Customer Acquisition Cost, and the ratio, not either number alone, indicates whether the business model is sustainable — a business can have healthy revenue and still be structurally unsustainable if it costs more to acquire a customer than that customer will ever be worth.',
      devAnalogy: 'It\'s like comparing the cost of acquiring a new dependency or integration against the long-term value it delivers, rather than judging either cost or value in isolation.',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'Leadership celebrates rapid customer acquisition growth without checking the LTV/CAC ratio, missing that the business is spending more to acquire customers than those customers will ever be worth.',
      related: ['arr-mrr', 'churn'],
    },
    {
      id: 'nrr',
      domain: 'pm',
      term: 'NRR',
      aliases: ['Net Revenue Retention'],
      moduleId: 'pm-l8',
      tier: 2,
      oneLiner: 'Revenue retained and expanded from existing customers, factoring in upgrades and churn.',
      full:
        'Net Revenue Retention measures revenue retained and expanded from existing customers, factoring in both upgrades and expansions as well as downgrades and churn. NRR above 100% means the existing customer base alone is growing revenue even before a single new customer is acquired, making it one of the most-watched health metrics in SaaS.',
      devAnalogy: 'It\'s like measuring whether an existing user base\'s aggregate usage is growing or shrinking over time, independent of how many brand-new users are being acquired.',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'A company invests heavily in new-customer acquisition while NRR quietly sits below 100%, masking that the existing customer base is actually shrinking in value underneath the growth headline.',
      related: ['arr-mrr', 'churn', 'expansion-revenue'],
    },
    {
      id: 'churn',
      domain: 'pm',
      term: 'Churn',
      moduleId: 'pm-l8',
      tier: 1,
      oneLiner: 'The rate at which customers or revenue is lost over a given period.',
      full:
        'Churn is the rate at which customers or revenue is lost over a period, the most direct threat to net revenue retention and a core health metric for any subscription business. Even small differences in monthly churn rate compound dramatically over a year, which is why it receives disproportionate attention relative to how simple the raw number looks.',
      devAnalogy: 'It\'s like a service\'s error rate compounding over time — a seemingly small monthly rate has an outsized effect on the long-run health of the whole system.',
      leverage: 'You can connect frontend reliability and usability work directly to churn, since a broken or confusing experience is one of the most common, most preventable reasons customers actually leave.',
      sayThis: 'Do we know whether this kind of friction shows up in our churn or exit-survey data?',
      antiPattern: 'A product treats churn purely as a sales and success-team problem to solve after the fact, ignoring that a meaningful share of churn is driven by preventable product friction and reliability issues.',
      related: ['nrr', 'arr-mrr'],
    },
  ],
  quiz: [
    {
      kind: 'mcq',
      id: 'pm-l8-q1',
      prompt: 'Why is a data leak across the tenant boundary in a multi-tenant system considered especially serious?',
      options: [
        'It only affects performance, not security',
        'It\'s a trust-ending incident, not a minor defect, since it exposes one customer\'s data to another customer entirely',
        'It only happens in single-tenant architectures',
        'It has no real business consequence as long as it\'s fixed quickly',
      ],
      answer: 1,
      explain: 'A tenant boundary leak exposes one customer\'s data to another, which is fundamentally different from an ordinary bug — it\'s a trust and security failure that can end a customer relationship regardless of how quickly it\'s patched.',
    },
    {
      kind: 'mcq',
      id: 'pm-l8-q2',
      prompt: 'Why is hiding a button in the frontend not real feature gating?',
      options: [
        'Because hidden buttons always cause accessibility issues',
        'Because any user can bypass a client-side check with developer tools, so real gating requires independent server-side enforcement of the same boundary',
        'Because feature gating only applies to enterprise customers',
        'Because hiding buttons is slower than showing them',
      ],
      answer: 1,
      explain: 'A client-side hidden button is trivially bypassable, so it functions as a UX suggestion at best — genuine feature gating requires the backend to independently enforce the same access boundary.',
    },
    {
      kind: 'scenario',
      id: 'pm-l8-q3',
      prompt: 'A PLG product adds a mandatory "talk to sales" step before users can try the core product. What\'s the likely effect?',
      options: [
        'No effect, since PLG products don\'t depend on self-serve conversion',
        'It directly taxes conversion, since PLG relies on the product itself doing the entire job of demonstrating value with minimal friction',
        'It will only affect enterprise customers',
        'It will improve NRR immediately',
      ],
      answer: 1,
      explain: 'In a product-led growth motion, every added friction point in the self-serve flow is a direct tax on conversion, since the product itself — not a salesperson — is meant to carry the entire acquisition and conversion job.',
    },
    {
      kind: 'mcq',
      id: 'pm-l8-q4',
      prompt: 'What is the key difference between freemium and a reverse trial?',
      options: [
        'Freemium offers a permanently free tier as an acquisition channel; a reverse trial starts users with full premium access, then steps them down to a free tier rather than cutting off access',
        'They are identical strategies with different names',
        'A reverse trial always requires a credit card up front',
        'Freemium only applies to enterprise pricing',
      ],
      answer: 0,
      explain: 'Freemium\'s free tier is permanent and used for ongoing acquisition, while a reverse trial front-loads premium access and steps users down afterward, which tends to demonstrate value more concretely than a traditional trial.',
    },
    {
      kind: 'scenario',
      id: 'pm-l8-q5',
      prompt: 'A usage-based product gives customers no way to see their current usage or projected bill. What\'s the likely consequence?',
      options: [
        'No consequence, since billing is a backend concern',
        'Customers are likely to be surprised by their bill, which is one of the fastest ways to destroy trust in a usage-based pricing model',
        'It will automatically improve the LTV/CAC ratio',
        'It only matters for freemium products',
      ],
      answer: 1,
      explain: 'Usage-based pricing requires clear, real-time communication of current usage and projected cost specifically because unexpected bills are one of the fastest ways to break customer trust.',
    },
    {
      kind: 'mcq',
      id: 'pm-l8-q6',
      prompt: 'Why does an empty state deserve real design investment rather than a generic "no data" message?',
      options: [
        'Empty states are rarely seen by real users',
        'It\'s disproportionately a new user\'s first real impression of the product, arriving before they\'ve had any chance to experience value',
        'Empty states only matter for enterprise customers',
        'Empty states have no effect on activation'
      ],
      answer: 1,
      explain: 'An empty state is often literally the first thing a new user sees, before any real usage — a generic message wastes one of the highest-leverage moments in the entire onboarding experience.',
    },
    {
      kind: 'mcq',
      id: 'pm-l8-q7',
      prompt: 'Why can a company have healthy revenue growth and still be structurally unsustainable?',
      options: [
        'This is impossible if ARR is growing',
        'If the LTV/CAC ratio is poor, the business may be spending more to acquire each customer than that customer will ever be worth, regardless of headline revenue growth',
        'Because churn only matters for freemium products',
        'Because NRR always tracks ARR exactly',
      ],
      answer: 1,
      explain: 'Revenue growth alone doesn\'t reveal whether acquisition costs are sustainable — the LTV/CAC ratio specifically checks whether the cost of acquiring customers is justified by what they\'re actually worth over time.',
    },
    {
      kind: 'scenario',
      id: 'pm-l8-q8',
      prompt: 'A well-built RBAC and audit log system is being deprioritized in favor of a flashier customer-facing feature. What\'s the strongest counterargument?',
      options: [
        'RBAC and audit logs are internal tooling with no real business value',
        'These features can be a hard requirement for enterprise sales — their absence can be an outright deal-breaker independent of how good the rest of the product is',
        'Flashier features always generate more revenue',
        'Audit logs only matter for regulated industries'
      ],
      answer: 1,
      explain: 'RBAC and audit logs are frequently revenue-enabling, not just internal plumbing — many enterprise deals require them as compliance and security necessities, making their absence a real deal-breaker.',
    },
    {
      kind: 'match',
      id: 'pm-l8-q9',
      prompt: 'Match each term to its correct definition.',
      pairs: [
        ['Entitlement', 'The technical record determining whether a tenant has access to a feature'],
        ['Overage', 'Usage exceeding what a plan includes'],
        ['Upgrade path', 'The flow from hitting a limit to completing an upgrade'],
        ['Expansion revenue', 'Additional revenue from existing customers upgrading or expanding usage'],
      ],
      explain: 'These four terms describe the mechanics of how a SaaS business actually captures more revenue from its existing customer relationships, distinct from new-customer acquisition.',
    },
    {
      kind: 'scenario',
      id: 'pm-l8-q10',
      prompt: 'NRR is sitting at 92% while the company celebrates strong new-customer growth. What does this combination suggest?',
      options: [
        'Everything is healthy, since new-customer growth is strong',
        'The existing customer base is shrinking in value even as new customers are added, which the growth headline alone would mask',
        'Churn is definitely at zero',
        'ARR and MRR must both be declining',
      ],
      answer: 1,
      explain: 'NRR below 100% means the existing customer base is losing value net of upgrades and downgrades — a detail that pure new-customer growth numbers can mask entirely if not examined separately.',
    },
  ],
  exercise: {
    id: 'pm-l8-exercise',
    title: 'Audit your product\'s feature gating',
    prompt: `Pick a feature in your product that's gated behind a paid plan or entitlement — something a free or lower-tier user shouldn't be able to access.

Investigate, honestly: is the gating enforced **server-side** (the backend independently rejects the request regardless of what the frontend sends), or is it **client-side only** (the button or route is hidden, but the underlying API would still respond if called directly)?

Write a short argument, as if presenting it in a planning meeting, for moving any client-side-only gating to be server-enforced — cover both the **security/revenue risk** of leaving it as-is, and a **rough scope estimate** for fixing it.`,
    scaffold: `Feature audited: ____________________________________________

Current gating mechanism (client-side / server-side / both):
_____________________________________________________________

How I verified this (what I actually checked):
_____________________________________________________________

Risk if left as client-side only:
_____________________________________________________________

Argument for moving it server-side:
_____________________________________________________________

Rough scope estimate for the fix:
_____________________________________________________________
`,
    rubric: [
      'The investigation actually checked real behavior (e.g. calling the API directly), not just assumed based on the frontend code',
      'The risk explanation names a concrete consequence, not just "it\'s insecure" in the abstract',
      'The argument is framed in terms a non-engineer stakeholder could follow and act on',
      'The scope estimate is honest about the work involved, not minimized to make the case easier to sell',
    ],
  },
};
