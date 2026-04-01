import { CreditCard, Smartphone, ShieldCheck, ShieldOff } from 'lucide-react';
import type { Product, DebitCardParams } from '../../types';
import { StatusIndicator } from '../shared/StatusIndicator';
import { MiniProgressBar } from '../shared/MiniProgressBar';
import { RelativeDate } from '../shared/RelativeDate';
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

export function DebitCardInsight({ product, onClick }: { product: Product; onClick: () => void }) {
  const p = product.key_params as DebitCardParams;
  const expiryWarning = product.expiry_date && isWithinDays(product.expiry_date, 90);
  const { t } = useTranslation();

  return (
    <div onClick={onClick} style={WIN_CARD}>
      {/* Title row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <CreditCard size={13} style={{ color: '#404040' }} />
          <span style={{ fontWeight: 'bold' }}>{p.card_variant} {t.products.debit}</span>
        </div>
        <StatusIndicator status={product.status} />
      </div>

      {/* Card number & expiry */}
      <div
        style={{
          background: '#ffffff',
          borderTop: '1px solid #808080',
          borderLeft: '1px solid #808080',
          borderRight: '1px solid #ffffff',
          borderBottom: '1px solid #ffffff',
          padding: '2px 5px',
          fontSize: 10,
          color: '#444',
          marginBottom: 4,
        }}
      >
        {p.card_number_masked}
        <span style={{ marginLeft: 8, color: expiryWarning ? '#c00000' : '#808080', fontWeight: expiryWarning ? 'bold' : 'normal' }}>
          {t.products.exp} {product.expiry_date}
        </span>
      </div>

      {/* Last tx */}
      <div style={{ fontSize: 10, color: '#555', marginBottom: 5 }}>
        {t.products.last} {formatCZK(p.last_transaction_amount)} · {p.last_transaction_merchant}
        {p.last_transaction_date && (
          <span style={{ color: '#808080', marginLeft: 4 }}>
            <RelativeDate date={p.last_transaction_date} />
          </span>
        )}
      </div>

      {/* Daily limit bar */}
      <div style={{ marginBottom: 4 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#808080', marginBottom: 2 }}>
          <span>{t.products.daily} {formatCZK(p.today_spend)} / {formatCZK(p.daily_limit)}</span>
        </div>
        <MiniProgressBar value={p.today_spend} max={p.daily_limit} />
      </div>

      {/* Features row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          marginTop: 4,
          paddingTop: 4,
          borderTop: '1px solid #808080',
        }}
      >
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 2, fontSize: 10 }}>
          {p.three_d_secure ? <ShieldCheck size={12} style={{ color: '#008000' }} /> : <ShieldOff size={12} style={{ color: '#c0c0c0' }} />}
          {t.products.threeDS}
        </span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 2, fontSize: 10 }}>
          <Smartphone size={12} style={{ color: p.apple_pay ? '#404040' : '#c0c0c0' }} />
          {t.products.pay}
        </span>
        {p.declined_count_30d > 0 && (
          <span style={{ fontSize: 10, fontWeight: 'bold', color: '#c00000', background: '#ffeeee', padding: '1px 5px', border: '1px solid #cc0000' }}>
            {t.products.declined(p.declined_count_30d)}
          </span>
        )}
      </div>
    </div>
  );
}
