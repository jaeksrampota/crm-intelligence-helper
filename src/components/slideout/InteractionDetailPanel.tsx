import { useEffect, useState } from 'react';
import type { Interaction } from '../../types';
import { fetchInteractionDetail } from '../../services';
import { ChannelIcon } from '../shared/ChannelIcon';
import { SentimentDot } from '../shared/SentimentDot';

export function InteractionDetailPanel({ interactionId }: { interactionId: string }) {
  const [interaction, setInteraction] = useState<Interaction | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const i = await fetchInteractionDetail(interactionId);
      setInteraction(i);
      setLoading(false);
    }
    load();
  }, [interactionId]);

  if (loading) return <div className="text-sm text-gray-500">Loading...</div>;
  if (!interaction) return <div className="text-sm text-gray-500">Interaction not found</div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <ChannelIcon channel={interaction.channel} size={20} className="text-gray-600" />
        <span className="text-sm font-semibold capitalize">{interaction.channel.replace('_', ' ')}</span>
        <SentimentDot sentiment={interaction.sentiment_score} />
        <span className={`text-xs px-2 py-0.5 rounded ${interaction.resolved ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {interaction.resolved ? 'Resolved' : 'Open'}
        </span>
      </div>

      <div className="text-xs text-gray-500">
        {new Date(interaction.timestamp).toLocaleString('cs-CZ')}
        {interaction.branch_name && ` · ${interaction.branch_name}`}
        {interaction.agent_id && ` · Agent: ${interaction.agent_id}`}
      </div>

      <div>
        <h3 className="text-xs font-semibold text-gray-500 uppercase mb-1">Summary</h3>
        <p className="text-sm text-gray-700">{interaction.topic_summary}</p>
      </div>

      <div>
        <h3 className="text-xs font-semibold text-gray-500 uppercase mb-1">Notes</h3>
        <p className="text-sm text-gray-700 whitespace-pre-wrap">{interaction.detail_notes}</p>
      </div>

      {interaction.related_ticket_id && (
        <div className="bg-amber-50 rounded p-2 text-xs">
          <span className="text-gray-500">Related ticket:</span>{' '}
          <span className="font-mono font-medium">{interaction.related_ticket_id}</span>
        </div>
      )}
    </div>
  );
}
