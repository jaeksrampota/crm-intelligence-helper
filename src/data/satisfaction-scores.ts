import type { SatisfactionScore } from '../types';
import { daysAgo } from '../utils/date-helpers';

export const satisfactionScores: SatisfactionScore[] = [
  // ========================================================================
  // C001 - Jana: steady positive satisfaction
  // ========================================================================
  {
    score_id: 'SAT001',
    client_id: 'C001',
    survey_type: 'NPS',
    score: 7,
    verbatim_text: 'Good banking app, easy to use for daily payments.',
    timestamp: daysAgo(30),
  },
  {
    score_id: 'SAT002',
    client_id: 'C001',
    survey_type: 'CSAT',
    score: 4,
    verbatim_text: 'Satisfied with the service at the branch.',
    timestamp: daysAgo(90),
  },

  // ========================================================================
  // C002 - Petr: high satisfaction, stable
  // ========================================================================
  {
    score_id: 'SAT003',
    client_id: 'C002',
    survey_type: 'NPS',
    score: 8,
    verbatim_text: 'Great mortgage terms and the Gold card benefits are excellent for travel.',
    timestamp: daysAgo(20),
  },
  {
    score_id: 'SAT004',
    client_id: 'C002',
    survey_type: 'CES',
    score: 2,
    verbatim_text: 'Setting up travel notification was quick and easy.',
    timestamp: daysAgo(60),
  },

  // ========================================================================
  // C003 - Marie: DECLINING satisfaction trend
  // ========================================================================
  {
    score_id: 'SAT005',
    client_id: 'C003',
    survey_type: 'NPS',
    score: 4,
    verbatim_text: 'Interest rates on savings are not competitive anymore. Considering other options.',
    timestamp: daysAgo(15),
  },
  {
    score_id: 'SAT006',
    client_id: 'C003',
    survey_type: 'NPS',
    score: 6,
    verbatim_text: 'Service is okay but the online banking interface changed and I find it confusing.',
    timestamp: daysAgo(90),
  },
  {
    score_id: 'SAT007',
    client_id: 'C003',
    survey_type: 'NPS',
    score: 8,
    verbatim_text: 'Happy with my investment performance and the personal attention at the branch.',
    timestamp: daysAgo(180),
  },
  {
    score_id: 'SAT008',
    client_id: 'C003',
    survey_type: 'CSAT',
    score: 2,
    verbatim_text: 'Had difficulty navigating the new internet banking. Branch staff were helpful though.',
    timestamp: daysAgo(45),
  },

  // ========================================================================
  // C004 - Tomas: NPS 9 (needed for R004) + declining trend for R010
  // ========================================================================
  {
    score_id: 'SAT009',
    client_id: 'C004',
    survey_type: 'NPS',
    score: 9,
    verbatim_text: 'Very happy with the mobile app and the quick loan process. Would recommend to friends.',
    timestamp: daysAgo(10),
  },
  {
    score_id: 'SAT010',
    client_id: 'C004',
    survey_type: 'NPS',
    score: 8,
    verbatim_text: 'Good overall experience. App is convenient for managing everything.',
    timestamp: daysAgo(60),
  },
  {
    score_id: 'SAT011',
    client_id: 'C004',
    survey_type: 'NPS',
    score: 9,
    verbatim_text: 'Excellent experience when applying for the consumer loan.',
    timestamp: daysAgo(120),
  },
  {
    score_id: 'SAT012',
    client_id: 'C004',
    survey_type: 'CSAT',
    score: 4,
    verbatim_text: 'Loan application was smooth and fast. Branch staff were professional.',
    timestamp: daysAgo(90),
  },

  // ========================================================================
  // C005 - Lucie: positive and growing
  // ========================================================================
  {
    score_id: 'SAT013',
    client_id: 'C005',
    survey_type: 'NPS',
    score: 8,
    verbatim_text: 'Love the mobile app. The spending categories feature is super useful!',
    timestamp: daysAgo(25),
  },
  {
    score_id: 'SAT014',
    client_id: 'C005',
    survey_type: 'CES',
    score: 1,
    verbatim_text: 'Account opening was very easy, everything done online.',
    timestamp: daysAgo(100),
  },
  {
    score_id: 'SAT015',
    client_id: 'C005',
    survey_type: 'CSAT',
    score: 5,
    verbatim_text: 'Great onboarding experience and the chat support is responsive.',
    timestamp: daysAgo(70),
  },
];
