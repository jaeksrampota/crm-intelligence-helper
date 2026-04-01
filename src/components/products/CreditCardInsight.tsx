import { CreditCard } from 'lucide-react';
import type { Product, CreditCardParams } from '../../types';
import { StatusIndicator } from '../shared/StatusIndicator';
import { CreditGauge } from '../shared/CreditGauge';
import { formatCZK } from '../../utils/format';
import { isWithinDays } from '../../utils/date-helpers';
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

export function CreditCardInsight({ product, onClick }: { product: Product; onClick: () => void }) {
  const p = product.key_params as CreditCardParams;
  const paymentSoon = p.minimum_payment_due_date && isWithinDays(p.minimum_payment_due_date, 5);
  const { t } = useTranslation();

  return (
    <div onClick={onClick} style={WIN_CARD}>
      {/* Title row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <CreditCard size={13} style={{ color: '#404040' }} />
          <span style={{ fontWeight: 'bold' }}>{p.card_variant} {t.products.credit}</span>
        </div>
        <StatusIndicator status={product.status} />
      </div>

      {/* Credit gauge + available */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
        <CreditGauge value={p.outstanding_balance} max={p.credit_limit} />
        <div>
          <div style={{ fontSize: 10, color: '#808080' }}>{t.products.availableLOP}</div>
          <div style={{ fontSize: 12, fontWeight: 'bold', color: '#006400' }}>{formatCZK(p.available_amount)}</div>
        </div>
      </div>

      {/* Details inset */}
      <div
        style={{
          background: '#ffffff',
          borderTop: '1px solid #808080',
          borderLeft: '1px solid #808080',
          borderRight: '1px solid #ffffff',
          borderBottom: '1px solid #ffffff',
          padding: '3px 5px',
          fontSize: 10,
          color: '#444',
          marginBottom: 4,
        }}
      >
        <div>{t.products.limit} {formatCZK(p.credit_limit)} · {t.products.owed} {formatCZK(p.outstanding_balance)}</div>
        <div style={{ color: paymentSoon ? '#c00000' : '#444', fontWeight: paymentSoon ? 'bold' : 'normal' }}>
          {t.products.minPayment} {formatCZK(p.minimum_payment_amount)} {t.products.due} {p.minimum_payment_due_date}
        </div>
      </div>

      {/* Revolving badge */}
      <span
        style={{
          fontSize: 10,
          fontWeight: 600,
          padding: '1px 6px',
          background: p.revolving_active ? '#fff8e0' : '#f0f0f0',
          border: p.revolving_active ? '1px solid #b08000' : '1px solid #808080',
          color: p.revolving_active ? '#7a5500' : '#555',
        }}
      >
        {p.revolving_active ? t.products.revolving : t.products.transactional}
      </span>
    </div>
  );
}
