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
      className="shrink-0 flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors text-xs font-semibold text-gray-600"
      title={t.comments.allComments}
    >
      <MessagesSquare size={14} />
      {openCount > 0 && (
        <span className="inline-flex items-center justify-center min-w-[16px] h-4 px-1 rounded-full text-[10px] font-bold bg-rb-yellow text-rb-black">
          {openCount}
        </span>
      )}
    </button>
  );
}
