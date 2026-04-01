import { useEffect, useState } from 'react';
import type { Product, DebitCardParams, CreditCardParams, CurrentAccountParams, Transaction } from '../../types';
import { fetchProductDetail, fetchTransactions } from '../../services';
import { formatCZK, formatCZKDecimal } from '../../utils/format';
import { Sparkline } from '../shared/Sparkline';
import { MiniProgressBar } from '../shared/MiniProgressBar';
import { StatusIndicator } from '../shared/StatusIndicator';
import { RelativeDate } from '../shared/RelativeDate';

export function ProductDetailPanel({ productId }: { productId: string }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <div className="text-sm text-gray-500">Loading...</div>;
  if (!product) return <div className="text-sm text-gray-500">Product not found</div>;

  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="font-semibold text-sm">{product.product_name}</span>
          <StatusIndicator status={product.status} />
        </div>
        <div className="text-xs text-gray-500">
          Opened: {product.open_date}
          {product.expiry_date && ` · Expires: ${product.expiry_date}`}
        </div>
      </div>

      {/* Product-specific details */}
      {(product.product_type === 'debit_card' || product.product_type === 'credit_card') && (
        <CardDetails product={product} />
      )}
      {product.product_type === 'current_account' && (
        <AccountDetails product={product} />
      )}

      {/* Transaction history */}
      {transactions.length > 0 && (
        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">Recent Transactions</h3>
          <div className="space-y-1.5">
            {transactions.slice(0, 20).map((tx) => (
              <div key={tx.transaction_id} className="flex justify-between items-center text-xs py-1 border-b border-gray-100">
                <div>
                  <div className="font-medium">{tx.merchant_name}</div>
                  <div className="text-[10px] text-gray-400"><RelativeDate date={tx.timestamp} /></div>
                </div>
                <div className={tx.type === 'credit' ? 'text-green-600 font-medium' : 'text-gray-700'}>
                  {tx.type === 'credit' ? '+' : '-'}{formatCZK(tx.amount)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function CardDetails({ product }: { product: Product }) {
  const isCredit = product.product_type === 'credit_card';
  const p = product.key_params as (DebitCardParams | CreditCardParams);

  return (
    <div className="space-y-3">
      <div className="bg-gray-50 rounded-lg p-3 space-y-2">
        <div className="text-xs"><span className="text-gray-500">Card number:</span> {p.card_number_masked}</div>
        <div className="text-xs"><span className="text-gray-500">Variant:</span> {p.card_variant}</div>

        <div>
          <div className="text-xs text-gray-500 mb-0.5">Daily limit ({formatCZK(p.today_spend)} / {formatCZK(p.daily_limit)})</div>
          <MiniProgressBar value={p.today_spend} max={p.daily_limit} />
        </div>
        <div>
          <div className="text-xs text-gray-500 mb-0.5">Monthly limit ({formatCZK(p.current_month_spend)} / {formatCZK(p.monthly_limit)})</div>
          <MiniProgressBar value={p.current_month_spend} max={p.monthly_limit} />
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>3D Secure: <span className={p.three_d_secure ? 'text-green-600' : 'text-red-500'}>{p.three_d_secure ? 'ON' : 'OFF'}</span></div>
          <div>Apple Pay: <span className={p.apple_pay ? 'text-green-600' : 'text-gray-400'}>{p.apple_pay ? 'Yes' : 'No'}</span></div>
          <div>Google Pay: <span className={p.google_pay ? 'text-green-600' : 'text-gray-400'}>{p.google_pay ? 'Yes' : 'No'}</span></div>
          <div>Approval rate: <span className="font-medium">{p.approval_rate_pct}%</span></div>
        </div>
      </div>

      {isCredit && (() => {
        const cp = p as CreditCardParams;
        return (
          <div className="bg-purple-50 rounded-lg p-3 space-y-1 text-xs">
            <div><span className="text-gray-500">Credit limit:</span> {formatCZK(cp.credit_limit)}</div>
            <div><span className="text-gray-500">Outstanding:</span> {formatCZK(cp.outstanding_balance)}</div>
            <div><span className="text-gray-500">Available (LOP):</span> <span className="text-green-600 font-semibold">{formatCZK(cp.available_amount)}</span></div>
            <div><span className="text-gray-500">Min payment:</span> {formatCZKDecimal(cp.minimum_payment_amount)} due {cp.minimum_payment_due_date}</div>
            <div><span className="text-gray-500">Mode:</span> {cp.revolving_active ? 'Revolving' : 'Transactional'}</div>
          </div>
        );
      })()}
    </div>
  );
}

function AccountDetails({ product }: { product: Product }) {
  const p = product.key_params as CurrentAccountParams;
  return (
    <div className="space-y-3">
      <div className="bg-gray-50 rounded-lg p-3 space-y-2">
        <div className="text-xs"><span className="text-gray-500">Tariff:</span> {p.tariff_name} ({formatCZK(p.monthly_fee)}/month)</div>
        <div className="text-sm font-bold">Balance: {formatCZK(p.current_balance)}</div>
        {p.available_balance !== p.current_balance && (
          <div className="text-xs text-gray-500">Available: {formatCZK(p.available_balance)}</div>
        )}
        <Sparkline data={p.balance_history_30d} width={340} height={60} />
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>Standing orders: {p.standing_orders_count}</div>
          <div>Direct debits: {p.direct_debits_count}</div>
          <div className="text-green-600">Incoming: {formatCZK(p.incoming_volume_month)}</div>
          <div className="text-red-600">Outgoing: {formatCZK(p.outgoing_volume_month)}</div>
        </div>
      </div>
    </div>
  );
}
