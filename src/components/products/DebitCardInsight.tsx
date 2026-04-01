import { CreditCard, Smartphone, ShieldCheck, ShieldOff } from 'lucide-react';
import type { Product, DebitCardParams } from '../../types';
import { StatusIndicator } from '../shared/StatusIndicator';
import { MiniProgressBar } from '../shared/MiniProgressBar';
import { RelativeDate } from '../shared/RelativeDate';
import { formatCZK } from '../../utils/format';
import { isWithinDays } from '../../utils/date-helpers';
import { cn } from '../../utils/cn';
import { useTranslation } from '../../i18n';

export function DebitCardInsight({ product, onClick }: { product: Product; onClick: () => void }) {
  const p = product.key_params as DebitCardParams;
  const expiryWarning = product.expiry_date && isWithinDays(product.expiry_date, 90);
  const { t } = useTranslation();

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg border border-gray-200 p-3 cursor-pointer hover:border-rb-yellow hover:shadow-sm transition-all"
    >
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-1.5">
          <CreditCard size={14} className="text-gray-600" />
          <span className="text-xs font-semibold">{p.card_variant} {t.products.debit}</span>
        </div>
        <StatusIndicator status={product.status} />
      </div>

      <div className="text-[10px] text-gray-500 mb-1.5">
        {p.card_number_masked}
        <span className={cn('ml-2', expiryWarning ? 'text-red-600 font-medium' : '')}>
          {t.products.exp} {product.expiry_date}
        </span>
      </div>

      <div className="text-xs text-gray-700 mb-1.5">
        {t.products.last} {formatCZK(p.last_transaction_amount)} · {p.last_transaction_merchant}
        {p.last_transaction_date && (
          <span className="text-gray-400 ml-1">
            <RelativeDate date={p.last_transaction_date} />
          </span>
        )}
      </div>

      <div className="mb-1">
        <div className="flex justify-between text-[10px] text-gray-500 mb-0.5">
          <span>
            {t.products.daily} {formatCZK(p.today_spend)} / {formatCZK(p.daily_limit)}
          </span>
        </div>
        <MiniProgressBar value={p.today_spend} max={p.daily_limit} />
      </div>

      <div className="flex items-center gap-2.5 mt-2 pt-1.5 border-t border-gray-100">
        <span className="inline-flex items-center gap-0.5 text-[10px] text-gray-500" title="3D Secure">
          {p.three_d_secure ? (
            <ShieldCheck size={13} className="text-green-500" />
          ) : (
            <ShieldOff size={13} className="text-gray-300" />
          )}
          {t.products.threeDS}
        </span>
        <span className="inline-flex items-center gap-0.5 text-[10px] text-gray-500" title={p.apple_pay ? 'Apple Pay active' : 'No Apple Pay'}>
          <Smartphone size={13} className={p.apple_pay ? 'text-gray-700' : 'text-gray-300'} />
          {t.products.pay}
        </span>
        {p.declined_count_30d > 0 && (
          <span className="text-[10px] text-red-600 font-semibold bg-red-50 px-1.5 py-0.5 rounded-full border border-red-200">
            {t.products.declined(p.declined_count_30d)}
          </span>
        )}
      </div>
    </div>
  );
}
