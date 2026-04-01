import type { InsightProvider, ClientProfile, SalesTip } from '../types';
import { RuleBasedSalesTipProvider } from './rule-based-sales-tip-provider';

let provider: InsightProvider<ClientProfile, SalesTip> = new RuleBasedSalesTipProvider();

export function setSalesTipProvider(p: InsightProvider<ClientProfile, SalesTip>): void {
  provider = p;
}

export function getSalesTips(profile: ClientProfile): SalesTip[] {
  return provider.generateInsights(profile);
}
