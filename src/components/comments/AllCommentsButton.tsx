import { MessagesSquare } from 'lucide-react';
import { useTranslation } from '../../i18n';

interface AllCommentsButtonProps {
  openCount: number;
  onClick: () => void;
}

export function AllCommentsButton({ openCount, onClick }: AllCommentsButtonProps) {
  const { t } = useTranslation();

  return (
    <button
      onClick={onClick}
      className="win2k-btn"
      title={t.comments.allComments}
    >
      <MessagesSquare size={14} />
      {openCount > 0 && (
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: 16,
            height: 16,
            padding: '0 3px',
            background: '#0a246a',
            color: '#ffffff',
            fontSize: 9,
            fontWeight: 'bold',
            fontFamily: 'Tahoma, sans-serif',
          }}
        >
          {openCount}
        </span>
      )}
    </button>
  );
}
