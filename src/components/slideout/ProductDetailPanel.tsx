import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { Product, DebitCardParams, CreditCardParams, CurrentAccountParams, Transaction } from '../../types';
import { fetchProductDetail, fetchTransactions } from '../../services';
import { formatCZK, formatCZKDecimal } from '../../utils/format';
import { formatDate } from '../../utils/date-helpers';
import { Sparkline } from '../shared/Sparkline';
import { MiniProgressBar } from '../shared/MiniProgressBar';
import { StatusIndicator } from '../shared/StatusIndicator';
import { RelativeDate } from '../shared/RelativeDate';
import { cn } from '../../utils/cn';
import { useTranslation } from '../../i18n';
import type { Translations } from '../../i18n';

export function ProductDetailPanel({ productId }: { productId: string }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const { t, language } = useTranslation();

  useEffect(() => {
    async function load() {
      setLoading(true);
      const p = await fetchProductDetail(productId);
      setProduct(p);
      if (p) {
        const clientTxs = await fetchTransactions(p.client_id, p.product_id, 90);
        setTransactions(clientTxs);
      }
      setLoading(false);
    }
    load();
  }, [productId]);

  if (loading) return (
    <div className="flex items-center gap-2 text-sm text-gray-400 py-8 justify-center">
      <div className="w-4 h-4 border-2 border-gray-300 border-t-rb-yellow rounded-full animate-spin" />
      {t.slideout.loadingProduct}
    </div>
  );
  if (!product) return <div className="text-sm text-gray-500 py-8 text-center">{t.slideout.productNotFound}</div>;

  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="font-semibold text-sm">{product.product_name}</span>
          <StatusIndicator status={product.status} />
        </div>
        <div className="text-xs text-gray-500">
          {t.slideout.opened} {formatDate(product.open_date, language)}
          {product.expiry_date && ` · ${t.slideout.expires} ${formatDate(product.expiry_date, language)}`}
        </div>
      </div>

      {/* Product-specific details */}
      {(product.product_type === 'debit_card' || product.product_type === 'credit_card') && (
        <CardDetails product={product} t={t} language={language} />
      )}
      {product.product_type === 'current_account' && (
        <AccountDetails product={product} t={t} />
      )}

      {/* Transaction history */}
      {transactions.length > 0 && (
        <TransactionList transactions={transactions} t={t} />
      )}
    </div>
  );
}

function CardDetails({ product, t, language }: { product: Product; t: Translations; language: string }) {
  const isCredit = product.product_type === 'credit_card';
  const p = product.key_params as (DebitCardParams | CreditCardParams);

  return (
    <div className="space-y-3">
      <div className="bg-gray-50 rounded-lg p-3 space-y-2">
        <div className="text-xs"><span className="text-gray-500">{t.slideout.cardNumber}</span> {p.card_number_masked}</div>
        <div className="text-xs"><span className="text-gray-500">{t.slideout.variant}</span> {p.card_variant}</div>

        <div>
          <div className="text-xs text-gray-500 mb-0.5">{t.slideout.dailyLimit} ({formatCZK(p.today_spend)} / {formatCZK(p.daily_limit)})</div>
          <MiniProgressBar value={p.today_spend} max={p.daily_limit} />
        </div>
        <div>
          <div className="text-xs text-gray-500 mb-0.5">{t.slideout.monthlyLimit} ({formatCZK(p.current_month_spend)} / {formatCZK(p.monthly_limit)})</div>
          <MiniProgressBar value={p.current_month_spend} max={p.monthly_limit} />
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>{t.slideout.threeDSecure} <span className={p.three_d_secure ? 'text-green-600' : 'text-red-500'}>{p.three_d_secure ? t.slideout.on : t.slideout.off}</span></div>
          <div>{t.slideout.applePay} <span className={p.apple_pay ? 'text-green-600' : 'text-gray-400'}>{p.apple_pay ? t.slideout.yes : t.slideout.no}</span></div>
          <div>{t.slideout.googlePay} <span className={p.google_pay ? 'text-green-600' : 'text-gray-400'}>{p.google_pay ? t.slideout.yes : t.slideout.no}</span></div>
          <div>{t.slideout.approvalRate} <span className="font-medium">{p.approval_rate_pct}%</span></div>
        </div>
      </div>

      {isCredit && (() => {
        const cp = p as CreditCardParams;
        return (
          <div className="bg-purple-50 rounded-lg p-3 space-y-1 text-xs">
            <div><span className="text-gray-500">{t.slideout.creditLimit}</span> {formatCZK(cp.credit_limit)}</div>
            <div><span className="text-gray-500">{t.slideout.outstanding}</span> {formatCZK(cp.outstanding_balance)}</div>
            <div><span className="text-gray-500">{t.slideout.availableLOP}</span> <span className="text-green-600 font-semibold">{formatCZK(cp.available_amount)}</span></div>
            <div><span className="text-gray-500">{t.slideout.minPayment}</span> {formatCZKDecimal(cp.minimum_payment_amount)} {t.products.due} {formatDate(cp.minimum_payment_due_date, language)}</div>
            <div><span className="text-gray-500">{t.slideout.mode}</span> {cp.revolving_active ? t.products.revolving : t.products.transactional}</div>
          </div>
        );
      })()}
    </div>
  );
}

function AccountDetails({ product, t }: { product: Product; t: Translations }) {
  const p = product.key_params as CurrentAccountParams;
  return (
    <div className="space-y-3">
      <div className="bg-gray-50 rounded-lg p-3 space-y-2">
        <div className="text-xs"><span className="text-gray-500">{t.slideout.tariff}</span> {p.tariff_name} ({formatCZK(p.monthly_fee)}/{t.slideout.month})</div>
        <div className="text-sm font-bold">{t.slideout.balance} {formatCZK(p.current_balance)}</div>
        {p.available_balance !== p.current_balance && (
          <div className="text-xs text-gray-500">{t.slideout.available} {formatCZK(p.available_balance)}</div>
        )}
        <Sparkline data={p.balance_history_30d} width={340} height={60} />
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>{t.slideout.standingOrders} {p.standing_orders_count}</div>
          <div>{t.slideout.directDebits} {p.direct_debits_count}</div>
          <div className="text-green-600">{t.slideout.incoming} {formatCZK(p.incoming_volume_month)}</div>
          <div className="text-red-600">{t.slideout.outgoing} {formatCZK(p.outgoing_volume_month)}</div>
        </div>
      </div>
    </div>
  );
}

const STATUS_COLORS: Record<string, string> = {
  completed: 'bg-green-100 text-green-700',
  pending: 'bg-amber-100 text-amber-700',
  declined: 'bg-red-100 text-red-700',
};

function TransactionList({ transactions, t }: { transactions: Transaction[]; t: Translations }) {
  const [expandedTxId, setExpandedTxId] = useState<string | null>(null);

  return (
    <div>
      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 pb-1 border-b border-gray-200">
        {t.slideout.recentTransactions}
      </h3>
      <div className="divide-y divide-gray-100">
        {transactions.slice(0, 20).map((tx) => {
          const isExpanded = expandedTxId === tx.transaction_id;
          return (
            <div key={tx.transaction_id}>
              <div
                onClick={() => setExpandedTxId(isExpanded ? null : tx.transaction_id)}
                className="flex justify-between items-center text-xs py-2 cursor-pointer hover:bg-gray-50 transition-colors rounded px-1 -mx-1"
              >
                <div className="flex items-center gap-1.5">
                  <ChevronDown size={12} className={cn('text-gray-400 transition-transform flex-shrink-0', isExpanded && 'rotate-180')} />
                  <div>
                    <div className="font-medium text-gray-800">{tx.merchant_name}</div>
                    <div className="text-[10px] text-gray-400 flex items-center gap-1">
                      <RelativeDate date={tx.timestamp} />
                      {tx.is_international && <span className="text-amber-500">{t.slideout.intl}</span>}
                    </div>
                  </div>
                </div>
                <div className={tx.type === 'credit' ? 'text-green-600 font-semibold' : 'text-gray-700 font-medium'}>
                  {tx.type === 'credit' ? '+' : '-'}{formatCZK(tx.amount)}
                </div>
              </div>
              {isExpanded && (
                <div className="ml-5 mb-2 bg-gray-50 rounded p-2 text-[10px] space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">{t.slideout.txCategory}</span>
                    <span className="font-medium">{(t.slideout.categories as Record<string, string>)[tx.merchant_category] || tx.merchant_category}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">{t.slideout.txStatus}</span>
                    <span className={cn('px-1.5 py-0.5 rounded font-medium', STATUS_COLORS[tx.status])}>
                      {{ completed: t.slideout.txCompleted, pending: t.slideout.txPending, declined: t.slideout.txDeclined }[tx.status] || tx.status}
                    </span>
                  </div>
                  {tx.currency !== 'CZK' && (
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">{t.slideout.txCurrency}</span>
                      <span className="font-medium">{tx.currency}</span>
                    </div>
                  )}
                  <div className="text-gray-400 font-mono">{tx.transaction_id}</div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
