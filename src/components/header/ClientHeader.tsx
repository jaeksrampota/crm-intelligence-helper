import { Cake, ShieldCheck, ShieldAlert, Building2 } from 'lucide-react';
import type { Client, Interaction } from '../../types';
import { computeAge, isBirthdayWithinDays } from '../../utils/date-helpers';
import { SegmentBadge } from '../shared/SegmentBadge';
import { useTranslation } from '../../i18n';
import { RelativeDate } from '../shared/RelativeDate';

export function ClientHeader({ client, interactions }: { client: Client; interactions: Interaction[] }) {
  const age = computeAge(client.date_of_birth);
  const hasBirthday = isBirthdayWithinDays(client.date_of_birth, 7);
  const { t } = useTranslation();

  const lastBranchVisit = interactions.find((i) => i.channel === 'branch');
  const lastCall = interactions.find((i) => i.channel === 'call_center');

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 px-5 py-3">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl font-bold text-gray-900">{client.name}</h1>
            <SegmentBadge segment={client.segment} />
            <span className="text-sm text-gray-500">{age} {t.header.years}</span>
            {hasBirthday && (
              <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                <Cake size={14} />
                {t.header.birthday}
              </span>
            )}
            {client.gdpr_consent_status === 'active_consent' ? (
              <span className="inline-flex items-center gap-1 text-[10px] font-medium text-green-600">
                <ShieldCheck size={14} />
                {t.header.gdprOk}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[10px] font-medium text-red-600 bg-red-50 px-1.5 py-0.5 rounded border border-red-200">
                <ShieldAlert size={14} />
                {t.header.gdprWarning}
              </span>
            )}
          </div>
          {client.linked_business_name && (
            <div className="mt-1.5 flex items-center gap-1.5">
              <Building2 size={14} className="text-gray-400" />
              <span className="text-xs text-gray-700 font-medium bg-gray-100 px-2.5 py-0.5 rounded-md border border-gray-200">
                {client.linked_business_name}
              </span>
            </div>
          )}
        </div>
        <div className="text-xs text-gray-500 text-right space-y-0.5 shrink-0 ml-4">
          {lastBranchVisit && (
            <div>
              <span className="text-gray-400">{t.header.lastVisit}</span>{' '}
              <RelativeDate date={lastBranchVisit.timestamp} />
              {lastBranchVisit.branch_name && ` (${lastBranchVisit.branch_name})`}
            </div>
          )}
          {lastCall && (
            <div>
              <span className="text-gray-400">{t.header.lastCall}</span>{' '}
              <RelativeDate date={lastCall.timestamp} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
