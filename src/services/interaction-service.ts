import { interactions } from '../data';
import type { Interaction } from '../types';

export async function fetchInteractions(clientId: string, limit = 5): Promise<Interaction[]> {
  return interactions
    .filter((i) => i.client_id === clientId)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, limit);
}

export async function fetchInteractionDetail(interactionId: string): Promise<Interaction | null> {
  return interactions.find((i) => i.interaction_id === interactionId) ?? null;
}
