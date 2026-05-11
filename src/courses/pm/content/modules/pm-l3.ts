import type { Module } from '../../types';

export const module: Module = {
  id: 'pm-l3',
  domain: 'pm',
  order: 3,
  title: 'Prioritization: deciding what not to build',
  subtitle: 'RICE, cost of delay, Kano, and the 2x2 everyone actually reaches for.',
  why:
    'Understanding how prioritization scoring actually works turns "why is my bug not prioritized" into a conversation you can win with numbers instead of frustration, and it tells you which of your own technical concerns will actually move a roadmap.',
  estMinutes: 55,
  lessons: [
    {
      id: 'pm-l3-lesson-1',
      title: 'RICE and its failure modes: a scoring model is a conversation starter, not an oracle',
      body: `RICE is the most widely used prioritization scoring framework. Understanding how it gets gamed is worth more than memorizing the formula: **(Reach × Impact × Confidence) ÷ Effort.**

| Factor | Meaning |
|---|---|
| Reach | How many users/events this touches in a given period |
| Impact estimate | How much it moves the needle per user reached — a rough scale, not a measurement |
| Confidence | How sure the team is about reach and impact, as a discounting percentage |
| Effort | Estimated person-time, typically person-months |

The framework's real value isn't the number — it's forcing four vague judgments into the open where they can be individually argued about. "This is really important" is an impact claim wearing no clothes; RICE makes someone commit to a number.

> ⚠️ **The unhealthy use:** treating the final score as objective, when every input — especially Impact and Confidence — was a subjective guess in a spreadsheet cell. Two people scoring the same initiative in good faith can differ 3x.

The most common failure: **Effort systematically underestimated**, usually filled in by whoever's excited about the idea, not the engineer who'll build it. Since Effort is the denominator, underestimating it inflates the score in exactly the direction that makes an exciting idea look more prioritizable. Correcting a wrong Effort number isn't nitpicking — it directly changes the ranking, and you're often the most credible source for that number.

Two relatives worth knowing: ICE drops Reach — Impact × Confidence ÷ Effort — faster and rougher, for backlog triage rather than roadmap decisions. WSJF (Weighted Shortest Job First), from the Scaled Agile world, divides a cost-of-delay estimate by job duration instead — more common in larger, SAFe-flavored orgs. A quick effort-impact matrix (next lesson) is the faster, rougher cousin of all three when even RICE feels like too much ceremony.

None of these replace judgment — they structure it. The useful question in a planning meeting isn't "accept or reject this ranking," it's "which of the four inputs would I actually change with better information?"`,
      keyTerms: ['rice', 'ice', 'wsjf', 'effort-impact-matrix', 'reach', 'impact-estimate'],
    },
    {
      id: 'pm-l3-lesson-2',
      title: 'Cost of delay: the framework that makes "later" have a price',
      body: `Most prioritization arguments treat "we'll do it later" as free. Cost of delay is the concept that makes visible why it usually isn't — the value lost, per unit of time, by not shipping now.

It reframes "should we do A or B first" into "what does delaying each of them cost." Some things that feel urgent have a low cost of delay (a cosmetic bug); some things that feel un-urgent have a high one (a security gap nobody's found yet).

| Shape | Behavior | Example |
|---|---|---|
| Linear | Grows steadily over time | Ordinary user pain accumulating |
| Step | Jumps at a hard deadline | A compliance requirement with a cutoff |
| Decay | Value shrinks the longer you wait | A competitive response after the competitor already won the segment |

Two initiatives with similar RICE scores can have wildly different cost-of-delay shapes — a step-function deadline should usually jump the queue regardless of its RICE score, because missing it isn't a matter of degree.

Opportunity cost is the idea underneath all of this: choosing to build A means not building B, and A's real cost includes the value B would have produced. "Is this worth doing" is a different, easier question than "is this worth doing instead of the next-best thing."

> **Say this:** "This costs us roughly four engineering hours a week in firefighting, compounding as we add services." Technical debt routinely loses prioritization fights not because its cost of delay is actually low, but because it's distributed and invisible next to a single dramatic feature number. Naming the number puts it in the same currency the rest of the roadmap is evaluated in.`,
      keyTerms: ['cost-of-delay', 'opportunity-cost', 'rice'],
    },
    {
      id: 'pm-l3-lesson-3',
      title: 'Kano: why fixing the basics never delights anyone, and that\'s fine',
      body: `The Kano model explains a pattern that frustrates almost every engineer: fixing a broken basic feature makes users nowhere near as happy as shipping something flashy, even when the fix mattered more.

| Category | Present | Absent/broken | Example |
|---|---|---|---|
| Basic expectation | Zero gratitude — simply assumed | Sharp, outsized anger | Login working, data not disappearing |
| Performance feature | Scales linearly with satisfaction | Scales linearly with dissatisfaction | Storage limits, processing speed |
| Delighter | Disproportionate happiness | No dissatisfaction at all | The small unexpected touch that gets screenshotted |

Fixing a reliability bug rarely gets celebrated because you're moving a basic expectation from "broken, infuriating" to "working, invisible" — and invisible is the correct outcome, even though it doesn't feel like a demo win.

> ⚠️ **Delighters have a shelf life.** Today's delighter, once users get used to it, migrates down into a basic expectation. Real-time collaborative editing was a delighter a decade ago; its absence is a dealbreaker now. "Add more delighters" isn't sustainable alone — you have to keep finding new ones while never neglecting basic expectations, because a broken basic expectation sinks trust faster than any delighter rebuilds it.

> **Say this:** "This bug is a basic expectation regressing — it won't win a headline, but leaving it broken actively costs trust, a different and often larger risk than the delighter not shipping this sprint." Sharper than "bugs matter too," because it names the actual axis of value each one competes on.`,
      keyTerms: ['kano-model', 'basic-expectation', 'performance-feature', 'delighter'],
    },
    {
      id: 'pm-l3-lesson-4',
      title: 'The 2x2 everyone actually reaches for, and the biases hiding inside it',
      body: `The single most common prioritization tool in practice isn't a formal scoring model — it's a simple effort-impact matrix.

\`\`\`mermaid
flowchart TD
  A["Low effort\\nHigh impact\\nQuick wins"] --- B["High effort\\nHigh impact\\nBig bets"]
  C["Low effort\\nLow impact\\nFill-ins"] --- D["High effort\\nLow impact\\nTime sinks — avoid"]
\`\`\`

Popular because it's fast and visual — a team sketches one on a whiteboard in ten minutes and gets real alignment, often more valuable than a spreadsheet nobody fully trusts. T-shirt sizing (XS/S/M/L/XL instead of precise estimates) pairs with it for the same reason: fast, and honest about not knowing an initiative will take exactly 6.5 person-weeks.

The honesty is also the weakness — fast means gut feel, and gut feel inherits every bias in the room. Prioritization bias is the umbrella term:

| Bias | What happens |
|---|---|
| Recency | Whatever was discussed most recently feels most urgent |
| Seniority | The most senior person's estimate gets the least scrutiny |
| Sunk-cost | A nearly-finished initiative keeps getting funded past its actual value |

A scoring exercise that *looks* quantitative gives these biases cover — a biased gut call dressed as rigor.

Squeaky wheel: the loudest, most persistent request gets prioritized not because it scored highest, but because repetition exhausts the team's resistance. Worth naming calmly: "this has come up in the last three planning meetings without a new scoring pass — are we prioritizing it because the score changed, or because it's been raised the most?"

A roadmap tradeoff is any decision where committing to one initiative visibly costs another its slot. Roadmaps that never name a tradeoff — every initiative additive, nothing displaced — are either dishonest about capacity or quietly relying on unpaid overtime.`,
      keyTerms: ['effort-impact-matrix', 't-shirt-sizing', 'prioritization-bias', 'squeaky-wheel', 'roadmap-tradeoff'],
    },
  ],
  terms: [
    {
      id: 'rice',
      domain: 'pm',
      term: 'RICE',
      moduleId: 'pm-l3',
      tier: 1,
      oneLiner: 'A scoring model: Reach × Impact × Confidence ÷ Effort, ranking initiatives by score.',
      full:
        'RICE scores each candidate initiative on Reach, Impact, Confidence, and Effort, combining them as (Reach × Impact × Confidence) ÷ Effort to produce a rankable number. Its real value is forcing vague claims of importance into separate, individually arguable judgments, not the objectivity of the final score, which still depends heavily on subjective inputs.',
      devAnalogy: 'It\'s like a weighted scoring rubric for choosing between technical approaches — useful for structuring the debate, not a substitute for someone actually checking whether the inputs are realistic.',
      leverage: 'You are often the most credible source for the Effort number, which sits in the denominator — correcting an underestimated Effort directly changes the ranking, not just the optics of the discussion.',
      sayThis: 'That Effort estimate looks low for what this actually involves — can we revisit it before we lock the score?',
      antiPattern: 'A RICE score gets computed once, presented as objective, and then treated as beyond debate, even though every input, especially Impact and Confidence, was a subjective guess dressed up in a spreadsheet.',
      related: ['ice', 'wsjf', 'effort-impact-matrix'],
    },
    {
      id: 'ice',
      domain: 'pm',
      term: 'ICE',
      moduleId: 'pm-l3',
      tier: 2,
      oneLiner: 'A faster prioritization score: Impact × Confidence ÷ Effort, with Reach dropped.',
      full:
        'ICE is a simplified version of RICE that drops the Reach factor, scoring initiatives as Impact × Confidence ÷ Effort. It trades precision for speed and is more commonly used for quick backlog triage than for roadmap-level prioritization decisions, where the missing Reach factor matters more.',
      devAnalogy: 'It\'s like a quick linter pass versus a full type-check — fast and rough, good for triage, not precise enough to settle a genuinely close call.',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'A team uses ICE for a major roadmap-level decision where reach genuinely varies a lot between options, and the missing Reach factor produces a misleading ranking.',
      related: ['rice', 'wsjf'],
    },
    {
      id: 'wsjf',
      domain: 'pm',
      term: 'WSJF',
      aliases: ['Weighted Shortest Job First'],
      moduleId: 'pm-l3',
      tier: 3,
      oneLiner: 'A SAFe prioritization method: cost of delay divided by job duration.',
      full:
        'Weighted Shortest Job First, from the Scaled Agile Framework, prioritizes initiatives by dividing an estimated cost of delay by the job\'s duration, favoring whatever delivers the most value per unit of time invested. It\'s more common in larger, SAFe-flavored organizations than in product-led startups, and it centers cost of delay rather than RICE\'s effort-denominator framing.',
      devAnalogy: 'It\'s like scheduling jobs in a queue by value-per-second-of-runtime rather than by raw priority number, favoring whatever clears the most value fastest.',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'A team imports WSJF terminology from a SAFe training without actually estimating cost of delay rigorously, so the "job duration" half of the ratio does all the work and the framework adds process without adding insight.',
      related: ['cost-of-delay', 'rice'],
    },
    {
      id: 'moscow',
      domain: 'pm',
      term: 'MoSCoW',
      moduleId: 'pm-l3',
      tier: 3,
      oneLiner: 'A scope-sorting method: Must, Should, Could, Won\'t have, for a release.',
      full:
        'MoSCoW sorts requirements for a specific release into Must have, Should have, Could have, and Won\'t have this time, making scope negotiations explicit rather than treating every requested item as equally non-negotiable. It is a scoping tool for a defined release rather than a long-term roadmap prioritization method like RICE or cost of delay.',
      devAnalogy: 'It\'s like sorting a pull request\'s changes into "blocking this release," "nice if there\'s time," and "explicitly out of scope for this PR" before review starts.',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'Everything on a list gets labeled "Must have" because no one wants to say no to a stakeholder, which defeats the entire purpose of the categorization and leaves scope exactly as unclear as before.',
      related: ['rice', 'now-next-later'],
    },
    {
      id: 'cost-of-delay',
      domain: 'pm',
      term: 'Cost of delay',
      moduleId: 'pm-l3',
      tier: 1,
      oneLiner: 'The value lost, per unit of time, by not shipping something now.',
      full:
        'Cost of delay estimates the ongoing value lost — revenue, user pain, competitive ground, or accumulating workaround cost — by choosing not to ship an initiative right now, reframing "should we do A or B first" into "what does delaying each of them actually cost." Some initiatives have a linear cost of delay, some step-wise at a hard deadline, and some decay in value the longer they wait.',
      devAnalogy: 'It\'s like the compounding interest on unaddressed technical debt — waiting doesn\'t just postpone the cost, it can actively grow it, and the shape of that growth matters as much as the total.',
      leverage: 'You can put technical debt into the same currency the rest of the roadmap is evaluated in by estimating its cost of delay explicitly, instead of arguing "it\'s just bad" on faith.',
      sayThis: 'What does it actually cost us, per week, to keep delaying this — and does that number belong next to the other roadmap items?',
      antiPattern: 'Infrastructure and reliability work loses prioritization fights not because its cost of delay is low, but because that cost is distributed and invisible compared to a feature with a single legible number attached.',
      related: ['opportunity-cost', 'wsjf'],
    },
    {
      id: 'opportunity-cost',
      domain: 'pm',
      term: 'Opportunity cost',
      moduleId: 'pm-l3',
      tier: 2,
      oneLiner: 'The value of the next-best alternative given up by choosing to build something.',
      full:
        'Opportunity cost is what a team gives up by committing time to one initiative instead of the next-best alternative competing for the same engineering capacity. Prioritization conversations that evaluate an initiative in isolation, without naming what it displaces, are answering an easier question than the one that actually determines whether it belongs on the roadmap.',
      devAnalogy: 'It\'s like choosing which of two refactors to do this sprint — the real cost of picking one isn\'t just the hours it takes, it\'s the improvement the other refactor would have delivered that now has to wait.',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'A roadmap review discusses whether a new initiative is worth doing in isolation, without ever naming what it would displace, making it much easier to say yes than the real tradeoff deserves.',
      related: ['cost-of-delay', 'roadmap-tradeoff'],
    },
    {
      id: 'effort-impact-matrix',
      domain: 'pm',
      term: 'Effort-impact matrix',
      moduleId: 'pm-l3',
      tier: 1,
      oneLiner: 'A 2x2 sorting work into quick wins, big bets, fill-ins, and time sinks.',
      full:
        'The effort-impact matrix is a simple 2x2 grid, effort on one axis and impact on the other, used to sort candidate work into quick wins, big bets, fill-ins, and time sinks to avoid. Its speed and visual simplicity make it the most commonly used prioritization tool in practice, at the cost of inheriting whatever bias is already present in the room\'s gut-feel estimates.',
      devAnalogy: 'It\'s like a rough triage board for bugs sorted by severity and fix difficulty — fast, visual alignment that\'s useful for a first pass but not precise enough to settle a genuinely close call.',
      leverage: 'You can supply a more accurate effort axis for this matrix than most stakeholders can, which directly shifts items between quadrants.',
      sayThis: 'Where would this actually land on effort if we\'re honest about it, not just impact?',
      antiPattern: 'A team fills in an effort-impact matrix purely from gut feel with no engineering input on the effort axis, so items land in the wrong quadrant and "quick wins" turn out to be quarter-long projects.',
      related: ['rice', 't-shirt-sizing'],
    },
    {
      id: 'basic-expectation',
      domain: 'pm',
      term: 'Basic expectation',
      aliases: ['must-be feature'],
      moduleId: 'pm-l3',
      tier: 1,
      oneLiner: 'A feature users assume and don\'t notice when present, but resent sharply when broken.',
      full:
        'In the Kano model, a basic expectation is a feature users take for granted when it works — earning no particular gratitude — but that causes sharp dissatisfaction when it\'s missing or broken. Reliable login, data integrity, and pages that don\'t error are typical basic expectations, which is why fixing them rarely feels like a celebrated win even though leaving them broken actively damages trust.',
      devAnalogy: 'It\'s like uptime — nobody thanks you for a service that\'s always up, but everyone notices immediately when it isn\'t.',
      leverage: 'You can name a regressing basic expectation explicitly when it competes against a flashier feature for prioritization, since the two aren\'t actually competing on the same axis of value.',
      sayThis: 'This bug is a basic expectation regressing — it won\'t win a headline, but leaving it broken is actively spending down trust.',
      antiPattern: 'A roadmap keeps funding new delighters while a basic expectation quietly rots, and trust erodes faster than any delighter can rebuild it, even though the roadmap looks impressively busy.',
      related: ['performance-feature', 'delighter', 'kano-model'],
    },
    {
      id: 'performance-feature',
      domain: 'pm',
      term: 'Performance feature',
      moduleId: 'pm-l3',
      tier: 2,
      oneLiner: 'A feature where satisfaction scales roughly linearly with how much of it you deliver.',
      full:
        'A performance feature, in the Kano model, produces satisfaction roughly proportional to how much of it is delivered — more storage, faster processing, more integrations — which is why companies market these features with comparative numbers, since "more equals better" is easy to communicate and easy to believe.',
      devAnalogy: 'It\'s like a benchmark number that a marketing page can compare directly to a competitor\'s — the relationship between the number and perceived value is legible and linear.',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'A team invests indefinitely in a performance feature past the point users can perceive the difference, chasing a benchmark number that no longer translates into real satisfaction.',
      related: ['basic-expectation', 'delighter', 'kano-model'],
    },
    {
      id: 'delighter',
      domain: 'pm',
      term: 'Delighter',
      aliases: ['exciter'],
      moduleId: 'pm-l3',
      tier: 2,
      oneLiner: 'An unexpected feature that creates outsized happiness but whose absence causes no complaint.',
      full:
        'A delighter, in the Kano model, is a feature users didn\'t expect and wouldn\'t have thought to request, whose presence creates disproportionate happiness while its absence causes no dissatisfaction at all. Delighters tend to migrate into basic expectations over time as users get used to them, which means a team has to keep discovering new ones rather than resting on old ones.',
      devAnalogy: 'It\'s like a genuinely thoughtful default or shortcut nobody asked for in an API\'s design — small, unrequested, and disproportionately appreciated the first time someone discovers it.',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'A team keeps investing in new delighters while a basic expectation is actively broken, not realizing the two don\'t compete on the same axis and the broken basic expectation is actively costing more trust than the delighter builds.',
      related: ['basic-expectation', 'performance-feature', 'kano-model'],
    },
    {
      id: 'kano-model',
      domain: 'pm',
      term: 'Kano model',
      moduleId: 'pm-l3',
      tier: 1,
      oneLiner: 'A framework sorting features by the relationship between delivery and user satisfaction.',
      full:
        'The Kano model categorizes features by the shape of the relationship between how much is delivered and how satisfied users become, distinguishing basic expectations, performance features, and delighters. It explains why fixing a broken basic feature rarely feels as celebrated as shipping something new, even when the fix was genuinely important to user trust.',
      devAnalogy: 'It\'s like classifying bugs and features by their actual impact curve rather than treating all "positive changes" as interchangeable wins in a release note.',
      leverage: 'You can use Kano\'s categories to explain, precisely, why a reliability fix and a flashy feature aren\'t competing for the same kind of value, which is a sharper argument than simply insisting bugs matter too.',
      sayThis: 'What Kano category is this — is it protecting trust, scaling with more investment, or genuinely delighting people?',
      antiPattern: 'A team treats every positive change as equally roadmap-worthy without distinguishing which Kano category it falls into, and ends up chasing delighters while basic expectations quietly regress.',
      related: ['basic-expectation', 'performance-feature', 'delighter'],
    },
    {
      id: 'confidence-score',
      domain: 'pm',
      term: 'Confidence score',
      moduleId: 'pm-l3',
      tier: 2,
      oneLiner: 'A percentage discounting a RICE estimate by how sure the team actually is.',
      full:
        'The confidence score is RICE\'s fourth input, a percentage that discounts the Reach and Impact estimates by how much real evidence supports them, distinguishing a well-researched estimate from an optimistic guess. A low confidence score should meaningfully shrink an otherwise attractive RICE score, though in practice it is often set generously to avoid deflating a favored initiative.',
      devAnalogy: 'It\'s like an error bar on a benchmark result — the headline number matters less once you see how wide the uncertainty actually is.',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'A confidence score is set to a flattering 80% for an initiative with essentially no supporting research, quietly inflating a RICE score that should have been heavily discounted.',
      related: ['rice', 'reach', 'impact-estimate'],
    },
    {
      id: 'reach',
      domain: 'pm',
      term: 'Reach',
      moduleId: 'pm-l3',
      tier: 2,
      oneLiner: 'How many users or events an initiative touches within a given period, in RICE.',
      full:
        'Reach is the first input in RICE, estimating how many users or events an initiative will affect in a defined period, typically expressed as a concrete number rather than a rough label. Reach grounds the other three RICE inputs in a real audience size, distinguishing an initiative that helps a handful of power users from one that touches the entire user base.',
      devAnalogy: 'It\'s like sizing the blast radius of a change before deciding how much scrutiny it deserves — a change touching every request needs a different bar than one touching an edge case.',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'Reach is estimated from whoever happens to be loudest in the room rather than from actual usage data, silently overweighting a vocal minority\'s needs.',
      related: ['rice', 'impact-estimate'],
    },
    {
      id: 'impact-estimate',
      domain: 'pm',
      term: 'Impact estimate',
      moduleId: 'pm-l3',
      tier: 3,
      oneLiner: 'A rough score of how much an initiative moves the needle per person reached.',
      full:
        'The impact estimate is RICE\'s second input, typically scored on a rough scale such as 0.25 (minimal) to 3 (massive) rather than measured precisely, capturing how much a given initiative moves the needle for each user or event it reaches. Because it compresses so much judgment into one number, it is the RICE input most prone to disagreement and gaming.',
      devAnalogy: 'It\'s like eyeballing the severity of a bug on a 1-to-5 scale — useful for fast triage, but two reasonable people can land on very different numbers for the same bug.',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'An impact estimate gets set high simply because the initiative is exciting to discuss, not because any evidence actually supports that level of expected effect.',
      related: ['reach', 'confidence-score', 'rice'],
    },
    {
      id: 't-shirt-sizing',
      domain: 'pm',
      term: 'T-shirt sizing',
      moduleId: 'pm-l3',
      tier: 3,
      oneLiner: 'Estimating effort with rough labels like XS/S/M/L/XL instead of precise numbers.',
      full:
        'T-shirt sizing estimates effort using coarse labels — XS, S, M, L, XL — instead of precise time estimates, deliberately avoiding the false precision of claiming to know an initiative will take exactly a specific number of days. It pairs naturally with fast tools like the effort-impact matrix, trading rigor for speed during early triage.',
      devAnalogy: 'It\'s like rough complexity labels on a backlog instead of committing to exact story-point numbers before anyone has actually looked at the code involved.',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'A genuinely close call between two similarly-sized initiatives gets decided using rough t-shirt sizes when the decision actually deserved a more precise estimate, and the imprecision flips the outcome.',
      related: ['effort-impact-matrix', 'story-points'],
    },
    {
      id: 'prioritization-bias',
      domain: 'pm',
      term: 'Prioritization bias',
      moduleId: 'pm-l3',
      tier: 2,
      oneLiner: 'The ways fast prioritization tools get distorted by recency, seniority, or sunk cost.',
      full:
        'Prioritization bias covers the systematic distortions that creep into fast, gut-feel prioritization tools: recency bias favoring whatever was discussed most recently, seniority bias accepting a senior voice\'s estimate with too little scrutiny, and sunk-cost bias continuing to fund a nearly-finished initiative past the point its value justifies. A scoring exercise that looks quantitative gives these biases cover, making a biased gut call look rigorous.',
      devAnalogy: 'It\'s like confirmation bias in code review — a change from a senior engineer gets less scrutiny not because it needs less, but because of who wrote it.',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'An initiative keeps getting funded because it\'s nearly finished, even though a clear-eyed look at remaining cost versus remaining value would say to stop, purely because stopping feels like wasting what\'s already spent.',
      related: ['squeaky-wheel', 'roadmap-tradeoff'],
    },
    {
      id: 'squeaky-wheel',
      domain: 'pm',
      term: 'Squeaky wheel',
      moduleId: 'pm-l3',
      tier: 2,
      oneLiner: 'A request that gets prioritized for being raised repeatedly, not for scoring highest.',
      full:
        'The squeaky wheel pattern describes a request that gets prioritized because a persistent stakeholder raises it in enough meetings to exhaust the team\'s resistance, rather than because it scored highest on whatever framework the team claims to use. Naming the pattern calmly when it happens protects the integrity of the actual prioritization process.',
      devAnalogy: 'It\'s like a flaky test getting disabled instead of fixed simply because someone complains about the CI failure often enough — the loudest signal wins, not the correct one.',
      leverage: undefined,
      sayThis: undefined,
      antiPattern: 'An initiative jumps the queue after being raised in three consecutive planning meetings with no new evidence or scoring pass, purely because repetition wore down the team\'s pushback.',
      related: ['prioritization-bias', 'roadmap-tradeoff'],
    },
    {
      id: 'roadmap-tradeoff',
      domain: 'pm',
      term: 'Roadmap tradeoff',
      moduleId: 'pm-l3',
      tier: 1,
      oneLiner: 'A decision where committing to one initiative admittedly displaces another\'s slot.',
      full:
        'A roadmap tradeoff is any prioritization decision stated openly as displacing something else, rather than presented as a free addition to an already-full plan. Roadmaps that never name their tradeoffs tend to be either dishonest about real team capacity or quietly relying on unsustainable overtime to make the numbers work.',
      devAnalogy: 'It\'s like naming exactly which sprint commitment gets bumped when an urgent fix is pulled in, instead of pretending the team\'s total capacity just silently increased.',
      leverage: 'You can ask what a new "urgent" request is displacing, which keeps prioritization honest and surfaces capacity pressure before it becomes unpaid overtime.',
      sayThis: 'If we say yes to this, what does it push out, and are we naming that out loud?',
      antiPattern: 'Every new urgent request gets added to the plan as if capacity were infinite, and the resulting gap between committed work and available time gets absorbed silently as unplanned overtime.',
      related: ['opportunity-cost', 'squeaky-wheel'],
    },
  ],
  quiz: [
    {
      kind: 'mcq',
      id: 'pm-l3-q1',
      prompt: 'In the RICE formula, why does an underestimated Effort number inflate a score?',
      options: [
        'Because Effort is not actually part of the formula',
        'Because Effort sits in the denominator, so a smaller number produces a larger overall score',
        'Because Effort is always overestimated in practice, never underestimated',
        'Because Effort only affects Confidence, not the final score',
      ],
      answer: 1,
      explain: 'RICE divides by Effort, so a systematically underestimated Effort — often filled in by whoever is most excited about the idea — inflates the score in exactly the direction that favors that idea.',
    },
    {
      kind: 'mcq',
      id: 'pm-l3-q2',
      prompt: 'What is the main practical difference between RICE and ICE?',
      options: [
        'ICE adds a fifth factor RICE doesn\'t have',
        'ICE drops the Reach factor, trading precision for speed, and is typically used for faster backlog triage rather than roadmap decisions',
        'ICE is only used for enterprise products',
        'RICE and ICE are the same formula with different names',
      ],
      answer: 1,
      explain: 'ICE removes Reach from the RICE formula, producing a faster but less precise score, best suited to quick triage rather than decisions where audience size varies significantly between options.',
    },
    {
      kind: 'scenario',
      id: 'pm-l3-q3',
      prompt: 'A reliability bug fix keeps losing prioritization fights against a flashy new feature. What\'s the sharpest reframing to use?',
      options: [
        'Insist that bugs always matter more than new features',
        'Name the bug as a regressing basic expectation, and the feature as a delighter, since the two protect and spend different kinds of value',
        'Ask that all bugs be fixed before any new feature work happens',
        'Escalate to leadership without further explanation',
      ],
      answer: 1,
      explain: 'Framing the bug as a basic expectation and the feature as a delighter, using Kano\'s categories, explains precisely why the two aren\'t competing on the same axis of value — a much sharper argument than a blanket claim.',
    },
    {
      kind: 'mcq',
      id: 'pm-l3-q4',
      prompt: 'Why does a delighter tend to lose its effect over time?',
      options: [
        'Delighters are always removed after one release',
        'Delighters commonly migrate into basic expectations as users get used to them, requiring teams to keep finding new ones',
        'Delighters only work for consumer products, not B2B',
        'The Kano model doesn\'t account for time at all',
      ],
      answer: 1,
      explain: 'A feature that once delighted users, once normalized, tends to become an expected baseline whose absence would now cause dissatisfaction rather than an occasional surprise that creates it.',
    },
    {
      kind: 'mcq',
      id: 'pm-l3-q5',
      prompt: 'What does "cost of delay" add to a prioritization conversation that raw impact scoring alone misses?',
      options: [
        'It removes the need to estimate effort entirely',
        'It captures how much value is lost per unit of time by not shipping now, which can make an unglamorous item more urgent than a flashier one',
        'It only applies to initiatives with a hard compliance deadline',
        'It replaces RICE as the only valid framework',
      ],
      answer: 1,
      explain: 'Cost of delay reframes "should we do A or B first" into "what does delaying each of them actually cost," which can reveal that an unglamorous item is more time-sensitive than gut feel suggests.',
    },
    {
      kind: 'scenario',
      id: 'pm-l3-q6',
      prompt: 'Your infrastructure concern keeps losing to feature work because it "doesn\'t sound urgent." What\'s the most effective next move?',
      options: [
        'Stop raising it since it clearly isn\'t a priority for the business',
        'Estimate its actual cost of delay — for example, hours spent firefighting per week — and put that number next to the other roadmap items',
        'Fix it quietly without telling anyone, bypassing prioritization entirely',
        'Wait for a major incident to force the conversation',
      ],
      answer: 1,
      explain: 'Putting a concrete, even rough cost-of-delay number next to competing initiatives translates an invisible, distributed cost into the same currency the rest of the roadmap is being evaluated in.',
    },
    {
      kind: 'mcq',
      id: 'pm-l3-q7',
      prompt: 'What is opportunity cost, distinct from cost of delay?',
      options: [
        'The value of the next-best alternative given up by choosing to build something else instead',
        'The literal dollar cost of the engineering team\'s salaries',
        'A synonym for cost of delay with no meaningful difference',
        'The cost of running a discovery interview',
      ],
      answer: 0,
      explain: 'Opportunity cost is what gets displaced by a chosen initiative — the value the next-best alternative would have delivered — which is a different question from how much value delaying the chosen initiative itself costs.',
    },
    {
      kind: 'mcq',
      id: 'pm-l3-q8',
      prompt: 'A request gets prioritized after being raised in three consecutive planning meetings with no new evidence. What pattern is this?',
      options: [
        'Cost of delay properly compounding over time',
        'The squeaky wheel pattern, where persistence wears down resistance rather than a scoring framework actually favoring it',
        'A textbook example of a correctly applied RICE score',
        'Evidence that the Kano model was misapplied',
      ],
      answer: 1,
      explain: 'This is the squeaky wheel pattern — a request winning by repetition and persistence rather than by scoring highest on whatever framework the team claims to use to prioritize.',
    },
    {
      kind: 'match',
      id: 'pm-l3-q9',
      prompt: 'Match each Kano category to its description.',
      pairs: [
        ['Basic expectation', 'Unnoticed when present, sharply resented when broken'],
        ['Performance feature', 'Satisfaction scales roughly linearly with how much is delivered'],
        ['Delighter', 'Unexpected, absence causes no complaint, presence creates outsized happiness'],
      ],
      explain: 'These three categories explain why not all positive changes produce the same kind of user reaction, which is why a reliability fix and a flashy feature rarely get equal celebration.',
    },
    {
      kind: 'scenario',
      id: 'pm-l3-q10',
      prompt: 'A roadmap review presents a new initiative as a pure addition with no mention of what it displaces. What should you ask?',
      options: [
        'Whether the initiative has a catchy enough name',
        'What this pushes out of the current plan, since capacity isn\'t infinite and every addition has a real tradeoff',
        'Whether the initiative can be built using the existing design system',
        'Nothing — roadmaps are always additive by nature',
      ],
      answer: 1,
      explain: 'Naming the roadmap tradeoff explicitly — what gets displaced — keeps the conversation honest about real capacity instead of quietly relying on unplanned overtime to make the math work.',
    },
  ],
  exercise: {
    id: 'pm-l3-exercise',
    title: 'RICE-score three backlog items, then interrogate your own gut',
    prompt: `Pick **three items** currently sitting in your team's backlog — a mix of a feature, a bug, and something infrastructure-related works best.

For each, estimate **Reach**, **Impact** (0.25–3 scale), **Confidence** (as a percentage), and **Effort** (in person-weeks), and compute the RICE score.

Then, before looking at the scores, rank the three items by pure gut feel. Compare your gut ranking to the RICE ranking. Where they disagree, write one or two sentences on **why** — is your gut picking up on something RICE doesn't capture (like cost of delay, or a basic expectation regressing), or is RICE correcting a bias in your gut (like recency or squeaky-wheel pressure)?`,
    scaffold: `Item 1: _____________________________
Reach: ___  Impact: ___  Confidence: ___%  Effort: ___
RICE score: ___

Item 2: _____________________________
Reach: ___  Impact: ___  Confidence: ___%  Effort: ___
RICE score: ___

Item 3: _____________________________
Reach: ___  Impact: ___  Confidence: ___%  Effort: ___
RICE score: ___

Gut ranking (before comparing): 1) ___ 2) ___ 3) ___

Where gut and RICE disagree, and why:
`,
    rubric: [
      'All four RICE inputs are estimated for each item, not just impact and effort',
      'The Effort estimate reflects real engineering judgment, not a stakeholder\'s optimistic guess',
      'The gut ranking was written down honestly before comparing to the RICE ranking',
      'At least one disagreement between gut and RICE is explained with a real reason, not dismissed',
    ],
  },
};
