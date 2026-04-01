export type TransactionType = 'credit' | 'debit' | 'standing_order' | 'direct_debit';
export type TransactionStatus = 'completed' | 'pending' | 'declined';
export type MerchantCategory = 'groceries' | 'e_commerce' | 'travel' | 'dining' | 'transport' | 'utilities' | 'entertainment' | 'health' | 'education' | 'atm' | 'transfer' | 'salary' | 'insurance' | 'pension' | 'other';

export interface Transaction {
  transaction_id: string;
  client_id: string;
  product_id: string;
  type: TransactionType;
  amount: number;
  currency: string;
  merchant_name: string;
  merchant_category: MerchantCategory;
  timestamp: string;
  is_international: boolean;
  status: TransactionStatus;
}
