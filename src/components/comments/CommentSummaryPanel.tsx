import { useState, useCallback } from 'react';
import { X, ExternalLink } from 'lucide-react';
import type { CommentCategory, CommentStatus, ZoneId } from '../../types/comment';
import { useCommentEditing } from '../../hooks/use-comment-editing';
import { useTranslation } from '../../i18n';
import { categoryLabel, statusLabel, zoneLabel } from '../../utils/comment-labels';
import { cn } from '../../utils/cn';
import { CommentCard } from './CommentCard';
import { CommentForm } from './CommentForm';

const ZONES: ZoneId[] = ['header', 'alerts', 'products', 'activity', 'behavior', 'sales', 'general'];
const STATUSES: CommentStatus[] = ['open', 'resolved', 'rejected'];
const CATEGORIES: CommentCategory[] = ['business', 'customer_wording', 'data_limitation', 'it_feasibility', 'compliance_legal', 'ux_ui', 'product_idea'];

interface CommentSummaryPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CommentSummaryPanel({ isOpen, onClose }: CommentSummaryPanelProps) {
  const { t } = useTranslation();
  const tc = t.comments;
  const {
    comments, addComment,
    resolveComment, rejectComment, reopenComment, deleteComment,
    showForm, editingComment, startAdd, cancelAdd, startEdit, cancelEdit, saveEdit,
  } = useCommentEditing();
  const [statusFilter, setStatusFilter] = useState<CommentStatus | ''>('');
  const [categoryFilter, setCategoryFilter] = useState<CommentCategory | ''>('');
  const [zoneFilter, setZoneFilter] = useState<ZoneId | ''>('');

  const filtered = comments
    .filter((c) => !statusFilter || c.status === statusFilter)
    .filter((c) => !categoryFilter || c.category === categoryFilter)
    .filter((c) => !zoneFilter || c.zoneId === zoneFilter)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  const openCount = comments.filter((c) => c.status === 'open').length;
  const resolvedCount = comments.filter((c) => c.status === 'resolved').length;
  const rejectedCount = comments.filter((c) => c.status === 'rejected').length;

  const handleAdd = (data: Parameters<typeof addComment>[0] extends infer D ? Omit<D & object, 'zoneId' | 'elementId' | 'elementLabel'> : never) => {
    addComment({ ...data, zoneId: (zoneFilter || 'general') as ZoneId });
    cancelAdd();
  };

  const scrollToElement = useCallback((elementAttr?: string, zone?: string) => {
    onClose();
    setTimeout(() => {
      const selector = elementAttr
        ? `[data-comment-element="${elementAttr}"]`
        : zone ? `#zone-${zone}` : null;
      if (!selector) return;
      const el = document.querySelector(selector);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        (el as HTMLElement).classList.add('ring-2', 'ring-rb-yellow', 'ring-offset-1');
        setTimeout(() => (el as HTMLElement).classList.remove('ring-2', 'ring-rb-yellow', 'ring-offset-1'), 1500);
      }
    }, 300);
  }, [onClose]);

  const selectClass = 'px-2 py-1 border border-gray-300 rounded-md text-xs bg-white focus:outline-none focus:ring-1 focus:ring-rb-yellow';

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          'fixed inset-0 bg-black/30 transition-opacity z-[54]',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
      />
      {/* Sidebar panel */}
      <div
        className={cn(
          'fixed inset-y-0 right-0 w-[420px] max-w-[90vw] bg-white shadow-xl z-[55] transition-transform duration-300 flex flex-col',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Header */}
        <div className="px-4 py-3 border-b border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-bold text-gray-800">{tc.allComments}</h2>
            <button onClick={onClose} className="p-1 rounded hover:bg-gray-100 text-gray-400">
              <X size={16} />
            </button>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-3 mb-3 text-[11px]">
            <span className="px-1.5 py-0.5 rounded bg-blue-50 text-blue-600 font-medium">{openCount} {tc.statusOpen}</span>
            <span className="px-1.5 py-0.5 rounded bg-green-50 text-green-600 font-medium">{resolvedCount} {tc.statusResolved}</span>
            <span className="px-1.5 py-0.5 rounded bg-red-50 text-red-600 font-medium">{rejectedCount} {tc.statusRejected}</span>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2 flex-wrap">
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as CommentStatus | '')} className={selectClass}>
              <option value="">{tc.allStatuses}</option>
              {STATUSES.map((s) => <option key={s} value={s}>{statusLabel(tc, s)}</option>)}
            </select>
            <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value as CommentCategory | '')} className={selectClass}>
              <option value="">{tc.allCategories}</option>
              {CATEGORIES.map((c) => <option key={c} value={c}>{categoryLabel(tc, c)}</option>)}
            </select>
            <select value={zoneFilter} onChange={(e) => setZoneFilter(e.target.value as ZoneId | '')} className={selectClass}>
              <option value="">{tc.allZones}</option>
              {ZONES.map((z) => <option key={z} value={z}>{zoneLabel(tc, z)}</option>)}
            </select>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {!showForm && (
            <button
              onClick={startAdd}
              className="w-full py-2 border border-dashed border-gray-300 rounded-lg text-xs font-medium text-gray-500 hover:border-gray-400 hover:text-gray-600"
            >
              + {tc.addComment}
            </button>
          )}

          {showForm && (
            <CommentForm onSave={handleAdd} onCancel={cancelAdd} />
          )}

          {filtered.length === 0 && !showForm ? (
            <p className="text-xs text-gray-400 text-center py-8">{tc.noComments}</p>
          ) : (
            filtered.map((comment) => (
              <div key={comment.id}>
                {editingComment?.id === comment.id ? (
                  <CommentForm initialData={comment} onSave={saveEdit} onCancel={cancelEdit} />
                ) : (
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] text-gray-400 font-medium">
                        {zoneLabel(tc, comment.zoneId)}
                        {comment.elementLabel && <span className="text-gray-500"> &middot; {comment.elementLabel}</span>}
                      </span>
                      <button
                        onClick={() => scrollToElement(comment.elementId || comment.zoneId, comment.zoneId)}
                        className="text-[10px] text-blue-500 hover:text-blue-700 flex items-center gap-0.5"
                        title={tc.scrollToElement || 'Show in dashboard'}
                      >
                        <ExternalLink size={10} />
                      </button>
                    </div>
                    <CommentCard
                      comment={comment}
                      onEdit={startEdit}
                      onResolve={resolveComment}
                      onReject={rejectComment}
                      onReopen={reopenComment}
                      onDelete={deleteComment}
                    />
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
