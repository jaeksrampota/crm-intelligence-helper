import { cn } from '../../utils/cn';
import type { ProductStatus } from '../../types';

const STYLES: Record<ProductStatus, { dot: string; text: string; label: string }> = {
  active: { dot: 'bg-green-500', text: 'text-green-700', label: 'Active' },
  closed: { dot: 'bg-gray-400', text: 'text-gray-500', label: 'Closed' },
  suspended: { dot: 'bg-red-500', text: 'text-red-700', label: 'Suspended' },
};

export function StatusIndicator({ status }: { status: ProductStatus }) {
  const style = STYLES[status];
  return (
    <span className="inline-flex items-center gap-1">
      <span className={cn('w-1.5 h-1.5 rounded-full', style.dot)} />
      <span className={cn('text-xs font-medium', style.text)}>{style.label}</span>
    </span>
  );
}
