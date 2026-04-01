import type { InsightProvider, ClientProfile, SalesTip } from '../types';
import { isBirthdayWithinDays, isWithinDays } from '../utils/date-helpers';

const RB_PARTNER_MERCHANTS = ['rohlik.cz', 'datart', 'mall.cz', 'alza.cz', 'notino'];
const EXTERNAL_INSURANCE = ['česká pojišťovna', 'ceska pojistovna', 'allianz', 'generali', 'kooperativa', 'uniqa'];
const EXTERNAL_PENSION = ['čsob penzijní', 'csob penzijni', 'nn penzijní', 'conseq'];

type RuleFn = (profile: ClientProfile) => SalesTip | null;

function ruleR001(profile: ClientProfile): SalesTip | null {
  const ninetyDaysAgo = new Date();
  ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
  const intlTx = profile.transactions.filter(
    (tx) => tx.is_international && new Date(tx.timestamp) >= ninetyDaysAgo
  );
  const hasTravelInsurance = profile.products.some(
    (p) => p.product_type === 'insurance' && p.status === 'active' && p.product_name.toLowerCase().includes('cestovní')
  );
  if (intlTx.length > 0 && !hasTravelInsurance) {
    return {
      rule_id: 'R001',
      headline: 'Client travels but has no travel insurance',
      reasoning: `${intlTx.length} international card transactions in the last 90 days, no active travel insurance product.`,
      suggested_action: 'Offer the travel insurance package with card coverage.',
      priority: 'high',
      source: 'rules',
      confidence_score: null,
    };
  }
  return null;
}

function ruleR002(profile: ClientProfile): SalesTip | null {
  const ninetyDaysAgo = new Date();
  ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
  const ecomTx = profile.transactions.filter(
    (tx) => tx.merchant_category === 'e_commerce' && new Date(tx.timestamp) >= ninetyDaysAgo
  );
  const hasCreditCard = profile.products.some(
    (p) => p.product_type === 'credit_card' && p.status === 'active'
  );
  if (ecomTx.length > 5 && !hasCreditCard) {
    return {
      rule_id: 'R002',
      headline: 'Frequent online shopper without a credit card',
      reasoning: `${ecomTx.length} e-commerce transactions in the last 90 days, paying by debit card only.`,
      suggested_action: 'Suggest a credit card with cashback on online purchases.',
      priority: 'medium',
      source: 'rules',
      confidence_score: null,
    };
  }
  return null;
}

function ruleR003(profile: ClientProfile): SalesTip | null {
  const ninetyDaysAgo = new Date();
  ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
  const partnerTx = profile.transactions.filter(
    (tx) => new Date(tx.timestamp) >= ninetyDaysAgo &&
      RB_PARTNER_MERCHANTS.some((m) => tx.merchant_name.toLowerCase().includes(m))
  );
  const rbClubActive = profile.behavioral_events.some(
    (e) => e.event_type === 'feature_use' && (e.metadata as Record<string, unknown>)?.feature === 'rb_club'
  );
  if (partnerTx.length > 0 && !rbClubActive) {
    return {
      rule_id: 'R003',
      headline: 'Shops at RB partners but no RB Club',
      reasoning: `${partnerTx.length} transactions at RB partner merchants without loyalty discounts activated.`,
      suggested_action: 'Suggest enrolling in RB Club for partner discounts.',
      priority: 'medium',
      source: 'rules',
      confidence_score: null,
    };
  }
  return null;
}

function ruleR004(profile: ClientProfile): SalesTip | null {
  const npsScores = profile.satisfaction_scores
    .filter((s) => s.survey_type === 'NPS')
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  if (npsScores.length === 0 || npsScores[0].score < 8) return null;

  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  const referralOffered = profile.campaigns.some(
    (c) => c.offer_type === 'referral' && new Date(c.valid_from) >= sixMonthsAgo
  );

  if (!referralOffered) {
    return {
      rule_id: 'R004',
      headline: 'Satisfied client — suggest referral program',
      reasoning: `NPS score of ${npsScores[0].score}. No referral offer in the last 6 months.`,
      suggested_action: 'Present the MUM (Muj ucet, muj tip) referral program.',
      priority: 'low',
      source: 'rules',
      confidence_score: null,
    };
  }
  return null;
}

function ruleR005(profile: ClientProfile): SalesTip | null {
  const externalPayments = profile.transactions.filter(
    (tx) => tx.type === 'standing_order' && (
      EXTERNAL_INSURANCE.some((name) => tx.merchant_name.toLowerCase().includes(name)) ||
      EXTERNAL_PENSION.some((name) => tx.merchant_name.toLowerCase().includes(name))
    )
  );
  if (externalPayments.length > 0) {
    const merchants = [...new Set(externalPayments.map((tx) => tx.merchant_name))].join(', ');
    return {
      rule_id: 'R005',
      headline: 'Pays external insurance/pension provider',
      reasoning: `Active standing orders to: ${merchants}. Potential consolidation opportunity.`,
      suggested_action: 'Suggest reviewing and consolidating insurance/pension with RB products.',
      priority: 'medium',
      source: 'rules',
      confidence_score: null,
    };
  }
  return null;
}

function ruleR006(profile: ClientProfile): SalesTip | null {
  const expiringCards = profile.products.filter(
    (p) => (p.product_type === 'debit_card' || p.product_type === 'credit_card') &&
      p.status === 'active' && p.expiry_date && isWithinDays(p.expiry_date, 30)
  );
  if (expiringCards.length > 0) {
    return {
      rule_id: 'R006',
      headline: 'Card expiring soon',
      reasoning: `${expiringCards.length} card(s) expiring within 30 days.`,
      suggested_action: 'Proactively discuss card renewal or upgrade to a premium card.',
      priority: 'high',
      source: 'rules',
      confidence_score: null,
    };
  }
  return null;
}

function ruleR007(profile: ClientProfile): SalesTip | null {
  const currentAccount = profile.products.find((p) => p.product_type === 'current_account');
  if (!currentAccount || !('balance_history_30d' in currentAccount.key_params)) return null;

  const history = (currentAccount.key_params as any).balance_history_30d as number[];
  if (history.length < 2) return null;

  const first = history[0];
  const last = history[history.length - 1];
  const dropPct = first > 0 ? (first - last) / first : 0;

  if (dropPct > 0.3) {
    return {
      rule_id: 'R007',
      headline: 'Significant balance drop detected',
      reasoning: `Account balance decreased by ${Math.round(dropPct * 100)}% in the last 30 days.`,
      suggested_action: 'Check if the client needs financial support or if there is a concern.',
      priority: 'high',
      source: 'rules',
      confidence_score: null,
    };
  }
  return null;
}

function ruleR008(profile: ClientProfile): SalesTip | null {
  const hasLoan = profile.products.some(
    (p) => p.product_type === 'consumer_loan' && p.status === 'active'
  );
  const currentAccount = profile.products.find((p) => p.product_type === 'current_account');
  if (!hasLoan || !currentAccount || !('balance_history_30d' in currentAccount.key_params)) return null;

  const history = (currentAccount.key_params as any).balance_history_30d as number[];
  if (history.length < 2) return null;

  const first = history[0];
  const last = history[history.length - 1];
  const growthPct = first > 0 ? (last - first) / first : 0;

  if (growthPct > 0.05) {
    return {
      rule_id: 'R008',
      headline: 'Credit profile improving — consider refinancing',
      reasoning: 'Balance trend is growing while client has an active consumer loan.',
      suggested_action: 'Suggest loan refinancing at a better interest rate.',
      priority: 'low',
      source: 'rules',
      confidence_score: null,
    };
  }
  return null;
}

function ruleR009(profile: ClientProfile): SalesTip | null {
  if (isBirthdayWithinDays(profile.client.date_of_birth, 7)) {
    return {
      rule_id: 'R009',
      headline: 'Birthday approaching — personal greeting',
      reasoning: 'Client\'s birthday is within the next 7 days.',
      suggested_action: 'Wish the client a happy birthday. Consider a small gift or benefit.',
      priority: 'medium',
      source: 'rules',
      confidence_score: null,
    };
  }
  return null;
}

function ruleR010(profile: ClientProfile): SalesTip | null {
  const hasOpenComplaint = profile.interactions.some((i) => !i.resolved);
  const npsScores = profile.satisfaction_scores
    .filter((s) => s.survey_type === 'NPS')
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  const declining = npsScores.length >= 2 && npsScores[0].score < npsScores[1].score;

  if (hasOpenComplaint && declining) {
    return {
      rule_id: 'R010',
      headline: 'Active complaint + declining satisfaction',
      reasoning: 'Client has an unresolved complaint and satisfaction trend is declining. Handle with care.',
      suggested_action: 'Acknowledge the issue first. Focus on resolution before any sales approach.',
      priority: 'high',
      source: 'rules',
      confidence_score: null,
    };
  }
  return null;
}

const ALL_RULES: RuleFn[] = [ruleR001, ruleR002, ruleR003, ruleR004, ruleR005, ruleR006, ruleR007, ruleR008, ruleR009, ruleR010];

const PRIORITY_ORDER: Record<string, number> = { high: 0, medium: 1, low: 2 };

export class RuleBasedSalesTipProvider implements InsightProvider<ClientProfile, SalesTip> {
  generateInsights(clientData: ClientProfile): SalesTip[] {
    const tips: SalesTip[] = [];
    for (const rule of ALL_RULES) {
      const tip = rule(clientData);
      if (tip) tips.push(tip);
    }
    return tips
      .sort((a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority])
      .slice(0, 5);
  }

  getProviderType(): 'rules' | 'ml' | 'llm' {
    return 'rules';
  }

  getConfidenceScore(): number | null {
    return null;
  }
}
