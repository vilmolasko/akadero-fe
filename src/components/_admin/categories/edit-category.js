'use client';
import CategoryForm from '@/components/forms/category';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import * as api from '@/services';
import toast from 'react-hot-toast';

export default function EditCategory({ slug }) {
  const { data, isPending } = useQuery({
    queryKey: ['category', slug],
    queryFn: () => api.getCategoryByAdmin(slug),
    retry: false,
    enabled: !!slug,
    throwOnError: false,
    onError: (err) => {
      toast.error(err?.response?.data?.message || 'Something went wrong!');
    },
  });
  return (
    <CategoryForm
      currentCategory={data?.data}
      isLoading={isPending}
    />
  );
}
