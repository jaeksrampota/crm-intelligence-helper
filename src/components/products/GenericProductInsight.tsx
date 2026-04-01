import { FileText } from 'lucide-react';
import type { Product, GenericProductParams } from '../../types';
import { StatusIndicator } from '../shared/StatusIndicator';

const TYPE_LABELS: Record<string, string> = {
  mortgage: 'Mortgage',
  consumer_loan: 'Consumer Loan',
  insurance: 'Insurance',
  pension: 'Pension',
  investment: 'Investment',
  savings_account: 'Savings Account',
};

export function GenericProductInsight({ product, onClick }: { product: Product; onClick: () => void }) {
  const p = product.key_params as GenericProductParams;

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg border border-gray-200 p-3 cursor-pointer hover:border-rb-yellow hover:shadow-sm transition-all"
    >
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-1.5">
          <FileText size={14} className="text-gray-600" />
          <span className="text-xs font-semibold">
            {TYPE_LABELS[product.product_type] || product.product_type}
          </span>
        </div>
        <StatusIndicator status={product.status} />
      </div>
      <div className="text-xs text-gray-700">{product.product_name}</div>
      {p.key_metric_label && (
        <div className="text-xs mt-1">
          <span className="text-gray-500">{p.key_metric_label}: </span>
          <span className="font-semibold">{p.key_metric_value}</span>
        </div>
      )}
      {p.renewal_date && (
        <div className="text-[10px] text-gray-400 mt-0.5">Renewal: {p.renewal_date}</div>
      )}
    </div>
  );
}
