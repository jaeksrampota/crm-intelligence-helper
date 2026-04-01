import type { Segment } from '../../types';
import { useTranslation } from '../../i18n';

const SEGMENT_STYLE: Record<Segment, React.CSSProperties> = {
  standard: {
    background: '#e0f4e0',
    color: '#006400',
    border: '1px solid #4caf50',
    fontWeight: 'bold',
    fontSize: 9,
    padding: '0 5px',
  },
  affluent: {
    background: '#fff8e0',
    color: '#7a5500',
    border: '1px solid #ffb300',
    fontWeight: 'bold',
    fontSize: 9,
    padding: '0 5px',
  },
  premium: {
    background: '#212121',
    color: '#ffffff',
    border: '1px solid #000000',
    fontWeight: 'bold',
    fontSize: 9,
    padding: '0 5px',
  },
};

export function SegmentBadge({ segment }: { segment: Segment }) {
  const { t } = useTranslation();
  return (
    <span
      style={{
        display: 'inline-block',
        fontFamily: 'Tahoma, MS Sans Serif, sans-serif',
        textTransform: 'uppercase' as const,
        letterSpacing: '0.5px',
        ...SEGMENT_STYLE[segment],
      }}
    >
      {t.segments[segment]}
    </span>
  );
}
