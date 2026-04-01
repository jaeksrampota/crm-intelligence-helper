import { Sparkles } from 'lucide-react';
import type { SalesTip } from '../../types';
import { SalesTipCard } from './SalesTipCard';
import { useTranslation } from '../../i18n';

export function SalesTipsPanel({ tips }: { tips: SalesTip[] }) {
  const { t } = useTranslation();
  return (
    <div className="space-y-1 overflow-y-auto">
      <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1">
        <Sparkles size={12} />
        {t.sales.title}
      </h2>
      <div className="space-y-2">
        {tips.map((tip) => (
          <SalesTipCard key={tip.rule_id} tip={tip} />
        ))}
      </div>
      {tips.length === 0 && (
        <div className="text-xs text-gray-400 italic py-2">{t.sales.noRecommendations}</div>
      )}
    </div>
  );
}
