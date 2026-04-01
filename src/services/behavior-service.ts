import { behavioralEvents, products, transactions, interactions } from '../data';
import type { BehavioralSignalsSummary, ChannelUsage } from '../types';

export async function fetchBehavioralSignals(clientId: string): Promise<BehavioralSignalsSummary> {
  const events = behavioralEvents.filter((e) => e.client_id === clientId);
  const clientTx = transactions.filter((tx) => tx.client_id === clientId);
  const clientProducts = products.filter((p) => p.client_id === clientId);
  const clientInteractions = interactions.filter((i) => i.client_id === clientId);

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const ninetyDaysAgo = new Date();
  ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

  // Channel preference from events + interactions
  const channelCounts: Record<string, number> = {};
  events.forEach((e) => {
    channelCounts[e.channel] = (channelCounts[e.channel] || 0) + 1;
  });
  clientInteractions.forEach((i) => {
    channelCounts[i.channel] = (channelCounts[i.channel] || 0) + 1;
  });
  const channel_preference: ChannelUsage[] = Object.entries(channelCounts)
    .map(([channel, count]) => ({ channel, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 3);

  // Balance trend from current account
  const currentAccount = clientProducts.find((p) => p.product_type === 'current_account');
  let balance_trend: 'growing' | 'stable' | 'declining' = 'stable';
  let balance_trend_pct = 0;
  if (currentAccount && 'balance_history_30d' in currentAccount.key_params) {
    const history = (currentAccount.key_params as Record<string, unknown>).balance_history_30d as number[];
    if (history.length >= 2) {
      const first = history[0];
      const last = history[history.length - 1];
      balance_trend_pct = first !== 0 ? (last - first) / Math.abs(first) : 0;
      if (balance_trend_pct > 0.05) balance_trend = 'growing';
      else if (balance_trend_pct < -0.05) balance_trend = 'declining';
    }
  }

  // International activity
  const recentIntlTx = clientTx.filter(
    (tx) => tx.is_international && new Date(tx.timestamp) >= ninetyDaysAgo
  );

  // Digital engagement (login count in 30 days)
  const recentLogins = events.filter(
    (e) => e.event_type === 'login' && new Date(e.timestamp) >= thirtyDaysAgo
  );
  const loginCount = recentLogins.length;
  let digital_engagement: 'low' | 'medium' | 'high' = 'low';
  if (loginCount > 15) digital_engagement = 'high';
  else if (loginCount >= 5) digital_engagement = 'medium';

  // Online shopping
  const recentEcommerce = clientTx.filter(
    (tx) => tx.merchant_category === 'e_commerce' && new Date(tx.timestamp) >= ninetyDaysAgo
  );

  // RB Club
  const rbClubEvents = events.filter(
    (e) => e.event_type === 'feature_use' && (e.metadata as Record<string, unknown>)?.feature === 'rb_club'
  );

  return {
    channel_preference,
    balance_trend,
    balance_trend_pct,
    has_international_activity: recentIntlTx.length > 0,
    international_tx_count: recentIntlTx.length,
    digital_engagement,
    login_count_30d: loginCount,
    has_online_shopping: recentEcommerce.length > 0,
    online_shopping_count: recentEcommerce.length,
    rb_club_active: rbClubEvents.length > 0,
  };
}
