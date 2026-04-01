import { MessageSquare } from 'lucide-react';
import { cn } from '../../utils/cn';

interface CommentBubbleProps {
  count: number;
  onClick: () => void;
}

export function CommentBubble({ count, onClick }: CommentBubbleProps) {
  return (
    <button
      onClick={(e) => { e.stopPropagation(); onClick(); }}
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
  );
}
