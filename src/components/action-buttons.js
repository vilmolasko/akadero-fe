'use client';

import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Eye, Pencil, Trash2 } from 'lucide-react';

export default function ActionButtons({ onEdit, onDelete, deleteOnly }) {
  return (
    <TooltipProvider>
      <div className='flex items-center gap-2'>
        {!deleteOnly && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant='ghost'
                size='icon'
                aria-label='Edit'
                onClick={() => {
                  onEdit?.();
                }}>
                <Pencil className='size-4' />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Edit</TooltipContent>
          </Tooltip>
        )}

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='ghost'
              size='icon'
              aria-label='Delete'
              onClick={() => onDelete?.()}
              className='text-destructive'>
              <Trash2 className='size-4' />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Delete</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
//
