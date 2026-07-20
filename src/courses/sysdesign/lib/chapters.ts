// Importing markdown as raw strings via Vite's ?raw suffix.
import autocomplete from '../content/autocomplete.md?raw';
import imageCarousel from '../content/image-carousel.md?raw';
import modalDialog from '../content/modal-dialog.md?raw';
import dropdownMenu from '../content/dropdown-menu.md?raw';
import dataTable from '../content/data-table.md?raw';
import pollWidget from '../content/poll-widget.md?raw';
import richTextEditor from '../content/rich-text-editor.md?raw';
import multiStepForm from '../content/multi-step-form.md?raw';
import dragAndDrop from '../content/drag-and-drop.md?raw';
import newsFeed from '../content/news-feed.md?raw';
import chatMessaging from '../content/chat-messaging.md?raw';
import collaborativeEditor from '../content/collaborative-editor.md?raw';
import collaborativeSpreadsheet from '../content/collaborative-spreadsheet.md?raw';
import videoStreaming from '../content/video-streaming.md?raw';
import videoConferencing from '../content/video-conferencing.md?raw';
import photoSharing from '../content/photo-sharing.md?raw';
import ecommerceMarketplace from '../content/ecommerce-marketplace.md?raw';
import travelBooking from '../content/travel-booking.md?raw';
import emailClient from '../content/email-client.md?raw';
import designDrawingTool from '../content/design-drawing-tool.md?raw';
import musicStreaming from '../content/music-streaming.md?raw';
import analyticsDashboard from '../content/analytics-dashboard.md?raw';
import aiChatStreaming from '../content/ai-chat-streaming.md?raw';
import notificationSystem from '../content/notification-system.md?raw';
import designSystemComponentLibrary from '../content/design-system-component-library.md?raw';
import microFrontendArchitecture from '../content/micro-frontend-architecture.md?raw';
import seatBooking from '../content/seat-booking.md?raw';
import infiniteScrollFeed from '../content/infinite-scroll-feed.md?raw';
import fileUploadSharing from '../content/file-upload-sharing.md?raw';
import calendarScheduling from '../content/calendar-scheduling.md?raw';
import mechanismFieldGuide from '../content/mechanism-field-guide.md?raw';
import flashSaleCheckout from '../content/flash-sale-checkout.md?raw';
import liveCounterReactions from '../content/live-counter-reactions.md?raw';
import presenceSystem from '../content/presence-system.md?raw';
import liveCursors from '../content/live-cursors.md?raw';
import offlineFirstSync from '../content/offline-first-sync.md?raw';
import optimisticMutationsRollback from '../content/optimistic-mutations-rollback.md?raw';
import rateLimitingDedup from '../content/rate-limiting-dedup.md?raw';

export type Part = 'components' | 'applications' | 'emerging' | 'mechanisms';

export const PART_LABELS: Record<Part, string> = {
  components: 'Part 1 · UI Component Design',
  applications: 'Part 2 · Full Application Design',
  emerging: 'Part 3 · Emerging Questions (2025-26)',
  mechanisms: 'Part 4 · Advanced Mechanisms',
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

// Numbers match the source question bank's own numbering (1-30), not
// sequential within this file — kept in bank order here for readability.
export const chapters: Chapter[] = [
  {
    slug: 'autocomplete',
    number: '1',
    title: 'Autocomplete / Typeahead Search',
    tagline: 'Debouncing, race-condition handling, and ARIA combobox — the most-asked frontend system-design question.',
    part: 'components',
    difficulty: 'Medium',
    content: autocomplete,
  },
  {
    slug: 'image-carousel',
    number: '2',
    title: 'Image Carousel',
    tagline: 'Slide mechanics, lazy loading, and autoplay that respects hover, focus, and reduced motion.',
    part: 'components',
    difficulty: 'Medium',
    content: imageCarousel,
  },
  {
    slug: 'modal-dialog',
    number: '3',
    title: 'Modal / Dialog',
    tagline: 'Focus trapping, scroll locking, and stacking — done correctly under composition, not just once.',
    part: 'components',
    difficulty: 'Medium',
    content: modalDialog,
  },
  {
    slug: 'dropdown-menu',
    number: '4',
    title: 'Dropdown Menu',
    tagline: 'Collision-aware positioning and roving-tabindex keyboard navigation, with submenus.',
    part: 'components',
    difficulty: 'Medium',
    content: dropdownMenu,
  },
  {
    slug: 'data-table',
    number: '5',
    title: 'Data Table / Data Grid',
    tagline: 'Client vs. server mode, 2D virtualization, and live cell updates without full re-renders.',
    part: 'components',
    difficulty: 'Medium-Hard',
    content: dataTable,
  },
  {
    slug: 'poll-widget',
    number: '6',
    title: 'Poll / Embeddable Widget',
    tagline: "Running correctly inside someone else's page, with best-effort duplicate-vote prevention.",
    part: 'components',
    difficulty: 'Medium',
    content: pollWidget,
  },
  {
    slug: 'rich-text-editor',
    number: '7',
    title: 'Rich Text Editor',
    tagline: "Why contentEditable can't be the source of truth, and the document-model architecture that replaces it.",
    part: 'components',
    difficulty: 'Hard',
    content: richTextEditor,
  },
  {
    slug: 'multi-step-form',
    number: '8',
    title: 'Multi-step Form / Wizard',
    tagline: 'Cross-step invalidation, resumable drafts, and validation the server never trusts blindly.',
    part: 'components',
    difficulty: 'Medium',
    content: multiStepForm,
  },
  {
    slug: 'drag-and-drop',
    number: '9',
    title: 'Drag-and-Drop Interface',
    tagline: 'Why native HTML5 DnD is often the wrong tool, and the pointer-event reordering algorithm that replaces it.',
    part: 'components',
    difficulty: 'Medium-Hard',
    content: dragAndDrop,
  },
  {
    slug: 'news-feed',
    number: '10',
    title: 'News Feed',
    tagline: 'Infinite-scroll social feeds — Facebook, Twitter/X, LinkedIn.',
    part: 'applications',
    difficulty: 'Medium',
    content: newsFeed,
  },
  {
    slug: 'chat-messaging',
    number: '11',
    title: 'Chat / Messaging',
    tagline: 'Real-time 1:1 and group chat — Messenger, Slack, WhatsApp.',
    part: 'applications',
    difficulty: 'Hard',
    content: chatMessaging,
  },
  {
    slug: 'collaborative-editor',
    number: '12',
    title: 'Collaborative Editor',
    tagline: 'Real-time multi-user document editing — Google Docs, Notion.',
    part: 'applications',
    difficulty: 'Hard',
    content: collaborativeEditor,
  },
  {
    slug: 'collaborative-spreadsheet',
    number: '13',
    title: 'Collaborative Spreadsheet',
    tagline: 'A virtualized grid with formulas and multi-user editing — Google Sheets, Excel.',
    part: 'applications',
    difficulty: 'Hard',
    content: collaborativeSpreadsheet,
  },
  {
    slug: 'video-streaming',
    number: '14',
    title: 'Video Streaming',
    tagline: 'Adaptive-bitrate VOD platform frontend — Netflix, YouTube.',
    part: 'applications',
    difficulty: 'Hard',
    content: videoStreaming,
  },
  {
    slug: 'video-conferencing',
    number: '15',
    title: 'Video Conferencing',
    tagline: 'Browser-based real-time A/V — Zoom, Google Meet.',
    part: 'applications',
    difficulty: 'Hard',
    content: videoConferencing,
  },
  {
    slug: 'photo-sharing',
    number: '16',
    title: 'Photo Sharing',
    tagline: 'Image-heavy feed/masonry grid with upload — Instagram, Pinterest.',
    part: 'applications',
    difficulty: 'Medium-Hard',
    content: photoSharing,
  },
  {
    slug: 'ecommerce-marketplace',
    number: '17',
    title: 'E-commerce Marketplace',
    tagline: 'Product listing, faceted search, cart, and checkout — where inventory correctness matters more than UI polish.',
    part: 'applications',
    difficulty: 'Medium',
    content: ecommerceMarketplace,
  },
  {
    slug: 'travel-booking',
    number: '18',
    title: 'Travel Booking',
    tagline: 'Search, map-synced listings, and date-range booking built around a real inventory-hold system.',
    part: 'applications',
    difficulty: 'Medium',
    content: travelBooking,
  },
  {
    slug: 'email-client',
    number: '19',
    title: 'Email Client',
    tagline: 'A desktop-grade, offline-capable webmail client — three-pane layout, optimistic actions, multi-device sync.',
    part: 'applications',
    difficulty: 'Medium-Hard',
    content: emailClient,
  },
  {
    slug: 'design-drawing-tool',
    number: '20',
    title: 'Design / Drawing Tool',
    tagline: 'A canvas-based multiplayer editor — CRDT-backed documents, viewport-culled rendering, precise hit-testing.',
    part: 'applications',
    difficulty: 'Hard',
    content: designDrawingTool,
  },
  {
    slug: 'music-streaming',
    number: '21',
    title: 'Music Streaming',
    tagline: 'A playback engine that survives every route change and stays gapless.',
    part: 'applications',
    difficulty: 'Hard',
    content: musicStreaming,
  },
  {
    slug: 'analytics-dashboard',
    number: '22',
    title: 'Real-time Analytics Dashboard',
    tagline: 'Many independently-updating widgets fed by one demultiplexed stream, with backpressure on both sides of the wire.',
    part: 'applications',
    difficulty: 'Medium-Hard',
    content: analyticsDashboard,
  },
  {
    slug: 'ai-chat-streaming',
    number: '23',
    title: 'AI Chat / Streaming LLM Interface',
    tagline: "Token-by-token rendering, stop/regenerate, and abort — without losing what's already streamed in.",
    part: 'emerging',
    difficulty: 'Hard',
    content: aiChatStreaming,
  },
  {
    slug: 'notification-system',
    number: '24',
    title: 'Notification System',
    tagline: 'Real-time delivery, grouping, and a badge count that never drifts from reality.',
    part: 'emerging',
    difficulty: 'Medium',
    content: notificationSystem,
  },
  {
    slug: 'design-system-component-library',
    number: '25',
    title: 'Design System / Component Library',
    tagline: 'Tokens, theming, and versioning at a scale where a breaking change costs every team at once.',
    part: 'emerging',
    difficulty: 'Medium-Hard',
    content: designSystemComponentLibrary,
  },
  {
    slug: 'micro-frontend-architecture',
    number: '26',
    title: 'Micro-frontend Architecture',
    tagline: 'Independently deployed modules composed into one product, without duplicating the framework or drifting out of sync.',
    part: 'emerging',
    difficulty: 'Hard',
    content: microFrontendArchitecture,
  },
  {
    slug: 'seat-booking',
    number: '27',
    title: 'Seat Booking with Locking',
    tagline: 'A backend concurrency problem first — exactly one of many concurrent clickers can win a seat.',
    part: 'emerging',
    difficulty: 'Medium-Hard',
    content: seatBooking,
  },
  {
    slug: 'infinite-scroll-feed',
    number: '28',
    title: 'Infinite Scroll Feed (isolated)',
    tagline: 'A focused deep dive on cursor pagination and virtualization, not a full feed design.',
    part: 'emerging',
    difficulty: 'Medium',
    content: infiniteScrollFeed,
  },
  {
    slug: 'file-upload-sharing',
    number: '29',
    title: 'File Upload / Sharing',
    tagline: 'Chunked, resumable uploads that survive a reload, plus a file tree that syncs across devices.',
    part: 'emerging',
    difficulty: 'Medium-Hard',
    content: fileUploadSharing,
  },
  {
    slug: 'calendar-scheduling',
    number: '30',
    title: 'Calendar / Scheduling',
    tagline: 'Performant grids, recurring events computed on the fly, and timezone correctness across DST.',
    part: 'emerging',
    difficulty: 'Medium-Hard',
    content: calendarScheduling,
  },
  {
    slug: 'mechanism-field-guide',
    number: '31',
    title: 'Mechanism-Driven Questions: A Field Guide',
    tagline: 'Six mechanism families, a repeatable attack pattern, and the consistency spectrum — read this before the rest of Part 4.',
    part: 'mechanisms',
    difficulty: 'Guide',
    content: mechanismFieldGuide,
  },
  {
    slug: 'flash-sale-checkout',
    number: '32',
    title: 'Flash-Sale / Limited-Drop Checkout',
    tagline: 'Contention at 1000x scale — the queue and the atomic decrement are the whole interview, not the checkout form.',
    part: 'mechanisms',
    difficulty: 'Hard',
    content: flashSaleCheckout,
  },
  {
    slug: 'live-counter-reactions',
    number: '33',
    title: 'Live Counter / Reactions at Scale',
    tagline: 'Batching, coalescing, and an honest eventual-consistency posture for a number a million people are watching.',
    part: 'mechanisms',
    difficulty: 'Medium-Hard',
    content: liveCounterReactions,
  },
  {
    slug: 'presence-system',
    number: '34',
    title: 'Presence System',
    tagline: 'Heartbeats, TTL-driven expiry, and the O(N²) fan-out problem hiding behind a green dot.',
    part: 'mechanisms',
    difficulty: 'Medium-Hard',
    content: presenceSystem,
  },
  {
    slug: 'live-cursors',
    number: '35',
    title: 'Live Cursors / Multiplayer Pointers',
    tagline: 'Moving 30 remote cursors smoothly without flooding the network or the render loop.',
    part: 'mechanisms',
    difficulty: 'Medium',
    content: liveCursors,
  },
  {
    slug: 'offline-first-sync',
    number: '36',
    title: 'Offline-First Sync',
    tagline: 'Replaying an hour of offline edits onto whatever the server became in the meantime — correctly, exactly once.',
    part: 'mechanisms',
    difficulty: 'Hard',
    content: offlineFirstSync,
  },
  {
    slug: 'optimistic-mutations-rollback',
    number: '37',
    title: 'Optimistic Mutations with Rollback',
    tagline: 'The generalized pattern behind every optimistic update in this course — and what a clean rollback actually restores.',
    part: 'mechanisms',
    difficulty: 'Medium-Hard',
    content: optimisticMutationsRollback,
  },
  {
    slug: 'rate-limiting-dedup',
    number: '38',
    title: 'Client-Side Rate Limiting / Request Dedup',
    tagline: 'In-flight deduplication, cancellation, and backing off a 429 like a good citizen.',
    part: 'mechanisms',
    difficulty: 'Medium',
    content: rateLimitingDedup,
  },
];

export function findChapter(slug?: string): Chapter | undefined {
  if (!slug) return chapters[0];
  return chapters.find((c) => c.slug === slug) ?? chapters[0];
}

export function chaptersByPart(part: Part): Chapter[] {
  return chapters.filter((c) => c.part === part).sort((a, b) => Number(a.number) - Number(b.number));
}
