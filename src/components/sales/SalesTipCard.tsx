import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import type { SalesTip } from '../../types';
import { useTranslation } from '../../i18n';

const PRIORITY_LEFT_BORDER: Record<string, string> = {
  high: '#cc0000',
  medium: '#cc7700',
  low: '#0000c0',
};

const PRIORITY_BADGE_STYLE: Record<string, React.CSSProperties> = {
  high: { background: '#ffeeee', color: '#8b0000', border: '1px solid #cc0000', fontWeight: 'bold' },
  medium: { background: '#fffbec', color: '#7a5500', border: '1px solid #b08000', fontWeight: 'bold' },
  low: { background: '#eef4ff', color: '#00008b', border: '1px solid #4040a0', fontWeight: 'bold' },
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
      style={{
        background: '#d4d0c8',
        borderTop: '2px solid #ffffff',
        borderLeft: `4px solid ${PRIORITY_LEFT_BORDER[tip.priority] || '#808080'}`,
        borderRight: '2px solid #808080',
        borderBottom: '2px solid #808080',
        outline: '1px solid #404040',
        padding: '5px 7px',
        cursor: 'pointer',
        fontFamily: 'Tahoma, MS Sans Serif, sans-serif',
        fontSize: 11,
        marginBottom: 4,
      }}
    >
      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 6, marginBottom: 3 }}>
        <h3 style={{ fontWeight: 'bold', fontSize: 11, margin: 0, color: '#000' }}>{tip.headline}</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
          <span style={{ fontSize: 9, padding: '1px 5px', ...PRIORITY_BADGE_STYLE[tip.priority] }}>
            {priorityLabel[tip.priority]}
          </span>
          <span
            style={{
              fontSize: 9,
              background: '#c8c4bc',
              color: '#555',
              padding: '1px 5px',
              border: '1px solid #808080',
            }}
          >
            {tip.source === 'rules' ? t.sales.rules : `${t.sales.ml} ${tip.confidence_score ? Math.round(tip.confidence_score * 100) + '%' : ''}`}
          </span>
        </div>
      </div>

      {/* Reasoning */}
      <p
        style={{
          fontSize: 10,
          color: '#555',
          margin: 0,
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: expanded ? undefined : 1,
          WebkitBoxOrient: 'vertical',
        }}
      >
        {tip.reasoning}
      </p>

      {/* Expanded action */}
      {expanded && (
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 4,
            marginTop: 5,
            paddingTop: 5,
            borderTop: '1px solid #808080',
          }}
        >
          <ArrowRight size={11} style={{ color: '#0000c0', flexShrink: 0, marginTop: 1 }} />
          <p style={{ fontSize: 10, color: '#0000c0', fontWeight: 'bold', margin: 0 }}>{tip.suggested_action}</p>
        </div>
      )}

      {/* Collapsed hint */}
      {!expanded && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 3, marginTop: 4, fontSize: 10, color: '#0000c0' }}>
          <ArrowRight size={10} />
          <span>{t.sales.showAction}</span>
        </div>
      )}
    </div>
  );
}
