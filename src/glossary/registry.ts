import type { GlossaryCourse, GlossaryTerm } from './types';

// Seed set only — per the agreed scope, this registry is populated
// incrementally as new content (starting with the dual-track system-design
// solutions) is written, not backfilled against the existing 26 be/fe
// chapters. The two entries below exist to give the matching plugin
// (remarkTermLinks.ts) real, in-content terms to validate against.
export const terms: GlossaryTerm[] = [
  {
    id: 'idempotency',
    term: 'Idempotency',
    aliases: ['idempotent'],
    courses: ['be', 'fe'],
    oneLiner: 'Applying an operation once looks the same as applying it many times.',
    full: 'An operation is idempotent if repeating it produces the same end state as doing it once — DELETE /user/123 is idempotent, POST /orders is not. Idempotency keys let a client safely retry a non-idempotent mutation: the server caches the response against a client-generated key and returns the cached result on retry instead of re-processing.',
    related: ['consistency-model'],
  },
  {
    id: 'consistency-model',
    term: 'Consistency model',
    aliases: ['eventual consistency', 'strong consistency'],
    courses: ['be', 'fe'],
    oneLiner: 'Defines what a reader sees relative to recent writes when data is replicated.',
    full: 'Ranges from strong/linearizable (every read sees the latest write) to eventual (replicas converge only if writes stop, with no bound on "eventually"). The right model is chosen by the cost of being wrong for that specific data, not a general preference for "strong" or "fast."',
    related: ['idempotency'],
  },

  // Added while writing the Chat/Messaging system-design solution
  // (src/courses/sysdesign/content/chat-messaging.md) — first entries from
  // the "populate incrementally as new content is written" plan.
  {
    id: 'radio-framework',
    term: 'RADIO framework',
    aliases: ['RADIO'],
    courses: ['fe'],
    oneLiner: 'Requirements → Architecture → Data model → Interface/API → Optimizations — the standard structure for a frontend system-design interview answer.',
    full: 'A five-stage way to drive a frontend system-design conversation like a tech lead: clarify Requirements before designing anything, sketch the Architecture (components + data flow), define the Data model (client state shape, server-vs-client boundary), specify the Interface (component API + network API), then reason about Optimizations (performance, accessibility, networking, resilience) with real tradeoffs. Backend system-design answers use their own idiomatic structure instead — RADIO is deliberately frontend-only.',
    related: ['optimistic-ui'],
  },
  {
    id: 'websocket',
    term: 'WebSocket',
    courses: ['be', 'fe'],
    oneLiner: 'A persistent, full-duplex connection between client and server over a single TCP connection.',
    full: 'Unlike request/response HTTP, either side can push a message at any time with no new connection or request needed. The right choice for genuinely bidirectional, low-latency traffic (chat, presence, collaborative editing) — server-sent events or polling are usually simpler, cheaper choices when the client never needs to push.',
    related: ['exponential-backoff', 'server-sent-events'],
  },
  {
    id: 'server-sent-events',
    term: 'Server-Sent Events',
    aliases: ['SSE'],
    courses: ['be', 'fe'],
    oneLiner: 'A one-way, server-to-client streaming connection over plain HTTP.',
    full: 'Simpler than a WebSocket — built on ordinary HTTP, auto-reconnects natively via the browser\'s EventSource API, and works through most proxies/load balancers without special handling. The right choice when the client only needs to receive updates (a live feed, a streaming AI response) and never needs to push data back over the same connection.',
    related: ['websocket'],
  },
  {
    id: 'exponential-backoff',
    term: 'Exponential backoff',
    courses: ['be', 'fe'],
    oneLiner: 'Doubling the wait time between retries after each failure, instead of retrying at a fixed interval.',
    full: 'A dropped WebSocket or a failed request retried instantly, at a fixed interval, tends to hammer a server that\'s already struggling (or just recovering) — a thundering-herd problem across many clients reconnecting at once. Exponential backoff (1s, 2s, 4s, 8s...) with jitter (a small random offset added to each wait) spreads reconnection attempts out and gives a recovering server room to breathe.',
    related: ['websocket'],
  },
  {
    id: 'optimistic-ui',
    term: 'Optimistic UI',
    aliases: ['optimistic update'],
    courses: ['be', 'fe'],
    oneLiner: 'Updating the interface immediately, assuming an action will succeed, before the server confirms it.',
    full: 'A sent message appears instantly in "pending" state instead of waiting for a network round-trip — because the vast majority of the time it will succeed, and waiting for confirmation on every action makes an app feel slow regardless of actual latency. Requires a real rollback/reconciliation path for the minority case where the server rejects it.',
    related: ['message-ordering'],
  },
  {
    id: 'message-ordering',
    term: 'Message ordering',
    courses: ['be', 'fe'],
    oneLiner: 'The guarantee (or lack of one) about the order in which sent messages are delivered and displayed.',
    full: 'Network delivery order isn\'t guaranteed to match send order, especially across reconnects or multiple devices. Real chat systems establish a canonical order server-side (a monotonic sequence number or server timestamp per conversation, not client-side timestamps, which can\'t be trusted or synchronized) and the client reorders on receipt rather than trusting arrival order.',
    related: ['optimistic-ui'],
  },
  {
    id: 'read-receipt',
    term: 'Read receipt',
    aliases: ['delivery receipt'],
    courses: ['be', 'fe'],
    oneLiner: 'A signal that a message was delivered to, or read by, its recipient.',
    full: 'Usually modeled as a small state machine per message (sent → delivered → read) rather than a single boolean, since a product often needs to show all three states distinctly. Read state is typically the highest-frequency write in a chat system (every scroll can generate one) and is usually batched/debounced rather than sent per-message.',
    related: ['presence'],
  },
  {
    id: 'presence',
    term: 'Presence',
    courses: ['be', 'fe'],
    oneLiner: 'Real-time online/offline/typing status broadcast to other users.',
    full: 'Presence is inherently approximate and short-lived — a client\'s connection can drop without a clean disconnect signal, so presence systems rely on a heartbeat with a timeout (no heartbeat in N seconds = treat as offline) rather than waiting for an explicit "I\'m offline" message that may never arrive.',
    related: ['read-receipt', 'websocket'],
  },
  {
    id: 'offline-queue',
    term: 'Offline queue',
    courses: ['be', 'fe'],
    oneLiner: 'A local, persisted queue of actions taken while disconnected, replayed once connectivity returns.',
    full: 'Lets a user keep composing/sending messages while offline instead of blocking on connectivity — each queued action needs an idempotency key so replaying it after reconnect can\'t double-apply if the server actually received it right before the disconnect was detected.',
    related: ['idempotency', 'exponential-backoff'],
  },
  {
    id: 'cursor-pagination',
    term: 'Cursor-based pagination',
    aliases: ['cursor pagination'],
    courses: ['be', 'fe'],
    oneLiner: 'Paginating by an opaque pointer to a specific record, not by numeric offset.',
    full: 'Offset pagination (`?page=3`) breaks under concurrent inserts — new items shift every later page, causing skipped or duplicated rows. Cursor pagination (`?after=msg_8f2a1`) anchors to a specific record\'s position, which stays stable regardless of what\'s inserted elsewhere, at the cost of not being able to jump to an arbitrary page number.',
    related: ['message-ordering'],
  },
];

const byId = new Map(terms.map((t) => [t.id, t]));

export function findTermById(id: string): GlossaryTerm | undefined {
  return byId.get(id);
}

export function termsForCourse(course: GlossaryCourse): GlossaryTerm[] {
  return terms.filter((t) => t.courses.includes(course));
}

// sysdesign reuses be+fe's combined term set rather than tagging every term
// a third time — its content is fundamentally be/fe concepts applied to
// interview questions, not a distinct vocabulary of its own.
export function termsForCourses(courses: GlossaryCourse[]): GlossaryTerm[] {
  const seen = new Set<string>();
  const out: GlossaryTerm[] = [];
  for (const t of terms) {
    if (seen.has(t.id)) continue;
    if (t.courses.some((c) => courses.includes(c))) {
      seen.add(t.id);
      out.push(t);
    }
  }
  return out;
}

export function relatedTerms(id: string): GlossaryTerm[] {
  const term = byId.get(id);
  if (!term?.related) return [];
  return term.related.map((r) => byId.get(r)).filter((t): t is GlossaryTerm => Boolean(t));
}
