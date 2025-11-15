import React from 'react';
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import Image from 'next/image';

import NextLink from 'next/link';

export default function LecturerCard({ lecturer }) {
  return (
    <Card
      className={'relative  hover:bg-muted transition-background duration-500'}>
      <NextLink href={`/lecturers/${lecturer?._id}`}>
        <div className='relative h-40 '>
          <Image
            src={lecturer?.cover?.url || '/placeholder-image.png'}
            alt={lecturer?.name}
            fill
            className='object-cover cursor-pointer'
            placeholder='blur'
            blurDataURL='/lecturer-img.png'
          />
        </div>
      </NextLink>
      <CardContent className={'px-3.5 '}>
        <CardTitle className='font-semibold cursor-pointer text-normal tracking-wider'>
          <NextLink href={`/lecturers/${lecturer?._id}`}>
            {lecturer?.name}
          </NextLink>
        </CardTitle>
        <CardDescription className='text-md text-secondary mt-1 line-clamp-2  tracking-wider'>
          {lecturer?.description}
        </CardDescription>
        {/* <div className='flex items-center gap-0.5 mt-2'>
          <span className='text-sm font-medium text-secondary'>4.8</span>
          <Rating
            value={4}
            size={16}
          />
          <span className=' text-sm font-medium text-secondary ml-2'>
            (1245)
          </span>
        </div> */}
      </CardContent>
    </Card>
  );
}
