'use client';
import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';
import * as api from '@/services';

export default function UpdateOrganizerDialog({
  open,
  onClose,
  id,
  status,
  apicall,
  endPoint,
  type,
  deleteMessage,
}) {
  const { mutate, isPending: isLoading } = useMutation({
    mutationFn: () => api[endPoint](id),
    onSuccess: () => {
      toast.success(type);
      apicall((prev) => !prev);
      onClose();
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || 'Something went wrong!');
    },
  });
  console.log(id, status, 'hello');
  const handleUpdate = () => {
    mutate();
  };

  return (
    <AlertDialog
      open={open}
      onOpenChange={(isOpen) => !isOpen && onClose()}>
      <AlertDialogContent className='sm:max-w-md'>
        <AlertDialogHeader>
          <div className='flex items-center space-x-2'>
            <AlertTriangle className='h-5 w-5 text-yellow-600' />
            <AlertDialogTitle>Atnaujinimo būsena</AlertDialogTitle>
          </div>
        </AlertDialogHeader>

        <AlertDialogDescription className='text-md text-secondary'>
          {deleteMessage}
        </AlertDialogDescription>

        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button
              variant='outline'
              disabled={isLoading}>
              Atšaukti
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              variant='default'
              onClick={handleUpdate}
              disabled={isLoading}
              className='bg-blue-600 hover:bg-blue-700'>
              {isLoading
                ? 'Atnaujinama...'
                : `Pažymėti kaip ${
                    status === 'approved' ? 'Atmesti' : 'Patvirtinti'
                  }`}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
