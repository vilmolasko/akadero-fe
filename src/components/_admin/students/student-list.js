'use client';
import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import * as api from '@/services';
import { useQuery } from '@tanstack/react-query';
import DeleteDialog from '@/components/dialog/delete'; // Updated import
import Table from '@/components/table/table';
import StudentsRow from '@/components/table/rows/students-row';

const TABLE_HEAD = [
  { id: 'name', label: 'Pavadinimas' },
  { id: 'email', label: 'El. paštas' },
  { id: 'phone', label: 'Telefonas' },
  { id: 'status', label: 'Būsena' },
  { id: '', label: 'Veiksmai', alignRight: true },
];

const STATUS_FILTER = {
  name: 'Būsena',
  param: 'status',
  data: [
    { name: 'Aktyvus', slug: 'active' },
    { name: 'Neaktyvus', slug: 'inactive' },
  ],
};

export default function StudentsList() {
  const searchParams = useSearchParams();
  const pageParam = searchParams.get('page');
  const searchParam = searchParams.get('search');
  const statusParam = searchParams.get('status');
  const [open, setOpen] = useState(false);
  const [apicall, setApicall] = useState(false);
  const [id, setId] = useState(null);

  // Build query string from search params
  const queryString = React.useMemo(() => {
    const params = new URLSearchParams();

    if (pageParam) params.set('page', pageParam);
    if (searchParam) params.set('search', searchParam);
    if (statusParam) params.set('status', statusParam);

    return params.toString();
  }, [pageParam, searchParam, statusParam]);

  const { data, isPending } = useQuery({
    queryKey: ['categories', apicall, searchParam, pageParam, statusParam],
    queryFn: () => api.getStudentsByAdmin(queryString),
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
        endPoint='deleteStudentByAdmin'
        type={'Mokinys ištrintas'}
        deleteMessage={
          'Ar tikrai norite ištrinti šį elementą? Šio veiksmo negalima atšaukti ir visi susiję duomenys bus visam laikui pašalinti.'
        }
      />

      <Table
        headData={TABLE_HEAD}
        data={data}
        isLoading={isPending || typeof data === undefined}
        row={StudentsRow}
        handleClickOpen={handleClickOpen}
        isSearch
        filters={[STATUS_FILTER]}
      />
    </>
  );
}
