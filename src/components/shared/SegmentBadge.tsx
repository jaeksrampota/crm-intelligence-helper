import { cn } from '../../utils/cn';
import type { Segment } from '../../types';
import { useTranslation } from '../../i18n';

const SEGMENT_STYLES: Record<Segment, string> = {
  standard: 'bg-segment-standard/20 text-segment-standard border-segment-standard/30',
  affluent: 'bg-segment-affluent/20 text-segment-affluent border-segment-affluent/30',
  premium: 'bg-segment-premium text-white border-segment-premium',
};

export function SegmentBadge({ segment }: { segment: Segment }) {
  const { t } = useTranslation();
  return (
    <span className={cn('px-2 py-0.5 rounded-full text-xs font-medium border', SEGMENT_STYLES[segment])}>
      {t.segments[segment]}
    </span>
  );
}
