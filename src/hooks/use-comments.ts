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

function saveComments(comments: Comment[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(comments));
}

export function useComments() {
  const [comments, setComments] = useState<Comment[]>(loadComments);

  // Sync across hook instances via storage event
  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        setComments(loadComments());
      }
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  const persist = useCallback((updated: Comment[]) => {
    setComments(updated);
    saveComments(updated);
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
    const updated = [...loadComments(), comment];
    persist(updated);
    return comment;
  }, [persist]);

  const updateComment = useCallback((id: string, updates: Partial<Pick<Comment, 'text' | 'category' | 'priority' | 'targetAudience'>>) => {
    const current = loadComments();
    const updated = current.map((c) => c.id === id ? { ...c, ...updates } : c);
    persist(updated);
  }, [persist]);

  const setStatus = useCallback((id: string, status: CommentStatus) => {
    const current = loadComments();
    const updated = current.map((c) => c.id === id ? { ...c, status } : c);
    persist(updated);
  }, [persist]);

  const deleteComment = useCallback((id: string) => {
    const current = loadComments();
    persist(current.filter((c) => c.id !== id));
  }, [persist]);

  const getCommentsByZone = useCallback((zoneId: ZoneId) => {
    return comments.filter((c) => c.zoneId === zoneId);
  }, [comments]);

  return {
    comments,
    addComment,
    updateComment,
    resolveComment: (id: string) => setStatus(id, 'resolved'),
    rejectComment: (id: string) => setStatus(id, 'rejected'),
    reopenComment: (id: string) => setStatus(id, 'open'),
    deleteComment,
    getCommentsByZone,
  };
}
