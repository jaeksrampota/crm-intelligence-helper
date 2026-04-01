import type { ClientProfile, Channel } from '../../types';
import type { CurrentAccountParams } from '../../types/product';
import { formatCZK } from '../../utils/format';
import { Sparkline } from '../shared/Sparkline';
import { ChannelIcon } from '../shared/ChannelIcon';
import { RelativeDate } from '../shared/RelativeDate';
import { useTranslation } from '../../i18n';

export function BehaviorDetailPanel({ signalKey, profile }: { signalKey: string; profile: ClientProfile }) {
  const { t } = useTranslation();

  switch (signalKey) {
    case 'balance_trend':
      return <BalanceTrendDetail profile={profile} t={t} />;
    case 'channel_preference':
      return <ChannelPreferenceDetail profile={profile} t={t} />;
    case 'digital_engagement':
      return <DigitalEngagementDetail profile={profile} t={t} />;
    case 'international_activity':
      return <InternationalDetail profile={profile} t={t} />;
    case 'online_shopping':
      return <OnlineShoppingDetail profile={profile} t={t} />;
    default:
      return <div className="text-xs text-gray-400 py-4 text-center">{t.behaviorDetail.noData}</div>;
  }
}

function BalanceTrendDetail({ profile, t }: { profile: ClientProfile; t: ReturnType<typeof useTranslation>['t'] }) {
  const account = profile.products.find((p) => p.product_type === 'current_account' && p.status === 'active');
  if (!account) return <div className="text-xs text-gray-400 py-4 text-center">{t.behaviorDetail.noData}</div>;

  const params = account.key_params as CurrentAccountParams;
  const history = params.balance_history_30d;
  const current = history[history.length - 1];
  const thirtyDaysAgo = history[0];
  const changePct = thirtyDaysAgo !== 0 ? ((current - thirtyDaysAgo) / thirtyDaysAgo) * 100 : 0;

  return (
    <div className="space-y-4">
      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{t.behaviorDetail.balanceHistory}</h3>
      <Sparkline data={history} width={340} height={80} />
      <div className="bg-gray-50 rounded-lg p-3 space-y-2 text-xs">
        <div className="flex justify-between">
          <span className="text-gray-500">{t.behaviorDetail.currentBalance}</span>
          <span className="font-semibold">{formatCZK(current)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">{t.behaviorDetail.thirtyDaysAgo}</span>
          <span className="font-medium text-gray-600">{formatCZK(thirtyDaysAgo)}</span>
        </div>
        <div className="flex justify-between border-t border-gray-200 pt-2">
          <span className="text-gray-500">{t.behaviorDetail.change}</span>
          <span className={changePct >= 0 ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
            {changePct >= 0 ? '+' : ''}{changePct.toFixed(1)}%
          </span>
        </div>
      </div>
    </div>
  );
}

function ChannelPreferenceDetail({ profile, t }: { profile: ClientProfile; t: ReturnType<typeof useTranslation>['t'] }) {
  const channelCounts: Record<string, number> = {};
  profile.interactions.forEach((i) => {
    channelCounts[i.channel] = (channelCounts[i.channel] || 0) + 1;
  });
  const sorted = Object.entries(channelCounts).sort((a, b) => b[1] - a[1]);
  const maxCount = sorted[0]?.[1] ?? 1;

  return (
    <div className="space-y-3">
      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{t.behaviorDetail.allChannels}</h3>
      <div className="space-y-2">
        {sorted.map(([channel, count]) => (
          <div key={channel} className="flex items-center gap-2">
            <ChannelIcon channel={channel as Channel} size={16} />
            <span className="text-xs text-gray-700 w-24">{t.channels[channel as keyof typeof t.channels] || channel}</span>
            <div className="flex-1 bg-gray-100 rounded-full h-2">
              <div
                className="bg-rb-yellow rounded-full h-2 transition-all"
                style={{ width: `${(count / maxCount) * 100}%` }}
              />
            </div>
            <span className="text-xs text-gray-500 w-8 text-right">{count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function DigitalEngagementDetail({ profile, t }: { profile: ClientProfile; t: ReturnType<typeof useTranslation>['t'] }) {
  const logins = profile.behavioral_events
    .filter((e) => e.event_type === 'login')
    .sort((a, b) => b.timestamp.localeCompare(a.timestamp))
    .slice(0, 15);

  return (
    <div className="space-y-3">
      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{t.behaviorDetail.recentLogins}</h3>
      {logins.length === 0 ? (
        <div className="text-xs text-gray-400 py-2">{t.behaviorDetail.noData}</div>
      ) : (
        <div className="divide-y divide-gray-100">
          {logins.map((event) => (
            <div key={event.event_id} className="flex justify-between items-center py-1.5 text-xs">
              <div className="flex items-center gap-2">
                <ChannelIcon channel={event.channel} size={14} />
                <RelativeDate date={event.timestamp} />
              </div>
              {'device' in event.metadata && (
                <span className="text-[10px] text-gray-400">
                  {String(event.metadata['device'])}{'os' in event.metadata ? ` · ${String(event.metadata['os'])}` : ''}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function InternationalDetail({ profile, t }: { profile: ClientProfile; t: ReturnType<typeof useTranslation>['t'] }) {
  const intlTx = profile.transactions
    .filter((tx) => tx.is_international)
    .sort((a, b) => b.timestamp.localeCompare(a.timestamp));

  return (
    <div className="space-y-3">
      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{t.behaviorDetail.intlTransactions}</h3>
      {intlTx.length === 0 ? (
        <div className="text-xs text-gray-400 py-2">{t.behaviorDetail.noData}</div>
      ) : (
        <div className="divide-y divide-gray-100">
          {intlTx.slice(0, 20).map((tx) => (
            <div key={tx.transaction_id} className="flex justify-between items-center py-2 text-xs">
              <div>
                <div className="font-medium text-gray-800">{tx.merchant_name}</div>
                <div className="text-[10px] text-gray-400">
                  <RelativeDate date={tx.timestamp} />
                  {tx.currency !== 'CZK' && <span className="ml-1 text-amber-600">{tx.currency}</span>}
                </div>
              </div>
              <div className="text-gray-700 font-medium">{formatCZK(tx.amount)}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function OnlineShoppingDetail({ profile, t }: { profile: ClientProfile; t: ReturnType<typeof useTranslation>['t'] }) {
  const ecommTx = profile.transactions
    .filter((tx) => tx.merchant_category === 'e_commerce')
    .sort((a, b) => b.timestamp.localeCompare(a.timestamp));

  return (
    <div className="space-y-3">
      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{t.behaviorDetail.onlineTransactions}</h3>
      {ecommTx.length === 0 ? (
        <div className="text-xs text-gray-400 py-2">{t.behaviorDetail.noData}</div>
      ) : (
        <div className="divide-y divide-gray-100">
          {ecommTx.slice(0, 20).map((tx) => (
            <div key={tx.transaction_id} className="flex justify-between items-center py-2 text-xs">
              <div>
                <div className="font-medium text-gray-800">{tx.merchant_name}</div>
                <div className="text-[10px] text-gray-400"><RelativeDate date={tx.timestamp} /></div>
              </div>
              <div className="text-gray-700 font-medium">{formatCZK(tx.amount)}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
