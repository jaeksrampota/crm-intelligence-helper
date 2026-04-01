import { useRef, useEffect, useState } from 'react';
import { X } from 'lucide-react';
import type { ZoneId } from '../../types/comment';
import { useCommentEditing } from '../../hooks/use-comment-editing';
import { useTranslation } from '../../i18n';
import { zoneLabel } from '../../utils/comment-labels';
import { CommentCard } from './CommentCard';
import { CommentForm } from './CommentForm';

interface CommentPopoverProps {
  zoneId: ZoneId;
  elementId?: string;
  elementLabel?: string;
  isOpen: boolean;
  onClose: () => void;
}

export function CommentPopover({ zoneId, elementId, elementLabel, isOpen, onClose }: CommentPopoverProps) {
  const { t } = useTranslation();
  const tc = t.comments;
  const popoverRef = useRef<HTMLDivElement>(null);
  const [flipped, setFlipped] = useState<{ x: boolean; y: boolean }>({ x: false, y: false });
  const {
    getCommentsByZone, getCommentsByElement, addComment,
    resolveComment, rejectComment, reopenComment, deleteComment,
    showForm, editingComment, startAdd, cancelAdd, startEdit, cancelEdit, saveEdit,
  } = useCommentEditing();

  // Click-outside handler
  useEffect(() => {
    if (!isOpen) return;
    function handleClickOutside(e: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  // Viewport edge-flip
  useEffect(() => {
    if (!isOpen || !popoverRef.current) return;
    const rect = popoverRef.current.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    setFlipped({
      x: rect.right > vw - 8,
      y: rect.bottom > vh - 8,
    });
  }, [isOpen]);

  if (!isOpen) return null;

  const comments = elementId
    ? getCommentsByElement(zoneId, elementId)
    : getCommentsByZone(zoneId);

  const sorted = [...comments].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  const handleAdd = (data: Parameters<typeof addComment>[0] extends infer D ? Omit<D & object, 'zoneId' | 'elementId' | 'elementLabel'> : never) => {
    addComment({ ...data, zoneId, elementId, elementLabel });
    cancelAdd();
  };

  const displayLabel = elementLabel || zoneLabel(tc, zoneId);

  return (
    <div
      ref={popoverRef}
      className={`absolute z-30 w-80 max-h-[400px] flex flex-col bg-white rounded-lg shadow-xl border border-gray-200 ${
        flipped.y ? 'bottom-full mb-1' : 'top-full mt-1'
      } ${flipped.x ? 'right-0' : 'right-0'}`}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="text-xs font-semibold text-gray-800 truncate">{displayLabel}</span>
          {elementId && (
            <span className="text-[10px] text-gray-400 shrink-0">{zoneLabel(tc, zoneId)}</span>
          )}
          {sorted.length > 0 && (
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-500 font-medium shrink-0">
              {sorted.length}
            </span>
          )}
        </div>
        <button onClick={onClose} className="p-0.5 rounded hover:bg-gray-100 text-gray-400 shrink-0">
          <X size={14} />
        </button>
      </div>

      {/* Comments thread */}
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {sorted.length === 0 && !showForm && (
          <p className="text-[11px] text-gray-400 text-center py-3">{tc.noComments}</p>
        )}
        {sorted.map((comment) =>
          editingComment?.id === comment.id ? (
            <CommentForm key={comment.id} initialData={comment} onSave={saveEdit} onCancel={cancelEdit} compact />
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
        )}
      </div>

      {/* Quick add */}
      <div className="border-t border-gray-100 p-2">
        {showForm ? (
          <CommentForm onSave={handleAdd} onCancel={cancelAdd} compact />
        ) : (
          <button
            onClick={startAdd}
            className="w-full py-1.5 text-xs font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded transition-colors"
          >
            + {tc.addComment}
          </button>
        )}
      </div>
    </div>
  );
}
