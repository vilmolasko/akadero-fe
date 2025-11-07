'use client';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import * as api from '@/services';
import toast from 'react-hot-toast';
import SubCategoryForm from '@/components/forms/sub-category';

export default function EditSubCategory({ slug, categories }) {
  const { data, isPending } = useQuery({
    queryKey: ['sub-category', slug],
    queryFn: () => api.getSubCategoryByAdmin(slug),
    retry: false,
    enabled: !!slug,
    throwOnError: false,
    onError: (err) => {
      toast.error(err?.response?.data?.message || 'Something went wrong!');
    },
  });
  return (
    <SubCategoryForm
      categories={categories}
      currentCategory={data?.data}
      isLoading={isPending}
    />
  );
}
