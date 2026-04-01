import { cn } from '../../utils/cn';

interface CommentIndicatorProps {
  count: number;
  onClick: (e: React.MouseEvent) => void;
  className?: string;
}

export function CommentIndicator({ count, onClick, className }: CommentIndicatorProps) {
  if (count === 0) return null;

  return (
    <button
      onClick={(e) => { e.stopPropagation(); onClick(e); }}
      className={cn(
        'absolute -top-1.5 -right-1.5 z-10 flex items-center justify-center',
        'w-5 h-5 rounded-full bg-rb-yellow text-rb-black text-[10px] font-bold',
        'shadow-sm hover:brightness-95 transition-all',
        className,
      )}
      title={`${count} comment${count !== 1 ? 's' : ''}`}
    >
      {count}
    </button>
  );
}
