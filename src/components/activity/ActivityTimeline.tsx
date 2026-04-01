import type { Interaction } from '../../types';
import { InteractionEntry } from './InteractionEntry';
import { useTranslation } from '../../i18n';

export function ActivityTimeline({ interactions, onInteractionClick }: { interactions: Interaction[]; onInteractionClick: (id: string) => void }) {
  const top5 = interactions.slice(0, 5);
  const { t } = useTranslation();

  return (
    <div className="space-y-1 overflow-y-auto">
      <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{t.activity.title}</h2>
      <div className="space-y-1">
        {top5.map((interaction) => (
          <InteractionEntry
            key={interaction.interaction_id}
            interaction={interaction}
            onClick={() => onInteractionClick(interaction.interaction_id)}
          />
        ))}
      </div>
      {interactions.length === 0 && (
        <div className="text-xs text-gray-400 italic py-2">{t.activity.noInteractions}</div>
      )}
    </div>
  );
}
