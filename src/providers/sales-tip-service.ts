import type { InsightProvider, ClientProfile, SalesTip } from '../types';
import type { Language } from '../i18n/translations';
import { RuleBasedSalesTipProvider } from './rule-based-sales-tip-provider';

let provider: InsightProvider<ClientProfile, SalesTip> = new RuleBasedSalesTipProvider();

export function setSalesTipProvider(p: InsightProvider<ClientProfile, SalesTip>): void {
  provider = p;
}

export function getSalesTips(profile: ClientProfile, language?: Language): SalesTip[] {
  return provider.generateInsights(profile, language);
}
