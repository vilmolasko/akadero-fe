'use client';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import * as api from '@/services';
import toast from 'react-hot-toast';
import LecturerForm from '@/components/forms/lecturer';

export default function OrganizerEditLecturer({ id }) {
  const { data, isPending } = useQuery({
    queryKey: ['organizer-lecturers', id],
    queryFn: () => api.getLecturerByOrganizer(id),
    retry: false,
    enabled: !!id,
    throwOnError: false,
    onError: (err) => {
      toast.error(err?.response?.data?.message || 'Something went wrong!');
    },
  });

  return (
    <LecturerForm
      currentLecturer={data?.data}
      isLoading={isPending}
    />
  );
}
