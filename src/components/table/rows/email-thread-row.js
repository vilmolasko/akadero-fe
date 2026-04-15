'use client';

import NextLink from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { TableCell, TableRow } from '@/components/ui/table';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Eye, Trash2 } from 'lucide-react';
import { fDateTime } from '@/utils/formatTime';

export default function EmailThreadRow({ isLoading, row, handleClickOpen }) {
  if (isLoading) {
    return (
      <TableRow>
        <TableCell>
          <Skeleton className="h-4 w-28" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-4 w-52" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-6 w-16" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-4 w-8" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-4 w-8" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-4 w-28" />
        </TableCell>
        <TableCell className="text-right">
          <div className="flex justify-end space-x-2">
            <Skeleton className="h-9 w-9 rounded-full" />
            <Skeleton className="h-9 w-9 rounded-full" />
          </div>
        </TableCell>
      </TableRow>
    );
  }

  return (
    <TableRow>
      <TableCell>
        <div className="flex flex-col">
          <span className="font-medium">{row?.from?.name || '-'}</span>
          <span className="text-sm text-muted-foreground">
            {row?.from?.email || '-'}
          </span>
        </div>
      </TableCell>

      <TableCell>
        <div className="max-w-[320px]">
          <p className="font-medium truncate">{row?.subject || '-'}</p>
          <p className="text-sm text-muted-foreground truncate">
            {row?.lastMessage?.text || 'Paskutinė žinutė nepateikta'}
          </p>
        </div>
      </TableCell>

      <TableCell>
        <Badge
          variant={row?.status === 'open' ? 'default' : 'secondary'}
          className={
            row?.status === 'open'
              ? 'bg-green-100 text-green-800 hover:bg-green-100'
              : 'bg-slate-200 text-slate-700 hover:bg-slate-200'
          }
        >
          {row?.status === 'open' ? 'Open' : 'Closed'}
        </Badge>
      </TableCell>

      <TableCell>{row?.incomingCount || 0}</TableCell>
      <TableCell>{row?.outgoingCount || 0}</TableCell>
      <TableCell>
        {row?.lastMessageAt ? fDateTime(row?.lastMessageAt) : '-'}
      </TableCell>

      <TableCell className="text-right">
        <div className="flex justify-end gap-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button asChild variant="ghost" size="icon">
                  <NextLink href={`/admin/emails/${row?._id}`}>
                    <Eye className="h-4 w-4" />
                  </NextLink>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Peržiūrėti</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className="text-red-500"
                  variant="ghost"
                  size="icon"
                  onClick={handleClickOpen(row?._id)}
                >
                  <Trash2 className="h-4 w-4" />
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
