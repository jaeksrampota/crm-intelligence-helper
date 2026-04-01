import { Cake, ShieldCheck, ShieldAlert, Building2 } from 'lucide-react';
import type { Client, Interaction } from '../../types';
import { computeAge, isBirthdayWithinDays, relativeDate } from '../../utils/date-helpers';
import { SegmentBadge } from '../shared/SegmentBadge';

export function ClientHeader({ client, interactions }: { client: Client; interactions: Interaction[] }) {
  const age = computeAge(client.date_of_birth);
  const hasBirthday = isBirthdayWithinDays(client.date_of_birth, 7);

  const lastBranchVisit = interactions.find((i) => i.channel === 'branch');
  const lastCall = interactions.find((i) => i.channel === 'call_center');

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 px-4 py-3">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold text-gray-900">{client.name}</h1>
            <SegmentBadge segment={client.segment} />
            <span className="text-sm text-gray-500">{age} years</span>
            {hasBirthday && <Cake size={18} className="text-rb-yellow" />}
            {client.gdpr_consent_status === 'active_consent' ? (
              <ShieldCheck size={16} className="text-green-500" />
            ) : (
              <ShieldAlert size={16} className="text-red-500" />
            )}
          </div>
          {client.linked_business_name && (
            <div className="mt-1 flex items-center gap-1">
              <Building2 size={14} className="text-gray-400" />
              <span className="text-xs text-gray-600 bg-gray-100 px-2 py-0.5 rounded">
                {client.linked_business_name}
              </span>
            </div>
          )}
        </div>
        <div className="text-xs text-gray-500 text-right">
          {lastBranchVisit && (
            <div>
              Last visit: {relativeDate(lastBranchVisit.timestamp)}
              {lastBranchVisit.branch_name && ` (${lastBranchVisit.branch_name})`}
            </div>
          )}
          {lastCall && <div>Last call: {relativeDate(lastCall.timestamp)}</div>}
        </div>
      </div>
    </div>
  );
}
