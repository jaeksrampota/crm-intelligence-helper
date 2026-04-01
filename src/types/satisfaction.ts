export type SurveyType = 'NPS' | 'CSAT' | 'CES';

export interface SatisfactionScore {
  score_id: string;
  client_id: string;
  survey_type: SurveyType;
  score: number;
  verbatim_text: string | null;
  timestamp: string;
}
