'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import NextLink from 'next/link';
import { Mail, Phone, Rss } from 'lucide-react';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import * as api from '@/services';
import toast from 'react-hot-toast';
import Table from '@/components/table/table';
import CourseDetailsRow from '@/components/table/rows/course-details-row';

const TABLE_HEAD = [
  { id: 'name', label: 'Pavadinimas' },
  { id: 'category', label: 'Kategorija' },
  { id: 'organizers', label: 'Organizatoriai' },
  { id: 'lecturers', label: 'Dėstytojai' },
  { id: 'price', label: 'Kaina' },
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
  ],
};

export default function OrganizersDetails({ id }) {
  const { data, isPending } = useQuery({
    queryKey: ['organizer-details', id],
    queryFn: () => api.getOrganizerByAdmin(id),
    retry: false,
    enabled: !!id,
    throwOnError: false,
    onError: (err) => {
      toast.error(err?.response?.data?.message || 'Something went wrong!');
    },
  });

  const organizer = data?.data?.organizer;

  return (
    <div className='space-y-4'>
      <Card className='p-4'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
          <div className='md:col-span-3'>
            <div className='flex items-center gap-4'>
              <Avatar className='h-25 w-25 cursor-pointer'>
                <AvatarImage
                  src={organizer?.logo?.url}
                  alt='avatar'
                />
                <AvatarFallback>
                  {organizer?.name.slice(0, 2)?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className='text-lg md:text-2xl tracking-wide leading-normal font-bold'>
                  {organizer?.name}
                </h3>
                <h6 className='text-md md:text-normal tracking-wide '>
                  {organizer?.description}
                </h6>
              </div>
            </div>
          </div>
          <div className='md:col-span-1'>
            <div className='space-y-3'>
              <NextLink
                href={`mailto:${organizer?.email}`}
                className='flex items-center gap-2 hover:text-primary transition-colors duration-300'>
                <Mail size={18} />
                {organizer?.email}
              </NextLink>
              <NextLink
                href={`tel:${organizer?.phone}`}
                className='flex items-center gap-2 hover:text-primary transition-colors duration-300'>
                <Phone size={18} />
                {organizer?.phone}
              </NextLink>
              <NextLink
                href=''
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center gap-2 hover:text-primary transition-colors duration-300'>
                <Rss size={18} />
                {organizer?.address}
              </NextLink>
            </div>
          </div>
        </div>
      </Card>
      <Table
        headData={TABLE_HEAD}
        detailsData={data?.data?.courses}
        isLoading={isPending}
        row={CourseDetailsRow}
        isSearch
        filters={[STATUS_FILTER]}
      />
    </div>
  );
}
