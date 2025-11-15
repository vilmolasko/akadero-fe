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
import { useCurrencyFormat } from '@/hooks/formatCurrency';

export default function CourseRow({
  isLoading,
  row,
  handleClickOpen,
  isOrganizer,
}) {
  const router = useRouter();
  const fCurrency = useCurrencyFormat();

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
          <div className='flex items-center space-x-3'>
            <Skeleton className='h-12 w-12 rounded' />
            <Skeleton className='h-4 w-24' />
          </div>
        </TableCell>

        <TableCell>
          <Skeleton className='h-4 w-32' />
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
          <div className='relative h-12 w-12 min-w-12 rounded-md border overflow-hidden'>
            <Image
              fill
              src={row?.cover?.url || '/placeholder-image.png'}
              alt={row?.title}
              className='object-cover'
            />
          </div>
          <span className='font-medium'>{row?.title}</span>
        </div>
      </TableCell>
      {!isOrganizer && (
        <TableCell>
          <div className='flex items-center space-x-3'>
            <div className='relative h-12 w-12 min-w-12 rounded-md border overflow-hidden'>
              <Image
                fill
                src={row?.organizerCover || '/placeholder-image.png'}
                alt={row?.organizer}
                className='object-cover'
              />
            </div>
            <span className='font-medium'>{row?.organizer}</span>
          </div>
        </TableCell>
      )}
      <TableCell className='font-medium'>{fCurrency(row?.totalCost)}</TableCell>
      <TableCell>
        {(() => {
          const now = new Date();
          const expireDate = new Date(row?.expire);
          let status = '';
          let variant = 'secondary';
          let customClass = '';

          if (expireDate < now) {
            // ❌ Expired
            status = 'Nebegalioja';
            variant = 'destructive'; // red tone
            customClass = 'bg-red-100 text-red-800 hover:bg-red-100';
          } else if (!row?.isActive) {
            // ⚪ Inactive (future date but not active)
            status = 'Neaktyvus';
            variant = 'outline';
            customClass = 'bg-gray-100 text-gray-800 hover:bg-gray-100';
          } else {
            // ✅ Active (not expired and active)
            status = 'Aktyvus';
            variant = 'default';
            customClass = 'bg-green-100 text-green-800 hover:bg-green-100';
          }

          return (
            <Badge
              variant={variant}
              className={customClass}>
              {status}
            </Badge>
          );
        })()}
      </TableCell>
      <TableCell>
        <span className='text-md'>{fDateShort(row?.createdAt)}</span>
      </TableCell>
      {!isOrganizer && (
        <TableCell className='text-right'>
          <div className='flex justify-end gap-1'>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant='ghost'
                    size='icon'
                    onClick={() =>
                      router.push(`/admin/featured-courses/${row?._id}`)
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
      )}
    </TableRow>
  );
}
