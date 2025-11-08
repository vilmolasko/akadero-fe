'use client';
import React from 'react';
import Image from 'next/image';
// import MoreDetails from './more-details';

export default function LecturerDetail({ data }) {
  return (
    <div className='lecturer-detail mt-12'>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <div className='relative aspect-square w-full rounded-lg overflow-hidden'>
          <Image
            src={data?.cover?.url || '/placeholder-image.png'}
            alt='Lecturer Cover Image'
            placeholder='blur'
            blurDataURL={data?.cover?.url || '/placeholder-image.png'}
            fill
            className='object-cover'
            sizes='(max-width: 640px) 100vw, 50vw'
          />
        </div>
        <div className='md:col-span-2'>
          <h2 className='text-lg md:text-3xl font-merriweather tracking-wider font-bold mb-0 md:mb-2'>
            {data?.name}
          </h2>
          {/* <p className='text-muted-foreground text-md md:text-normal tracking-wide mb-3'>
            {data?.email}
          </p> */}
          <p className='text-muted-foreground text-md md:text-normal tracking-wide mb-3'>
            {data?.description}
          </p>
        </div>
      </div>
      {/* <MoreDetails data={data} /> */}
    </div>
  );
}
