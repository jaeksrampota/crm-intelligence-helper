import { X, Plus } from 'lucide-react';
import type { ZoneId } from '../../types/comment';
import { useCommentEditing } from '../../hooks/use-comment-editing';
import { useTranslation } from '../../i18n';
import { zoneLabel } from '../../utils/comment-labels';
import { CommentCard } from './CommentCard';
import { CommentForm } from './CommentForm';

interface CommentPanelProps {
  zoneId: ZoneId;
  isOpen: boolean;
  onClose: () => void;
}

export function CommentPanel({ zoneId, isOpen, onClose }: CommentPanelProps) {
  const { t } = useTranslation();
  const tc = t.comments;
  const {
    getCommentsByZone, addComment,
    resolveComment, rejectComment, reopenComment, deleteComment,
    showForm, editingComment, startAdd, cancelAdd, startEdit, cancelEdit, saveEdit,
  } = useCommentEditing();

  if (!isOpen) return null;

  const zoneComments = getCommentsByZone(zoneId)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  const handleAdd = (data: Parameters<typeof addComment>[0] extends infer D ? Omit<D & object, 'zoneId'> : never) => {
    addComment({ ...data, zoneId });
    cancelAdd();
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
            <h2 className="text-sm font-bold text-gray-800">{tc.title}</h2>
            <span className="text-xs text-gray-500">&mdash; {zoneLabel(tc, zoneId)}</span>
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
          {!showForm && !editingComment && (
            <button
              onClick={startAdd}
              className="w-full flex items-center justify-center gap-1.5 py-2 border border-dashed border-gray-300 rounded-lg text-xs font-medium text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors"
            >
              <Plus size={14} />
              {tc.addComment}
            </button>
          )}

          {showForm && (
            <CommentForm onSave={handleAdd} onCancel={cancelAdd} />
          )}

          {zoneComments.length === 0 && !showForm ? (
            <p className="text-xs text-gray-400 text-center py-6">{tc.noComments}</p>
          ) : (
            zoneComments.map((comment) =>
              editingComment?.id === comment.id ? (
                <CommentForm key={comment.id} initialData={comment} onSave={saveEdit} onCancel={cancelEdit} />
              ) : (
                <CommentCard
                  key={comment.id}
                  comment={comment}
                  onEdit={startEdit}
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
