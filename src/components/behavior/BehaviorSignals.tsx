import { cn } from '../../utils/cn';
import type { BehavioralSignalsSummary, SatisfactionScore } from '../../types';
import { ChannelPreference } from './ChannelPreference';
import { BalanceTrend } from './BalanceTrend';
import { InternationalActivity } from './InternationalActivity';
import { DigitalEngagement } from './DigitalEngagement';
import { OnlineShoppingPattern } from './OnlineShoppingPattern';
import { useTranslation } from '../../i18n';

interface BehaviorSignalsProps {
  signals: BehavioralSignalsSummary;
  satisfactionScores?: SatisfactionScore[];
  onTileClick?: (signal: string) => void;
  onSatisfactionClick?: () => void;
}

export function BehaviorSignals({ signals, satisfactionScores, onTileClick, onSatisfactionClick }: BehaviorSignalsProps) {
  const { t } = useTranslation();

  const latestNps = satisfactionScores
    ?.filter((s) => s.survey_type === 'NPS')
    .sort((a, b) => b.timestamp.localeCompare(a.timestamp))[0];

  const npsColor = latestNps
    ? latestNps.score >= 9 ? 'text-green-600' : latestNps.score >= 7 ? 'text-amber-600' : 'text-red-600'
    : 'text-gray-400';

  return (
    <div className="space-y-1 overflow-y-auto">
      <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{t.behavior.title}</h2>
      <div className="grid grid-cols-2 gap-2">
        <div className="col-span-2">
          <ChannelPreference channels={signals.channel_preference} onClick={onTileClick ? () => onTileClick('channel_preference') : undefined} />
        </div>
        <BalanceTrend trend={signals.balance_trend} pct={signals.balance_trend_pct} onClick={onTileClick ? () => onTileClick('balance_trend') : undefined} />
        <InternationalActivity active={signals.has_international_activity} count={signals.international_tx_count} onClick={onTileClick ? () => onTileClick('international_activity') : undefined} />
        <DigitalEngagement level={signals.digital_engagement} loginCount={signals.login_count_30d} onClick={onTileClick ? () => onTileClick('digital_engagement') : undefined} />
        <OnlineShoppingPattern active={signals.has_online_shopping} count={signals.online_shopping_count} onClick={onTileClick ? () => onTileClick('online_shopping') : undefined} />
        {satisfactionScores && satisfactionScores.length > 0 && (
          <div
            onClick={onSatisfactionClick}
            className={cn(
              'col-span-2 bg-white rounded-lg border border-gray-200 p-2.5',
              onSatisfactionClick && 'cursor-pointer hover:border-rb-yellow hover:shadow-sm transition-all',
            )}
          >
            <div className="text-[10px] text-gray-500 font-medium mb-1">{t.satisfaction.title}</div>
            <div className="flex items-center justify-center gap-3">
              <div className="text-center">
                <div className={cn('text-lg font-bold', npsColor)}>{latestNps?.score ?? '—'}</div>
                <div className="text-[9px] text-gray-400">{t.satisfaction.latestNps}</div>
              </div>
              <div className="text-[10px] text-gray-400">
                {satisfactionScores.length} {satisfactionScores.length === 1 ? t.satisfaction.survey : t.satisfaction.surveys}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
