import { cn } from '../../utils/cn';
import type { Sentiment } from '../../types';

const COLORS: Record<string, string> = {
  positive: 'bg-sentiment-positive',
  neutral: 'bg-sentiment-neutral',
  negative: 'bg-sentiment-negative',
};

export function SentimentDot({ sentiment }: { sentiment: Sentiment | null }) {
  if (!sentiment) return <div className="w-2 h-2 rounded-full bg-gray-300" />;
  return <div className={cn('w-2 h-2 rounded-full', COLORS[sentiment])} title={sentiment} />;
}
