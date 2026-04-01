import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '../../utils/cn';
import type { SalesTip } from '../../types';
import { useTranslation } from '../../i18n';

const PRIORITY_BORDER: Record<string, string> = {
  high: 'border-l-priority-high',
  medium: 'border-l-priority-medium',
  low: 'border-l-priority-low',
};

const PRIORITY_BADGE: Record<string, string> = {
  high: 'bg-red-50 text-red-700 border-red-200',
  medium: 'bg-amber-50 text-amber-700 border-amber-200',
  low: 'bg-blue-50 text-blue-700 border-blue-200',
};

export function SalesTipCard({ tip }: { tip: SalesTip }) {
  const [expanded, setExpanded] = useState(false);
  const { t } = useTranslation();
  const priorityLabel: Record<string, string> = {
    high: t.sales.priorityHigh,
    medium: t.sales.priorityMed,
    low: t.sales.priorityLow,
  };

  return (
    <div
      onClick={() => setExpanded(!expanded)}
      className={cn(
        'bg-white rounded-lg border border-gray-200 border-l-4 p-3 cursor-pointer hover:shadow-sm hover:border-gray-300 transition-all',
        PRIORITY_BORDER[tip.priority],
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-xs font-semibold text-gray-800">{tip.headline}</h3>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <span className={cn('text-[9px] font-semibold px-1.5 py-0.5 rounded-full border', PRIORITY_BADGE[tip.priority])}>
            {priorityLabel[tip.priority]}
          </span>
          <span className="text-[9px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">
            {tip.source === 'rules' ? t.sales.rules : `${t.sales.ml} ${tip.confidence_score ? Math.round(tip.confidence_score * 100) + '%' : ''}`}
          </span>
        </div>
      </div>
      <p className={cn('text-[10px] text-gray-500 mt-1', !expanded && 'line-clamp-1')}>{tip.reasoning}</p>
      {expanded && (
        <div className="flex items-start gap-1 mt-1.5 pt-1.5 border-t border-gray-100">
          <ArrowRight size={12} className="text-blue-600 flex-shrink-0 mt-px" />
          <p className="text-[10px] text-blue-700 font-medium">{tip.suggested_action}</p>
        </div>
      )}
      {!expanded && (
        <div className="flex items-center gap-1 mt-1 text-[10px] text-blue-600">
          <ArrowRight size={10} className="transition-transform" />
          <span>{t.sales.showAction}</span>
        </div>
      )}
    </div>
  );
}
