import { useState } from 'react';
import type { Interaction } from '../../types';
import { InteractionEntry } from './InteractionEntry';
import { useTranslation } from '../../i18n';

export function ActivityTimeline({ interactions, onInteractionClick }: { interactions: Interaction[]; onInteractionClick: (id: string) => void }) {
  const [showAll, setShowAll] = useState(false);
  const display = showAll ? interactions : interactions.slice(0, 5);
  const remaining = interactions.length - 5;
  const { t } = useTranslation();

  return (
    <div style={{ fontFamily: 'Tahoma, MS Sans Serif, sans-serif', fontSize: 11 }}>
      {display.map((interaction) => (
        <InteractionEntry
          key={interaction.interaction_id}
          interaction={interaction}
          onClick={() => onInteractionClick(interaction.interaction_id)}
        />
      ))}

      {remaining > 0 && !showAll && (
        <button
          onClick={() => setShowAll(true)}
          className="win2k-btn"
          style={{ marginTop: 4, fontSize: 10 }}
        >
          {t.activity.showMore(remaining)}
        </button>
      )}

      {interactions.length === 0 && (
        <div
          style={{
            fontSize: 11,
            color: '#808080',
            fontStyle: 'italic',
            padding: '6px 4px',
          }}
        >
          {t.activity.noInteractions}
        </div>
      )}
    </div>
  );
}
