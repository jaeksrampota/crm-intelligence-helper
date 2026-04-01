import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import type { BalanceTrend as BalanceTrendType } from '../../types';
import { useTranslation } from '../../i18n';

const WIN_TILE: React.CSSProperties = {
  background: '#d4d0c8',
  borderTop: '2px solid #ffffff',
  borderLeft: '2px solid #ffffff',
  borderRight: '2px solid #808080',
  borderBottom: '2px solid #808080',
  outline: '1px solid #404040',
  padding: '5px 7px',
  fontFamily: 'Tahoma, MS Sans Serif, sans-serif',
  fontSize: 11,
};

const ICON_MAP: Record<BalanceTrendType, React.ComponentType<{ size?: number }>> = {
  growing: TrendingUp,
  stable: Minus,
  declining: TrendingDown,
};

const COLOR_MAP: Record<BalanceTrendType, string> = {
  growing: '#006400',
  stable: '#808080',
  declining: '#c00000',
};

export function BalanceTrend({ trend, pct, onClick }: { trend: BalanceTrendType; pct: number; onClick?: () => void }) {
  const Icon = ICON_MAP[trend];
  const color = COLOR_MAP[trend];
  const { t } = useTranslation();
  const labelMap: Record<BalanceTrendType, string> = {
    growing: t.behavior.growing,
    stable: t.behavior.stable,
    declining: t.behavior.declining,
  };

  return (
    <div onClick={onClick} style={{ ...WIN_TILE, cursor: onClick ? 'pointer' : 'default' }}>
      <div style={{ fontSize: 10, fontWeight: 'bold', marginBottom: 6, color: '#000' }}>{t.behavior.balanceTrend}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center' }}>
        <Icon size={22} style={{ color }} />
        <div>
          <div style={{ fontSize: 11, fontWeight: 'bold', color }}>{labelMap[trend]}</div>
          <div style={{ fontSize: 10, color: '#808080' }}>{pct > 0 ? '+' : ''}{Math.round(pct * 100)}{t.behavior.per30d}</div>
        </div>
      </div>
    </div>
  );
}
