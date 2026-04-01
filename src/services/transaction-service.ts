import { transactions } from '../data';
import type { Transaction } from '../types';

export async function fetchTransactions(
  clientId: string,
  productId?: string,
  days = 90
): Promise<Transaction[]> {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);

  return transactions
    .filter((tx) => {
      if (clientId && tx.client_id !== clientId) return false;
      if (productId && tx.product_id !== productId) return false;
      return new Date(tx.timestamp) >= cutoff;
    })
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}
