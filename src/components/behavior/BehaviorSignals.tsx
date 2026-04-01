import type { BehavioralSignalsSummary } from '../../types';
import { ChannelPreference } from './ChannelPreference';
import { BalanceTrend } from './BalanceTrend';
import { InternationalActivity } from './InternationalActivity';
import { DigitalEngagement } from './DigitalEngagement';
import { OnlineShoppingPattern } from './OnlineShoppingPattern';

export function BehaviorSignals({ signals }: { signals: BehavioralSignalsSummary }) {
  return (
    <div className="space-y-1 overflow-y-auto">
      <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Behavior</h2>
      <div className="grid grid-cols-2 gap-1.5">
        <div className="col-span-2">
          <ChannelPreference channels={signals.channel_preference} />
        </div>
        <BalanceTrend trend={signals.balance_trend} pct={signals.balance_trend_pct} />
        <InternationalActivity active={signals.has_international_activity} count={signals.international_tx_count} />
        <DigitalEngagement level={signals.digital_engagement} loginCount={signals.login_count_30d} />
        <OnlineShoppingPattern active={signals.has_online_shopping} count={signals.online_shopping_count} />
      </div>
    </div>
  );
}
