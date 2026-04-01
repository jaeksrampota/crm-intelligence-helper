import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '../../utils/cn';
import type { BalanceTrend as BalanceTrendType } from '../../types';
import { useTranslation } from '../../i18n';

const ICON_MAP: Record<BalanceTrendType, React.ComponentType<{ size?: number; className?: string }>> = {
  growing: TrendingUp,
  stable: Minus,
  declining: TrendingDown,
};

const COLOR_MAP: Record<BalanceTrendType, string> = {
  growing: 'text-green-500',
  stable: 'text-gray-400',
  declining: 'text-red-500',
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
    <div onClick={onClick} className={cn('bg-white rounded-lg border border-gray-200 p-2.5', onClick && 'cursor-pointer hover:border-rb-yellow hover:shadow-sm transition-all')}>
      <div className="text-[10px] text-gray-500 font-medium mb-1.5">{t.behavior.balanceTrend}</div>
      <div className="flex items-center gap-2 justify-center">
        <Icon size={24} className={cn(color)} />
        <div>
          <div className={cn('text-xs font-semibold', color)}>{labelMap[trend]}</div>
          <div className="text-[10px] text-gray-400">{pct > 0 ? '+' : ''}{Math.round(pct * 100)}{t.behavior.per30d}</div>
        </div>
      </div>
    </div>
  );
}
