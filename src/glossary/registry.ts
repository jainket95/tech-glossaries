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

  // Added while writing the remaining 29 dual-track system-design solutions
  // (batch of 4 parallel forks: components, applications A/B, emerging).
  {
    id: 'normalized-state',
    term: 'Normalized state',
    courses: ['fe'],
    oneLiner: 'Storing each entity once, by id, and referencing it by id everywhere it appears, instead of duplicating copies.',
    full: 'A feed post and its author, or a message and its sender, are stored as separate keyed maps referencing each other by id — not nested/duplicated per view. One write to the shared entity updates every place it\'s referenced, instead of requiring multiple independently-patched copies to stay in sync.',
    related: ['idempotency'],
  },
  {
    id: 'crdt',
    term: 'CRDT',
    aliases: ['Conflict-free Replicated Data Type'],
    courses: ['be', 'fe'],
    oneLiner: 'A data structure where any order of applying concurrent updates converges to the same result, with no central coordination.',
    full: 'Unlike Operational Transformation, a CRDT doesn\'t need a server to mediate conflicts — the structure itself guarantees convergence regardless of update order, which also makes offline-first merging dramatically simpler since two independently-edited copies can merge with no round-trip.',
    related: ['operational-transformation'],
  },
  {
    id: 'operational-transformation',
    term: 'Operational Transformation',
    aliases: ['OT'],
    courses: ['be', 'fe'],
    oneLiner: 'Transforming an incoming edit against edits it wasn\'t originally composed with, mediated by a canonical server order.',
    full: 'Requires central coordination to establish op order and correctness — historically used by Google Docs — and the transform functions themselves are notoriously easy to get subtly wrong, which is a large part of why many newer collaborative editors lean CRDT instead.',
    related: ['crdt'],
  },
  {
    id: 'adaptive-bitrate-streaming',
    term: 'Adaptive bitrate streaming',
    aliases: ['ABR'],
    courses: ['fe'],
    oneLiner: 'Continuously selecting which quality rendition to fetch next during playback, based on bandwidth and buffer health.',
    full: 'Real implementations weigh buffer health as a hard override on top of a throughput estimate — an empty buffer guarantees a stall regardless of what bandwidth looks like, so buffer-aware ABR downgrades quality proactively rather than waiting for a throughput number to justify it.',
  },
  {
    id: 'webrtc',
    term: 'WebRTC',
    courses: ['be', 'fe'],
    oneLiner: 'A browser-native API for real-time peer-to-peer audio/video/data, with its own media transport separate from any signaling channel.',
    full: 'Signaling (offer/answer/ICE exchange, typically over WebSocket) only sets up the connection — actual media flows over WebRTC\'s own SRTP transport once negotiated. Conflating the two is a common, fundamental misunderstanding of the architecture.',
    related: ['sfu'],
  },
  {
    id: 'sfu',
    term: 'SFU',
    aliases: ['Selective Forwarding Unit'],
    courses: ['be', 'fe'],
    oneLiner: 'A media server that forwards one upstream stream per participant to everyone else, keeping upload cost constant regardless of call size.',
    full: 'The scalable alternative to a mesh topology, where every participant would otherwise need a direct connection to every other participant — mesh upload cost scales with participant count per client, which becomes untenable past a handful of people; an SFU keeps each client\'s upload cost constant.',
    related: ['webrtc'],
  },
  {
    id: 'inventory-hold',
    term: 'Inventory hold',
    aliases: ['inventory reservation', 'inventory lock'],
    courses: ['be', 'fe'],
    oneLiner: 'A time-bounded, strongly-consistent reservation on a resource that blocks conflicting claims until confirmed or expired.',
    full: 'Used for anything with finite, contested availability — a seat, a hotel date range, a unit of stock — so two concurrent buyers can\'t both "win" the same resource. Prevents oversell without permanently decrementing availability until payment actually succeeds; almost always implemented with a server-side TTL, never a client-side flag.',
    related: ['distributed-lock', 'idempotency'],
  },
  {
    id: 'change-log',
    term: 'Change log',
    aliases: ['append-only sync log'],
    courses: ['be', 'fe'],
    oneLiner: 'An append-only, per-entity sequence of change events used as the basis for incremental sync.',
    full: 'A client asks "give me everything since sequence N" instead of comparing timestamps or full snapshots — the same idea as a chat conversation\'s per-conversation `serverSeq`, generalized to any entity that needs efficient incremental sync across devices or after being offline.',
    related: ['message-ordering', 'cursor-pagination'],
  },
  {
    id: 'signed-url',
    term: 'Signed URL',
    courses: ['be', 'fe'],
    oneLiner: 'A URL with an embedded expiry and cryptographic signature, granting time-bounded access to a resource with no separate auth check per request.',
    full: 'Lets a CDN or object store serve a resource directly to a client — without proxying every byte through the app server — while still enforcing that access expires and can\'t be freely shared or replayed indefinitely.',
  },
  {
    id: 'media-session-api',
    term: 'Media Session API',
    courses: ['fe'],
    oneLiner: 'A browser API for registering OS-level media controls and metadata for whatever a page is currently playing.',
    full: 'Lets a web app show up correctly on a lock screen, respond to hardware media keys, and appear in a car\'s Bluetooth display — without it, browser-tab audio has no representation in any of those surfaces at all.',
  },
  {
    id: 'downsampling',
    term: 'Downsampling',
    aliases: ['rollup tiers'],
    courses: ['be', 'fe'],
    oneLiner: 'Pre-aggregating high-resolution time-series data into coarser summaries so long-range queries don\'t scan raw data.',
    full: 'A dashboard showing a 30-day trend doesn\'t need per-second resolution — querying a pre-computed hourly rollup is orders of magnitude cheaper than scanning and aggregating raw points on every request, at the cost of losing fine-grained detail for older data.',
    related: ['backpressure'],
  },
  {
    id: 'backpressure',
    term: 'Backpressure',
    courses: ['be', 'fe'],
    oneLiner: 'A system\'s mechanism for handling data arriving faster than it can be consumed, by shedding, batching, or coalescing rather than queuing unboundedly.',
    full: 'An unbounded queue in front of a slow consumer doesn\'t solve the problem, it just delays and hides it — real backpressure means the producer (or an intermediary) actively slows down, batches, or drops non-critical updates once the consumer falls behind, on both the client and server side of a real-time stream.',
    related: ['downsampling'],
  },
  {
    id: 'abort-controller',
    term: 'AbortController',
    courses: ['be', 'fe'],
    oneLiner: 'A browser API for cancelling an in-flight fetch or stream from the client side.',
    full: 'Calling `.abort()` rejects the associated fetch with an `AbortError` and closes the underlying connection. For a streaming response, the server has to actually detect the closed connection and use it as a signal to stop generating — cancellation only saves real cost if that signal propagates all the way to whatever is producing the stream.',
    related: ['websocket'],
  },
  {
    id: 'context-window',
    term: 'Context window',
    courses: ['be', 'fe'],
    oneLiner: 'The maximum amount of conversation history a model can consider at once.',
    full: 'A long-running conversation eventually exceeds it, requiring truncation or summarization of older turns. Inconsistent truncation between what a user sees and what\'s actually sent to the model produces confusing "the assistant forgot" behavior.',
  },
  {
    id: 'web-push',
    term: 'Web Push API',
    aliases: ['push notification'],
    courses: ['be', 'fe'],
    oneLiner: 'A browser API letting a server send a notification to a client even when no tab is open.',
    full: 'Requires a Service Worker to receive the push event in the background and a subscription (endpoint + keys) registered with the browser\'s push service. Delivery is best-effort, not guaranteed — subscriptions expire or get revoked and have to be pruned on failure.',
    related: ['service-worker'],
  },
  {
    id: 'service-worker',
    term: 'Service Worker',
    courses: ['be', 'fe'],
    oneLiner: 'A background script that runs separately from any page, enabling offline caching and background push.',
    full: 'Runs in its own execution context with no direct access to page/React state — it communicates with open tabs via `postMessage`. It\'s what lets a web app show an OS-level notification or serve cached content even when no tab is open.',
    related: ['web-push'],
  },
  {
    id: 'design-token',
    term: 'Design token',
    courses: ['fe'],
    oneLiner: 'The smallest named unit of a design decision — a color, spacing value, or font size — stored once and referenced everywhere.',
    full: 'Tokens are authored in one source of truth and transformed into each platform\'s native format (CSS custom properties, iOS/Android formats) — the same duplication-drifts-silently reasoning a database schema follows. A component should reference a token, never a raw hardcoded value.',
  },
  {
    id: 'headless-component',
    term: 'Headless component',
    aliases: ['headless UI'],
    courses: ['fe'],
    oneLiner: 'A component that implements behavior (focus management, keyboard handling, ARIA) with no visual styling of its own.',
    full: 'Separating behavior from appearance lets two consumers share the same accessible interaction logic while rendering completely different visual themes on top — the styling layer is thin and swappable; the accessibility-critical logic is not reimplemented per theme.',
  },
  {
    id: 'tree-shaking',
    term: 'Tree-shaking',
    courses: ['fe'],
    oneLiner: 'A build-time step that removes exported code nobody actually imports from the final bundle.',
    full: 'Requires exports to be structured so a bundler can statically determine what\'s unused (ES module syntax, avoiding side-effectful barrel files) — a library that isn\'t tree-shakeable forces every consumer to ship the whole thing even if they use one component.',
  },
  {
    id: 'module-federation',
    term: 'Module Federation',
    courses: ['fe'],
    oneLiner: 'A build-tool feature (webpack/rspack) letting independently-built JavaScript modules share dependencies and load each other at runtime.',
    full: 'Lets a "remote" module be loaded by a "host" application at runtime rather than at the host\'s own build time, with shared dependencies (like React) resolved as a single instance across both — the mechanism that makes true independently-deployed micro-frontends practical without duplicating the framework runtime per module.',
    related: ['version-skew'],
  },
  {
    id: 'version-skew',
    term: 'Version skew',
    courses: ['be', 'fe'],
    oneLiner: 'When independently-deployed parts of a system end up running different, incompatible versions of a shared dependency or contract at the same time.',
    full: 'In a micro-frontend architecture, module A built against one React version and module B against another can both end up on the same page — without a shared, singleton-resolved dependency, this produces two live React instances and confusing, hard-to-debug behavior wherever they\'re expected to interoperate.',
    related: ['module-federation'],
  },
  {
    id: 'distributed-lock',
    term: 'Distributed lock',
    courses: ['be'],
    oneLiner: 'A lock that coordinates exclusive access to a resource across multiple servers, not just multiple threads on one machine.',
    full: 'Typically implemented with an atomic compare-and-set primitive plus a TTL (e.g. Redis `SET NX EX`) so the lock is both race-free under concurrent attempts and automatically released if the holder crashes or never explicitly releases it.',
    related: ['consistency-model', 'inventory-hold'],
  },
  {
    id: 'intersection-observer',
    term: 'IntersectionObserver',
    courses: ['fe'],
    oneLiner: 'A browser API that fires a callback when an element enters or leaves the viewport, without polling scroll position.',
    full: 'Used to trigger "load more" on a sentinel element at the bottom of a list, or to detect which items are currently visible for batched read-receipt-style tracking — cheaper and simpler than a scroll event listener, which fires on every pixel and needs manual throttling.',
  },
  {
    id: 'resumable-upload',
    term: 'Resumable upload',
    courses: ['be', 'fe'],
    oneLiner: 'An upload protocol that can continue from where it left off after an interruption, instead of restarting from zero.',
    full: 'Requires the file to be split into independently-uploadable, idempotently-retriable chunks, and the server to track which chunks it has durably received so a client can query that state and resume from it after a network blip or full page reload.',
    related: ['idempotency'],
  },
  {
    id: 'recurrence-rule',
    term: 'Recurrence rule',
    aliases: ['RRULE'],
    courses: ['be', 'fe'],
    oneLiner: 'A compact rule (frequency, interval, end condition) describing an indefinitely-repeating event, expanded into concrete occurrences on demand.',
    full: 'Storing one row per future occurrence of an indefinitely-recurring event doesn\'t terminate; storing the rule and expanding it — client-side for the visible range, server-side for range queries — is the only approach that scales. Individual occurrence edits are represented as exceptions layered on top of the rule, never as mutations to the rule itself.',
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
