import { useState } from 'react';
import type { Product } from '../../types';
import { DebitCardInsight } from './DebitCardInsight';
import { CreditCardInsight } from './CreditCardInsight';
import { CurrentAccountInsight } from './CurrentAccountInsight';
import { GenericProductInsight } from './GenericProductInsight';
import { useTranslation } from '../../i18n';

function ProductCard({ product, onClick }: { product: Product; onClick: () => void }) {
  switch (product.product_type) {
    case 'debit_card':
      return <DebitCardInsight product={product} onClick={onClick} />;
    case 'credit_card':
      return <CreditCardInsight product={product} onClick={onClick} />;
    case 'current_account':
      return <CurrentAccountInsight product={product} onClick={onClick} />;
    default:
      return <GenericProductInsight product={product} onClick={onClick} />;
  }
}

export function ProductCardsGrid({
  products,
  onProductClick,
}: {
  products: Product[];
  onProductClick: (productId: string) => void;
}) {
  const [showAll, setShowAll] = useState(false);
  const active = products.filter((p) => p.status === 'active');
  const display = showAll ? active : active.slice(0, 4);
  const remaining = active.length - 4;
  const { t } = useTranslation();

  return (
    <div className="space-y-2 overflow-y-auto">
      <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{t.products.title}</h2>
      {display.map((p) => (
        <ProductCard key={p.product_id} product={p} onClick={() => onProductClick(p.product_id)} />
      ))}
      {remaining > 0 && !showAll && (
        <button onClick={() => setShowAll(true)} className="text-xs text-blue-600 hover:underline">
          {t.products.moreProducts(remaining)}
        </button>
      )}
    </div>
  );
}
