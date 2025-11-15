import React from 'react';
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import Image from 'next/image';
import NextLink from 'next/link';

export default function ProductCard({ organizer }) {
  return (
    <Card
      className={'relative  hover:bg-muted transition-background duration-500'}>
      <NextLink href={`/organizers/${organizer?._id}`}>
        <div className='relative h-40 '>
          <Image
            src={organizer?.logo?.url || '/placeholder-image.png'}
            alt='Product Image'
            fill
            className='object-cover cursor-pointer'
            placeholder='blur'
            blurDataURL={organizer?.logo?.url}
          />
        </div>
      </NextLink>
      <CardContent className={'px-3.5 '}>
        <CardTitle className='font-semibold cursor-pointer text-normal tracking-wider'>
          <NextLink href={`/organizers/${organizer?._id}`}>
            {organizer?.name}
          </NextLink>
        </CardTitle>

        <CardDescription className='text-md text-secondary mt-1 line-clamp-2  tracking-wider'>
          {organizer?.description}
        </CardDescription>
      </CardContent>
    </Card>
  );
}
