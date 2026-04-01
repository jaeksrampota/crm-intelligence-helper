import type { Alert } from '../../types';
import { AlertChip } from './AlertChip';

export function AlertsBar({ alerts, onDismiss }: { alerts: Alert[]; onDismiss: (id: string) => void }) {
  const visible = alerts.filter((a) => !a.dismissed);
  if (visible.length === 0) return null;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 px-4 py-2 flex flex-wrap gap-2 items-center">
      {visible.map((alert) => (
        <AlertChip key={alert.id} alert={alert} onDismiss={() => onDismiss(alert.id)} />
      ))}
    </div>
  );
}
