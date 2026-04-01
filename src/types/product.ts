export type ProductType = 'current_account' | 'savings_account' | 'debit_card' | 'credit_card' | 'mortgage' | 'consumer_loan' | 'insurance' | 'pension' | 'investment';
export type ProductStatus = 'active' | 'closed' | 'suspended';

export interface DebitCardParams {
  card_variant: string; // "Standard" | "GOLD"
  card_number_masked: string;
  daily_limit: number;
  monthly_limit: number;
  current_month_spend: number;
  today_spend: number;
  three_d_secure: boolean;
  apple_pay: boolean;
  google_pay: boolean;
  last_transaction_amount: number;
  last_transaction_merchant: string;
  last_transaction_date: string;
  approval_rate_pct: number;
  declined_count_30d: number;
}

export interface CreditCardParams extends DebitCardParams {
  credit_limit: number;
  outstanding_balance: number;
  available_amount: number; // LOP
  minimum_payment_amount: number;
  minimum_payment_due_date: string;
  revolving_active: boolean;
}

export interface CurrentAccountParams {
  tariff_name: string;
  monthly_fee: number;
  current_balance: number;
  available_balance: number;
  balance_history_30d: number[];
  standing_orders_count: number;
  direct_debits_count: number;
  incoming_volume_month: number;
  outgoing_volume_month: number;
  last_fee_waived: string | null;
}

export interface GenericProductParams {
  key_metric_label: string;
  key_metric_value: string;
  renewal_date: string | null;
  [key: string]: unknown;
}

export type ProductParams = DebitCardParams | CreditCardParams | CurrentAccountParams | GenericProductParams;

export interface Product {
  product_id: string;
  client_id: string;
  product_type: ProductType;
  product_name: string;
  status: ProductStatus;
  open_date: string;
  expiry_date: string | null;
  tariff_name: string | null;
  key_params: ProductParams;
}
