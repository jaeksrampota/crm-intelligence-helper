import { useState, useCallback, useEffect } from 'react';
import type { Comment, ZoneId, CommentCategory, CommentStatus, CommentPriority, CommentTargetAudience } from '../types/comment';

const STORAGE_KEY = 'crm-comments';
const SYNC_EVENT = 'crm-comments-sync';

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
  // Dispatch custom event for same-tab sync across hook instances
  window.dispatchEvent(new CustomEvent(SYNC_EVENT));
}

export function useComments() {
  const [comments, setComments] = useState<Comment[]>(loadComments);

  // Sync across hook instances via custom event (same tab) and storage event (cross tab)
  useEffect(() => {
    const syncHandler = () => setComments(loadComments());
    const storageHandler = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) syncHandler();
    };
    window.addEventListener(SYNC_EVENT, syncHandler);
    window.addEventListener('storage', storageHandler);
    return () => {
      window.removeEventListener(SYNC_EVENT, syncHandler);
      window.removeEventListener('storage', storageHandler);
    };
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
    elementId?: string;
    elementLabel?: string;
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

  const getCommentsByElement = useCallback((zoneId: ZoneId, elementId: string) => {
    return comments.filter((c) => c.zoneId === zoneId && c.elementId === elementId);
  }, [comments]);

  const getCommentCountForElement = useCallback((zoneId: ZoneId, elementId: string) => {
    return comments.filter((c) => c.zoneId === zoneId && c.elementId === elementId).length;
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
    getCommentsByElement,
    getCommentCountForElement,
  };
}
