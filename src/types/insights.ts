export interface InsightProvider<TInput, TOutput> {
  generateInsights(clientData: TInput): TOutput[];
  getProviderType(): 'rules' | 'ml' | 'llm';
  getConfidenceScore(): number | null;
}

export type TipPriority = 'high' | 'medium' | 'low';
export type TipSource = 'rules' | 'ml' | 'llm' | 'campaign';

export interface SalesTip {
  rule_id: string;
  headline: string;
  reasoning: string;
  suggested_action: string;
  priority: TipPriority;
  source: TipSource;
  confidence_score: number | null;
}

export type AlertType = 'birthday' | 'expiring_card' | 'balance_drop' | 'complaint' | 'gdpr_warning' | 'scheduled_meeting';
export type AlertSeverity = 'critical' | 'warning' | 'info';

export interface Alert {
  id: string;
  type: AlertType;
  message: string;
  severity: AlertSeverity;
  related_zone: 'header' | 'products' | 'activity' | 'behavior' | 'sales';
  dismissed: boolean;
}
