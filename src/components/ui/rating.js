'use client';

import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Rating({
  value = 0,
  max = 5,
  size,
  onChange,
  editable = false, // 🔥 new prop to control click
}) {
  return (
    <div className='flex items-center gap-1'>
      {Array.from({ length: max }).map((_, i) => {
        const index = i + 1;
        const filled = index <= value;

        return (
          <button
            key={index}
            type='button'
            onClick={() => {
              if (editable) {
                onChange?.(index);
              }
            }}
            className={cn(
              'focus:outline-none',
              !editable && 'cursor-default pointer-events-none'
            )}>
            <Star
              size={size}
              className={cn(
                'transition-colors',
                editable && 'hover:scale-110',
                filled
                  ? 'fill-[#F9C57F] text-[#F9C57F]'
                  : 'fill-none text-gray-300'
              )}
            />
          </button>
        );
      })}
    </div>
  );
}
