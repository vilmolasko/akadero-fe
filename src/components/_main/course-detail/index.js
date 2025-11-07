'use client';
import React from 'react';
import Image from 'next/image';
import CourseSummary from './course-summry';
import MoreDetails from './more-details';

export default function CourseDetail({ data }) {
  console.log('Course Detail Data:', data);
  return (
    <div className='course-detail mt-12'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='relative aspect-square w-full rounded-lg overflow-hidden'>
          <Image
            src={data?.cover?.url || '/placeholder-image.png'}
            alt='Course Cover Image'
            placeholder='blur'
            blurDataURL={data?.cover?.url || '/placeholder-image.png'}
            fill
            className='object-cover'
            sizes='(max-width: 640px) 100vw, 50vw'
          />
        </div>
        <CourseSummary data={data} />
      </div>
      <MoreDetails data={data} />
    </div>
  );
}
