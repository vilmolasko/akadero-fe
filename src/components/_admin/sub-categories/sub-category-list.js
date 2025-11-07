'use client';
import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import * as api from '@/services';
import { useQuery } from '@tanstack/react-query';
import DeleteDialog from '@/components/dialog/delete'; // Updated import
import Table from '@/components/table/table';
import SubCategoryRow from '@/components/table/rows/sub-category-row';

const TABLE_HEAD = [
  { id: 'name', label: 'Subkategorijos pavadinimas' },
  { id: 'parent-category', label: 'Pagrindinė kategorija' },
  { id: 'status', label: 'Būsena' },
  { id: 'createdAt', label: 'Sukurta' },
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

export default function SubCategoryList({ categories }) {
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
      'categories',
      apicall,
      searchParam,
      pageParam,
      statusParam,
      categoryParam,
    ],
    queryFn: () => api.getSubCategoriesByAdmin(queryString),
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
        endPoint='deleteSubCategoryByAdmin'
        type={'Kategorija ištrinta'}
        deleteMessage={
          'Ar tikrai norite ištrinti šį elementą? Šio veiksmo negalima atšaukti ir visi susiję duomenys bus visam laikui pašalinti.'
        }
      />

      <Table
        headData={TABLE_HEAD}
        data={data}
        isLoading={isLoading}
        row={SubCategoryRow}
        handleClickOpen={handleClickOpen}
        isSearch
        filters={[
          {
            name: 'Kategorija',
            param: 'category',
            data: categories,
          },
          STATUS_FILTER,
        ]}
      />
    </>
  );
}
