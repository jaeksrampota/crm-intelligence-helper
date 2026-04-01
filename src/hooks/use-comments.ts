import { useState, useCallback, useEffect } from 'react';
import type { Comment, ZoneId, CommentCategory, CommentStatus, CommentPriority, CommentTargetAudience } from '../types/comment';

const STORAGE_KEY = 'crm-comments';

function loadComments(): Comment[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveComments(list: Comment[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

export function useComments() {
  const [comments, setComments] = useState<Comment[]>(loadComments);

  // Sync across hook instances via storage event
  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) setComments(loadComments());
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  const update = useCallback((fn: (prev: Comment[]) => Comment[]) => {
    setComments((prev) => {
      const next = fn(prev);
      saveComments(next);
      return next;
    });
  }, []);

  const addComment = useCallback((data: {
    zoneId: ZoneId;
    text: string;
    author: string;
    category: CommentCategory;
    priority?: CommentPriority;
    targetAudience?: CommentTargetAudience;
  }) => {
    const comment: Comment = {
      ...data,
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      status: 'open',
    };
    update((prev) => [...prev, comment]);
    return comment;
  }, [update]);

  const updateComment = useCallback((id: string, updates: Partial<Pick<Comment, 'text' | 'category' | 'priority' | 'targetAudience'>>) => {
    update((prev) => prev.map((c) => c.id === id ? { ...c, ...updates } : c));
  }, [update]);

  const setStatus = useCallback((id: string, status: CommentStatus) => {
    update((prev) => prev.map((c) => c.id === id ? { ...c, status } : c));
  }, [update]);

  const deleteComment = useCallback((id: string) => {
    update((prev) => prev.filter((c) => c.id !== id));
  }, [update]);

  const getCommentsByZone = useCallback((zoneId: ZoneId) => {
    return comments.filter((c) => c.zoneId === zoneId);
  }, [comments]);

  return {
    comments,
    addComment,
    updateComment,
    resolveComment: useCallback((id: string) => setStatus(id, 'resolved'), [setStatus]),
    rejectComment: useCallback((id: string) => setStatus(id, 'rejected'), [setStatus]),
    reopenComment: useCallback((id: string) => setStatus(id, 'open'), [setStatus]),
    deleteComment,
    getCommentsByZone,
  };
}
