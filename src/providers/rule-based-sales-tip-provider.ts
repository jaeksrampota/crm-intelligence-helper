import type { InsightProvider, ClientProfile, SalesTip } from '../types';
import { isBirthdayWithinDays, isWithinDays, daysAgoDate } from '../utils/date-helpers';
import type { Language, Translations } from '../i18n/translations';
import { translations } from '../i18n/translations';

const RB_PARTNER_MERCHANTS = ['rohlik.cz', 'datart', 'mall.cz', 'alza.cz', 'notino'];
const EXTERNAL_INSURANCE = ['česká pojišťovna', 'ceska pojistovna', 'allianz', 'generali', 'kooperativa', 'uniqa'];
const EXTERNAL_PENSION = ['čsob penzijní', 'csob penzijni', 'nn penzijní', 'conseq'];

type RuleFn = (profile: ClientProfile, t: Translations['salesTips']) => SalesTip | null;

function ruleR001(profile: ClientProfile, t: Translations['salesTips']): SalesTip | null {
  const ninetyDaysAgo = daysAgoDate(90);
  const intlTx = profile.transactions.filter(
    (tx) => tx.is_international && new Date(tx.timestamp) >= ninetyDaysAgo
  );
  const hasTravelInsurance = profile.products.some(
    (p) => p.product_type === 'insurance' && p.status === 'active' && p.product_name.toLowerCase().includes('cestovní')
  );
  if (intlTx.length > 0 && !hasTravelInsurance) {
    return {
      rule_id: 'R001',
      headline: t.R001.headline,
      reasoning: t.R001.reasoning(intlTx.length),
      suggested_action: t.R001.action,
      priority: 'high',
      source: 'rules',
      confidence_score: null,
    };
  }
  return null;
}

function ruleR002(profile: ClientProfile, t: Translations['salesTips']): SalesTip | null {
  const ninetyDaysAgo = daysAgoDate(90);
  const ecomTx = profile.transactions.filter(
    (tx) => tx.merchant_category === 'e_commerce' && new Date(tx.timestamp) >= ninetyDaysAgo
  );
  const hasCreditCard = profile.products.some(
    (p) => p.product_type === 'credit_card' && p.status === 'active'
  );
  if (ecomTx.length > 5 && !hasCreditCard) {
    return {
      rule_id: 'R002',
      headline: t.R002.headline,
      reasoning: t.R002.reasoning(ecomTx.length),
      suggested_action: t.R002.action,
      priority: 'medium',
      source: 'rules',
      confidence_score: null,
    };
  }
  return null;
}

function ruleR003(profile: ClientProfile, t: Translations['salesTips']): SalesTip | null {
  const ninetyDaysAgo = daysAgoDate(90);
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
      headline: t.R003.headline,
      reasoning: t.R003.reasoning(partnerTx.length),
      suggested_action: t.R003.action,
      priority: 'medium',
      source: 'rules',
      confidence_score: null,
    };
  }
  return null;
}

function ruleR004(profile: ClientProfile, t: Translations['salesTips']): SalesTip | null {
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
      headline: t.R004.headline,
      reasoning: t.R004.reasoning(npsScores[0].score),
      suggested_action: t.R004.action,
      priority: 'low',
      source: 'rules',
      confidence_score: null,
    };
  }
  return null;
}

function ruleR005(profile: ClientProfile, t: Translations['salesTips']): SalesTip | null {
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
      headline: t.R005.headline,
      reasoning: t.R005.reasoning(merchants),
      suggested_action: t.R005.action,
      priority: 'medium',
      source: 'rules',
      confidence_score: null,
    };
  }
  return null;
}

function ruleR006(profile: ClientProfile, t: Translations['salesTips']): SalesTip | null {
  const expiringCards = profile.products.filter(
    (p) => (p.product_type === 'debit_card' || p.product_type === 'credit_card') &&
      p.status === 'active' && p.expiry_date && isWithinDays(p.expiry_date, 30)
  );
  if (expiringCards.length > 0) {
    return {
      rule_id: 'R006',
      headline: t.R006.headline,
      reasoning: t.R006.reasoning(expiringCards.length),
      suggested_action: t.R006.action,
      priority: 'high',
      source: 'rules',
      confidence_score: null,
    };
  }
  return null;
}

function ruleR007(profile: ClientProfile, t: Translations['salesTips']): SalesTip | null {
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
      headline: t.R007.headline,
      reasoning: t.R007.reasoning(Math.round(dropPct * 100)),
      suggested_action: t.R007.action,
      priority: 'high',
      source: 'rules',
      confidence_score: null,
    };
  }
  return null;
}

function ruleR008(profile: ClientProfile, t: Translations['salesTips']): SalesTip | null {
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
      headline: t.R008.headline,
      reasoning: t.R008.reasoning,
      suggested_action: t.R008.action,
      priority: 'low',
      source: 'rules',
      confidence_score: null,
    };
  }
  return null;
}

function ruleR009(profile: ClientProfile, t: Translations['salesTips']): SalesTip | null {
  if (isBirthdayWithinDays(profile.client.date_of_birth, 7)) {
    return {
      rule_id: 'R009',
      headline: t.R009.headline,
      reasoning: t.R009.reasoning,
      suggested_action: t.R009.action,
      priority: 'medium',
      source: 'rules',
      confidence_score: null,
    };
  }
  return null;
}

function ruleR010(profile: ClientProfile, t: Translations['salesTips']): SalesTip | null {
  const hasOpenComplaint = profile.interactions.some((i) => !i.resolved);
  const npsScores = profile.satisfaction_scores
    .filter((s) => s.survey_type === 'NPS')
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  const declining = npsScores.length >= 2 && npsScores[0].score < npsScores[1].score;

  if (hasOpenComplaint && declining) {
    return {
      rule_id: 'R010',
      headline: t.R010.headline,
      reasoning: t.R010.reasoning,
      suggested_action: t.R010.action,
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
  generateInsights(clientData: ClientProfile, language?: Language): SalesTip[] {
    const t = translations[language ?? 'en'].salesTips;
    const tips: SalesTip[] = [];
    for (const rule of ALL_RULES) {
      const tip = rule(clientData, t);
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
