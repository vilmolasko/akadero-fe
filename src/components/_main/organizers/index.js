'use client';

import { useState } from 'react';
import Pagination from '@/components/ui/pagination';
import React from 'react';
import UserOrganizersList from './listing';
import { useSearchParams } from 'next/navigation';
// api
import * as api from 'src/services';
import { useQuery } from '@tanstack/react-query';
import OrganizerFilter from './filter';
import SearchBar from '../filters/search';
import { Spinner } from '@/components/ui/spinner';

const getSearchParams = (searchParams, page) => {
  const params = new URLSearchParams(searchParams.toString());

  // ✅ convert all values to lowercase
  for (const [key, value] of params.entries()) {
    params.set(key, value.toLowerCase());
  }

  // ✅ page number for pagination
  if (page) params.set('page', page);

  const queryString = params.toString();
  return queryString.length ? '?' + queryString : '';
};

export default function OrganizersList({ filters }) {
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);

  const searchQuery = getSearchParams(searchParams, currentPage).replace(
    /^\?/,
    ''
  );

  const { data, isPending: isLoading } = useQuery({
    queryKey: ['organizers', searchQuery],
    queryFn: () => api.getOrganizers(searchQuery), // keep ? here
    keepPreviousData: true,
  });

  // pagination data from API
  const totalItems = data?.count || data?.total || data?.totalPages || 0; // handles both cases
  const itemsPerPage = data?.limit || data?.data?.length || 10;
  const totalPages =
    data?.totalPages ||
    data?.data?.length ||
    Math.ceil(totalItems / itemsPerPage);

  //  show range like 1–12, 13–24
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);
  return (
    <div className='courses-list mt-4 md:mt-8 space-y-4'>
      <div className='filters grid grid-cols-1 md:grid-cols-2  gap-4'>
        <OrganizerFilter
          filters={filters}
          isLoading={isLoading}
        />
        <SearchBar />
      </div>
      {isLoading ? (
        <div className='h-50 flex items-center justify-center '>
          <Spinner className='size-10' />
        </div>
      ) : (
        <UserOrganizersList organizers={data?.data} />
      )}
      {/* Pagination */}
      {!isLoading && totalItems > 0 && (
        <div className='flex flex-col md:flex-row justify-between items-center gap-2 mt-6'>
          <h6 className='text-md md:text-base font-medium text-foreground'>
            Rodoma {startItem}–{endItem} iš {totalItems} Organizatoriai
          </h6>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      )}
    </div>
  );
}
