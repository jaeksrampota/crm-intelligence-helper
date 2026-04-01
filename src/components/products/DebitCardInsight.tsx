import { CreditCard, Smartphone, ShieldCheck, ShieldOff } from 'lucide-react';
import type { Product, DebitCardParams } from '../../types';
import { StatusIndicator } from '../shared/StatusIndicator';
import { MiniProgressBar } from '../shared/MiniProgressBar';
import { RelativeDate } from '../shared/RelativeDate';
import { formatCZK } from '../../utils/format';
import { isWithinDays } from '../../utils/date-helpers';
import { cn } from '../../utils/cn';

export function DebitCardInsight({ product, onClick }: { product: Product; onClick: () => void }) {
  const p = product.key_params as DebitCardParams;
  const expiryWarning = product.expiry_date && isWithinDays(product.expiry_date, 90);

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg border border-gray-200 p-3 cursor-pointer hover:border-rb-yellow hover:shadow-sm transition-all"
    >
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-1.5">
          <CreditCard size={14} className="text-gray-600" />
          <span className="text-xs font-semibold">{p.card_variant} Debit</span>
        </div>
        <StatusIndicator status={product.status} />
      </div>

      <div className="text-[10px] text-gray-500 mb-1.5">
        {p.card_number_masked}
        <span className={cn('ml-2', expiryWarning ? 'text-red-600 font-medium' : '')}>
          Exp: {product.expiry_date}
        </span>
      </div>

      <div className="text-xs text-gray-700 mb-1.5">
        Last: {formatCZK(p.last_transaction_amount)} · {p.last_transaction_merchant}
        {p.last_transaction_date && (
          <span className="text-gray-400 ml-1">
            <RelativeDate date={p.last_transaction_date} />
          </span>
        )}
      </div>

      <div className="mb-1">
        <div className="flex justify-between text-[10px] text-gray-500 mb-0.5">
          <span>
            Daily: {formatCZK(p.today_spend)} / {formatCZK(p.daily_limit)}
          </span>
        </div>
        <MiniProgressBar value={p.today_spend} max={p.daily_limit} />
      </div>

      <div className="flex items-center gap-2 mt-1.5">
        <span title="3D Secure">
          {p.three_d_secure ? (
            <ShieldCheck size={12} className="text-green-500" />
          ) : (
            <ShieldOff size={12} className="text-gray-300" />
          )}
        </span>
        <span title={p.apple_pay ? 'Apple Pay' : 'No Apple Pay'}>
          <Smartphone size={12} className={p.apple_pay ? 'text-gray-700' : 'text-gray-300'} />
        </span>
        {p.declined_count_30d > 0 && (
          <span className="text-[10px] text-red-500 font-medium">{p.declined_count_30d} declined</span>
        )}
      </div>
    </div>
  );
}
