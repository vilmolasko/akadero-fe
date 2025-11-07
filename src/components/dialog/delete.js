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

export default function DeleteDialog({
  open,
  onClose,
  id,
  apicall,
  endPoint,
  type,
  deleteMessage,
}) {
  const { mutate, isPending: isLoading } = useMutation({
    mutationFn: () => api[endPoint](id),
    onSuccess: () => {
      toast.success(type);
      apicall((prev) => ({ ...prev, apicall: !prev.apicall }));
      onClose();
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || 'Something went wrong!');
    },
  });

  const handleDelete = () => {
    mutate();
  };

  return (
    <AlertDialog
      open={open}
      onOpenChange={(isOpen) => !isOpen && onClose()}>
      <AlertDialogContent className='sm:max-w-md'>
        <AlertDialogHeader>
          <div className='flex items-center space-x-2'>
            <div className='flex items-center justify-center rounded-full'>
              <AlertTriangle className='h-5 w-5 text-red-600' />
            </div>
            <AlertDialogTitle className='flex items-center'>
              Įspėjimas
            </AlertDialogTitle>
          </div>
        </AlertDialogHeader>

        <AlertDialogDescription className='text-md text-secondary'>
          {deleteMessage}
        </AlertDialogDescription>

        <AlertDialogFooter className='flex justify-end'>
          <AlertDialogCancel asChild>
            <Button
              variant='outline'
              onClick={onClose}
              disabled={isLoading}>
              Atšaukti
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              variant='destructive'
              onClick={handleDelete}
              disabled={isLoading}
              className='bg-red-600 text-white hover:bg-red-700'>
              {isLoading ? (
                <>
                  <div className='h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent mr-2' />
                  Ištrinama...
                </>
              ) : (
                'Ištrinti'
              )}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
