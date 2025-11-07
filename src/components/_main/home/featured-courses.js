'use client';
import React from 'react';
import CourseListCard from '@/components/cards/course-list-card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function FeaturedCourses({ featuredCourses }) {
  return (
    <div className='featured-courses py-4'>
      {/* Header */}
      <div className='featured-content max-w-[820px] mx-auto'>
        <h1 className='text-2xl sm:text-3xl md:text-5xl font-bold font-merriweather text-center leading-relaxed tracking-wider'>
          Featured Courses
        </h1>
        <p className='text-md md:text-normal text-center text-secondary tracking-wider'>
          A modern platform for educators, professionals, and creators to
          design, manage, and sell courses with ease — all in one place.
        </p>
      </div>

      {/* Slider */}
      <div className='relative mt-6 md:mt-10 space-y-4'>
        {featuredCourses.map((course, i) => (
          <CourseListCard course={course} />
        ))}
        <div className='text-center'>
          <Button
            href={'/courses'}
            variant='secondary'
            size={'lg'}>
            See More
            <ArrowRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
