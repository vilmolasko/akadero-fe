'use client';

import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from '@bprogress/next';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import * as api from '@/services';
import Table from '@/components/table/table';
import EmailThreadRow from '@/components/table/rows/email-thread-row';
import DeleteConfirmDialog from '@/components/delete-confirm-dialog';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const TABLE_HEAD = [
  { id: 'sender', label: 'Siuntėjas' },
  { id: 'subject', label: 'Tema' },
  { id: 'status', label: 'Būsena' },
  { id: 'incoming', label: 'Gautos' },
  { id: 'outgoing', label: 'Siųstos' },
  { id: 'lastMessageAt', label: 'Pask. žinutė' },
  { id: '', label: 'Veiksmai', alignRight: true },
];

const STATUS_FILTER = {
  name: 'Būsena',
  param: 'status',
  data: [
    { name: 'Open', slug: 'open' },
    { name: 'Closed', slug: 'closed' },
  ],
};

const HAS_REPLY_FILTER = {
  name: 'Atsakymas',
  param: 'hasReply',
  data: [
    { name: 'Yra', slug: 'true' },
    { name: 'Nėra', slug: 'false' },
  ],
};

export default function EmailThreadsList() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const page = searchParams.get('page') || '1';
  const limit = searchParams.get('limit') || '10';
  const search = searchParams.get('search') || '';
  const status = searchParams.get('status') || '';
  const hasReply = searchParams.get('hasReply') || '';
  const fromEmail = searchParams.get('fromEmail') || '';
  const subject = searchParams.get('subject') || '';
  const startDate = searchParams.get('startDate') || '';
  const endDate = searchParams.get('endDate') || '';

  const params = useMemo(
    () => ({
      page,
      limit,
      search,
      status,
      hasReply,
      fromEmail,
      subject,
      startDate,
      endDate,
    }),
    [
      page,
      limit,
      search,
      status,
      hasReply,
      fromEmail,
      subject,
      startDate,
      endDate,
    ],
  );

  const { data, isPending } = useQuery({
    queryKey: ['admin-email-threads', params],
    queryFn: () => api.getEmailThreadsByAdmin(params),
  });

  const { mutate: deleteThread, isPending: isDeleting } = useMutation({
    mutationFn: api.deleteEmailThreadByAdmin,
    onSuccess: (res) => {
      toast.success(res?.message || 'El. laiško tema ištrinta');
      queryClient.invalidateQueries({ queryKey: ['admin-email-threads'] });
      setDeleteOpen(false);
      setSelectedId(null);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || 'Įvyko klaida');
    },
  });

  const updateParam = (key, value) => {
    const next = new URLSearchParams(searchParams.toString());

    if (!value) {
      next.delete(key);
    } else {
      next.set(key, value);
    }

    next.set('page', '1');
    router.replace(`?${next.toString()}`, { scroll: false });
  };

  const resetFilters = () => {
    router.replace('/admin/emails', { scroll: false });
  };

  const handleClickOpen = (id) => () => {
    setSelectedId(id);
    setDeleteOpen(true);
  };

  return (
    <>
      <DeleteConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Ištrinti el. laiško temą?"
        description="Šis veiksmas negrįžtamas. Tema ir visi jos laiškai bus pašalinti."
        confirmLabel={isDeleting ? 'Trinama...' : 'Ištrinti'}
        cancelLabel="Atšaukti"
        onConfirm={() => deleteThread(selectedId)}
        loading={isDeleting}
      />

      <Card className="p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          <Input
            placeholder="Siuntėjo el. paštas"
            value={fromEmail}
            onChange={(e) => updateParam('fromEmail', e.target.value)}
          />
          <Input
            placeholder="Tema"
            value={subject}
            onChange={(e) => updateParam('subject', e.target.value)}
          />
          <Input
            type="date"
            placeholder="Nuo"
            value={startDate}
            onChange={(e) => updateParam('startDate', e.target.value)}
          />
          <Input
            type="date"
            placeholder="Iki"
            value={endDate}
            onChange={(e) => updateParam('endDate', e.target.value)}
          />
        </div>

        <div className="flex justify-end">
          <Button variant="outline" onClick={resetFilters}>
            Išvalyti filtrus
          </Button>
        </div>
      </Card>

      <Table
        headData={TABLE_HEAD}
        data={data}
        isLoading={isPending}
        row={EmailThreadRow}
        handleClickOpen={handleClickOpen}
        isSearch
        filters={[STATUS_FILTER, HAS_REPLY_FILTER]}
      />
    </>
  );
}
