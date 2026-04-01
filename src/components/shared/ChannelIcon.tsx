import { Building2, Phone, MessageSquare, Mail, Mic, Bot, Smartphone, Monitor } from 'lucide-react';
import type { Channel } from '../../types';

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

const LABELS: Record<Channel, string> = {
  branch: 'Branch',
  call_center: 'Call Center',
  chat: 'Chat',
  email: 'Email',
  voicebot: 'Voicebot',
  chatbot: 'Chatbot',
  mobile_app: 'Mobile App',
  internet_banking: 'Internet Banking',
};

export function ChannelIcon({ channel, size = 16, className }: { channel: Channel; size?: number; className?: string }) {
  const Icon = ICONS[channel] || MessageSquare;
  return <span title={LABELS[channel]}><Icon size={size} className={className} /></span>;
}
