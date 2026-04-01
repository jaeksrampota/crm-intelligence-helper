import { Building2, Phone, Smartphone, Monitor, MessageSquare, Mail, Mic, Bot } from 'lucide-react';
import { cn } from '../../utils/cn';
import type { ChannelUsage } from '../../types';

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

const CHANNEL_LABELS: Record<string, string> = {
  branch: 'Branch',
  call_center: 'Call',
  mobile_app: 'Mobile',
  internet_banking: 'Web',
  chat: 'Chat',
  email: 'Email',
  voicebot: 'Voice',
  chatbot: 'Bot',
};

export function ChannelPreference({ channels }: { channels: ChannelUsage[] }) {
  const maxCount = channels[0]?.count ?? 1;
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-2.5">
      <div className="text-[10px] text-gray-500 font-medium mb-1.5">Channel Preference</div>
      <div className="flex items-end gap-2 justify-center">
        {channels.slice(0, 3).map(({ channel, count }) => {
          const Icon = CHANNEL_ICONS[channel] || MessageSquare;
          const scale = count / maxCount;
          const size = Math.max(14, Math.round(24 * scale));
          return (
            <div key={channel} className="flex flex-col items-center gap-0.5">
              <Icon size={size} className={cn(scale === 1 ? 'text-rb-yellow' : 'text-gray-400')} />
              <span className="text-[9px] text-gray-500">{CHANNEL_LABELS[channel] || channel}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
