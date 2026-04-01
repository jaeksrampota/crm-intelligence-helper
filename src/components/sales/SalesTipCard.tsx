import { cn } from '../../utils/cn';
import type { SalesTip } from '../../types';

const PRIORITY_BORDER: Record<string, string> = {
  high: 'border-l-priority-high',
  medium: 'border-l-priority-medium',
  low: 'border-l-priority-low',
};

export function SalesTipCard({ tip }: { tip: SalesTip }) {
  return (
    <div className={cn('bg-white rounded-lg border border-gray-200 border-l-4 p-2.5', PRIORITY_BORDER[tip.priority])}>
      <div className="flex items-start justify-between">
        <h3 className="text-xs font-semibold text-gray-800">{tip.headline}</h3>
        <span className="text-[9px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded flex-shrink-0 ml-2">
          {tip.source === 'rules' ? 'Rules' : `ML ${tip.confidence_score ? Math.round(tip.confidence_score * 100) + '%' : ''}`}
        </span>
      </div>
      <p className="text-[10px] text-gray-500 mt-0.5">{tip.reasoning}</p>
      <p className="text-[10px] text-blue-700 italic mt-1">{tip.suggested_action}</p>
    </div>
  );
}
