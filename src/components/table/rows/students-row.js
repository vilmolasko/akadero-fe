'use client';
import React from 'react';
import { TableRow, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Trash2 } from 'lucide-react';
import Image from 'next/image';

export default function StudentsRow({
  isLoading,
  row,
  isOrganizer,
  handleClickOpen,
}) {
  if (isLoading) {
    return (
      <TableRow>
        <TableCell>
          <Skeleton className='h-4 w-24' />
        </TableCell>
        <TableCell>
          <Skeleton className='h-4 w-32' />
        </TableCell>
        <TableCell>
          <Skeleton className='h-6 w-16' />
        </TableCell>
        <TableCell>
          <Skeleton className='h-4 w-20' />
        </TableCell>
        <TableCell className='text-right'>
          <div className='flex justify-end space-x-2'>
            <Skeleton className='h-9 w-9 rounded-full' />
            <Skeleton className='h-9 w-9 rounded-full' />
          </div>
        </TableCell>
      </TableRow>
    );
  }

  return (
    <TableRow>
      <TableCell>
        <span className='font-medium'>
          {row?.fullName || row?.firstName + ' ' + row?.lastName}
        </span>
      </TableCell>
      {isOrganizer && (
        <TableCell>
          <div className='flex items-center space-x-3'>
            <div className='relative h-12 w-12 rounded-md border overflow-hidden'>
              <Image
                fill
                src={row?.course?.cover?.url}
                alt={row?.course?.title}
                className='object-cover'
              />
            </div>
            <span className='font-medium'>{row?.course?.title}</span>
          </div>
        </TableCell>
      )}

      <TableCell>
        <span className='text-md text-muted-foreground'>{row?.email}</span>
      </TableCell>
      <TableCell>
        <span className='text-md'>{row?.phone}</span>
      </TableCell>
      <TableCell>
        <Badge
          variant={
            row?.status?.toLowerCase() === 'active' ? 'default' : 'secondary'
          }
          className={
            row?.status?.toLowerCase() === 'active'
              ? 'bg-green-100 text-green-800 hover:bg-green-100'
              : 'bg-red-100 text-red-800 hover:bg-red-100'
          }>
          {row?.status?.toLowerCase() === 'active' ? 'Aktyvus' : 'Neaktyvus'}
        </Badge>
      </TableCell>
      <TableCell className='text-right'>
        <div className='flex justify-end gap-1'>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className='text-red-500'
                  variant='ghost'
                  size='icon'
                  onClick={handleClickOpen(row?._id)}>
                  <Trash2 className='h-4 w-4' />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Ištrinti</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </TableCell>
    </TableRow>
  );
}
