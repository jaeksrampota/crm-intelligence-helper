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
    ? latestNps.score >= 9 ? '#006400' : latestNps.score >= 7 ? '#cc7700' : '#c00000'
    : '#808080';

  const TILE_STYLE: React.CSSProperties = {
    fontFamily: 'Tahoma, MS Sans Serif, sans-serif',
    fontSize: 11,
  };

  return (
    <div style={TILE_STYLE}>
      {/* Channel preference — full width */}
      <div style={{ marginBottom: 4 }}>
        <ChannelPreference channels={signals.channel_preference} onClick={onTileClick ? () => onTileClick('channel_preference') : undefined} />
      </div>

      {/* 2-column grid for smaller tiles */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
        <BalanceTrend trend={signals.balance_trend} pct={signals.balance_trend_pct} onClick={onTileClick ? () => onTileClick('balance_trend') : undefined} />
        <InternationalActivity active={signals.has_international_activity} count={signals.international_tx_count} onClick={onTileClick ? () => onTileClick('international_activity') : undefined} />
        <DigitalEngagement level={signals.digital_engagement} loginCount={signals.login_count_30d} onClick={onTileClick ? () => onTileClick('digital_engagement') : undefined} />
        <OnlineShoppingPattern active={signals.has_online_shopping} count={signals.online_shopping_count} onClick={onTileClick ? () => onTileClick('online_shopping') : undefined} />
      </div>

      {/* Satisfaction score — full width */}
      {satisfactionScores && satisfactionScores.length > 0 && (
        <div
          onClick={onSatisfactionClick}
          style={{
            marginTop: 4,
            background: '#d4d0c8',
            borderTop: '2px solid #ffffff',
            borderLeft: '2px solid #ffffff',
            borderRight: '2px solid #808080',
            borderBottom: '2px solid #808080',
            outline: '1px solid #404040',
            padding: '5px 7px',
            cursor: onSatisfactionClick ? 'pointer' : 'default',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: 10, fontWeight: 'bold', marginBottom: 4 }}>{t.satisfaction.title}</div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
            <div>
              <div style={{ fontSize: 16, fontWeight: 'bold', color: npsColor }}>{latestNps?.score ?? '—'}</div>
              <div style={{ fontSize: 9, color: '#808080' }}>{t.satisfaction.latestNps}</div>
            </div>
            <div
              style={{
                width: 1,
                height: 28,
                background: '#808080',
                boxShadow: '1px 0 0 #ffffff',
              }}
            />
            <div style={{ fontSize: 10, color: '#808080' }}>
              {satisfactionScores.length} {satisfactionScores.length === 1 ? t.satisfaction.survey : t.satisfaction.surveys}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
