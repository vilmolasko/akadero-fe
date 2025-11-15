import DataTable from '@/components/data-table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import NextLink from 'next/link';
import { LocateFixed, Mail, Phone, Rss } from 'lucide-react';
import React from 'react';

const columns = [
  { key: 'name', header: 'Pavadinimas' },
  { key: 'category', header: 'Kategorija' },
  { key: 'lecturers', header: 'Mokytojai' },
  { key: 'status', header: 'Būsena' },
];

export default function StudentsDetails() {
  // Pavyzdiniai duomenys apie studentą ir kursus
  const student = {
    name: 'Acme akademija',
    email: 'kontaktai@acme.dev',
    avatar: '/detail-img.png',
    phone: '+12 12323434 43',
    location: 'Jungtiniai Arabų Emyratai',
  };

  return (
    <div className='space-y-6'>
      <Card className='p-6'>
        <div className='flex flex-col md:flex-row items-center md:items-start gap-6'>
          <Avatar className='h-24 w-24 md:h-32 md:w-32'>
            <AvatarImage
              src={student.avatar}
              alt='avatar'
            />
            <AvatarFallback>{student.name[0]}</AvatarFallback>
          </Avatar>
          <div className='flex-1 w-full'>
            <div className='flex flex-col gap-2'>
              <h3 className='text-xl md:text-3xl font-bold'>{student.name}</h3>
              <span className='text-base md:text-lg text-muted-foreground'>
                {student.email}
              </span>
            </div>
            <div className='flex flex-col sm:flex-row gap-3 mt-4'>
              <NextLink
                href={`tel:${student.phone.replace(/ /g, '')}`}
                className='flex items-center gap-2 hover:text-primary transition-colors duration-300'>
                <Phone size={18} />
                <span className='truncate'>{student.phone}</span>
              </NextLink>
              <NextLink
                href='https://acme.dev'
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center gap-2 hover:text-primary transition-colors duration-300'>
                <LocateFixed size={18} />
                <span className='truncate'>{student.location}</span>
              </NextLink>
            </div>
          </div>
        </div>
      </Card>
      <Card className='p-4'>
        <DataTable
          resource='courses'
          columns={columns}
          searchKeys={['name', 'category', 'lecturers']}
          pageSizeOptions={[5, 10, 20]}
          emptyLabel='No courses found.'
          path='admin'
        />
      </Card>
    </div>
  );
}
