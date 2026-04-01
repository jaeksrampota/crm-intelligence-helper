import { useState } from 'react';
import { X, Plus } from 'lucide-react';
import type { ZoneId, Comment } from '../../types/comment';
import { useComments } from '../../hooks/use-comments';
import { useTranslation } from '../../i18n';
import { CommentCard } from './CommentCard';
import { CommentForm } from './CommentForm';

const ZONE_LABEL_KEYS: Record<ZoneId, string> = {
  products: 'zoneProducts',
  activity: 'zoneActivity',
  behavior: 'zoneBehavior',
  sales: 'zoneSales',
  header: 'zoneHeader',
  alerts: 'zoneAlerts',
  general: 'zoneGeneral',
};

interface CommentPanelProps {
  zoneId: ZoneId;
  isOpen: boolean;
  onClose: () => void;
}

export function CommentPanel({ zoneId, isOpen, onClose }: CommentPanelProps) {
  const { t } = useTranslation();
  const { getCommentsByZone, addComment, updateComment, resolveComment, rejectComment, reopenComment, deleteComment } = useComments();
  const [showForm, setShowForm] = useState(false);
  const [editingComment, setEditingComment] = useState<Comment | null>(null);

  if (!isOpen) return null;

  const zoneComments = getCommentsByZone(zoneId)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  const zoneName = t.comments[ZONE_LABEL_KEYS[zoneId] as keyof typeof t.comments] as string;

  const handleAdd = (data: { text: string; author: string; category: Comment['category']; priority?: Comment['priority']; targetAudience?: Comment['targetAudience'] }) => {
    addComment({ ...data, zoneId });
    setShowForm(false);
  };

  const handleEdit = (comment: Comment) => {
    setEditingComment(comment);
    setShowForm(false);
  };

  const handleSaveEdit = (data: { text: string; author: string; category: Comment['category']; priority?: Comment['priority']; targetAudience?: Comment['targetAudience'] }) => {
    if (editingComment) {
      updateComment(editingComment.id, {
        text: data.text,
        category: data.category,
        priority: data.priority,
        targetAudience: data.targetAudience,
      });
      setEditingComment(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/30" />
      <div
        className="relative bg-white rounded-xl shadow-xl border border-gray-200 w-full max-w-lg max-h-[80vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold text-gray-800">{t.comments.title}</h2>
            <span className="text-xs text-gray-500">&mdash; {zoneName}</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-500 font-medium">
              {zoneComments.length}
            </span>
          </div>
          <button onClick={onClose} className="p-1 rounded hover:bg-gray-100 text-gray-400">
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {/* Add button */}
          {!showForm && !editingComment && (
            <button
              onClick={() => setShowForm(true)}
              className="w-full flex items-center justify-center gap-1.5 py-2 border border-dashed border-gray-300 rounded-lg text-xs font-medium text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors"
            >
              <Plus size={14} />
              {t.comments.addComment}
            </button>
          )}

          {/* Add form */}
          {showForm && (
            <CommentForm
              onSave={handleAdd}
              onCancel={() => setShowForm(false)}
            />
          )}

          {/* Comments list */}
          {zoneComments.length === 0 && !showForm ? (
            <p className="text-xs text-gray-400 text-center py-6">{t.comments.noComments}</p>
          ) : (
            zoneComments.map((comment) =>
              editingComment?.id === comment.id ? (
                <CommentForm
                  key={comment.id}
                  initialData={comment}
                  onSave={handleSaveEdit}
                  onCancel={() => setEditingComment(null)}
                />
              ) : (
                <CommentCard
                  key={comment.id}
                  comment={comment}
                  onEdit={handleEdit}
                  onResolve={resolveComment}
                  onReject={rejectComment}
                  onReopen={reopenComment}
                  onDelete={deleteComment}
                />
              )
            )
          )}
        </div>
      </div>
    </div>
  );
}
