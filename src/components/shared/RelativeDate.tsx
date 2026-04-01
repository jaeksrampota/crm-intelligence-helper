import { relativeDate } from '../../utils/date-helpers';

export function RelativeDate({ date, className }: { date: string; className?: string }) {
  return <span className={className}>{relativeDate(date)}</span>;
}
