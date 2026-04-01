import { Building2, Phone, Smartphone, Monitor, MessageSquare, Mail, Mic, Bot } from 'lucide-react';
import { cn } from '../../utils/cn';
import type { ChannelUsage } from '../../types';
import { useTranslation } from '../../i18n';

const CHANNEL_ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  branch: Building2,
  call_center: Phone,
  mobile_app: Smartphone,
  internet_banking: Monitor,
  chat: MessageSquare,
  email: Mail,
  voicebot: Mic,
  chatbot: Bot,
};

export function ChannelPreference({ channels, onClick }: { channels: ChannelUsage[]; onClick?: () => void }) {
  const maxCount = channels[0]?.count ?? 1;
  const { t } = useTranslation();
  return (
    <div onClick={onClick} className={cn('bg-white rounded-lg border border-gray-200 p-2.5', onClick && 'cursor-pointer hover:border-rb-yellow hover:shadow-sm transition-all')}>
      <div className="text-[10px] text-gray-500 font-medium mb-1.5">{t.behavior.channelPreference}</div>
      <div className="flex items-end gap-2 justify-center">
        {channels.slice(0, 3).map(({ channel, count }) => {
          const Icon = CHANNEL_ICONS[channel] || MessageSquare;
          const scale = count / maxCount;
          const size = Math.max(14, Math.round(24 * scale));
          return (
            <div key={channel} className="flex flex-col items-center gap-0.5">
              <Icon size={size} className={cn(scale === 1 ? 'text-rb-yellow' : 'text-gray-400')} />
              <span className="text-[9px] text-gray-500">{t.channelsShort[channel as keyof typeof t.channelsShort] || channel}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
