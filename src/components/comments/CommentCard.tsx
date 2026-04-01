import { Check, XCircle, RotateCcw, Pencil, Trash2 } from 'lucide-react';
import type { Comment } from '../../types/comment';
import { useTranslation } from '../../i18n';
import { cn } from '../../utils/cn';

const CATEGORY_LABELS: Record<Comment['category'], keyof ReturnType<typeof useTranslation>['t']['comments']> = {
  business: 'catBusiness',
  customer_wording: 'catCustomerWording',
  data_limitation: 'catDataLimitation',
  it_feasibility: 'catItFeasibility',
  compliance_legal: 'catComplianceLegal',
  ux_ui: 'catUxUi',
  product_idea: 'catProductIdea',
};

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
  const isOpen = comment.status === 'open';
  const statusKey = `status${comment.status.charAt(0).toUpperCase() + comment.status.slice(1)}` as keyof typeof t.comments;

  const timeAgo = formatTimeAgo(comment.timestamp);

  return (
    <div className={cn(
      'border rounded-lg p-3 text-sm',
      isOpen ? 'border-gray-200 bg-white' : 'border-gray-100 bg-gray-50 opacity-75',
    )}>
      {/* Header row */}
      <div className="flex items-center gap-2 mb-2 flex-wrap">
        <span className={cn('px-1.5 py-0.5 rounded text-[10px] font-semibold', STATUS_STYLES[comment.status])}>
          {t.comments[statusKey] as string}
        </span>
        <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-gray-100 text-gray-600">
          {t.comments[CATEGORY_LABELS[comment.category]] as string}
        </span>
        {comment.priority && (
          <span className={cn('px-1.5 py-0.5 rounded text-[10px] font-medium', PRIORITY_STYLES[comment.priority])}>
            {t.comments[`priority${comment.priority.charAt(0).toUpperCase() + comment.priority.slice(1)}` as keyof typeof t.comments] as string}
          </span>
        )}
        {comment.targetAudience && (
          <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-purple-50 text-purple-600">
            {t.comments.targetAudience}: {t.comments[`audience${comment.targetAudience.charAt(0).toUpperCase() + comment.targetAudience.slice(1)}` as keyof typeof t.comments] as string}
          </span>
        )}
      </div>

      {/* Comment text */}
      <p className={cn('text-gray-700 mb-2', !isOpen && 'line-through')}>{comment.text}</p>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <span className="text-[11px] text-gray-400">
          {comment.author} &middot; {timeAgo}
        </span>
        <div className="flex items-center gap-1">
          {isOpen && (
            <>
              <button onClick={() => onEdit(comment)} className="p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-600" title={t.comments.editComment}>
                <Pencil size={13} />
              </button>
              <button onClick={() => onResolve(comment.id)} className="p-1 rounded hover:bg-green-50 text-gray-400 hover:text-green-600" title={t.comments.resolve}>
                <Check size={13} />
              </button>
              <button onClick={() => onReject(comment.id)} className="p-1 rounded hover:bg-red-50 text-gray-400 hover:text-red-600" title={t.comments.reject}>
                <XCircle size={13} />
              </button>
            </>
          )}
          {!isOpen && (
            <button onClick={() => onReopen(comment.id)} className="p-1 rounded hover:bg-blue-50 text-gray-400 hover:text-blue-600" title={t.comments.reopen}>
              <RotateCcw size={13} />
            </button>
          )}
          <button onClick={() => onDelete(comment.id)} className="p-1 rounded hover:bg-red-50 text-gray-400 hover:text-red-500" title={t.comments.delete}>
            <Trash2 size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}

function formatTimeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}
