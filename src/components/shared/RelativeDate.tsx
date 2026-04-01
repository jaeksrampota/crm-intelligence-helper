import { relativeDate } from '../../utils/date-helpers';
import { useTranslation } from '../../i18n';

export function RelativeDate({ date, className }: { date: string; className?: string }) {
  const { t } = useTranslation();
  return <span className={className}>{relativeDate(date, t.dates)}</span>;
}
