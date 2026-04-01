export type Channel = 'branch' | 'call_center' | 'chat' | 'email' | 'voicebot' | 'chatbot' | 'mobile_app' | 'internet_banking';
export type Sentiment = 'positive' | 'neutral' | 'negative';

export interface Interaction {
  interaction_id: string;
  client_id: string;
  channel: Channel;
  timestamp: string;
  topic_summary: string;
  detail_notes: string;
  sentiment_score: Sentiment | null;
  resolved: boolean;
  agent_id: string | null;
  branch_name: string | null;
  related_ticket_id: string | null;
}
