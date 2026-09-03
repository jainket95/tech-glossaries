// Importing markdown as raw strings via Vite's ?raw suffix.
import urlShortener from '../content/url-shortener.md?raw';
import notificationService from '../content/notification-service.md?raw';
import pastebin from '../content/pastebin.md?raw';
import rateLimiter from '../content/rate-limiter.md?raw';
import libraryManagement from '../content/library-management.md?raw';
import pollingVoting from '../content/polling-voting.md?raw';
import parkingLot from '../content/parking-lot.md?raw';
import hotelBooking from '../content/hotel-booking.md?raw';
import jobScheduler from '../content/job-scheduler.md?raw';
import expenseSharing from '../content/expense-sharing.md?raw';
import keyValueStore from '../content/key-value-store.md?raw';
import quizPlatform from '../content/quiz-platform.md?raw';
import foodDelivery from '../content/food-delivery.md?raw';
import rideSharing from '../content/ride-sharing.md?raw';
import distributedCache from '../content/distributed-cache.md?raw';
import teamChat from '../content/team-chat.md?raw';
import cdn from '../content/cdn.md?raw';
import paymentGateway from '../content/payment-gateway.md?raw';
import ticketBooking from '../content/ticket-booking.md?raw';
import inventoryManagement from '../content/inventory-management.md?raw';
import apiGateway from '../content/api-gateway.md?raw';
import taskQueue from '../content/task-queue.md?raw';
import loggingMonitoring from '../content/logging-monitoring.md?raw';
import collaborativeDocs from '../content/collaborative-docs.md?raw';
import distributedMessaging from '../content/distributed-messaging.md?raw';
import globalDatabase from '../content/global-database.md?raw';
import searchIndexing from '../content/search-indexing.md?raw';
import fraudDetection from '../content/fraud-detection.md?raw';
import videoPlatform from '../content/video-platform.md?raw';
import distributedFileStorage from '../content/distributed-file-storage.md?raw';
import recommendationEngine from '../content/recommendation-engine.md?raw';
import globalRateLimiter from '../content/global-rate-limiter.md?raw';
import adServing from '../content/ad-serving.md?raw';
import leaderElection from '../content/leader-election.md?raw';
import globalCdn from '../content/global-cdn.md?raw';
import distributedTransactions from '../content/distributed-transactions.md?raw';

// Numbers run continuously across parts (1-12 sde1, 13-24 sde2, 25-36 sde3), matching
// the sysdesign course's own convention — kept in bank order for readability, not
// necessarily insertion order.
export type Part = 'sde1' | 'sde2' | 'sde3';

export const PART_LABELS: Record<Part, string> = {
  sde1: 'Part 1 · Fresher / SDE-1',
  sde2: 'Part 2 · SDE-2 / Mid Level',
  sde3: 'Part 3 · SDE-3 / Senior',
};

export type Chapter = {
  slug: string;
  number: string;
  title: string;
  tagline: string;
  part: Part;
  difficulty: string;
  content: string;
};

export const chapters: Chapter[] = [
  {
    slug: 'url-shortener',
    number: '1',
    title: 'URL Shortening Service',
    tagline: 'Base62 counters, why 301 vs. 302 is a real decision, and keeping writes off the read path.',
    part: 'sde1',
    difficulty: 'Easy-Medium',
    content: urlShortener,
  },
  {
    slug: 'notification-service',
    number: '2',
    title: 'Notification System',
    tagline: 'Multi-channel fan-out, idempotent delivery, and smoothing bursts to a provider\'s rate limit.',
    part: 'sde1',
    difficulty: 'Medium',
    content: notificationService,
  },
  {
    slug: 'pastebin',
    number: '3',
    title: 'Pastebin / Text Sharing',
    tagline: 'Blob storage vs. inline rows, and why immutability makes caching nearly free.',
    part: 'sde1',
    difficulty: 'Easy',
    content: pastebin,
  },
  {
    slug: 'rate-limiter',
    number: '4',
    title: 'Rate Limiter',
    tagline: 'Token bucket vs. fixed window, atomic check-and-set, and failing open when Redis is down.',
    part: 'sde1',
    difficulty: 'Medium',
    content: rateLimiter,
  },
  {
    slug: 'library-management',
    number: '5',
    title: 'Library Management System',
    tagline: 'Per-copy rows, the last-copy checkout race, and a fairness-preserving hold queue.',
    part: 'sde1',
    difficulty: 'Easy-Medium',
    content: libraryManagement,
  },
  {
    slug: 'polling-voting',
    number: '6',
    title: 'Polling / Voting App',
    tagline: 'A database constraint that makes double-voting impossible, not just unlikely.',
    part: 'sde1',
    difficulty: 'Easy-Medium',
    content: pollingVoting,
  },
  {
    slug: 'parking-lot',
    number: '7',
    title: 'Parking Lot Management',
    tagline: 'Atomic spot assignment and why nearest-first beats random availability.',
    part: 'sde1',
    difficulty: 'Easy-Medium',
    content: parkingLot,
  },
  {
    slug: 'hotel-booking',
    number: '8',
    title: 'Hotel Booking System',
    tagline: 'Per-night inventory rows, atomic date-range holds, and overbooking as a deliberate policy.',
    part: 'sde1',
    difficulty: 'Medium',
    content: hotelBooking,
  },
  {
    slug: 'job-scheduler',
    number: '9',
    title: 'Job Scheduler',
    tagline: 'A unique constraint as a lock-free claim, and the catch-up-vs-skip decision after downtime.',
    part: 'sde1',
    difficulty: 'Medium',
    content: jobScheduler,
  },
  {
    slug: 'expense-sharing',
    number: '10',
    title: 'Expense Sharing (Splitwise)',
    tagline: 'An immutable ledger as source of truth, and simplifying debts into the fewest settle-up payments.',
    part: 'sde1',
    difficulty: 'Medium',
    content: expenseSharing,
  },
  {
    slug: 'key-value-store',
    number: '11',
    title: 'In-Memory Key-Value Store',
    tagline: 'Single-threaded event loops, sampled active expiry, and why approximate LRU beats exact LRU.',
    part: 'sde1',
    difficulty: 'Medium',
    content: keyValueStore,
  },
  {
    slug: 'quiz-platform',
    number: '12',
    title: 'Online Quiz Platform',
    tagline: 'Server-authoritative timing, because a client-reported deadline is trivially bypassable.',
    part: 'sde1',
    difficulty: 'Easy-Medium',
    content: quizPlatform,
  },
  {
    slug: 'food-delivery',
    number: '13',
    title: 'Food Delivery System (Swiggy)',
    tagline: 'Overwrite-only location writes and geospatial matching without scanning every partner.',
    part: 'sde2',
    difficulty: 'Medium',
    content: foodDelivery,
  },
  {
    slug: 'ride-sharing',
    number: '14',
    title: 'Ride Sharing System (Uber)',
    tagline: 'Per-cell surge pricing as a cached background computation, not a per-request one.',
    part: 'sde2',
    difficulty: 'Medium-Hard',
    content: rideSharing,
  },
  {
    slug: 'distributed-cache',
    number: '15',
    title: 'Distributed Cache',
    tagline: 'Consistent hashing, the hot-key problem, and stopping a thundering herd at expiry.',
    part: 'sde2',
    difficulty: 'Medium-Hard',
    content: distributedCache,
  },
  {
    slug: 'team-chat',
    number: '16',
    title: 'Real-Time Chat (Slack)',
    tagline: 'Per-channel sequence numbers instead of timestamps, and fan-out that scales past 10,000 members.',
    part: 'sde2',
    difficulty: 'Hard',
    content: teamChat,
  },
  {
    slug: 'cdn',
    number: '17',
    title: 'Content Delivery Network (Cloudflare)',
    tagline: 'Anycast vs. DNS routing, cache-key design, and an origin shield against multi-PoP stampedes.',
    part: 'sde2',
    difficulty: 'Medium-Hard',
    content: cdn,
  },
  {
    slug: 'payment-gateway',
    number: '18',
    title: 'Payment Gateway',
    tagline: 'Mandatory idempotency keys and a double-entry ledger, because a payment system can\'t fix itself after the fact.',
    part: 'sde2',
    difficulty: 'Hard',
    content: paymentGateway,
  },
  {
    slug: 'ticket-booking',
    number: '19',
    title: 'Ticket Booking with Seat Locking',
    tagline: 'A virtual waiting room in front of atomic seat locks, for when demand is 25x inventory.',
    part: 'sde2',
    difficulty: 'Hard',
    content: ticketBooking,
  },
  {
    slug: 'inventory-management',
    number: '20',
    title: 'E-Commerce Inventory Management',
    tagline: 'Reserve-then-confirm holds, and multi-channel sync as an explicitly eventually-consistent problem.',
    part: 'sde2',
    difficulty: 'Medium',
    content: inventoryManagement,
  },
  {
    slug: 'api-gateway',
    number: '21',
    title: 'Rate-Limited API Gateway',
    tagline: 'Locally-cached config and JWT validation, so the gateway never adds a network hop to every request.',
    part: 'sde2',
    difficulty: 'Medium',
    content: apiGateway,
  },
  {
    slug: 'task-queue',
    number: '22',
    title: 'Job Queue / Task Processing (Celery)',
    tagline: 'Visibility timeouts as the mechanism that makes worker crashes a non-event.',
    part: 'sde2',
    difficulty: 'Medium',
    content: taskQueue,
  },
  {
    slug: 'logging-monitoring',
    number: '23',
    title: 'Scalable Logging & Monitoring',
    tagline: 'Cardinality guardrails at ingestion and downsampling by data age, before storage cost explodes.',
    part: 'sde2',
    difficulty: 'Medium-Hard',
    content: loggingMonitoring,
  },
  {
    slug: 'collaborative-docs',
    number: '24',
    title: 'Collaborative Document Editing (Google Docs)',
    tagline: 'An append-only op log with snapshots, sharded by document, not by user.',
    part: 'sde2',
    difficulty: 'Hard',
    content: collaborativeDocs,
  },
  {
    slug: 'distributed-messaging',
    number: '25',
    title: 'Distributed Messaging (WhatsApp / Kafka)',
    tagline: 'Partitioned commit logs, in-sync replica sets, and idempotent producers for exactly-once writes.',
    part: 'sde3',
    difficulty: 'Hard',
    content: distributedMessaging,
  },
  {
    slug: 'global-database',
    number: '26',
    title: 'Multi-Region Replicated Database',
    tagline: 'Per-shard consensus, bounded clock uncertainty, and an explicit CAP stance during a partition.',
    part: 'sde3',
    difficulty: 'Hard',
    content: globalDatabase,
  },
  {
    slug: 'search-indexing',
    number: '27',
    title: 'Search Indexing Pipeline (Elasticsearch)',
    tagline: 'Immutable segments, near-real-time refresh, and zero-downtime reindexing via alias swap.',
    part: 'sde3',
    difficulty: 'Hard',
    content: searchIndexing,
  },
  {
    slug: 'fraud-detection',
    number: '28',
    title: 'Real-Time Fraud Detection',
    tagline: 'Streaming feature stores, a two-tier rules-then-model pipeline, and learning from labels that arrive months late.',
    part: 'sde3',
    difficulty: 'Hard',
    content: fraudDetection,
  },
  {
    slug: 'video-platform',
    number: '29',
    title: 'Video Streaming Platform (YouTube / Netflix)',
    tagline: 'Chunked parallel transcoding and access-pattern-driven storage tiering, not a fixed age cutoff.',
    part: 'sde3',
    difficulty: 'Hard',
    content: videoPlatform,
  },
  {
    slug: 'distributed-file-storage',
    number: '30',
    title: 'Distributed File Storage (HDFS / S3)',
    tagline: 'Replication vs. erasure coding, rack-aware placement, and the small-file metadata scaling trap.',
    part: 'sde3',
    difficulty: 'Hard',
    content: distributedFileStorage,
  },
  {
    slug: 'recommendation-engine',
    number: '31',
    title: 'Recommendation Engine at Scale',
    tagline: 'Two-stage retrieval-then-ranking, approximate nearest neighbor, and an explicit cold-start path.',
    part: 'sde3',
    difficulty: 'Hard',
    content: recommendationEngine,
  },
  {
    slug: 'global-rate-limiter',
    number: '32',
    title: 'Multi-Datacenter Rate Limiter',
    tagline: 'Per-region budget allocation with async reconciliation, so no request pays a cross-region round trip.',
    part: 'sde3',
    difficulty: 'Hard',
    content: globalRateLimiter,
  },
  {
    slug: 'ad-serving',
    number: '33',
    title: 'Ad Serving with Real-Time Bidding',
    tagline: 'A hard 100ms deadline as a design constraint, parallel fan-out, and why second-price auctions work.',
    part: 'sde3',
    difficulty: 'Hard',
    content: adServing,
  },
  {
    slug: 'leader-election',
    number: '34',
    title: 'Leader Election & Consensus',
    tagline: 'Why majority quorum mathematically prevents split-brain, and an explicit CAP stance under partition.',
    part: 'sde3',
    difficulty: 'Hard',
    content: leaderElection,
  },
  {
    slug: 'global-cdn',
    number: '35',
    title: 'Global CDN with Edge Cache Invalidation',
    tagline: 'Hierarchical purge propagation and region-level failure detection at thousands of edge nodes.',
    part: 'sde3',
    difficulty: 'Hard',
    content: globalCdn,
  },
  {
    slug: 'distributed-transactions',
    number: '36',
    title: 'Distributed Transactions & Eventual Consistency',
    tagline: 'Why sagas replaced 2PC at scale, and the transactional outbox pattern for reliable event publishing.',
    part: 'sde3',
    difficulty: 'Hard',
    content: distributedTransactions,
  },
];

export function findChapter(slug?: string): Chapter | undefined {
  if (!slug) return chapters[0];
  return chapters.find((c) => c.slug === slug) ?? chapters[0];
}

export function chaptersByPart(part: Part): Chapter[] {
  return chapters.filter((c) => c.part === part).sort((a, b) => Number(a.number) - Number(b.number));
}
