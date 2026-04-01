import type { SalesTip } from '../../types';
import { SalesTipCard } from './SalesTipCard';
import { useTranslation } from '../../i18n';

export function SalesTipsPanel({ tips }: { tips: SalesTip[] }) {
  const { t } = useTranslation();
  return (
    <div style={{ fontFamily: 'Tahoma, MS Sans Serif, sans-serif', fontSize: 11 }}>
      {tips.map((tip) => (
        <SalesTipCard key={tip.rule_id} tip={tip} />
      ))}
      {tips.length === 0 && (
        <div
          style={{
            fontSize: 11,
            color: '#808080',
            fontStyle: 'italic',
            padding: '6px 4px',
          }}
        >
          {t.sales.noRecommendations}
        </div>
      )}
    </div>
  );
}
