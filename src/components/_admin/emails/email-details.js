'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from '@bprogress/next';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import * as api from '@/services';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import DeleteConfirmDialog from '@/components/delete-confirm-dialog';
import { fDate, fDateTime } from '@/utils/formatTime';

export default function EmailThreadDetails({ id }) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [message, setMessage] = useState('');
  const [subject, setSubject] = useState('');
  const [status, setStatus] = useState('open');
  const [deleteOpen, setDeleteOpen] = useState(false);

  const { data, isPending, refetch } = useQuery({
    queryKey: ['admin-email-thread', id],
    queryFn: () => api.getEmailThreadByAdmin(id),
    enabled: !!id,
    refetchInterval: 30000,
    retry: false,
  });

  const thread = data?.data;

  useEffect(() => {
    if (thread?.status) {
      setStatus(thread.status);
    }
  }, [thread?.status]);

  const groupedMessages = useMemo(() => {
    const groups = {};

    (thread?.messages || [])
      .slice()
      .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
      .forEach((item) => {
        const dayKey = fDate(item?.createdAt);
        if (!groups[dayKey]) groups[dayKey] = [];
        groups[dayKey].push(item);
      });

    return Object.entries(groups);
  }, [thread?.messages]);

  const { mutate: replyToThread, isPending: isReplying } = useMutation({
    mutationFn: api.replyEmailThreadByAdmin,
    onSuccess: (res) => {
      toast.success(res?.message || 'Atsakymas išsiųstas');
      setMessage('');
      refetch();
      queryClient.invalidateQueries({ queryKey: ['admin-email-threads'] });
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || 'Nepavyko išsiųsti atsakymo');
    },
  });

  const { mutate: deleteThread, isPending: isDeleting } = useMutation({
    mutationFn: api.deleteEmailThreadByAdmin,
    onSuccess: (res) => {
      toast.success(res?.message || 'Tema ištrinta');
      queryClient.invalidateQueries({ queryKey: ['admin-email-threads'] });
      router.push('/admin/emails');
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || 'Nepavyko ištrinti temos');
    },
  });

  const onReply = (e) => {
    e.preventDefault();

    if (!message.trim()) {
      toast.error('Reply message is required');
      return;
    }

    const payload = {
      id,
      message: message.trim(),
      status,
    };

    if (subject.trim()) payload.subject = subject.trim();

    replyToThread(payload);
  };

  if (isPending) {
    return (
      <Card className="p-6">
        <p>Kraunama...</p>
      </Card>
    );
  }

  if (!thread?._id) {
    return (
      <Card className="p-6">
        <p>Temos duomenų rasti nepavyko.</p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <DeleteConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Ištrinti temą?"
        description="Patvirtinus, tema su visais susirašinėjimo įrašais bus negrįžtamai pašalinta."
        confirmLabel={isDeleting ? 'Trinama...' : 'Ištrinti'}
        cancelLabel="Atšaukti"
        onConfirm={() => deleteThread(id)}
        loading={isDeleting}
      />

      <Card className="p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">{thread?.subject || '-'}</h2>
            <p className="text-sm text-muted-foreground">
              {thread?.from?.name || '-'} ({thread?.from?.email || '-'})
            </p>
            <p className="text-sm text-muted-foreground">
              Sukurta: {thread?.createdAt ? fDateTime(thread?.createdAt) : '-'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Badge
              variant={thread?.status === 'open' ? 'default' : 'secondary'}
              className={
                thread?.status === 'open'
                  ? 'bg-green-100 text-green-800 hover:bg-green-100'
                  : 'bg-slate-200 text-slate-700 hover:bg-slate-200'
              }
            >
              {thread?.status === 'open' ? 'Open' : 'Closed'}
            </Badge>

            <Button variant="destructive" onClick={() => setDeleteOpen(true)}>
              Ištrinti
            </Button>
          </div>
        </div>
      </Card>

      <Card className="p-5 space-y-5">
        {groupedMessages.length === 0 ? (
          <p className="text-sm text-muted-foreground">Žinučių dar nėra.</p>
        ) : (
          groupedMessages.map(([day, list]) => (
            <div key={day} className="space-y-3">
              <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                {day}
              </p>

              <div className="space-y-3">
                {list.map((item) => {
                  const isIncoming = item?.direction === 'incoming';

                  return (
                    <div
                      key={item?._id || `${item?.createdAt}-${item?.text}`}
                      className={`flex ${isIncoming ? 'justify-start' : 'justify-end'}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-xl px-4 py-3 text-sm shadow-sm ${
                          isIncoming
                            ? 'bg-slate-100 text-slate-900'
                            : 'bg-primary text-primary-foreground'
                        }`}
                      >
                        {item?.subject && (
                          <p className="text-xs opacity-80 mb-1">
                            {item?.subject}
                          </p>
                        )}
                        <p className="whitespace-pre-wrap break-words">
                          {item?.text || 'Be teksto'}
                        </p>
                        <p className="mt-2 text-[11px] opacity-80">
                          {fDateTime(item?.createdAt)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </Card>

      <Card className="p-5">
        <form onSubmit={onReply} className="space-y-4">
          <h3 className="text-lg font-semibold">Atsakyti į temą</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email-subject">Tema (nebūtina)</Label>
              <Input
                id="email-subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Re: ..."
              />
            </div>

            <div className="space-y-2">
              <Label>Būsena</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Pasirinkite būseną" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email-message">Žinutė</Label>
            <Textarea
              id="email-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Parašykite atsakymą..."
              rows={6}
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={isReplying}>
              {isReplying ? 'Siunčiama...' : 'Siųsti atsakymą'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
