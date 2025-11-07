'use client';
import CourseForm from '@/components/forms/course';
import React from 'react';

export default function AddCourse({ categories, lecturers, organizers }) {
  return (
    <CourseForm
      categories={categories}
      organizers={organizers}
      lecturers={lecturers}
    />
  );
}
