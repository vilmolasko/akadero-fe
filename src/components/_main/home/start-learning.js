'use client';

import React from 'react';
import CourseListCard from '@/components/cards/course-list-card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function StartLearning({ startCourses }) {
  return (
    <div className='start-learning py-5 md:py-8'>
      {/* Header */}
      <div className='start-learning-content max-w-[820px] mx-auto'>
        <h1 className='text-2xl sm:text-3xl md:text-5xl font-bold font-merriweather text-center leading-relaxed tracking-wider'>
          Populiariausi kursai
        </h1>
      </div>

      <div className='relative mt-6 md:mt-10 space-y-4'>
        {startCourses?.map((course, i) => (
          <CourseListCard course={course} />
        ))}
        <div className='text-center'>
          <Button
            href={'/courses'}
            variant='secondary'
            size={'lg'}>
            Žiūrėti daugiau
            <ArrowRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
