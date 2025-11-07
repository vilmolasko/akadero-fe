'use client';
import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import * as api from '@/services';
import { useQuery } from '@tanstack/react-query';
import DeleteDialog from '@/components/dialog/delete';
import Table from '@/components/table/table';
import FeaturedCourseRow from '@/components/table/rows/featured-course-row';

const TABLE_HEAD = [
  { id: 'name', label: 'Pavadinimas' },
  { id: 'organizer', label: 'Organizatorius' },
  { id: 'cost', label: 'Kaina' },
  { id: 'status', label: 'Būsena' },
  { id: 'createdAt', label: 'Data' },
  { id: '', label: 'Veiksmai', alignRight: true },
];

const STATUS_FILTER = {
  name: 'Būsena',
  param: 'status',
  data: [
    { name: 'Aktyvus', slug: 'active' },
    { name: 'Neaktyvus', slug: 'inactive' },
    { name: 'Pasibaigęs', slug: 'expired' },
  ],
};

export default function FeaturedCourseList() {
  const searchParams = useSearchParams();
  const pageParam = searchParams.get('page');
  const searchParam = searchParams.get('search');
  const statusParam = searchParams.get('status');
  const organizerParam = searchParams.get('organizer');

  const [open, setOpen] = useState(false);
  const [apicall, setApicall] = useState(false);
  const [id, setId] = useState(null);

  // Build query string from search params
  const queryString = React.useMemo(() => {
    const params = new URLSearchParams();

    if (pageParam) params.set('page', pageParam);
    if (searchParam) params.set('search', searchParam);
    if (statusParam) params.set('status', statusParam);
    if (organizerParam) params.set('organizer', organizerParam);
    return params.toString();
  }, [pageParam, searchParam, statusParam, organizerParam]);

  const { data, isPending: isLoading } = useQuery({
    queryKey: [
      'featured-courses',
      apicall,
      searchParam,
      pageParam,
      statusParam,
      organizerParam,
    ],
    queryFn: () => api.getFeaturedCoursesByAdmin(queryString),
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
        endPoint='deleteFeaturedCourseByAdmin'
        type={'Rekomenduojamas kursas ištrintas'}
        deleteMessage={
          'Ar tikrai norite ištrinti šį elementą? Šio veiksmo negalima atšaukti ir visi susiję duomenys bus visam laikui pašalinti.'
        }
      />

      <Table
        headData={TABLE_HEAD}
        data={data}
        isLoading={isLoading}
        row={FeaturedCourseRow}
        handleClickOpen={handleClickOpen}
        isSearch
        filters={[STATUS_FILTER]}
      />
    </>
  );
}
