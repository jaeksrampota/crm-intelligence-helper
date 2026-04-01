import type { Client } from './client';
import type { Product } from './product';
import type { Interaction } from './interaction';
import type { Transaction } from './transaction';
import type { Campaign } from './campaign';
import type { BehavioralEvent } from './behavioral';
import type { SatisfactionScore } from './satisfaction';

export interface ClientProfile {
  client: Client;
  products: Product[];
  interactions: Interaction[];
  transactions: Transaction[];
  campaigns: Campaign[];
  behavioral_events: BehavioralEvent[];
  satisfaction_scores: SatisfactionScore[];
}

export type BalanceTrend = 'growing' | 'stable' | 'declining';
export type EngagementLevel = 'low' | 'medium' | 'high';

export interface ChannelUsage {
  channel: string;
  count: number;
}

export interface BehavioralSignalsSummary {
  channel_preference: ChannelUsage[];
  balance_trend: BalanceTrend;
  balance_trend_pct: number;
  has_international_activity: boolean;
  international_tx_count: number;
  digital_engagement: EngagementLevel;
  login_count_30d: number;
  has_online_shopping: boolean;
  online_shopping_count: number;
  rb_club_active: boolean;
}
