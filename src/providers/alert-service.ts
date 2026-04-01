import type { InsightProvider, ClientProfile, Alert } from '../types';
import type { Language } from '../i18n/translations';
import { RuleBasedAlertProvider } from './rule-based-alert-provider';

let provider: InsightProvider<ClientProfile, Alert> = new RuleBasedAlertProvider();

export function setAlertProvider(p: InsightProvider<ClientProfile, Alert>): void {
  provider = p;
}

export function getAlerts(profile: ClientProfile, language?: Language): Alert[] {
  return provider.generateInsights(profile, language);
}
