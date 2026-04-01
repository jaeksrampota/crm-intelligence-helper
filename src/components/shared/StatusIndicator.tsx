import type { ProductStatus } from '../../types';
import { useTranslation } from '../../i18n';

const DOT_COLOR: Record<ProductStatus, string> = {
  active: '#006400',
  closed: '#808080',
  suspended: '#cc0000',
};

const TEXT_COLOR: Record<ProductStatus, string> = {
  active: '#006400',
  closed: '#808080',
  suspended: '#cc0000',
};

export function StatusIndicator({ status }: { status: ProductStatus }) {
  const { t } = useTranslation();
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3 }}>
      <span
        style={{
          width: 7,
          height: 7,
          borderRadius: '50%',
          background: DOT_COLOR[status],
          border: '1px solid rgba(0,0,0,0.3)',
          display: 'inline-block',
        }}
      />
      <span style={{ fontSize: 10, fontWeight: 'bold', color: TEXT_COLOR[status], fontFamily: 'Tahoma, sans-serif' }}>
        {t.status[status]}
      </span>
    </span>
  );
}
