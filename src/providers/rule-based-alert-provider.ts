import type { InsightProvider, ClientProfile, Alert } from '../types';
import { isBirthdayWithinDays, isWithinDays, daysUntilBirthday } from '../utils/date-helpers';

export class RuleBasedAlertProvider implements InsightProvider<ClientProfile, Alert> {
  private nextId = 1;

  private makeId(): string {
    return `alert-${this.nextId++}`;
  }

  generateInsights(clientData: ClientProfile): Alert[] {
    this.nextId = 1;
    const alerts: Alert[] = [];

    // Birthday within 7 days
    if (isBirthdayWithinDays(clientData.client.date_of_birth, 7)) {
      const days = daysUntilBirthday(clientData.client.date_of_birth);
      alerts.push({
        id: this.makeId(),
        type: 'birthday',
        message: days <= 1 ? 'Birthday is tomorrow!' : `Birthday in ${days} days`,
        severity: 'info',
        related_zone: 'header',
        dismissed: false,
      });
    }

    // Card expiring within 30 days
    const expiringCards = clientData.products.filter(
      (p) => (p.product_type === 'debit_card' || p.product_type === 'credit_card') &&
        p.status === 'active' && p.expiry_date && isWithinDays(p.expiry_date, 30)
    );
    for (const card of expiringCards) {
      alerts.push({
        id: this.makeId(),
        type: 'expiring_card',
        message: `${card.product_name} expires soon`,
        severity: 'warning',
        related_zone: 'products',
        dismissed: false,
      });
    }

    // Balance drop > 30%
    const currentAccount = clientData.products.find((p) => p.product_type === 'current_account');
    if (currentAccount && 'balance_history_30d' in currentAccount.key_params) {
      const history = (currentAccount.key_params as any).balance_history_30d as number[];
      if (history.length >= 2) {
        const first = history[0];
        const last = history[history.length - 1];
        const dropPct = first > 0 ? (first - last) / first : 0;
        if (dropPct > 0.3) {
          alerts.push({
            id: this.makeId(),
            type: 'balance_drop',
            message: `Balance dropped ${Math.round(dropPct * 100)}% in 30 days`,
            severity: 'critical',
            related_zone: 'behavior',
            dismissed: false,
          });
        }
      }
    }

    // Unresolved complaint
    const openComplaints = clientData.interactions.filter((i) => !i.resolved);
    if (openComplaints.length > 0) {
      alerts.push({
        id: this.makeId(),
        type: 'complaint',
        message: `${openComplaints.length} unresolved complaint(s)`,
        severity: 'critical',
        related_zone: 'activity',
        dismissed: false,
      });
    }

    // GDPR warning
    if (clientData.client.gdpr_consent_status === 'expired') {
      alerts.push({
        id: this.makeId(),
        type: 'gdpr_warning',
        message: 'GDPR consent expired',
        severity: 'warning',
        related_zone: 'header',
        dismissed: false,
      });
    } else if (clientData.client.gdpr_consent_status === 'no_consent') {
      alerts.push({
        id: this.makeId(),
        type: 'gdpr_warning',
        message: 'No GDPR consent on file',
        severity: 'critical',
        related_zone: 'header',
        dismissed: false,
      });
    }

    return alerts;
  }

  getProviderType(): 'rules' | 'ml' | 'llm' {
    return 'rules';
  }

  getConfidenceScore(): number | null {
    return null;
  }
}
