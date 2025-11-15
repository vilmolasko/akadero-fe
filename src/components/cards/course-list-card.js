import React from 'react';
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import Image from 'next/image';
// import { Rating } from '@/components/ui/rating';
import { Badge } from '@/components/ui/badge';
import NextLink from 'next/link';
import { useCurrencyFormat } from '@/hooks/formatCurrency';

export default function CourseListCard({ course }) {
  const fCurrency = useCurrencyFormat();
  return (
    <Card
      className={'relative  hover:bg-muted transition-background duration-500'}>
      <CardContent className={'px-3.5 '}>
        {course?.featured && (
          <Badge
            variant='destructive'
            className=' absolute top-2 left-2 z-30 rounded-sm text-md'>
            {course?.featuredLabel || 'TOP'}
          </Badge>
        )}
        {/* <Badge
          variant='destructive'
          className='absolute top-3 right-3 z-30'>
          3:30h
        </Badge> */}
        <div className='grid grid-cols-12 items-center gap-5'>
          <div className='col-span-12 sm:col-span-2'>
            <div className='relative aspect-[16/9] md:aspect-square w-full rounded-lg overflow-hidden '>
              <NextLink href={`/course/${course?.slug}`}>
                <Image
                  src={course?.cover?.url || '/placeholder-image.png'}
                  alt={course?.title}
                  fill
                  className='object-cover'
                  sizes='(max-width: 640px) 100vw, 50vw'
                />
              </NextLink>
            </div>
          </div>
          <div className='col-span-12 sm:col-span-10'>
            <CardTitle className='font-semibold cursor-pointer text-normal md:text-lg tracking-wider'>
              <NextLink href={`/course/${course?.slug}`}>
                {course?.title}
              </NextLink>
            </CardTitle>
            <CardDescription className='font-medium text-sm text-primary mt-1 tracking-wider'>
              {course?.categoryName}
            </CardDescription>
            <CardDescription className='text-md text-secondary mt-1 line-clamp-2  tracking-wider'>
              {course?.description}
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
            <div className='flex items-center  mt-2'>
              <span className=' text-lg font-bold text-foreground'>
                {fCurrency(course?.price)}
              </span>
              {/* <span className=' text-normal text-primary line-through ml-2'>
                (19.05)
              </span> */}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
