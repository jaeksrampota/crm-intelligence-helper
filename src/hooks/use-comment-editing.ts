import { useState, useCallback } from 'react';
import type { Comment } from '../types/comment';
import { useComments } from './use-comments';

/** Shared edit/add state logic used by both CommentPanel and CommentSummaryPanel. */
export function useCommentEditing() {
  const commentActions = useComments();
  const [showForm, setShowForm] = useState(false);
  const [editingComment, setEditingComment] = useState<Comment | null>(null);

  const startAdd = useCallback(() => { setShowForm(true); setEditingComment(null); }, []);
  const cancelAdd = useCallback(() => setShowForm(false), []);

  const startEdit = useCallback((comment: Comment) => { setEditingComment(comment); setShowForm(false); }, []);
  const cancelEdit = useCallback(() => setEditingComment(null), []);

  const saveEdit = useCallback((data: { text: string; category: Comment['category']; priority?: Comment['priority']; targetAudience?: Comment['targetAudience'] }) => {
    if (editingComment) {
      commentActions.updateComment(editingComment.id, data);
      setEditingComment(null);
    }
  }, [editingComment, commentActions]);

  return {
    ...commentActions,
    showForm,
    editingComment,
    startAdd,
    cancelAdd,
    startEdit,
    cancelEdit,
    saveEdit,
  };
}
