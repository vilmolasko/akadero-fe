'use client';
import React from 'react';
import { TableRow, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Copy } from 'lucide-react';
import { fDateShort } from '@/utils/formatTime';
import toast from 'react-hot-toast';

export default function NewsletterRow({ isLoading, row }) {
  if (isLoading) {
    return (
      <TableRow>
        <TableCell>
          <Skeleton className='h-4 w-24' />
        </TableCell>
        <TableCell>
          <Skeleton className='h-4 w-20' />
        </TableCell>
        <TableCell className='text-right'>
          <div className='flex justify-end space-x-2'>
            <Skeleton className='h-9 w-9 rounded-full' />
          </div>
        </TableCell>
      </TableRow>
    );
  }

  return (
    <TableRow>
      <TableCell>
        <span className='font-medium'>{row?.email}</span>
      </TableCell>
      <TableCell>
        <span className='text-md'>{fDateShort(row?.createdAt)}</span>
      </TableCell>

      <TableCell className='text-right'>
        <div className='flex justify-end gap-1'>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant='ghost'
                  size='icon'
                  onClick={() => {
                    navigator.clipboard.writeText(row.email);
                    toast.success('Copied Email');
                  }}>
                  <Copy className='h-4 w-4' />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Kopijuoti</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </TableCell>
    </TableRow>
  );
}
