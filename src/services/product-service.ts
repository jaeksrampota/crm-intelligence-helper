import { products } from '../data';
import type { Product } from '../types';

export async function fetchProducts(clientId: string): Promise<Product[]> {
  const clientProducts = products.filter((p) => p.client_id === clientId);
  return [...clientProducts].sort((a, b) => {
    if (a.status === 'active' && b.status !== 'active') return -1;
    if (a.status !== 'active' && b.status === 'active') return 1;
    return new Date(b.open_date).getTime() - new Date(a.open_date).getTime();
  });
}

export async function fetchProductDetail(productId: string): Promise<Product | null> {
  return products.find((p) => p.product_id === productId) ?? null;
}
