import type { Client } from '../types';
import { makeBirthdayDOB } from '../utils/date-helpers';

export const clients: Client[] = [
  {
    client_id: 'C001',
    name: 'Jana Novakova',
    date_of_birth: makeBirthdayDOB(28, 120), // birthday far away
    segment: 'standard',
    gdpr_consent_status: 'active_consent',
    linked_business_id: null,
    linked_business_name: null,
  },
  {
    client_id: 'C002',
    name: 'Petr Svoboda',
    date_of_birth: makeBirthdayDOB(42, 5), // birthday in 5 days!
    segment: 'affluent',
    gdpr_consent_status: 'active_consent',
    linked_business_id: 'B001',
    linked_business_name: 'Svoboda Consulting s.r.o.',
  },
  {
    client_id: 'C003',
    name: 'Marie Cerna',
    date_of_birth: makeBirthdayDOB(67, 200),
    segment: 'premium',
    gdpr_consent_status: 'expired',
    linked_business_id: null,
    linked_business_name: null,
  },
  {
    client_id: 'C004',
    name: 'Tomas Dvorak',
    date_of_birth: makeBirthdayDOB(35, 90),
    segment: 'standard',
    gdpr_consent_status: 'active_consent',
    linked_business_id: 'B002',
    linked_business_name: 'Dvorak & syn s.r.o.',
  },
  {
    client_id: 'C005',
    name: 'Lucie Prochazkova',
    date_of_birth: makeBirthdayDOB(31, 1), // birthday tomorrow!
    segment: 'affluent',
    gdpr_consent_status: 'active_consent',
    linked_business_id: null,
    linked_business_name: null,
  },
];
