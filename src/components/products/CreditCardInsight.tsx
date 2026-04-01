import { CreditCard } from 'lucide-react';
import type { Product, CreditCardParams } from '../../types';
import { StatusIndicator } from '../shared/StatusIndicator';
import { CreditGauge } from '../shared/CreditGauge';
import { formatCZK } from '../../utils/format';
import { isWithinDays } from '../../utils/date-helpers';
import { cn } from '../../utils/cn';
import { useTranslation } from '../../i18n';

export function CreditCardInsight({ product, onClick }: { product: Product; onClick: () => void }) {
  const p = product.key_params as CreditCardParams;
  const paymentSoon = p.minimum_payment_due_date && isWithinDays(p.minimum_payment_due_date, 5);
  const { t } = useTranslation();

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg border border-gray-200 p-3 cursor-pointer hover:border-rb-yellow hover:shadow-sm transition-all"
    >
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-1.5">
          <CreditCard size={14} className="text-purple-600" />
          <span className="text-xs font-semibold">{p.card_variant} {t.products.credit}</span>
        </div>
        <StatusIndicator status={product.status} />
      </div>

      <div className="flex items-center gap-3 mb-1.5">
        <CreditGauge value={p.outstanding_balance} max={p.credit_limit} />
        <div>
          <div className="text-xs text-gray-500">{t.products.availableLOP}</div>
          <div className="text-sm font-bold text-green-600">{formatCZK(p.available_amount)}</div>
        </div>
      </div>

      <div className="text-[10px] text-gray-600 space-y-0.5 mt-2 pt-1.5 border-t border-gray-100">
        <div>
          {t.products.limit} {formatCZK(p.credit_limit)} · {t.products.owed} {formatCZK(p.outstanding_balance)}
        </div>
        <div className={cn(paymentSoon ? 'text-red-600 font-medium' : '')}>
          {t.products.minPayment} {formatCZK(p.minimum_payment_amount)} {t.products.due} {p.minimum_payment_due_date}
        </div>
      </div>

      <div className="mt-2">
        <span
          className={cn(
            'text-[10px] font-medium px-2 py-0.5 rounded-full border',
            p.revolving_active ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-gray-50 text-gray-600 border-gray-200',
          )}
        >
          {p.revolving_active ? t.products.revolving : t.products.transactional}
        </span>
      </div>
    </div>
  );
}
