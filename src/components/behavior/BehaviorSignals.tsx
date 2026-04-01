import { cn } from '../../utils/cn';
import type { BehavioralSignalsSummary, SatisfactionScore } from '../../types';
import { ChannelPreference } from './ChannelPreference';
import { BalanceTrend } from './BalanceTrend';
import { InternationalActivity } from './InternationalActivity';
import { DigitalEngagement } from './DigitalEngagement';
import { OnlineShoppingPattern } from './OnlineShoppingPattern';
import { CommentableElement } from '../comments/CommentableElement';
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
    <div className="space-y-2 overflow-y-auto">
      <CommentableElement zoneId="behavior" elementLabel={t.behavior.title}>
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{t.behavior.title}</h2>
      </CommentableElement>
      <div className="grid grid-cols-2 gap-2">
        <CommentableElement zoneId="behavior" elementId="behavior-channel_preference" elementLabel={t.behavior.channelPreference} className="col-span-2">
          <ChannelPreference channels={signals.channel_preference} onClick={onTileClick ? () => onTileClick('channel_preference') : undefined} />
        </CommentableElement>
        <CommentableElement zoneId="behavior" elementId="behavior-balance_trend" elementLabel={t.behavior.balanceTrend}>
          <BalanceTrend trend={signals.balance_trend} pct={signals.balance_trend_pct} onClick={onTileClick ? () => onTileClick('balance_trend') : undefined} />
        </CommentableElement>
        <CommentableElement zoneId="behavior" elementId="behavior-international_activity" elementLabel={t.behavior.intlActivity}>
          <InternationalActivity active={signals.has_international_activity} count={signals.international_tx_count} onClick={onTileClick ? () => onTileClick('international_activity') : undefined} />
        </CommentableElement>
        <CommentableElement zoneId="behavior" elementId="behavior-digital_engagement" elementLabel={t.behavior.digitalEngagement}>
          <DigitalEngagement level={signals.digital_engagement} loginCount={signals.login_count_30d} onClick={onTileClick ? () => onTileClick('digital_engagement') : undefined} />
        </CommentableElement>
        <CommentableElement zoneId="behavior" elementId="behavior-online_shopping" elementLabel={t.behavior.onlineShopping}>
          <OnlineShoppingPattern active={signals.has_online_shopping} count={signals.online_shopping_count} onClick={onTileClick ? () => onTileClick('online_shopping') : undefined} />
        </CommentableElement>
        {satisfactionScores && satisfactionScores.length > 0 && (
          <CommentableElement zoneId="behavior" elementId="behavior-satisfaction" elementLabel={t.satisfaction.title} className="col-span-2">
            <div
              onClick={onSatisfactionClick}
              className={cn(
                'bg-white rounded-lg border border-gray-200 p-2.5',
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
          </CommentableElement>
        )}
      </div>
    </div>
  );
}
