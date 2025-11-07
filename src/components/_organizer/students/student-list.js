'use client';
import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import * as api from '@/services';
import { useQuery } from '@tanstack/react-query';
import DeleteDialog from '@/components/dialog/delete'; // Updated import
import Table from '@/components/table/table';
import StudentsRow from '@/components/table/rows/students-row';

const TABLE_HEAD = [
  { id: 'student', label: 'Studento vardas' },
  { id: 'course', label: 'Kurso pavadinimas' },
  { id: 'email', label: 'El. paštas' },
  { id: 'phone', label: 'Telefonas' },
  { id: 'status', label: 'Būsena' },
  { id: '', label: 'Veiksmai', alignRight: true },
];

export default function StudentsListMain() {
  const searchParams = useSearchParams();
  const pageParam = searchParams.get('page');
  const searchParam = searchParams.get('search');
  const courseParam = searchParams.get('course');
  const [open, setOpen] = useState(false);
  const [apicall, setApicall] = useState(false);
  const [id, setId] = useState(null);

  const { data: courses } = useQuery({
    queryKey: ['organizer-courses'],
    queryFn: () => api.getOrganizerCourses(queryString),
  });

  const allCourses = courses?.data;
  // Build query string from search params
  const queryString = React.useMemo(() => {
    const params = new URLSearchParams();

    if (pageParam) params.set('page', pageParam);
    if (searchParam) params.set('search', searchParam);
    if (courseParam) params.set('category', courseParam);

    return params.toString();
  }, [pageParam, searchParam, courseParam]);

  const { data, isPending: isLoading } = useQuery({
    queryKey: ['students', apicall, searchParam, pageParam, courseParam],
    queryFn: () => api.getStudentsByOrganizer(queryString),
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
        endPoint='deleteStudentByOrganizer'
        type={'Mokinys ištrintas'}
        deleteMessage={
          'Ar tikrai norite ištrinti šį elementą? Šio veiksmo negalima atšaukti ir visi susiję duomenys bus visam laikui pašalinti.'
        }
      />

      <Table
        headData={TABLE_HEAD}
        data={data}
        isLoading={isLoading}
        row={StudentsRow}
        handleClickOpen={handleClickOpen}
        isSearch
        isOrganizer
        isStudents
        filters={[
          {
            name: 'Kursas',
            param: 'course',
            data: allCourses ?? [],
          },
        ]}
      />
    </>
  );
}
