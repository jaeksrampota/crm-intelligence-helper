import { Wallet } from 'lucide-react';
import type { Product, CurrentAccountParams } from '../../types';
import { StatusIndicator } from '../shared/StatusIndicator';
import { Sparkline } from '../shared/Sparkline';
import { formatCZK } from '../../utils/format';
import { useTranslation } from '../../i18n';

export function CurrentAccountInsight({ product, onClick }: { product: Product; onClick: () => void }) {
  const p = product.key_params as CurrentAccountParams;
  const { t } = useTranslation();

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg border border-gray-200 p-3 cursor-pointer hover:border-rb-yellow hover:shadow-sm transition-all"
    >
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-1.5">
          <Wallet size={14} className="text-blue-600" />
          <span className="text-xs font-semibold">{p.tariff_name}</span>
          <span className="text-[10px] text-gray-400">{formatCZK(p.monthly_fee)}{t.products.mo}</span>
        </div>
        <StatusIndicator status={product.status} />
      </div>

      <div className="flex items-center justify-between mb-2">
        <div className="text-base font-bold">{formatCZK(p.current_balance)}</div>
        <Sparkline data={p.balance_history_30d} width={100} height={32} />
      </div>

      <div className="grid grid-cols-2 gap-x-3 text-[10px] text-gray-600">
        <div>{t.products.standingOrders} {p.standing_orders_count}</div>
        <div>{t.products.directDebits} {p.direct_debits_count}</div>
        <div className="text-green-600">{t.products.in_} {formatCZK(p.incoming_volume_month)}</div>
        <div className="text-red-600">{t.products.out_} {formatCZK(p.outgoing_volume_month)}</div>
      </div>
    </div>
  );
}
