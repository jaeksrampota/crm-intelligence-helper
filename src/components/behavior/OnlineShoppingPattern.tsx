import { ShoppingCart } from 'lucide-react';
import { cn } from '../../utils/cn';
import { useTranslation } from '../../i18n';

export function OnlineShoppingPattern({ active, count, onClick }: { active: boolean; count: number; onClick?: () => void }) {
  const { t } = useTranslation();
  return (
    <div onClick={onClick} className={cn('bg-white rounded-lg border border-gray-200 p-2.5', onClick && 'cursor-pointer hover:border-rb-yellow hover:shadow-sm transition-all')}>
      <div className="text-[10px] text-gray-500 font-medium mb-1.5">{t.behavior.onlineShopping}</div>
      <div className="flex items-center gap-2 justify-center">
        <ShoppingCart size={22} className={cn(active ? 'text-rb-yellow' : 'text-gray-300')} />
        <div>
          <div className={cn('text-xs font-semibold', active ? 'text-gray-800' : 'text-gray-400')}>
            {active ? t.behavior.tx(count) : t.behavior.none}
          </div>
          <div className="text-[10px] text-gray-400">{t.behavior.ninetyDays}</div>
        </div>
      </div>
    </div>
  );
}
