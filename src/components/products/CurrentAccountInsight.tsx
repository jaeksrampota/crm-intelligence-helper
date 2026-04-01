import { Wallet } from 'lucide-react';
import type { Product, CurrentAccountParams } from '../../types';
import { StatusIndicator } from '../shared/StatusIndicator';
import { Sparkline } from '../shared/Sparkline';
import { formatCZK } from '../../utils/format';
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

export function CurrentAccountInsight({ product, onClick }: { product: Product; onClick: () => void }) {
  const p = product.key_params as CurrentAccountParams;
  const { t } = useTranslation();

  return (
    <div onClick={onClick} style={WIN_CARD}>
      {/* Title row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <Wallet size={13} style={{ color: '#0000c0' }} />
          <span style={{ fontWeight: 'bold' }}>{p.tariff_name}</span>
          <span style={{ fontSize: 10, color: '#808080' }}>{formatCZK(p.monthly_fee)}{t.products.mo}</span>
        </div>
        <StatusIndicator status={product.status} />
      </div>

      {/* Balance + sparkline */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
        <div
          style={{
            background: '#ffffff',
            borderTop: '1px solid #808080',
            borderLeft: '1px solid #808080',
            borderRight: '1px solid #ffffff',
            borderBottom: '1px solid #ffffff',
            padding: '2px 6px',
            fontWeight: 'bold',
            fontSize: 13,
          }}
        >
          {formatCZK(p.current_balance)}
        </div>
        <Sparkline data={p.balance_history_30d} width={90} height={28} />
      </div>

      {/* Stats grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '2px 8px',
          fontSize: 10,
          color: '#555',
          background: '#ffffff',
          borderTop: '1px solid #808080',
          borderLeft: '1px solid #808080',
          borderRight: '1px solid #ffffff',
          borderBottom: '1px solid #ffffff',
          padding: '3px 5px',
        }}
      >
        <div>{t.products.standingOrders} {p.standing_orders_count}</div>
        <div>{t.products.directDebits} {p.direct_debits_count}</div>
        <div style={{ color: '#006400' }}>{t.products.in_} {formatCZK(p.incoming_volume_month)}</div>
        <div style={{ color: '#c00000' }}>{t.products.out_} {formatCZK(p.outgoing_volume_month)}</div>
      </div>
    </div>
  );
}
