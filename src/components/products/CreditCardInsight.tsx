import { CreditCard } from 'lucide-react';
import type { Product, CreditCardParams } from '../../types';
import { StatusIndicator } from '../shared/StatusIndicator';
import { CreditGauge } from '../shared/CreditGauge';
import { formatCZK } from '../../utils/format';
import { isWithinDays } from '../../utils/date-helpers';
import { cn } from '../../utils/cn';

export function CreditCardInsight({ product, onClick }: { product: Product; onClick: () => void }) {
  const p = product.key_params as CreditCardParams;
  const paymentSoon = p.minimum_payment_due_date && isWithinDays(p.minimum_payment_due_date, 5);

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg border border-gray-200 p-3 cursor-pointer hover:border-rb-yellow hover:shadow-sm transition-all"
    >
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-1.5">
          <CreditCard size={14} className="text-purple-600" />
          <span className="text-xs font-semibold">{p.card_variant} Credit</span>
        </div>
        <StatusIndicator status={product.status} />
      </div>

      <div className="flex items-center gap-3 mb-1.5">
        <CreditGauge value={p.outstanding_balance} max={p.credit_limit} />
        <div>
          <div className="text-xs text-gray-500">Available (LOP)</div>
          <div className="text-sm font-bold text-green-600">{formatCZK(p.available_amount)}</div>
        </div>
      </div>

      <div className="text-[10px] text-gray-600 space-y-0.5">
        <div>
          Limit: {formatCZK(p.credit_limit)} · Owed: {formatCZK(p.outstanding_balance)}
        </div>
        <div className={cn(paymentSoon ? 'text-red-600 font-medium' : '')}>
          Min payment: {formatCZK(p.minimum_payment_amount)} due {p.minimum_payment_due_date}
        </div>
      </div>

      <div className="mt-1.5">
        <span
          className={cn(
            'text-[10px] px-1.5 py-0.5 rounded',
            p.revolving_active ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-600',
          )}
        >
          {p.revolving_active ? 'Revolving' : 'Transactional'}
        </span>
      </div>
    </div>
  );
}
