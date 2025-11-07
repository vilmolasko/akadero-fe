'use client';

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from '@bprogress/next';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

function StatusBadge({ status }) {
  const base = 'px-2 py-1 text-xs font-medium rounded-full';
  const colors = {
    active: 'bg-green-100 text-green-700 border border-green-300',
    inactive: 'bg-gray-100 text-gray-700 border border-gray-300',
    pending: 'bg-yellow-100 text-yellow-700 border border-yellow-300',
    complete: 'bg-blue-100 text-blue-700 border border-blue-300',
  };
  return (
    <span
      className={`${base} ${colors[status] || 'bg-gray-100 text-gray-600'}`}>
      {status?.charAt(0).toUpperCase() + status?.slice(1) || 'Unknown'}
    </span>
  );
}

export default function CourseTable({
  columns,
  emptyLabel = 'No items found.',
  data,
  isFetching,
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 🔹 Extract URL params
  const initialSearch = searchParams.get('search') || '';
  const initialPage = Number(searchParams.get('page')) || 1;
  const initialLimit = Number(searchParams.get('limit')) || 5;

  // 🔹 Local States
  const [search, setSearch] = useState(initialSearch);
  const [debouncedSearch, setDebouncedSearch] = useState(initialSearch);
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);

  // 🔹 Debounce search
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(handler);
  }, [search]);

  // 🔹 Build query string — remove default values
  const queryString = useMemo(() => {
    const params = new URLSearchParams();

    if (debouncedSearch.trim()) params.set('search', debouncedSearch);
    if (page > 1) params.set('page', String(page)); // ✅ only if > 1
    if (limit !== 5) params.set('limit', String(limit)); // ✅ only if ≠ 5

    return params.toString();
  }, [debouncedSearch, page, limit]);

  // 🔹 Instantly update URL without scroll
  useEffect(() => {
    const newUrl = queryString ? `?${queryString}` : '';
    router.replace(newUrl, { scroll: false });
  }, [queryString, router]);

  // 🔹 Extract API data
  const list = data?.data?.courses || [];
  const totalPages = data?.count || 1;

  return (
    <div className='p-4 space-y-4'>
      {/* 🔍 Search + Limit */}
      <div className='flex items-center justify-between gap-3'>
        <Input
          placeholder='Ieškoti...'
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className='w-64'
        />

        <Select
          value={String(limit)}
          onValueChange={(v) => {
            setLimit(Number(v));
            setPage(1);
          }}>
          <SelectTrigger className='w-24'>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {[5, 10, 20].map((opt) => (
              <SelectItem
                key={opt}
                value={String(opt)}>
                {opt} / puslapis
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {/* 🔹 Table */}
      <div className={cn('rounded-md border')}>
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((col) => {
                return (
                  <TableHead key={col.key}>
                    <span>{col.header}</span>
                  </TableHead>
                );
              })}
            </TableRow>
          </TableHeader>

          <TableBody>
            {isFetching ? (
              <TableRow>
                <TableCell colSpan={columns.length + 1}>Kraunama...</TableCell>
              </TableRow>
            ) : list.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length + 1}>{emptyLabel}</TableCell>
              </TableRow>
            ) : (
              list.map((row) => (
                <TableRow key={row._id}>
                  {columns.map((col) => (
                    <TableCell key={col.key}>
                      {col.key === 'status' ? (
                        <StatusBadge status={row[col.key]} />
                      ) : col.key === 'price' ? (
                        `$${Number(row[col.key] ?? 0).toLocaleString()}`
                      ) : col.cell ? (
                        col.cell(row)
                      ) : (
                        String(row[col.key] ?? '')
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      {/* 🔹 Pagination */}
      <div className='flex justify-between items-center mt-4'>
        <p className='text-sm text-gray-500'>
          Puslapis {page} iš {totalPages}
        </p>
        <div className='flex items-center gap-2'>
          <Button
            variant='outline'
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1 || isFetching}>
            Ankstesnis
          </Button>
          <span>
            {page} / {totalPages}
          </span>
          <Button
            variant='outline'
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages || isFetching}>
            Toliau
          </Button>
        </div>
      </div>
    </div>
  );
}
