'use client';
import React from 'react';
import { useSearchParams } from 'next/navigation';
import * as api from '@/services';
import { useQuery } from '@tanstack/react-query';
import Table from '@/components/table/table';
import NewsletterRow from '../table/rows/newsletter';
import Breadcrumbs from '@/layouts/_admin/breadcrumb';

const TABLE_HEAD = [
  { id: 'email', label: 'El. paštas' },
  { id: 'createdAt', label: 'Data' },
  { id: '', label: 'Veiksmai', alignRight: true },
];

export default function StudentsList() {
  const searchParams = useSearchParams();
  const pageParam = searchParams.get('page');
  const searchParam = searchParams.get('search');
  const statusParam = searchParams.get('status');

  // Build query string from search params
  const queryString = React.useMemo(() => {
    const params = new URLSearchParams();

    if (pageParam) params.set('page', pageParam);
    if (searchParam) params.set('search', searchParam);
    if (statusParam) params.set('status', statusParam);

    return params.toString();
  }, [pageParam, searchParam, statusParam]);

  const { data, isPending: isLoading } = useQuery({
    queryKey: ['newsletters', searchParam, pageParam, statusParam],
    queryFn: () => api.getNewsletter(queryString),
  });

  return (
    <div className='space-y-6'>
      {/* Page Title */}
      <div className='flex items-center justify-between gap-3'>
        <div>
          <h1 className='text-2xl font-merriweather'>Naujienlaiškis</h1>
          {/* Breadcrumbs */}
          <Breadcrumbs />
        </div>
      </div>
      <Table
        headData={TABLE_HEAD}
        data={data}
        isLoading={isLoading}
        row={NewsletterRow}
        isSearch
      />
    </div>
  );
}
