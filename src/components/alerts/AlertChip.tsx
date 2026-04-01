import { X, Cake, AlertTriangle, CreditCard, TrendingDown, Shield, Calendar } from 'lucide-react';
import { cn } from '../../utils/cn';
import type { Alert } from '../../types';

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  birthday: Cake,
  expiring_card: CreditCard,
  balance_drop: TrendingDown,
  complaint: AlertTriangle,
  gdpr_warning: Shield,
  scheduled_meeting: Calendar,
};

const SEVERITY_STYLES: Record<string, string> = {
  critical: 'bg-red-50 border-red-400 text-red-800 shadow-sm shadow-red-100',
  warning: 'bg-amber-50 border-amber-400 text-amber-800 shadow-sm shadow-amber-100',
  info: 'bg-blue-50 border-blue-300 text-blue-800',
};

export function AlertChip({ alert, onDismiss }: { alert: Alert; onDismiss: () => void }) {
  const Icon = ICON_MAP[alert.type] || AlertTriangle;
  const isCritical = alert.severity === 'critical';
  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium transition-colors',
        SEVERITY_STYLES[alert.severity],
        isCritical && 'border-2',
      )}
    >
      <Icon size={14} className={cn(isCritical && 'animate-pulse')} />
      <span>{alert.message}</span>
      <button onClick={onDismiss} className="ml-1 hover:opacity-60 rounded-full p-0.5 hover:bg-black/5 transition-opacity">
        <X size={12} />
      </button>
    </div>
  );
}
