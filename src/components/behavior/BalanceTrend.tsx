import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '../../utils/cn';
import type { BalanceTrend as BalanceTrendType } from '../../types';

const CONFIG: Record<BalanceTrendType, { Icon: React.ComponentType<{ size?: number; className?: string }>; color: string; label: string }> = {
  growing: { Icon: TrendingUp, color: 'text-green-500', label: 'Growing' },
  stable: { Icon: Minus, color: 'text-gray-400', label: 'Stable' },
  declining: { Icon: TrendingDown, color: 'text-red-500', label: 'Declining' },
};

export function BalanceTrend({ trend, pct }: { trend: BalanceTrendType; pct: number }) {
  const { Icon, color, label } = CONFIG[trend];
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-2.5">
      <div className="text-[10px] text-gray-500 font-medium mb-1.5">Balance Trend</div>
      <div className="flex items-center gap-2 justify-center">
        <Icon size={24} className={cn(color)} />
        <div>
          <div className={cn('text-xs font-semibold', color)}>{label}</div>
          <div className="text-[10px] text-gray-400">{pct > 0 ? '+' : ''}{Math.round(pct * 100)}% / 30d</div>
        </div>
      </div>
    </div>
  );
}
