import { Building2, Phone, Smartphone, Monitor, MessageSquare, Mail, Mic, Bot } from 'lucide-react';
import type { ChannelUsage } from '../../types';
import { useTranslation } from '../../i18n';

const CHANNEL_ICONS: Record<string, React.ComponentType<{ size?: number }>> = {
  branch: Building2,
  call_center: Phone,
  mobile_app: Smartphone,
  internet_banking: Monitor,
  chat: MessageSquare,
  email: Mail,
  voicebot: Mic,
  chatbot: Bot,
};

const WIN_TILE: React.CSSProperties = {
  background: '#d4d0c8',
  borderTop: '2px solid #ffffff',
  borderLeft: '2px solid #ffffff',
  borderRight: '2px solid #808080',
  borderBottom: '2px solid #808080',
  outline: '1px solid #404040',
  padding: '5px 7px',
  cursor: 'pointer',
  fontFamily: 'Tahoma, MS Sans Serif, sans-serif',
  fontSize: 11,
};

export function ChannelPreference({ channels, onClick }: { channels: ChannelUsage[]; onClick?: () => void }) {
  const maxCount = channels[0]?.count ?? 1;
  const { t } = useTranslation();
  return (
    <div onClick={onClick} style={{ ...WIN_TILE, cursor: onClick ? 'pointer' : 'default' }}>
      <div style={{ fontSize: 10, fontWeight: 'bold', marginBottom: 6, color: '#000' }}>{t.behavior.channelPreference}</div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, justifyContent: 'center' }}>
        {channels.slice(0, 3).map(({ channel, count }) => {
          const Icon = CHANNEL_ICONS[channel] || MessageSquare;
          const scale = count / maxCount;
          const size = Math.max(14, Math.round(22 * scale));
          return (
            <div key={channel} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              <Icon size={size} style={{ color: scale === 1 ? '#0a246a' : '#808080' }} />
              <span style={{ fontSize: 9, color: '#555' }}>
                {t.channelsShort[channel as keyof typeof t.channelsShort] || channel}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
