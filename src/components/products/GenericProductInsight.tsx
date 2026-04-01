import { FileText } from 'lucide-react';
import type { Product, GenericProductParams } from '../../types';
import { StatusIndicator } from '../shared/StatusIndicator';
import { useTranslation } from '../../i18n';

const WIN_CARD: React.CSSProperties = {
  background: '#d4d0c8',
  borderTop: '2px solid #ffffff',
  borderLeft: '2px solid #ffffff',
  borderRight: '2px solid #808080',
  borderBottom: '2px solid #808080',
  outline: '1px solid #404040',
  padding: '5px 7px',
  cursor: 'pointer',
  fontFamily: 'Tahoma, MS Sans Serif, sans-serif',
  fontSize: 11,
  marginBottom: 4,
};

export function GenericProductInsight({ product, onClick }: { product: Product; onClick: () => void }) {
  const p = product.key_params as GenericProductParams;
  const { t } = useTranslation();

  const typeLabel = t.products.types[product.product_type as keyof typeof t.products.types] || product.product_type;

  return (
    <div onClick={onClick} style={WIN_CARD}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 3 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <FileText size={13} style={{ color: '#404040' }} />
          <span style={{ fontWeight: 'bold' }}>{typeLabel}</span>
        </div>
        <StatusIndicator status={product.status} />
      </div>
      <div style={{ fontSize: 11, color: '#333' }}>{product.product_name}</div>
      {p.key_metric_label && (
        <div style={{ fontSize: 10, marginTop: 3 }}>
          <span style={{ color: '#808080' }}>{p.key_metric_label}: </span>
          <span style={{ fontWeight: 'bold' }}>{p.key_metric_value}</span>
        </div>
      )}
      {p.renewal_date && (
        <div style={{ fontSize: 10, color: '#808080', marginTop: 2 }}>{t.products.renewal} {p.renewal_date}</div>
      )}
    </div>
  );
}
