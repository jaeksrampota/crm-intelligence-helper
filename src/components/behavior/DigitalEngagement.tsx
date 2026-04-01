import { cn } from '../../utils/cn';
import type { EngagementLevel } from '../../types';
import { useTranslation } from '../../i18n';

const LEVEL_COLORS: Record<EngagementLevel, [string, string, string]> = {
  low: ['bg-red-400', 'bg-gray-200', 'bg-gray-200'],
  medium: ['bg-amber-400', 'bg-amber-400', 'bg-gray-200'],
  high: ['bg-green-400', 'bg-green-400', 'bg-green-400'],
};

export function DigitalEngagement({ level, loginCount }: { level: EngagementLevel; loginCount: number }) {
  const colors = LEVEL_COLORS[level];
  const { t } = useTranslation();
  const labelMap: Record<EngagementLevel, string> = {
    low: t.behavior.low,
    medium: t.behavior.medium,
    high: t.behavior.high,
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-2.5">
      <div className="text-[10px] text-gray-500 font-medium mb-1.5">{t.behavior.digitalEngagement}</div>
      <div className="flex flex-col items-center gap-1">
        <div className="flex gap-1">
          {colors.map((color, i) => (
            <div key={i} className={cn('w-6 h-2.5 rounded-sm', color)} />
          ))}
        </div>
        <div className="text-xs font-semibold">{labelMap[level]}</div>
        <div className="text-[10px] text-gray-400">{t.behavior.logins30d(loginCount)}</div>
      </div>
    </div>
  );
}
