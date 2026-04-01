import { useEffect, useState } from 'react';
import type { Interaction } from '../../types';
import { fetchInteractionDetail } from '../../services';
import { ChannelIcon } from '../shared/ChannelIcon';
import { SentimentDot } from '../shared/SentimentDot';
import { useTranslation } from '../../i18n';

export function InteractionDetailPanel({ interactionId }: { interactionId: string }) {
  const [interaction, setInteraction] = useState<Interaction | null>(null);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    async function load() {
      setLoading(true);
      const i = await fetchInteractionDetail(interactionId);
      setInteraction(i);
      setLoading(false);
    }
    load();
  }, [interactionId]);

  if (loading) return (
    <div className="flex items-center gap-2 text-sm text-gray-400 py-8 justify-center">
      <div className="w-4 h-4 border-2 border-gray-300 border-t-rb-yellow rounded-full animate-spin" />
      {t.slideout.loadingInteraction}
    </div>
  );
  if (!interaction) return <div className="text-sm text-gray-500 py-8 text-center">{t.slideout.interactionNotFound}</div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 flex-wrap">
        <ChannelIcon channel={interaction.channel} size={20} className="text-gray-600" />
        <span className="text-sm font-semibold capitalize">{interaction.channel.replace('_', ' ')}</span>
        <SentimentDot sentiment={interaction.sentiment_score} />
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${interaction.resolved ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
          {interaction.resolved ? t.slideout.resolved : t.slideout.open}
        </span>
      </div>

      <div className="text-xs text-gray-500 bg-gray-50 rounded-md p-2.5 space-y-0.5">
        <div>{new Date(interaction.timestamp).toLocaleString('cs-CZ')}</div>
        {interaction.branch_name && <div>{t.slideout.location} {interaction.branch_name}</div>}
        {interaction.agent_id && <div>{t.slideout.agent} {interaction.agent_id}</div>}
      </div>

      <div>
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 pb-1 border-b border-gray-200">{t.slideout.summary}</h3>
        <p className="text-sm text-gray-700">{interaction.topic_summary}</p>
      </div>

      <div>
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 pb-1 border-b border-gray-200">{t.slideout.notes}</h3>
        <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{interaction.detail_notes}</p>
      </div>

      {interaction.related_ticket_id && (
        <div className="bg-amber-50 rounded-md p-3 text-xs border border-amber-200">
          <span className="text-gray-500">{t.slideout.relatedTicket}</span>{' '}
          <span className="font-mono font-semibold text-amber-800">{interaction.related_ticket_id}</span>
        </div>
      )}
    </div>
  );
}
