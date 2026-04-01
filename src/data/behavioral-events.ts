import type { BehavioralEvent } from '../types';
import { daysAgo } from '../utils/date-helpers';

// ---------------------------------------------------------------------------
// Helper to generate event batches
// ---------------------------------------------------------------------------

let eventIdCounter = 1;

interface EventTemplate {
  client_id: string;
  channel: 'mobile_app' | 'internet_banking';
  event_type: BehavioralEvent['event_type'];
  daysBack: number;
  metadata?: Record<string, unknown>;
}

function makeEvent(t: EventTemplate): BehavioralEvent {
  const id = `EVT${String(eventIdCounter++).padStart(4, '0')}`;
  return {
    event_id: id,
    client_id: t.client_id,
    channel: t.channel,
    event_type: t.event_type,
    timestamp: daysAgo(t.daysBack),
    metadata: t.metadata ?? {},
  };
}

function makeBatch(templates: EventTemplate[]): BehavioralEvent[] {
  return templates.map(makeEvent);
}

// ---------------------------------------------------------------------------
// C001 - Jana: HIGH digital engagement (20+ logins/month), NO rb_club feature_use
// ---------------------------------------------------------------------------

const janaEvents = makeBatch([
  // Frequent logins - mobile app
  ...Array.from({ length: 18 }, (_, i) => ({
    client_id: 'C001' as const,
    channel: 'mobile_app' as const,
    event_type: 'login' as const,
    daysBack: i * 1.5,
    metadata: { device: 'iPhone 14', os: 'iOS 17' },
  })),
  // Some internet banking logins
  ...Array.from({ length: 6 }, (_, i) => ({
    client_id: 'C001' as const,
    channel: 'internet_banking' as const,
    event_type: 'login' as const,
    daysBack: i * 5,
    metadata: { browser: 'Chrome', os: 'Windows 11' },
  })),
  // Page views - spending analytics, payment history
  { client_id: 'C001', channel: 'mobile_app', event_type: 'page_view', daysBack: 1, metadata: { page: 'spending_analytics' } },
  { client_id: 'C001', channel: 'mobile_app', event_type: 'page_view', daysBack: 2, metadata: { page: 'transaction_history' } },
  { client_id: 'C001', channel: 'mobile_app', event_type: 'page_view', daysBack: 3, metadata: { page: 'card_detail' } },
  { client_id: 'C001', channel: 'mobile_app', event_type: 'page_view', daysBack: 5, metadata: { page: 'payment_new' } },
  { client_id: 'C001', channel: 'internet_banking', event_type: 'page_view', daysBack: 4, metadata: { page: 'standing_orders' } },
  { client_id: 'C001', channel: 'internet_banking', event_type: 'page_view', daysBack: 6, metadata: { page: 'product_offers' } },
  // Feature use - but NOT rb_club
  { client_id: 'C001', channel: 'mobile_app', event_type: 'feature_use', daysBack: 1, metadata: { feature: 'quick_payment' } },
  { client_id: 'C001', channel: 'mobile_app', event_type: 'feature_use', daysBack: 3, metadata: { feature: 'spending_categories' } },
  { client_id: 'C001', channel: 'mobile_app', event_type: 'feature_use', daysBack: 7, metadata: { feature: 'card_lock_toggle' } },
  { client_id: 'C001', channel: 'mobile_app', event_type: 'feature_use', daysBack: 10, metadata: { feature: 'payment_qr_scan' } },
  // App opens and session ends
  ...Array.from({ length: 5 }, (_, i) => ({
    client_id: 'C001' as const,
    channel: 'mobile_app' as const,
    event_type: 'app_open' as const,
    daysBack: i * 2,
    metadata: { source: 'push_notification' },
  })),
  ...Array.from({ length: 5 }, (_, i) => ({
    client_id: 'C001' as const,
    channel: 'mobile_app' as const,
    event_type: 'session_end' as const,
    daysBack: i * 2,
    metadata: { session_duration_sec: 120 + Math.floor(Math.random() * 300) },
  })),
]);

// ---------------------------------------------------------------------------
// C002 - Petr: MEDIUM engagement
// ---------------------------------------------------------------------------

const petrEvents = makeBatch([
  ...Array.from({ length: 10 }, (_, i) => ({
    client_id: 'C002' as const,
    channel: 'mobile_app' as const,
    event_type: 'login' as const,
    daysBack: i * 3,
    metadata: { device: 'Samsung Galaxy S24', os: 'Android 14' },
  })),
  ...Array.from({ length: 3 }, (_, i) => ({
    client_id: 'C002' as const,
    channel: 'internet_banking' as const,
    event_type: 'login' as const,
    daysBack: i * 10,
    metadata: { browser: 'Firefox', os: 'macOS' },
  })),
  { client_id: 'C002', channel: 'mobile_app', event_type: 'page_view', daysBack: 1, metadata: { page: 'credit_card_statement' } },
  { client_id: 'C002', channel: 'mobile_app', event_type: 'page_view', daysBack: 3, metadata: { page: 'mortgage_detail' } },
  { client_id: 'C002', channel: 'mobile_app', event_type: 'page_view', daysBack: 5, metadata: { page: 'insurance_overview' } },
  { client_id: 'C002', channel: 'mobile_app', event_type: 'feature_use', daysBack: 2, metadata: { feature: 'rb_club' } },
  { client_id: 'C002', channel: 'mobile_app', event_type: 'feature_use', daysBack: 8, metadata: { feature: 'travel_notification' } },
  { client_id: 'C002', channel: 'internet_banking', event_type: 'feature_use', daysBack: 5, metadata: { feature: 'export_statements' } },
]);

// ---------------------------------------------------------------------------
// C003 - Marie: LOW engagement (2-3 logins)
// ---------------------------------------------------------------------------

const marieEvents = makeBatch([
  { client_id: 'C003', channel: 'internet_banking', event_type: 'login', daysBack: 3, metadata: { browser: 'Chrome', os: 'Windows 10' } },
  { client_id: 'C003', channel: 'internet_banking', event_type: 'login', daysBack: 15, metadata: { browser: 'Chrome', os: 'Windows 10' } },
  { client_id: 'C003', channel: 'internet_banking', event_type: 'login', daysBack: 28, metadata: { browser: 'Chrome', os: 'Windows 10' } },
  { client_id: 'C003', channel: 'internet_banking', event_type: 'page_view', daysBack: 3, metadata: { page: 'account_overview' } },
  { client_id: 'C003', channel: 'internet_banking', event_type: 'page_view', daysBack: 15, metadata: { page: 'standing_orders' } },
  { client_id: 'C003', channel: 'internet_banking', event_type: 'session_end', daysBack: 3, metadata: { session_duration_sec: 180 } },
  { client_id: 'C003', channel: 'internet_banking', event_type: 'session_end', daysBack: 15, metadata: { session_duration_sec: 90 } },
]);

// ---------------------------------------------------------------------------
// C004 - Tomas: MEDIUM engagement
// ---------------------------------------------------------------------------

const tomasEvents = makeBatch([
  ...Array.from({ length: 8 }, (_, i) => ({
    client_id: 'C004' as const,
    channel: 'mobile_app' as const,
    event_type: 'login' as const,
    daysBack: i * 3.5,
    metadata: { device: 'iPhone 13', os: 'iOS 17' },
  })),
  ...Array.from({ length: 4 }, (_, i) => ({
    client_id: 'C004' as const,
    channel: 'internet_banking' as const,
    event_type: 'login' as const,
    daysBack: i * 7,
    metadata: { browser: 'Safari', os: 'macOS' },
  })),
  { client_id: 'C004', channel: 'mobile_app', event_type: 'page_view', daysBack: 1, metadata: { page: 'loan_detail' } },
  { client_id: 'C004', channel: 'mobile_app', event_type: 'page_view', daysBack: 4, metadata: { page: 'credit_card_detail' } },
  { client_id: 'C004', channel: 'mobile_app', event_type: 'feature_use', daysBack: 2, metadata: { feature: 'quick_payment' } },
  { client_id: 'C004', channel: 'mobile_app', event_type: 'feature_use', daysBack: 6, metadata: { feature: 'spending_categories' } },
  { client_id: 'C004', channel: 'internet_banking', event_type: 'feature_use', daysBack: 7, metadata: { feature: 'direct_debit_setup' } },
]);

// ---------------------------------------------------------------------------
// C005 - Lucie: MEDIUM engagement
// ---------------------------------------------------------------------------

const lucieEvents = makeBatch([
  ...Array.from({ length: 12 }, (_, i) => ({
    client_id: 'C005' as const,
    channel: 'mobile_app' as const,
    event_type: 'login' as const,
    daysBack: i * 2.5,
    metadata: { device: 'iPhone 15', os: 'iOS 18' },
  })),
  ...Array.from({ length: 2 }, (_, i) => ({
    client_id: 'C005' as const,
    channel: 'internet_banking' as const,
    event_type: 'login' as const,
    daysBack: i * 14,
    metadata: { browser: 'Chrome', os: 'macOS' },
  })),
  { client_id: 'C005', channel: 'mobile_app', event_type: 'page_view', daysBack: 1, metadata: { page: 'card_detail' } },
  { client_id: 'C005', channel: 'mobile_app', event_type: 'page_view', daysBack: 3, metadata: { page: 'spending_analytics' } },
  { client_id: 'C005', channel: 'mobile_app', event_type: 'page_view', daysBack: 5, metadata: { page: 'savings_goals' } },
  { client_id: 'C005', channel: 'mobile_app', event_type: 'feature_use', daysBack: 1, metadata: { feature: 'apple_pay_setup' } },
  { client_id: 'C005', channel: 'mobile_app', event_type: 'feature_use', daysBack: 4, metadata: { feature: 'spending_categories' } },
  { client_id: 'C005', channel: 'mobile_app', event_type: 'feature_use', daysBack: 8, metadata: { feature: 'savings_goal_create' } },
  { client_id: 'C005', channel: 'mobile_app', event_type: 'app_open', daysBack: 0, metadata: { source: 'push_notification' } },
  { client_id: 'C005', channel: 'mobile_app', event_type: 'app_open', daysBack: 3, metadata: { source: 'direct' } },
]);

// ---------------------------------------------------------------------------
// Export all events
// ---------------------------------------------------------------------------

export const behavioralEvents: BehavioralEvent[] = [
  ...janaEvents,
  ...petrEvents,
  ...marieEvents,
  ...tomasEvents,
  ...lucieEvents,
];
