import { cn } from '../../utils/cn';
import type { Interaction } from '../../types';
import { ChannelIcon } from '../shared/ChannelIcon';
import { SentimentDot } from '../shared/SentimentDot';
import { RelativeDate } from '../shared/RelativeDate';

export function InteractionEntry({ interaction, onClick }: { interaction: Interaction; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'flex items-start gap-2 p-2 rounded cursor-pointer hover:bg-gray-50 transition-colors',
        !interaction.resolved && 'border-l-2 border-red-400 bg-red-50/30'
      )}
    >
      <div className="mt-0.5 flex-shrink-0">
        <ChannelIcon channel={interaction.channel} size={16} className="text-gray-500" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[10px] text-gray-400">
          <RelativeDate date={interaction.timestamp} />
          {interaction.branch_name && <span> · {interaction.branch_name}</span>}
        </div>
        <div className="text-xs text-gray-700 truncate">{interaction.topic_summary}</div>
      </div>
      <div className="flex-shrink-0 mt-1">
        <SentimentDot sentiment={interaction.sentiment_score} />
      </div>
    </div>
  );
}
