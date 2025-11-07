'use client';
import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import * as api from '@/services';
import { useQuery } from '@tanstack/react-query';
import DeleteDialog from '@/components/dialog/delete';
import Table from '@/components/table/table';
import CourseRow from '@/components/table/rows/course-row';

const TABLE_HEAD = [
  { id: 'name', label: 'Pavadinimas' },
  { id: 'price', label: 'Kaina' },
  { id: 'status', label: 'Būsena' },
  { id: 'createdAt', label: 'Data' },
  { id: '', label: 'Veiksmai', alignRight: true },
];

const STATUS_FILTER = {
  name: 'Būsena',
  param: 'status',
  data: [
    { name: 'Paskelbta', slug: 'published' },
    { name: 'Laukiama', slug: 'pending' },
    { name: 'Vykdoma', slug: 'inProgress' },
    { name: 'Užbaigta', slug: 'completed' },
    { name: 'Archyvuota', slug: 'archived' },
  ],
};

export default function CourseList({ allCategories }) {
  const searchParams = useSearchParams();
  const pageParam = searchParams.get('page');
  const searchParam = searchParams.get('search');
  const statusParam = searchParams.get('status');
  const categoryParam = searchParams.get('category');
  const [open, setOpen] = useState(false);
  const [apicall, setApicall] = useState(false);
  const [id, setId] = useState(null);

  // Build query string from search params
  const queryString = React.useMemo(() => {
    const params = new URLSearchParams();

    if (pageParam) params.set('page', pageParam);
    if (searchParam) params.set('search', searchParam);
    if (statusParam) params.set('status', statusParam);
    if (categoryParam) params.set('category', categoryParam);

    return params.toString();
  }, [pageParam, searchParam, statusParam, categoryParam]);

  const { data, isPending: isLoading } = useQuery({
    queryKey: [
      'courses',
      apicall,
      searchParam,
      pageParam,
      statusParam,
      categoryParam,
    ],
    queryFn: () => api.getCoursesByOrganizer(queryString),
  });

  const handleClickOpen = (prop) => () => {
    setId(prop);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <DeleteDialog
        open={open}
        onClose={handleClose}
        id={id}
        apicall={setApicall}
        endPoint='deleteCourseByOrganizer'
        type={'Course deleted'}
        deleteMessage={
          'Ar tikrai norite ištrinti šį elementą? Šio veiksmo negalima atšaukti ir visi susiję duomenys bus visam laikui pašalinti.'
        }
      />

      <Table
        headData={TABLE_HEAD}
        data={data}
        isLoading={isLoading}
        row={CourseRow}
        handleClickOpen={handleClickOpen}
        isSearch
        isOrganizer
        filters={[
          {
            name: 'Kategorija',
            param: 'category',
            data: allCategories ?? [],
          },
          ,
          STATUS_FILTER,
        ]}
      />
    </>
  );
}
