import { clients } from '../data';
import type { Client } from '../types';

export async function searchClients(query: string): Promise<Client[]> {
  const q = query.toLowerCase().trim();
  if (!q) return clients;
  return clients.filter(
    (c) => c.name.toLowerCase().includes(q) || c.client_id.toLowerCase().includes(q)
  );
}

export async function fetchClient(clientId: string): Promise<Client | null> {
  return clients.find((c) => c.client_id === clientId) ?? null;
}
