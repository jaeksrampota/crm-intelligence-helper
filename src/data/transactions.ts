import type { Transaction, TransactionType, TransactionStatus, MerchantCategory } from '../types';
import { daysAgo } from '../utils/date-helpers';

// ---------------------------------------------------------------------------
// Helper to generate transaction arrays
// ---------------------------------------------------------------------------

let txIdCounter = 1;

interface TxTemplate {
  client_id: string;
  product_id: string;
  type: TransactionType;
  amount: number;
  currency?: string;
  merchant_name: string;
  merchant_category: MerchantCategory;
  daysBack: number;
  is_international?: boolean;
  status?: TransactionStatus;
}

function makeTx(t: TxTemplate): Transaction {
  const id = `TX${String(txIdCounter++).padStart(4, '0')}`;
  return {
    transaction_id: id,
    client_id: t.client_id,
    product_id: t.product_id,
    type: t.type,
    amount: t.amount,
    currency: t.currency ?? 'CZK',
    merchant_name: t.merchant_name,
    merchant_category: t.merchant_category,
    timestamp: daysAgo(t.daysBack),
    is_international: t.is_international ?? false,
    status: t.status ?? 'completed',
  };
}

function makeBatch(templates: TxTemplate[]): Transaction[] {
  return templates.map(makeTx);
}

// ---------------------------------------------------------------------------
// C001 - Jana: 8+ e-commerce transactions, some to RB partners (Rohlik, Datart)
// ---------------------------------------------------------------------------

const janaTransactions = makeBatch([
  { client_id: 'C001', product_id: 'P002', type: 'debit', amount: 2349, merchant_name: 'Alza.cz', merchant_category: 'e_commerce', daysBack: 1 },
  { client_id: 'C001', product_id: 'P002', type: 'debit', amount: 1890, merchant_name: 'Rohlik.cz', merchant_category: 'groceries', daysBack: 2 },
  { client_id: 'C001', product_id: 'P002', type: 'debit', amount: 749, merchant_name: 'Notino.cz', merchant_category: 'e_commerce', daysBack: 3 },
  { client_id: 'C001', product_id: 'P002', type: 'debit', amount: 3490, merchant_name: 'Datart', merchant_category: 'e_commerce', daysBack: 5 },
  { client_id: 'C001', product_id: 'P002', type: 'debit', amount: 1200, merchant_name: 'Alza.cz', merchant_category: 'e_commerce', daysBack: 7 },
  { client_id: 'C001', product_id: 'P002', type: 'debit', amount: 589, merchant_name: 'Rohlik.cz', merchant_category: 'groceries', daysBack: 9 },
  { client_id: 'C001', product_id: 'P002', type: 'debit', amount: 4250, merchant_name: 'Mall.cz', merchant_category: 'e_commerce', daysBack: 11 },
  { client_id: 'C001', product_id: 'P002', type: 'debit', amount: 1650, merchant_name: 'Rohlik.cz', merchant_category: 'groceries', daysBack: 14 },
  { client_id: 'C001', product_id: 'P002', type: 'debit', amount: 2100, merchant_name: 'Kosik.cz', merchant_category: 'groceries', daysBack: 16 },
  { client_id: 'C001', product_id: 'P002', type: 'debit', amount: 890, merchant_name: 'Datart', merchant_category: 'e_commerce', daysBack: 20 },
  { client_id: 'C001', product_id: 'P001', type: 'credit', amount: 42000, merchant_name: 'Employer - salary', merchant_category: 'salary', daysBack: 5 },
  { client_id: 'C001', product_id: 'P001', type: 'standing_order', amount: 12500, merchant_name: 'Landlord - rent', merchant_category: 'transfer', daysBack: 3 },
  { client_id: 'C001', product_id: 'P001', type: 'direct_debit', amount: 1890, merchant_name: 'O2 Czech Republic', merchant_category: 'utilities', daysBack: 8 },
]);

// ---------------------------------------------------------------------------
// C002 - Petr: 15+ international transactions (hotels, restaurants abroad)
// ---------------------------------------------------------------------------

const petrTransactions = makeBatch([
  // International travel spending
  { client_id: 'C002', product_id: 'P004', type: 'debit', amount: 12500, merchant_name: 'Booking.com', merchant_category: 'travel', daysBack: 1, is_international: true, currency: 'EUR' },
  { client_id: 'C002', product_id: 'P004', type: 'debit', amount: 3200, merchant_name: 'Restaurant Augustiner - Munich', merchant_category: 'dining', daysBack: 2, is_international: true, currency: 'EUR' },
  { client_id: 'C002', product_id: 'P005', type: 'debit', amount: 8500, merchant_name: 'Airbnb', merchant_category: 'travel', daysBack: 3, is_international: true, currency: 'EUR' },
  { client_id: 'C002', product_id: 'P004', type: 'debit', amount: 1800, merchant_name: 'Gasthof zur Linde - Vienna', merchant_category: 'dining', daysBack: 4, is_international: true, currency: 'EUR' },
  { client_id: 'C002', product_id: 'P004', type: 'debit', amount: 4500, merchant_name: 'Hotel Sacher Wien', merchant_category: 'travel', daysBack: 5, is_international: true, currency: 'EUR' },
  { client_id: 'C002', product_id: 'P004', type: 'debit', amount: 2100, merchant_name: 'Figlmuller - Vienna', merchant_category: 'dining', daysBack: 5, is_international: true, currency: 'EUR' },
  { client_id: 'C002', product_id: 'P004', type: 'debit', amount: 15000, merchant_name: 'Lufthansa', merchant_category: 'travel', daysBack: 7, is_international: true, currency: 'EUR' },
  { client_id: 'C002', product_id: 'P004', type: 'debit', amount: 950, merchant_name: 'DB Bahn - German Rail', merchant_category: 'transport', daysBack: 8, is_international: true, currency: 'EUR' },
  { client_id: 'C002', product_id: 'P005', type: 'debit', amount: 6800, merchant_name: 'Booking.com', merchant_category: 'travel', daysBack: 10, is_international: true, currency: 'EUR' },
  { client_id: 'C002', product_id: 'P004', type: 'debit', amount: 1350, merchant_name: 'Biergarten Chinesischer Turm', merchant_category: 'dining', daysBack: 12, is_international: true, currency: 'EUR' },
  { client_id: 'C002', product_id: 'P004', type: 'debit', amount: 2800, merchant_name: 'Hofbrauhaus - Munich', merchant_category: 'dining', daysBack: 14, is_international: true, currency: 'EUR' },
  { client_id: 'C002', product_id: 'P005', type: 'debit', amount: 11200, merchant_name: 'Hilton Berlin', merchant_category: 'travel', daysBack: 18, is_international: true, currency: 'EUR' },
  { client_id: 'C002', product_id: 'P004', type: 'debit', amount: 1600, merchant_name: 'Restaurant Nobu - Berlin', merchant_category: 'dining', daysBack: 19, is_international: true, currency: 'EUR' },
  { client_id: 'C002', product_id: 'P004', type: 'debit', amount: 750, merchant_name: 'Taxi Berlin', merchant_category: 'transport', daysBack: 19, is_international: true, currency: 'EUR' },
  { client_id: 'C002', product_id: 'P004', type: 'debit', amount: 3400, merchant_name: 'FlixBus DE', merchant_category: 'transport', daysBack: 22, is_international: true, currency: 'EUR' },
  { client_id: 'C002', product_id: 'P004', type: 'debit', amount: 4200, merchant_name: 'Salzburg Festival Tickets', merchant_category: 'entertainment', daysBack: 25, is_international: true, currency: 'EUR' },
  // Domestic
  { client_id: 'C002', product_id: 'P003', type: 'credit', amount: 95000, merchant_name: 'Svoboda Consulting - salary', merchant_category: 'salary', daysBack: 5 },
  { client_id: 'C002', product_id: 'P003', type: 'standing_order', amount: 18500, merchant_name: 'RB Hypoteka - splatka', merchant_category: 'transfer', daysBack: 3 },
  { client_id: 'C002', product_id: 'P003', type: 'standing_order', amount: 1800, merchant_name: 'RB Zivotni pojisteni', merchant_category: 'insurance', daysBack: 3 },
]);

// ---------------------------------------------------------------------------
// C003 - Marie: standing orders to Ceska pojistovna (external) & CSOB Penzijni (external)
// ---------------------------------------------------------------------------

const marieTransactions = makeBatch([
  // External insurance & pension standing orders
  { client_id: 'C003', product_id: 'P008', type: 'standing_order', amount: 2500, merchant_name: 'Ceska pojistovna', merchant_category: 'insurance', daysBack: 2 },
  { client_id: 'C003', product_id: 'P008', type: 'standing_order', amount: 1500, merchant_name: 'CSOB Penzijni', merchant_category: 'pension', daysBack: 2 },
  // RB pension contribution
  { client_id: 'C003', product_id: 'P008', type: 'standing_order', amount: 3000, merchant_name: 'RB Penzijni pripojisteni', merchant_category: 'pension', daysBack: 2 },
  // Pension income
  { client_id: 'C003', product_id: 'P008', type: 'credit', amount: 32000, merchant_name: 'CSSZ - duchod', merchant_category: 'salary', daysBack: 4 },
  { client_id: 'C003', product_id: 'P008', type: 'credit', amount: 33000, merchant_name: 'Prijem z pronajmu', merchant_category: 'transfer', daysBack: 6 },
  // Regular spending
  { client_id: 'C003', product_id: 'P010', type: 'debit', amount: 2300, merchant_name: 'Albert', merchant_category: 'groceries', daysBack: 1 },
  { client_id: 'C003', product_id: 'P010', type: 'debit', amount: 850, merchant_name: 'Lekarna Dr.Max', merchant_category: 'health', daysBack: 3 },
  { client_id: 'C003', product_id: 'P010', type: 'debit', amount: 1500, merchant_name: 'Kaufland', merchant_category: 'groceries', daysBack: 5 },
  { client_id: 'C003', product_id: 'P010', type: 'debit', amount: 3200, merchant_name: 'ATM withdrawal', merchant_category: 'atm', daysBack: 7 },
  { client_id: 'C003', product_id: 'P008', type: 'direct_debit', amount: 4500, merchant_name: 'PRE - electricity', merchant_category: 'utilities', daysBack: 10 },
  { client_id: 'C003', product_id: 'P008', type: 'direct_debit', amount: 1200, merchant_name: 'Vodafone', merchant_category: 'utilities', daysBack: 12 },
  // Large withdrawal contributing to balance decline
  { client_id: 'C003', product_id: 'P008', type: 'debit', amount: 150000, merchant_name: 'Transfer to external account', merchant_category: 'transfer', daysBack: 15 },
  { client_id: 'C003', product_id: 'P008', type: 'debit', amount: 85000, merchant_name: 'Transfer to external account', merchant_category: 'transfer', daysBack: 22 },
]);

// ---------------------------------------------------------------------------
// C004 - Tomas: mixed regular transactions
// ---------------------------------------------------------------------------

const tomasTransactions = makeBatch([
  { client_id: 'C004', product_id: 'P014', type: 'debit', amount: 850, merchant_name: 'Shell', merchant_category: 'transport', daysBack: 0 },
  { client_id: 'C004', product_id: 'P014', type: 'debit', amount: 1200, merchant_name: 'Lidl', merchant_category: 'groceries', daysBack: 1 },
  { client_id: 'C004', product_id: 'P015', type: 'debit', amount: 4200, merchant_name: 'IKEA', merchant_category: 'e_commerce', daysBack: 3 },
  { client_id: 'C004', product_id: 'P014', type: 'debit', amount: 650, merchant_name: 'Penny Market', merchant_category: 'groceries', daysBack: 4 },
  { client_id: 'C004', product_id: 'P014', type: 'debit', amount: 1800, merchant_name: 'OMV', merchant_category: 'transport', daysBack: 6 },
  { client_id: 'C004', product_id: 'P015', type: 'debit', amount: 2900, merchant_name: 'Decathlon', merchant_category: 'e_commerce', daysBack: 8 },
  { client_id: 'C004', product_id: 'P014', type: 'debit', amount: 350, merchant_name: 'McDonald\'s', merchant_category: 'dining', daysBack: 9 },
  { client_id: 'C004', product_id: 'P014', type: 'debit', amount: 2500, merchant_name: 'Tesco', merchant_category: 'groceries', daysBack: 12 },
  { client_id: 'C004', product_id: 'P013', type: 'credit', amount: 55000, merchant_name: 'Employer - salary', merchant_category: 'salary', daysBack: 5 },
  { client_id: 'C004', product_id: 'P013', type: 'standing_order', amount: 4200, merchant_name: 'RB Rychla pujcka - splatka', merchant_category: 'transfer', daysBack: 3 },
  { client_id: 'C004', product_id: 'P013', type: 'direct_debit', amount: 1500, merchant_name: 'T-Mobile', merchant_category: 'utilities', daysBack: 10 },
  { client_id: 'C004', product_id: 'P014', type: 'debit', amount: 5200, merchant_name: 'Hornbach', merchant_category: 'e_commerce', daysBack: 15 },
]);

// ---------------------------------------------------------------------------
// C005 - Lucie: 6+ e-commerce transactions
// ---------------------------------------------------------------------------

const lucieTransactions = makeBatch([
  { client_id: 'C005', product_id: 'P018', type: 'debit', amount: 450, merchant_name: 'Notino.cz', merchant_category: 'e_commerce', daysBack: 0 },
  { client_id: 'C005', product_id: 'P018', type: 'debit', amount: 2890, merchant_name: 'Zara.com', merchant_category: 'e_commerce', daysBack: 2 },
  { client_id: 'C005', product_id: 'P018', type: 'debit', amount: 1350, merchant_name: 'About You', merchant_category: 'e_commerce', daysBack: 4 },
  { client_id: 'C005', product_id: 'P018', type: 'debit', amount: 3200, merchant_name: 'Alza.cz', merchant_category: 'e_commerce', daysBack: 6 },
  { client_id: 'C005', product_id: 'P018', type: 'debit', amount: 890, merchant_name: 'Rohlik.cz', merchant_category: 'groceries', daysBack: 7 },
  { client_id: 'C005', product_id: 'P018', type: 'debit', amount: 4500, merchant_name: 'Bonami.cz', merchant_category: 'e_commerce', daysBack: 10 },
  { client_id: 'C005', product_id: 'P018', type: 'debit', amount: 1650, merchant_name: 'ASOS.com', merchant_category: 'e_commerce', daysBack: 13 },
  { client_id: 'C005', product_id: 'P018', type: 'debit', amount: 780, merchant_name: 'Spotify', merchant_category: 'entertainment', daysBack: 15 },
  { client_id: 'C005', product_id: 'P017', type: 'credit', amount: 48000, merchant_name: 'Employer - salary', merchant_category: 'salary', daysBack: 5 },
  { client_id: 'C005', product_id: 'P017', type: 'standing_order', amount: 8500, merchant_name: 'Landlord - rent', merchant_category: 'transfer', daysBack: 3 },
  { client_id: 'C005', product_id: 'P017', type: 'direct_debit', amount: 890, merchant_name: 'Netflix', merchant_category: 'entertainment', daysBack: 12 },
]);

// ---------------------------------------------------------------------------
// Export all transactions
// ---------------------------------------------------------------------------

export const transactions: Transaction[] = [
  ...janaTransactions,
  ...petrTransactions,
  ...marieTransactions,
  ...tomasTransactions,
  ...lucieTransactions,
];
