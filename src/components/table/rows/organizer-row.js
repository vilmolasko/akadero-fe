'use client';
import React from 'react';
import { useRouter } from '@bprogress/next';
import { TableRow, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Eye, UserCheck } from 'lucide-react';
import Image from 'next/image';

export default function OrganizerRow({ isLoading, row, handleClickOpen }) {
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
              src={row?.cover?.url}
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
            row?.status?.toLowerCase() === 'approved' ? 'default' : 'secondary'
          }
          className={
            row?.status?.toLowerCase() === 'approved'
              ? 'bg-green-100 text-green-800 hover:bg-green-100'
              : 'bg-red-100 text-red-800 hover:bg-red-100'
          }>
          {row?.status?.toLowerCase() === 'active' ? 'Aktyvus' : 'Neaktyvus'}
        </Badge>
      </TableCell>

      <TableCell className='text-right'>
        <div className='flex justify-end gap-1'>
          <Button
            variant='ghost'
            size='sm'
            onClick={() => router.push(`/admin/organizers/${row?._id}`)}>
            <Eye className='h-4 w-4' />
            Peržiūrėti išsamią informaciją
          </Button>

          <Button
            variant='ghost'
            size='sm'
            className={'capitalize'}
            onClick={() =>
              handleClickOpen({
                id: row?._id,
                status: row?.status,
              })
            }>
            <UserCheck className='h-4 w-4' />
            {row?.status === 'pending'
              ? 'patvirtinti'
              : row?.status === 'rejected'
              ? 'patvirtinti'
              : 'atmesti'}
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
