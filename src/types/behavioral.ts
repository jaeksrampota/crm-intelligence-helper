export type EventType = 'login' | 'page_view' | 'feature_use' | 'app_open' | 'session_end';

export interface BehavioralEvent {
  event_id: string;
  client_id: string;
  channel: 'mobile_app' | 'internet_banking';
  event_type: EventType;
  timestamp: string;
  metadata: Record<string, unknown>;
}
