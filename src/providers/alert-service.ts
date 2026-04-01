import type { InsightProvider, ClientProfile, Alert } from '../types';
import { RuleBasedAlertProvider } from './rule-based-alert-provider';

let provider: InsightProvider<ClientProfile, Alert> = new RuleBasedAlertProvider();

export function setAlertProvider(p: InsightProvider<ClientProfile, Alert>): void {
  provider = p;
}

export function getAlerts(profile: ClientProfile): Alert[] {
  return provider.generateInsights(profile);
}
