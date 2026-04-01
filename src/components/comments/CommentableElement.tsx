import { useState, type ReactNode } from 'react';
import { MessageSquare } from 'lucide-react';
import type { ZoneId } from '../../types/comment';
import { useComments } from '../../hooks/use-comments';
import { cn } from '../../utils/cn';
import { CommentPopover } from './CommentPopover';
import { CommentIndicator } from './CommentIndicator';

interface CommentableElementProps {
  zoneId: ZoneId;
  elementId?: string;
  elementLabel?: string;
  children: ReactNode;
  className?: string;
}

export function CommentableElement({ zoneId, elementId, elementLabel, children, className }: CommentableElementProps) {
  const { getCommentCountForElement, getCommentsByZone } = useComments();
  const [popoverOpen, setPopoverOpen] = useState(false);

  const count = elementId
    ? getCommentCountForElement(zoneId, elementId)
    : getCommentsByZone(zoneId).length;

  const handleIconClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPopoverOpen(true);
  };

  return (
    <div
      className={cn('relative group', className)}
      data-comment-element={elementId || zoneId}
    >
      {children}

      {/* Persistent badge when comments exist */}
      {count > 0 && !popoverOpen && (
        <CommentIndicator count={count} onClick={handleIconClick} />
      )}

      {/* Hover-revealed comment icon (only when no comments / badge not showing) */}
      {count === 0 && (
        <button
          onClick={handleIconClick}
          className={cn(
            'absolute top-1 right-1 z-10 p-1 rounded-md transition-all',
            'opacity-0 group-hover:opacity-100',
            'bg-white/80 text-gray-400 hover:bg-gray-100 hover:text-gray-600',
            'shadow-sm border border-gray-200/50',
            // Touch device fallback
            'touch-action-manipulation',
          )}
          style={{ WebkitTapHighlightColor: 'transparent' }}
          title="Add comment"
        >
          <MessageSquare size={12} />
        </button>
      )}

      {/* Popover */}
      {popoverOpen && (
        <CommentPopover
          zoneId={zoneId}
          elementId={elementId}
          elementLabel={elementLabel}
          isOpen={popoverOpen}
          onClose={() => setPopoverOpen(false)}
        />
      )}
    </div>
  );
}
