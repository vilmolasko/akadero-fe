'use client';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import * as api from '@/services';
import toast from 'react-hot-toast';
import OrganizerCourseForm from '@/components/forms/organizer-course';

export default function EditOrganizerCourse({ categories, lecturers, slug }) {
  const { data, isPending } = useQuery({
    queryKey: ['course  ', slug],
    queryFn: () => api.getCourseByOrganizer(slug),
    retry: false,
    enabled: !!slug,
    throwOnError: false,
    onError: (err) => {
      toast.error(err?.response?.data?.message || 'Something went wrong!');
    },
  });
  return (
    <OrganizerCourseForm
      currentCourse={data?.data}
      isLoading={isPending}
      categories={categories}
      lecturers={lecturers}
    />
  );
}
