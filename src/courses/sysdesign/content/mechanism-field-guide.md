## Why this tier exists

The main bank has two kinds of question: build a widget (autocomplete, modal, carousel) and design an app (feed, chat, email). This is a third, harder category — problems where the visible UI is trivial but a system behavior is brutal.

Seat-booking is the archetype: nobody cares about the seat grid; the entire interview is the lock.

These are the questions most candidates never rehearse, so handling one cleanly is a strong senior signal. The pattern to recognize: the prompt names a product, but the real question is a mechanism — contention, ordering, consistency, real-time coordination, resource control, or offline reconciliation.

> **Key insight:** Name the mechanism out loud, early. That alone separates you from most of the field.

## The mechanism families

Every question in this Part is really an instance of one of these six. Learn the family, and you can improvise the rest — including mechanism-driven questions that never appear in any bank.

| Mechanism family | The hard problem | Archetype question |
|---|---|---|
| **Contention / locking** | Two users want one resource; only one wins | Seat booking, flash-sale checkout |
| **Concurrency & ordering** | Events arrive out of order; state must stay correct | Collaborative editing, live counters |
| **Real-time coordination** | Many clients must agree on shared state fast | Presence, live cursors, multiplayer |
| **Consistency & reconciliation** | Optimistic local truth vs. authoritative server truth | Offline sync, optimistic mutations |
| **Resource control** | Bound a scarce client-side resource | Rate limiting, request dedup, upload queue |
| **Streaming & backpressure** | Data arrives faster or slower than you can render | LLM token streaming, live logs, market data |

## How to attack a mechanism-driven prompt

A repeatable move-set for when the prompt names a product but the meat is a behavior:

1. **Name the mechanism out loud.** *"The seat map is straightforward — the real problem here is contention, so let me focus there."* This instantly signals seniority; it tells the interviewer you're not going to spend twenty minutes on a component that isn't the point.
2. **Establish the source of truth.** State early what the client owns vs. what the server owns. Most traps in this whole tier are the candidate quietly putting authority on the client — a hold, a lock, an inventory count — where only the server can actually enforce it.
3. **Design the happy path optimistically.** Show the instant, local-first UX users expect, before you start breaking things.
4. **Then break it.** Reconnect, conflict, race, abandonment, overload. Walk each failure and how you recover. This is where the points actually live — not in the happy path.
5. **Pick a consistency posture, and justify it.** Strong where correctness matters (money, inventory). Eventual where smoothness matters (cursors, counts). The justification matters more than the choice.
6. **State the tradeoff you're *not* taking.** *"I'd use pessimistic locking here rather than optimistic, because contention is high."* Always show the fork you considered and rejected — a design with no visible alternative doesn't read as a decision, it reads as the only thing you thought of.

## The consistency spectrum

Memorize this mapping — it's the fastest way to justify step 5 above without reasoning from scratch every time.

| Need correctness? | Posture | Example |
|---|---|---|
| Money / inventory / identity | Strong consistency, server-authoritative, locks | Seat booking, checkout, balance |
| Shared document state | Convergent (CRDT/OT), optimistic local | Docs, Figma |
| Social / engagement counts | Eventual, approximate, batched | Likes, view counts, presence |
| Pure ephemeral motion | Last-write-wins, best-effort | Live cursors, typing dots |

> **Say this:** "This is money, so I'm going server-authoritative with a strong-consistency lock, even though it costs more latency than an optimistic approach would." Naming the row you're in, out loud, is worth more than a paragraph of justification after the fact.

## How to use the rest of this Part

The questions in Part 1–3 of this course — autocomplete, carousel, modal, feed, chat, and so on — are the "first round" tier: broad coverage, real depth, but built around a recognizable product. The questions in this Part are different: narrower in scope, deliberately mechanism-first, and aimed at the senior/staff-level signal an interviewer is listening for when they want to go deep on one hard behavior rather than broad across many components.

Read this field guide first, not instead of the questions that follow — it gives you the vocabulary and the move-set; the individual questions give you the concrete, worked example of applying it under a specific mechanism family.
