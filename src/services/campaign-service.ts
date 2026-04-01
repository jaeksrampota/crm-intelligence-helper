import { campaigns } from '../data';
import type { Campaign } from '../types';

export async function fetchCampaigns(clientId: string): Promise<Campaign[]> {
  return campaigns
    .filter((c) => c.client_id === clientId)
    .sort((a, b) => b.priority_score - a.priority_score);
}
