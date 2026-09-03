## Overview

- **Real-world analog:** any university or public library's internal circulation system
- **Difficulty:** Easy-Medium

The classic OOP-textbook framing of this question (classes, inheritance, `Book` vs.
`Media`) misses what actually makes it a system design question: physical copies are a
finite, contended resource, and the interesting part is what happens when two people try
to check out the last copy of the same book at the same moment.

## Clarifying Questions & Requirements

> **Ask these first:** single branch or a multi-branch system with shared catalog?
> Do holds/reservations exist, or is it first-come-first-served at the desk? Are fines
> tracked?

| | In scope | Out of scope |
|---|---|---|
| **Functional** | Search catalog, check out/return a copy, place a hold, calculate overdue fines | Digital lending (e-books), inter-branch transfer logistics |
| **Non-functional** | No two patrons can check out the same physical copy simultaneously | High write throughput — this is a low-write-volume system by nature |

Assume: a multi-branch system, a shared catalog, and hold requests that queue when every
copy of a title is checked out.

## Back-of-Envelope Estimation

This system is small by internet standards — a few hundred thousand titles, a few
million copies across branches, and checkouts numbering in the thousands per day system-
wide. The estimation exercise here is less about scale and more about correctly
identifying that this is a **low-volume, high-correctness** system: the design priority
is never double-assigning a copy, not throughput.

## API Design

```
GET    /catalog/search?q=              → 200 [{bookId, title, availableCopies}]
POST   /checkouts        {copyId, patronId}   → 201 {checkoutId, dueDate} | 409 Conflict
POST   /checkouts/{id}/return                 → 204
POST   /holds            {bookId, patronId}   → 201 {holdId, queuePosition}
```

## Data Model & Storage

```
books
  id            uuid PK
  title, author, isbn

copies
  id            uuid PK
  book_id       uuid FK
  branch_id     uuid
  status        enum('available','checked_out','on_hold')

checkouts
  id            uuid PK
  copy_id       uuid FK
  patron_id     uuid
  due_date      date
  returned_at   timestamp nullable

holds
  id            uuid PK
  book_id       uuid FK
  patron_id     uuid
  queued_at     timestamp
```

| Choice | Why |
|---|---|
| **A separate `copies` row per physical item, not a count on `books`** | Two patrons checking out "the last copy" at the same moment is only a solvable concurrency problem if there's an actual row representing that specific copy to lock — a bare integer count invites a check-then-decrement race identical to any other inventory system |
| **`holds` as a FIFO queue keyed on `book_id`, not `copy_id`** | A hold is a claim on the *next available copy of a title*, not a specific physical item — modeling it against the book keeps the queue correct regardless of which copy happens to be returned first |
| **Relational database, not a KV store** | This system needs real transactional guarantees (a checkout and a copy-status update must succeed or fail together) and range queries (search, overdue reports) that a plain KV store doesn't offer — and at this volume, a relational engine has no downside |

## Deep Dives

**1. The last-copy race.** Two patrons requesting checkout of the same book's last
available copy at nearly the same time must resolve to exactly one winner. A relational
transaction with a row-level lock on the chosen `copies` row is a check-and-set:
`SELECT ... FOR UPDATE`, then check `status = 'available'` before updating. That makes
this safe — the second transaction either blocks briefly and then sees `checked_out`
and fails cleanly, or is serialized to fail outright — either way, never two successful
checkouts on one copy.

**2. Hold queue fairness and fulfillment.** When a checked-out copy is returned and
holds exist on that title, the system must notify the patron at the front of the queue
and reserve that specific copy for them for a limited pickup window (say, 3 days) before
releasing it back to general availability. This is its own small state machine per copy:
`available → held-for-pickup → checked_out`, distinct from plain availability.

**3. Fine calculation as a batch job, not a real-time trigger.** Computing "is this
checkout overdue and by how much" on every single read (every catalog search, every
patron profile view) is wasted work for a value that only changes once a day. A nightly
batch job that scans `checkouts` where `due_date < today AND returned_at IS NULL` and
updates a `fines` table is simpler and cheaper than recomputing it on every request.

## Bottlenecks & Failure Modes

| Bottleneck | Mitigation | Tradeoff accepted |
|---|---|---|
| Concurrent checkout of the last copy | Row-level lock via `SELECT FOR UPDATE` in a transaction | Brief lock contention on popular titles at peak times, negligible at this volume |
| Hold queue fulfillment race (copy returned while a hold expires) | Explicit `held-for-pickup` state distinct from `available` | Slightly more states to model than a boolean available/unavailable |

## Why Not X?

**Why not track availability as a simple counter on the `books` row?** A counter alone
can't answer "which specific copy is available" (needed to route a patron to a physical
shelf location) and reintroduces a check-then-decrement race under concurrent checkouts
that a per-copy row with a database lock avoids naturally.

**Why not use a NoSQL document store for flexibility?** This domain is inherently
relational — checkouts reference copies reference books, holds reference both books and
patrons — and the system needs multi-row transactional guarantees (checkout + copy
status change together) that a document store doesn't provide as cleanly as a
relational engine's transactions do.

## Interview Signals

| | Strong answer | Weak answer |
|---|---|---|
| Concurrency | Identifies the last-copy race and proposes a row lock or equivalent | Doesn't consider what happens when two checkouts race |
| Data model | Models copies as individual rows, not a bare count | Uses a single integer counter for availability |
| Scale awareness | Recognizes this is a low-volume, high-correctness system, not a throughput problem | Over-engineers sharding/caching for a system that doesn't need it |

**Common failure modes:** a bare availability counter instead of per-copy rows;
no answer for the concurrent-checkout race; computing fines synchronously on every read
instead of via a batch job.

## Glossary Links

This question draws on: Atomic compare-and-set — linked on first mention above (the
locked check-then-update on a copy's status during checkout).
