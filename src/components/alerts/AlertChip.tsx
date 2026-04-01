import { X, Cake, AlertTriangle, CreditCard, TrendingDown, Shield, Calendar } from 'lucide-react';
import type { Alert } from '../../types';

const ICON_MAP: Record<string, React.ComponentType<{ size?: number }>> = {
  birthday: Cake,
  expiring_card: CreditCard,
  balance_drop: TrendingDown,
  complaint: AlertTriangle,
  gdpr_warning: Shield,
  scheduled_meeting: Calendar,
};

const SEVERITY_STYLES: Record<string, React.CSSProperties> = {
  critical: {
    background: '#fff0f0',
    borderTop: '2px solid #ffffff',
    borderLeft: '2px solid #ffffff',
    borderRight: '2px solid #cc0000',
    borderBottom: '2px solid #cc0000',
    outline: '1px solid #cc0000',
    color: '#8b0000',
  },
  warning: {
    background: '#fffbec',
    borderTop: '2px solid #ffffff',
    borderLeft: '2px solid #ffffff',
    borderRight: '2px solid #b08000',
    borderBottom: '2px solid #b08000',
    outline: '1px solid #b08000',
    color: '#7a5500',
  },
  info: {
    background: '#eef4ff',
    borderTop: '2px solid #ffffff',
    borderLeft: '2px solid #ffffff',
    borderRight: '2px solid #4040a0',
    borderBottom: '2px solid #4040a0',
    outline: '1px solid #4040a0',
    color: '#00008b',
  },
};

export function AlertChip({ alert, onDismiss, onNavigate }: { alert: Alert; onDismiss: () => void; onNavigate?: () => void }) {
  const Icon = ICON_MAP[alert.type] || AlertTriangle;
  return (
    <div
      onClick={onNavigate}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        padding: '2px 6px',
        fontFamily: 'Tahoma, MS Sans Serif, sans-serif',
        fontSize: 11,
        fontWeight: 600,
        cursor: onNavigate ? 'pointer' : 'default',
        ...SEVERITY_STYLES[alert.severity],
      }}
    >
      <Icon size={13} />
      <span>{alert.message}</span>
      <button
        onClick={(e) => { e.stopPropagation(); onDismiss(); }}
        style={{
          marginLeft: 2,
          background: '#d4d0c8',
          borderTop: '1px solid #ffffff',
          borderLeft: '1px solid #ffffff',
          borderRight: '1px solid #808080',
          borderBottom: '1px solid #808080',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          padding: '1px',
          lineHeight: 1,
        }}
        title="Dismiss"
      >
        <X size={10} />
      </button>
    </div>
  );
}
