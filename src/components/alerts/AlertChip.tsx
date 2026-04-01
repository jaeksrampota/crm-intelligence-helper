import { X, Cake, AlertTriangle, CreditCard, TrendingDown, Shield, Calendar } from 'lucide-react';
import { cn } from '../../utils/cn';
import type { Alert } from '../../types';

const ICON_MAP: Record<string, React.ComponentType<{ size?: number }>> = {
  birthday: Cake,
  expiring_card: CreditCard,
  balance_drop: TrendingDown,
  complaint: AlertTriangle,
  gdpr_warning: Shield,
  scheduled_meeting: Calendar,
};

const SEVERITY_STYLES: Record<string, string> = {
  critical: 'bg-red-100 border-red-300 text-red-800',
  warning: 'bg-amber-100 border-amber-300 text-amber-800',
  info: 'bg-blue-100 border-blue-300 text-blue-800',
};

export function AlertChip({ alert, onDismiss }: { alert: Alert; onDismiss: () => void }) {
  const Icon = ICON_MAP[alert.type] || AlertTriangle;
  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium',
        SEVERITY_STYLES[alert.severity],
      )}
    >
      <Icon size={14} />
      <span>{alert.message}</span>
      <button onClick={onDismiss} className="ml-0.5 hover:opacity-70">
        <X size={12} />
      </button>
    </div>
  );
}
