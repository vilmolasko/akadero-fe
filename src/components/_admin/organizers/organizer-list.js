'use client';
import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import * as api from '@/services';
import { useQuery } from '@tanstack/react-query';
import Table from '@/components/table/table';
import UpdateOrganizerDialog from '@/components/dialog/updateOrganizer';
import OrganizerRow from '@/components/table/rows/organizer-row';

const TABLE_HEAD = [
  { id: 'name', label: 'Pavadinimas' },
  { id: 'email', label: 'El. paštas' },
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

export default function OrganizerList() {
  const searchParams = useSearchParams();
  const pageParam = searchParams.get('page');
  const searchParam = searchParams.get('search');
  const statusParam = searchParams.get('status');
  const [open, setOpen] = useState(false);
  const [apicall, setApicall] = useState(false);
  const [selectedOrganizer, setSelectedOrganizer] = useState({
    id: null,
    status: null,
  });

  const queryString = React.useMemo(() => {
    const params = new URLSearchParams();
    if (pageParam) params.set('page', pageParam);
    if (searchParam) params.set('search', searchParam);
    if (statusParam) params.set('status', statusParam);
    return params.toString();
  }, [pageParam, searchParam, statusParam]);

  const { data, isPending: isLoading } = useQuery({
    queryKey: ['organizers', apicall, searchParam, pageParam, statusParam],
    queryFn: () => api.getOrganizersByAdmin(queryString),
  });

  const handleClickOpen = (organizer) => {
    setSelectedOrganizer({ id: organizer.id, status: organizer.status });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      setSelectedOrganizer({ id: null, status: null });
    }, 2000);
  };
  return (
    <>
      <UpdateOrganizerDialog
        open={open}
        onClose={handleClose}
        id={selectedOrganizer.id}
        status={selectedOrganizer.status}
        apicall={setApicall}
        endPoint='updateOrganizersByAdmin'
        type={'Būsena sėkmingai atnaujinta'}
        deleteMessage={`Ar tikrai norite pažymėti šį organizatorių kaip ${
          selectedOrganizer.status === 'approved' ? 'neaktyvus' : 'Patvirtinta'
        }?`}
      />

      <Table
        headData={TABLE_HEAD}
        data={data}
        isLoading={isLoading}
        row={OrganizerRow}
        handleClickOpen={handleClickOpen}
        isSearch
        filters={[STATUS_FILTER]}
      />
    </>
  );
}
