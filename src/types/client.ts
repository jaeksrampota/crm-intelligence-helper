export type Segment = 'standard' | 'affluent' | 'premium';
export type GDPRStatus = 'active_consent' | 'expired' | 'no_consent';

export interface Client {
  client_id: string;
  name: string;
  date_of_birth: string; // ISO date
  segment: Segment;
  gdpr_consent_status: GDPRStatus;
  linked_business_id: string | null;
  linked_business_name: string | null;
}
