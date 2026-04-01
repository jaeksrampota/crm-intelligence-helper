import type { Interaction } from '../../types';
import { ChannelIcon } from '../shared/ChannelIcon';
import { SentimentDot } from '../shared/SentimentDot';
import { RelativeDate } from '../shared/RelativeDate';
import { useTranslation } from '../../i18n';

export function InteractionEntry({ interaction, onClick }: { interaction: Interaction; onClick: () => void }) {
  const { t } = useTranslation();
  const isUnresolved = !interaction.resolved;

  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 5,
        padding: '3px 5px',
        cursor: 'pointer',
        fontFamily: 'Tahoma, MS Sans Serif, sans-serif',
        fontSize: 11,
        background: isUnresolved ? '#fff8f8' : '#d4d0c8',
        borderTop: isUnresolved ? '1px solid #ff8080' : '1px solid #ffffff',
        borderLeft: isUnresolved ? '3px solid #cc0000' : '2px solid #ffffff',
        borderRight: '1px solid #808080',
        borderBottom: '1px solid #808080',
        marginBottom: 2,
      }}
      className="win2k-listitem"
    >
      <div style={{ marginTop: 2, flexShrink: 0 }}>
        <ChannelIcon channel={interaction.channel} size={14} className="text-gray-600" />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 10, color: '#808080', marginBottom: 1 }}>
          <RelativeDate date={interaction.timestamp} />
          {interaction.branch_name && <span>· {interaction.branch_name}</span>}
          {isUnresolved && (
            <span
              style={{
                fontSize: 9,
                fontWeight: 'bold',
                color: '#c00000',
                background: '#ffeeee',
                padding: '0 4px',
                border: '1px solid #cc0000',
              }}
            >
              {t.activity.open}
            </span>
          )}
        </div>
        <div
          style={{
            fontSize: 11,
            color: '#000',
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
          title={interaction.topic_summary}
        >
          {interaction.topic_summary}
        </div>
      </div>
      <div style={{ flexShrink: 0, marginTop: 4 }}>
        <SentimentDot sentiment={interaction.sentiment_score} />
      </div>
    </div>
  );
}
