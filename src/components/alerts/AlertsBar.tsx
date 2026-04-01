import type { Alert } from '../../types';
import { AlertChip } from './AlertChip';

export function AlertsBar({ alerts, onDismiss, onNavigate }: { alerts: Alert[]; onDismiss: (id: string) => void; onNavigate?: (zone: string) => void }) {
  const visible = alerts.filter((a) => !a.dismissed);
  if (visible.length === 0) return null;

  return (
    <div
      style={{
        background: '#d4d0c8',
        borderTop: '2px solid #ffffff',
        borderLeft: '2px solid #ffffff',
        borderRight: '2px solid #404040',
        borderBottom: '2px solid #404040',
        outline: '1px solid #000',
        padding: '4px 8px',
        display: 'flex',
        flexWrap: 'wrap',
        gap: 6,
        alignItems: 'center',
      }}
    >
      <span
        style={{
          fontFamily: 'Tahoma, MS Sans Serif, sans-serif',
          fontSize: 11,
          fontWeight: 'bold',
          color: '#000',
          marginRight: 4,
          paddingRight: 8,
          borderRight: '1px solid #808080',
        }}
      >
        Alerts:
      </span>
      {visible.map((alert) => (
        <AlertChip
          key={alert.id}
          alert={alert}
          onDismiss={() => onDismiss(alert.id)}
          onNavigate={onNavigate ? () => onNavigate(alert.related_zone) : undefined}
        />
      ))}
    </div>
  );
}
