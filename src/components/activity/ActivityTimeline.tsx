import { useState } from 'react';
import type { Interaction } from '../../types';
import { InteractionEntry } from './InteractionEntry';
import { CommentableElement } from '../comments/CommentableElement';
import { useTranslation } from '../../i18n';

export function ActivityTimeline({ interactions, onInteractionClick }: { interactions: Interaction[]; onInteractionClick: (id: string) => void }) {
  const [showAll, setShowAll] = useState(false);
  const display = showAll ? interactions : interactions.slice(0, 5);
  const remaining = interactions.length - 5;
  const { t } = useTranslation();

  return (
    <div className="space-y-2 overflow-y-auto">
      <CommentableElement zoneId="activity" elementLabel={t.activity.title}>
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{t.activity.title}</h2>
      </CommentableElement>
      <div className="space-y-1">
        {display.map((interaction) => (
          <CommentableElement key={interaction.interaction_id} zoneId="activity" elementId={`interaction-${interaction.interaction_id}`} elementLabel={interaction.topic_summary?.slice(0, 50) || 'Interaction'}>
            <InteractionEntry
              interaction={interaction}
              onClick={() => onInteractionClick(interaction.interaction_id)}
            />
          </CommentableElement>
        ))}
      </div>
      {remaining > 0 && !showAll && (
        <button onClick={() => setShowAll(true)} className="text-[10px] text-blue-600 hover:underline mt-1">
          {t.activity.showMore(remaining)}
        </button>
      )}
      {interactions.length === 0 && (
        <div className="text-xs text-gray-400 italic py-2">{t.activity.noInteractions}</div>
      )}
    </div>
  );
}
