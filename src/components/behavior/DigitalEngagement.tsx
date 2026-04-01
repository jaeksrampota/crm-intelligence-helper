import type { EngagementLevel } from '../../types';
import { useTranslation } from '../../i18n';

const WIN_TILE: React.CSSProperties = {
  background: '#d4d0c8',
  borderTop: '2px solid #ffffff',
  borderLeft: '2px solid #ffffff',
  borderRight: '2px solid #808080',
  borderBottom: '2px solid #808080',
  outline: '1px solid #404040',
  padding: '5px 7px',
  fontFamily: 'Tahoma, MS Sans Serif, sans-serif',
  fontSize: 11,
};

const LEVEL_COLORS: Record<EngagementLevel, [string, string, string]> = {
  low: ['#cc0000', '#d4d0c8', '#d4d0c8'],
  medium: ['#cc7700', '#cc7700', '#d4d0c8'],
  high: ['#006400', '#006400', '#006400'],
};

export function DigitalEngagement({ level, loginCount, onClick }: { level: EngagementLevel; loginCount: number; onClick?: () => void }) {
  const colors = LEVEL_COLORS[level];
  const { t } = useTranslation();
  const labelMap: Record<EngagementLevel, string> = {
    low: t.behavior.low,
    medium: t.behavior.medium,
    high: t.behavior.high,
  };

  return (
    <div onClick={onClick} style={{ ...WIN_TILE, cursor: onClick ? 'pointer' : 'default' }}>
      <div style={{ fontSize: 10, fontWeight: 'bold', marginBottom: 6, color: '#000' }}>{t.behavior.digitalEngagement}</div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
        <div style={{ display: 'flex', gap: 3 }}>
          {colors.map((color, i) => (
            <div
              key={i}
              style={{
                width: 18,
                height: 10,
                background: color,
                borderTop: '1px solid #ffffff',
                borderLeft: '1px solid #ffffff',
                borderRight: '1px solid #808080',
                borderBottom: '1px solid #808080',
              }}
            />
          ))}
        </div>
        <div style={{ fontSize: 11, fontWeight: 'bold' }}>{labelMap[level]}</div>
        <div style={{ fontSize: 10, color: '#808080' }}>{t.behavior.logins30d(loginCount)}</div>
      </div>
    </div>
  );
}
