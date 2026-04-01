export type OfferStatus = 'new' | 'presented' | 'accepted' | 'declined';

export interface Campaign {
  campaign_id: string;
  client_id: string;
  offer_type: string;
  offer_name: string;
  status: OfferStatus;
  valid_from: string;
  valid_to: string;
  priority_score: number;
}
