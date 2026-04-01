import { X } from 'lucide-react';
import { cn } from '../../utils/cn';
import { useTranslation } from '../../i18n';

interface SlideoutPanelProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function SlideoutPanel({ isOpen, onClose, title, children }: SlideoutPanelProps) {
  const { t } = useTranslation();
  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          'fixed inset-0 transition-opacity z-40',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        style={{ background: 'rgba(0,0,0,0.4)' }}
        onClick={onClose}
      />

      {/* Win2k Dialog Window */}
      <div
        className={cn(
          'fixed inset-y-4 right-4 w-[420px] max-w-[90vw] z-50 transition-transform duration-200 flex flex-col',
          isOpen ? 'translate-x-0' : 'translate-x-[calc(100%+16px)]'
        )}
        style={{
          background: '#d4d0c8',
          borderTop: '2px solid #ffffff',
          borderLeft: '2px solid #ffffff',
          borderRight: '2px solid #404040',
          borderBottom: '2px solid #404040',
          outline: '1px solid #000',
        }}
      >
        {/* Win2k Title Bar */}
        <div
          style={{
            background: 'linear-gradient(to right, #0a246a, #a6caf0)',
            color: '#ffffff',
            fontFamily: 'Tahoma, MS Sans Serif, sans-serif',
            fontWeight: 'bold',
            fontSize: 11,
            padding: '3px 6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            userSelect: 'none',
            flexShrink: 0,
          }}
        >
          <span>{title}</span>
          <button
            onClick={onClose}
            title={t.slideout.closePanel}
            style={{
              background: '#d4d0c8',
              borderTop: '2px solid #ffffff',
              borderLeft: '2px solid #ffffff',
              borderRight: '2px solid #808080',
              borderBottom: '2px solid #808080',
              outline: '1px solid #000',
              color: '#000',
              width: 18,
              height: 18,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              flexShrink: 0,
              padding: 0,
            }}
          >
            <X size={11} />
          </button>
        </div>

        {/* Content */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: 10,
            background: '#d4d0c8',
            fontFamily: 'Tahoma, MS Sans Serif, sans-serif',
            fontSize: 11,
          }}
        >
          {children}
        </div>
      </div>
    </>
  );
}
