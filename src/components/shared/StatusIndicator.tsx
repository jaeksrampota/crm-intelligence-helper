import { cn } from '../../utils/cn';
import type { ProductStatus } from '../../types';
import { useTranslation } from '../../i18n';

const DOT_STYLES: Record<ProductStatus, string> = {
  active: 'bg-green-500',
  closed: 'bg-gray-400',
  suspended: 'bg-red-500',
};

const TEXT_STYLES: Record<ProductStatus, string> = {
  active: 'text-green-700',
  closed: 'text-gray-500',
  suspended: 'text-red-700',
};

export function StatusIndicator({ status }: { status: ProductStatus }) {
  const { t } = useTranslation();
  return (
    <span className="inline-flex items-center gap-1">
      <span className={cn('w-1.5 h-1.5 rounded-full', DOT_STYLES[status])} />
      <span className={cn('text-xs font-medium', TEXT_STYLES[status])}>{t.status[status]}</span>
    </span>
  );
}
