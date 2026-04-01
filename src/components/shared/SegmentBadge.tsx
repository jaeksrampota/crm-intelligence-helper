import { cn } from '../../utils/cn';
import type { Segment } from '../../types';

const SEGMENT_STYLES: Record<Segment, string> = {
  standard: 'bg-segment-standard/20 text-segment-standard border-segment-standard/30',
  affluent: 'bg-segment-affluent/20 text-segment-affluent border-segment-affluent/30',
  premium: 'bg-segment-premium text-white border-segment-premium',
};

const SEGMENT_LABELS: Record<Segment, string> = {
  standard: 'Standard',
  affluent: 'Affluent',
  premium: 'Premium',
};

export function SegmentBadge({ segment }: { segment: Segment }) {
  return (
    <span className={cn('px-2 py-0.5 rounded-full text-xs font-medium border', SEGMENT_STYLES[segment])}>
      {SEGMENT_LABELS[segment]}
    </span>
  );
}
