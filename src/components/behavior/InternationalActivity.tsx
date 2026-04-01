import { Globe } from 'lucide-react';
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

export function InternationalActivity({ active, count, onClick }: { active: boolean; count: number; onClick?: () => void }) {
  const { t } = useTranslation();
  return (
    <div onClick={onClick} style={{ ...WIN_TILE, cursor: onClick ? 'pointer' : 'default' }}>
      <div style={{ fontSize: 10, fontWeight: 'bold', marginBottom: 6, color: '#000' }}>{t.behavior.intlActivity}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center' }}>
        <Globe size={22} style={{ color: active ? '#0a246a' : '#c0c0c0' }} />
        <div>
          <div style={{ fontSize: 11, fontWeight: 'bold', color: active ? '#000' : '#808080' }}>
            {active ? t.behavior.tx(count) : t.behavior.none}
          </div>
          <div style={{ fontSize: 10, color: '#808080' }}>{t.behavior.ninetyDays}</div>
        </div>
      </div>
    </div>
  );
}
