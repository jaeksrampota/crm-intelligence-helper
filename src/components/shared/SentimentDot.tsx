import { cn } from '../../utils/cn';
import type { Sentiment } from '../../types';
import { useTranslation } from '../../i18n';

const COLORS: Record<string, string> = {
  positive: 'bg-sentiment-positive',
  neutral: 'bg-sentiment-neutral',
  negative: 'bg-sentiment-negative',
};

export function SentimentDot({ sentiment }: { sentiment: Sentiment | null }) {
  const { t } = useTranslation();
  if (!sentiment) return <div className="w-2.5 h-2.5 rounded-full bg-gray-300" title={t.sentiment.noData} />;
  return <div className={cn('w-2.5 h-2.5 rounded-full', COLORS[sentiment])} title={t.sentiment[sentiment]} />;
}
