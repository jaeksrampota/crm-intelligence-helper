import { Building2, Phone, MessageSquare, Mail, Mic, Bot, Smartphone, Monitor } from 'lucide-react';
import type { Channel } from '../../types';
import { useTranslation } from '../../i18n';

const ICONS: Record<Channel, React.ComponentType<{ size?: number; className?: string }>> = {
  branch: Building2,
  call_center: Phone,
  chat: MessageSquare,
  email: Mail,
  voicebot: Mic,
  chatbot: Bot,
  mobile_app: Smartphone,
  internet_banking: Monitor,
};

export function ChannelIcon({ channel, size = 16, className }: { channel: Channel; size?: number; className?: string }) {
  const Icon = ICONS[channel] || MessageSquare;
  const { t } = useTranslation();
  return <span title={t.channels[channel]}><Icon size={size} className={className} /></span>;
}
