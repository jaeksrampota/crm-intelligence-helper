import { useState } from 'react';
import type { Product } from '../../types';
import { DebitCardInsight } from './DebitCardInsight';
import { CreditCardInsight } from './CreditCardInsight';
import { CurrentAccountInsight } from './CurrentAccountInsight';
import { GenericProductInsight } from './GenericProductInsight';
import { CommentableElement } from '../comments/CommentableElement';
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

function getProductLabel(product: Product): string {
  const name = product.product_name || product.product_type.replace(/_/g, ' ');
  if (product.card_number) return `${name} ****${product.card_number.slice(-4)}`;
  return name;
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
      <CommentableElement zoneId="products" elementLabel={t.products.title}>
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{t.products.title}</h2>
      </CommentableElement>
      {display.map((p) => (
        <CommentableElement key={p.product_id} zoneId="products" elementId={`product-${p.product_id}`} elementLabel={getProductLabel(p)}>
          <ProductCard product={p} onClick={() => onProductClick(p.product_id)} />
        </CommentableElement>
      ))}
      {remaining > 0 && !showAll && (
        <button onClick={() => setShowAll(true)} className="text-xs text-blue-600 hover:underline">
          {t.products.moreProducts(remaining)}
        </button>
      )}
    </div>
  );
}
