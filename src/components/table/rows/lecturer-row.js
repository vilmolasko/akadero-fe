'use client';
import React from 'react';
import { useRouter } from '@bprogress/next';
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
import { Edit, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { fDateShort } from '@/utils/formatTime';

export default function LecturerRow({
  isLoading,
  row,
  handleClickOpen,
  isOrganizer,
}) {
  const router = useRouter();

  if (isLoading) {
    return (
      <TableRow>
        <TableCell>
          <div className='flex items-center space-x-3'>
            <Skeleton className='h-12 w-12 rounded' />
            <Skeleton className='h-4 w-24' />
          </div>
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
        <div className='flex items-center space-x-3'>
          <div className='relative h-12 w-12 rounded-md border overflow-hidden'>
            <Image
              fill
              src={row?.cover?.url || '/placeholder-image.png'}
              alt={row?.name}
              className='object-cover'
            />
          </div>
          <span className='font-medium'>{row?.name}</span>
        </div>
      </TableCell>
      <TableCell>
        <span className='text-md text-muted-foreground'>{row?.email}</span>
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
      <TableCell>
        <span className='text-md'>
          {row?.createdAt ? fDateShort(row?.createdAt) : '-'}
        </span>
      </TableCell>
      <TableCell className='text-right'>
        <div className='flex justify-end gap-1'>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant='ghost'
                  size='icon'
                  onClick={() =>
                    router.push(
                      `/${isOrganizer ? 'dashboard' : 'admin'}/lecturers/${
                        row?._id
                      }`
                    )
                  }>
                  <Edit className='h-4 w-4' />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Redaguoti</TooltipContent>
            </Tooltip>
          </TooltipProvider>

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
