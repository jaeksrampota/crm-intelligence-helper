import type { Campaign } from '../types';
import { daysFromNow, daysAgo } from '../utils/date-helpers';

export const campaigns: Campaign[] = [
  // ========================================================================
  // C001 - Jana: credit card upsell + RB Club activation
  // ========================================================================
  {
    campaign_id: 'CMP001',
    client_id: 'C001',
    offer_type: 'credit_card_offer',
    offer_name: 'RB Credit Mastercard Standard - prvni rok zdarma',
    status: 'new',
    valid_from: daysAgo(10),
    valid_to: daysFromNow(50),
    priority_score: 85,
  },
  {
    campaign_id: 'CMP002',
    client_id: 'C001',
    offer_type: 'loyalty_program',
    offer_name: 'RB Club aktivace - bonus 500 bodu',
    status: 'presented',
    valid_from: daysAgo(30),
    valid_to: daysFromNow(30),
    priority_score: 70,
  },

  // ========================================================================
  // C002 - Petr: travel insurance + mortgage refinancing
  // ========================================================================
  {
    campaign_id: 'CMP003',
    client_id: 'C002',
    offer_type: 'travel_insurance',
    offer_name: 'RB Cestovni pojisteni Premium - rocni',
    status: 'new',
    valid_from: daysAgo(5),
    valid_to: daysFromNow(60),
    priority_score: 92,
  },
  {
    campaign_id: 'CMP004',
    client_id: 'C002',
    offer_type: 'mortgage_refinancing',
    offer_name: 'Refinancovani hypoteky - zvyhodnena sazba 3.49%',
    status: 'presented',
    valid_from: daysAgo(20),
    valid_to: daysFromNow(90),
    priority_score: 78,
  },

  // ========================================================================
  // C003 - Marie: savings rate offer + GDPR renewal
  // ========================================================================
  {
    campaign_id: 'CMP005',
    client_id: 'C003',
    offer_type: 'savings_promotion',
    offer_name: 'Sporici ucet XL - zvyhodneny urok 5.0% na 6 mesicu',
    status: 'new',
    valid_from: daysAgo(7),
    valid_to: daysFromNow(45),
    priority_score: 88,
  },
  {
    campaign_id: 'CMP006',
    client_id: 'C003',
    offer_type: 'gdpr_consent_renewal',
    offer_name: 'Obnova souhlasu se zpracovanim osobnich udaju',
    status: 'new',
    valid_from: daysAgo(14),
    valid_to: daysFromNow(30),
    priority_score: 95,
  },

  // ========================================================================
  // C004 - Tomas: account upgrade only (NO referral campaign in last 180 days)
  // ========================================================================
  {
    campaign_id: 'CMP007',
    client_id: 'C004',
    offer_type: 'account_upgrade',
    offer_name: 'Upgrade na eKonto Plus - 3 mesice zdarma',
    status: 'presented',
    valid_from: daysAgo(15),
    valid_to: daysFromNow(45),
    priority_score: 72,
  },

  // ========================================================================
  // C005 - Lucie: card upgrade + savings product
  // ========================================================================
  {
    campaign_id: 'CMP008',
    client_id: 'C005',
    offer_type: 'card_upgrade',
    offer_name: 'Upgrade na RB Debit Mastercard Gold',
    status: 'new',
    valid_from: daysAgo(3),
    valid_to: daysFromNow(40),
    priority_score: 80,
  },
  {
    campaign_id: 'CMP009',
    client_id: 'C005',
    offer_type: 'savings_account',
    offer_name: 'Sporici ucet Smart - zalozeni zdarma',
    status: 'new',
    valid_from: daysAgo(10),
    valid_to: daysFromNow(60),
    priority_score: 75,
  },
];
