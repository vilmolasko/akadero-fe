'use client';
import React from 'react';
import Image from 'next/image';
import OrganizerSummary from './organizer-summry';
import MoreDetails from './more-details';

export default function OrganizerDetail({ data, courses }) {
  return (
    <div className='organizer-detail mt-12'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='relative aspect-square w-full rounded-lg overflow-hidden'>
          <Image
            src={data?.cover?.url || '/placeholder-image.png'}
            alt='Organizer Cover Image'
            placeholder='blur'
            blurDataURL={data?.cover?.url || '/placeholder-image.png'}
            fill
            className='object-cover'
            sizes='(max-width: 640px) 100vw, 50vw'
          />
        </div>
        <OrganizerSummary data={data} />
      </div>
      <MoreDetails
        courses={courses}
        data={data}
      />
    </div>
  );
}
