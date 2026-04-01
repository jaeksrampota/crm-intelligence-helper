import { useState, type ReactNode } from 'react';
import { MessageSquare } from 'lucide-react';
import type { ZoneId } from '../../types/comment';
import { useComments } from '../../hooks/use-comments';
import { cn } from '../../utils/cn';
import { CommentPanel } from './CommentPanel';

interface CommentZoneWrapperProps {
  zoneId: ZoneId;
  children: ReactNode;
}

export function CommentZoneWrapper({ zoneId, children }: CommentZoneWrapperProps) {
  const { getCommentsByZone } = useComments();
  const [panelOpen, setPanelOpen] = useState(false);

  const count = getCommentsByZone(zoneId).length;

  return (
    <div className="relative">
      <button
        onClick={(e) => { e.stopPropagation(); setPanelOpen(true); }}
        className={cn(
          'absolute top-1 right-1 z-10 flex items-center gap-1 px-1.5 py-1 rounded-md text-[10px] font-semibold transition-all',
          count > 0
            ? 'bg-rb-yellow text-rb-black shadow-sm hover:brightness-95'
            : 'bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600',
        )}
        title="Comments"
      >
        <MessageSquare size={12} />
        {count > 0 && <span>{count}</span>}
      </button>
      {children}
      <CommentPanel zoneId={zoneId} isOpen={panelOpen} onClose={() => setPanelOpen(false)} />
    </div>
  );
}
