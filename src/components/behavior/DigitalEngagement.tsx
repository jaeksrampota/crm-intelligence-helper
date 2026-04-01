import { cn } from '../../utils/cn';
import type { EngagementLevel } from '../../types';

const LEVEL_CONFIG: Record<EngagementLevel, { colors: [string, string, string]; label: string }> = {
  low: { colors: ['bg-red-400', 'bg-gray-200', 'bg-gray-200'], label: 'Low' },
  medium: { colors: ['bg-amber-400', 'bg-amber-400', 'bg-gray-200'], label: 'Medium' },
  high: { colors: ['bg-green-400', 'bg-green-400', 'bg-green-400'], label: 'High' },
};

export function DigitalEngagement({ level, loginCount }: { level: EngagementLevel; loginCount: number }) {
  const config = LEVEL_CONFIG[level];
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-2.5">
      <div className="text-[10px] text-gray-500 font-medium mb-1.5">Digital Engagement</div>
      <div className="flex flex-col items-center gap-1">
        <div className="flex gap-1">
          {config.colors.map((color, i) => (
            <div key={i} className={cn('w-5 h-2 rounded-sm', color)} />
          ))}
        </div>
        <div className="text-xs font-semibold">{config.label}</div>
        <div className="text-[10px] text-gray-400">{loginCount} logins/30d</div>
      </div>
    </div>
  );
}
