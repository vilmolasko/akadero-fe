'use client';
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from '@bprogress/next';
import { Card } from '@/components/ui/card';
import {
  Table as ShadTable,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Pagination from './pagination';
import NotFound from '@/components/not-found';
import { useDebounce } from '@/hooks/use-debounce';

export default function CustomTable({
  headData,
  data,
  detailsData,
  isLoading,
  row: RowComponent,
  handleClickOpen,
  isOrganizer,
  isStudents,
  isSearch = false,
  filters = [],
  ...rest
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [state, setState] = useState({ search: '' });
  const [searchInput, setSearchInput] = useState('');
  const debouncedSearch = useDebounce(searchInput, 500);

  // ✅ Pagrindiniai API duomenys
  const mainData = detailsData ? detailsData : data?.data || [];

  // ✅ Bendras puslapių skaičius (iš API)
  const totalPages = data?.count || 1;

  // ✅ Dabartinis puslapis (iš API arba URL)
  const currentPage = data?.page || Number(searchParams.get('page')) || 1;

  useEffect(() => {
    if (!isSearch) return;
    const params = new URLSearchParams(searchParams.toString());
    if (debouncedSearch) {
      params.set('search', debouncedSearch);
      params.set('page', '1');
    } else {
      params.delete('search');
    }
    router.replace(`?${params.toString()}`, { scroll: false });
  }, [debouncedSearch]);

  const updateUrlParam = (param, value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === 'none' || value === '' || value === null) {
      params.delete(param);
    } else {
      params.set(param, value);
    }
    if (param !== 'page') params.set('page', '1');
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const handleFilterChange = (param, value) => {
    updateUrlParam(param, value);
  };

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const paramsObject = {};
    for (const [key, value] of params.entries()) {
      paramsObject[key] = value;
    }
    setState((prev) => ({ ...prev, ...paramsObject }));
    if (params.get('search')) {
      setSearchInput(params.get('search'));
    }
  }, [searchParams]);

  return (
    <Card className='p-0'>
      {(isSearch || filters?.length > 0) && (
        <div className='flex items-center justify-between p-4'>
          {isSearch && (
            <div className='flex-1 max-w-md'>
              <Input
                placeholder='Ieškoti...'
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className='w-[250px]'
              />
            </div>
          )}

          {filters?.length > 0 && (
            <div className='flex gap-4 ml-4'>
              {filters.map((item) => {
                const currentValue = searchParams.get(item.param) || 'none';
                return (
                  <Select
                    key={item.param}
                    value={currentValue}
                    onValueChange={(val) =>
                      handleFilterChange(item.param, val)
                    }>
                    <SelectTrigger
                      className={`w-full ${
                        isStudents ? 'sm:w-80' : 'sm:w-40'
                      }`}>
                      <SelectValue placeholder={item.name} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='none'>Visi {item.name}</SelectItem>
                      {item.data.map((v) => (
                        <SelectItem
                          key={v.slug}
                          value={v.slug}>
                          {v.name || v.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                );
              })}
            </div>
          )}
        </div>
      )}

      {!isLoading && mainData.length === 0 ? (
        <NotFound
          title='Duomenų nerasta'
          description='Nėra jokių įrašų.'
          showButton
          buttonText='Naršyti organizatorius'
        />
      ) : (
        <>
          <div className='border'>
            <ShadTable>
              <TableHeader>
                <TableRow>
                  {headData.map((head) => (
                    <TableHead
                      key={head.id}
                      className={head.alignRight ? 'text-right' : 'text-left'}>
                      {head.label}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {(isLoading ? Array.from(new Array(6)) : mainData).map(
                  (item, index) => (
                    <RowComponent
                      key={isLoading ? index : item._id}
                      row={item}
                      index={index}
                      isLoading={isLoading}
                      handleClickOpen={handleClickOpen}
                      isOrganizer={isOrganizer}
                      {...rest}
                    />
                  )
                )}
              </TableBody>
            </ShadTable>
          </div>

          {/* ✅ Puslapių navigacija */}
          {!isLoading && mainData.length > 0 && (
            <div className='p-4'>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => updateUrlParam('page', page)}
              />
            </div>
          )}
        </>
      )}
    </Card>
  );
}
