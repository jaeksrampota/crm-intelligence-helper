import { Check, XCircle, RotateCcw, Pencil, Trash2 } from 'lucide-react';
import type { Comment } from '../../types/comment';
import { useTranslation } from '../../i18n';
import { cn } from '../../utils/cn';
import { formatTimeAgo } from '../../utils/date-helpers';
import { categoryLabel, statusLabel, priorityLabel, audienceLabel, CATEGORY_KEYS } from '../../utils/comment-labels';

const STATUS_STYLES: Record<Comment['status'], string> = {
  open: 'bg-blue-100 text-blue-700',
  resolved: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-700',
};

const PRIORITY_STYLES: Record<string, string> = {
  low: 'bg-blue-50 text-blue-600',
  medium: 'bg-orange-50 text-orange-600',
  high: 'bg-red-50 text-red-600',
};

interface CommentCardProps {
  comment: Comment;
  onEdit: (comment: Comment) => void;
  onResolve: (id: string) => void;
  onReject: (id: string) => void;
  onReopen: (id: string) => void;
  onDelete: (id: string) => void;
}

export function CommentCard({ comment, onEdit, onResolve, onReject, onReopen, onDelete }: CommentCardProps) {
  const { t } = useTranslation();
  const tc = t.comments;
  const isOpen = comment.status === 'open';

  return (
    <div className={cn(
      'border rounded-lg p-3 text-sm',
      isOpen ? 'border-gray-200 bg-white' : 'border-gray-100 bg-gray-50 opacity-75',
    )}>
      {/* Header row */}
      <div className="flex items-center gap-2 mb-2 flex-wrap">
        <span className={cn('px-1.5 py-0.5 rounded text-[10px] font-semibold', STATUS_STYLES[comment.status])}>
          {statusLabel(tc, comment.status)}
        </span>
        <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-gray-100 text-gray-600">
          {categoryLabel(tc, comment.category)}
        </span>
        {comment.priority && (
          <span className={cn('px-1.5 py-0.5 rounded text-[10px] font-medium', PRIORITY_STYLES[comment.priority])}>
            {priorityLabel(tc, comment.priority)}
          </span>
        )}
        {comment.targetAudience && (
          <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-purple-50 text-purple-600">
            {tc.targetAudience}: {audienceLabel(tc, comment.targetAudience)}
          </span>
        )}
      </div>

      {/* Comment text */}
      <p className={cn('text-gray-700 mb-2', !isOpen && 'line-through')}>{comment.text}</p>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <span className="text-[11px] text-gray-400">
          {comment.author} &middot; {formatTimeAgo(comment.timestamp)}
        </span>
        <div className="flex items-center gap-1">
          {isOpen && (
            <>
              <button onClick={() => onEdit(comment)} className="p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-600" title={tc.editComment}>
                <Pencil size={13} />
              </button>
              <button onClick={() => onResolve(comment.id)} className="p-1 rounded hover:bg-green-50 text-gray-400 hover:text-green-600" title={tc.resolve}>
                <Check size={13} />
              </button>
              <button onClick={() => onReject(comment.id)} className="p-1 rounded hover:bg-red-50 text-gray-400 hover:text-red-600" title={tc.reject}>
                <XCircle size={13} />
              </button>
            </>
          )}
          {!isOpen && (
            <button onClick={() => onReopen(comment.id)} className="p-1 rounded hover:bg-blue-50 text-gray-400 hover:text-blue-600" title={tc.reopen}>
              <RotateCcw size={13} />
            </button>
          )}
          <button onClick={() => onDelete(comment.id)} className="p-1 rounded hover:bg-red-50 text-gray-400 hover:text-red-500" title={tc.delete}>
            <Trash2 size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}

export { CATEGORY_KEYS };
