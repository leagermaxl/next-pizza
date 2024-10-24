import { cn } from '@/lib/utils';
import { ArrowUpDown } from 'lucide-react';
import React from 'react';

interface Props {
  className?: string;
}

export const Sort: React.FC<Props> = ({ className }) => {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 bg-gray-50 px-5 h-[52px] rounded-2xl font-semibold cursor-pointer',
        className
      )}
    >
      <ArrowUpDown size={16} />
      <span>Сортировка:</span>
      <span className="text-primary">популярное</span>
    </div>
  );
};
