import { useState, type ReactNode } from 'react';
import type { ZoneId } from '../../types/comment';
import { useComments } from '../../hooks/use-comments';
import { CommentBubble } from './CommentBubble';
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
      <CommentBubble count={count} onClick={() => setPanelOpen(true)} />
      {children}
      <CommentPanel zoneId={zoneId} isOpen={panelOpen} onClose={() => setPanelOpen(false)} />
    </div>
  );
}
