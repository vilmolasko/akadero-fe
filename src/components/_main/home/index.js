'use client';
import React from 'react';
import Hero from '@/components/_main/home/hero';
import CategoryCourses from '@/components/_main/home/category-course';
// import FeaturedCourses from '@/components/_main/home/featured-courses';
import StartLearning from './start-learning';
// import Testimonials from './testimonial';

export default function HomePage({
  categories,
  // featuredCourses,
  startCourses,
}) {
  return (
    <div>
      <Hero categories={categories} />
      {/* <FeaturedCourses featuredCourses={featuredCourses} /> */}
      <CategoryCourses categories={categories} />
      <StartLearning startCourses={startCourses} />
      {/* <Testimonials /> */}
    </div>
  );
}
