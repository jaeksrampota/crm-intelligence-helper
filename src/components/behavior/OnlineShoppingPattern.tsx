import { ShoppingCart } from 'lucide-react';
import { cn } from '../../utils/cn';

export function OnlineShoppingPattern({ active, count }: { active: boolean; count: number }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-2.5">
      <div className="text-[10px] text-gray-500 font-medium mb-1.5">Online Shopping</div>
      <div className="flex items-center gap-2 justify-center">
        <ShoppingCart size={22} className={cn(active ? 'text-rb-yellow' : 'text-gray-300')} />
        <div>
          <div className={cn('text-xs font-semibold', active ? 'text-gray-800' : 'text-gray-400')}>
            {active ? `${count} tx` : 'None'}
          </div>
          <div className="text-[10px] text-gray-400">90 days</div>
        </div>
      </div>
    </div>
  );
}
