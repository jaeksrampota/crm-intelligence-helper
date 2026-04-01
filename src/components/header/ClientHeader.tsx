import { Cake, ShieldCheck, ShieldAlert, Building2 } from 'lucide-react';
import type { Client, Interaction } from '../../types';
import { computeAge, isBirthdayWithinDays } from '../../utils/date-helpers';
import { SegmentBadge } from '../shared/SegmentBadge';
import { useTranslation } from '../../i18n';
import { RelativeDate } from '../shared/RelativeDate';

export function ClientHeader({ client, interactions, onInteractionClick }: { client: Client; interactions: Interaction[]; onInteractionClick?: (id: string) => void }) {
  const age = computeAge(client.date_of_birth);
  const hasBirthday = isBirthdayWithinDays(client.date_of_birth, 7);
  const { t } = useTranslation();

  const lastBranchVisit = interactions.find((i) => i.channel === 'branch');
  const lastCall = interactions.find((i) => i.channel === 'call_center');

  return (
    <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-2 py-1">
      <div>
        <div className="flex items-center gap-2 flex-wrap">
          <h1
            style={{
              fontFamily: 'Tahoma, MS Sans Serif, sans-serif',
              fontSize: 13,
              fontWeight: 'bold',
              color: '#000',
            }}
          >
            {client.name}
          </h1>
          <SegmentBadge segment={client.segment} />
          <span style={{ fontSize: 11, color: '#444' }}>{age} {t.header.years}</span>
          {hasBirthday && (
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 3,
                fontSize: 10,
                fontWeight: 600,
                color: '#a05000',
                background: '#fff8e0',
                padding: '1px 6px',
                border: '1px solid #ffa500',
              }}
            >
              <Cake size={12} />
              {t.header.birthday}
            </span>
          )}
          {client.gdpr_consent_status === 'active_consent' ? (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 2, fontSize: 10, color: '#006400' }}>
              <ShieldCheck size={12} />
              {t.header.gdprOk}
            </span>
          ) : (
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 2,
                fontSize: 10,
                fontWeight: 600,
                color: '#c00000',
                background: '#ffeeee',
                padding: '1px 5px',
                border: '1px solid #cc0000',
                cursor: 'help',
              }}
              title={client.gdpr_consent_status === 'expired' ? t.alerts.gdprExpired : t.alerts.gdprNoConsent}
            >
              <ShieldAlert size={12} />
              {t.header.gdprWarning}
            </span>
          )}
        </div>
        {client.linked_business_name && (
          <div className="mt-1 flex items-center gap-1.5">
            <Building2 size={12} style={{ color: '#808080' }} />
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                background: '#c8c4bc',
                padding: '1px 6px',
                borderTop: '1px solid #ffffff',
                borderLeft: '1px solid #ffffff',
                borderRight: '1px solid #808080',
                borderBottom: '1px solid #808080',
              }}
            >
              {client.linked_business_name}
            </span>
          </div>
        )}
      </div>

      <div
        style={{
          fontSize: 11,
          color: '#444',
          textAlign: 'right',
          lineHeight: 1.6,
          background: '#c8c4bc',
          padding: '3px 8px',
          borderTop: '1px solid #ffffff',
          borderLeft: '1px solid #ffffff',
          borderRight: '1px solid #808080',
          borderBottom: '1px solid #808080',
        }}
        className="shrink-0"
      >
        {lastBranchVisit && (
          <div
            style={{ cursor: onInteractionClick ? 'pointer' : 'default' }}
            onClick={onInteractionClick ? () => onInteractionClick(lastBranchVisit.interaction_id) : undefined}
          >
            <span style={{ color: '#808080' }}>{t.header.lastVisit}</span>{' '}
            <RelativeDate date={lastBranchVisit.timestamp} />
            {lastBranchVisit.branch_name && ` (${lastBranchVisit.branch_name})`}
          </div>
        )}
        {lastCall && (
          <div
            style={{ cursor: onInteractionClick ? 'pointer' : 'default' }}
            onClick={onInteractionClick ? () => onInteractionClick(lastCall.interaction_id) : undefined}
          >
            <span style={{ color: '#808080' }}>{t.header.lastCall}</span>{' '}
            <RelativeDate date={lastCall.timestamp} />
          </div>
        )}
      </div>
    </div>
  );
}
