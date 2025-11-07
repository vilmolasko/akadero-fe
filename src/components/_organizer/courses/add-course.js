'use client';
import OrganizerCourseForm from '@/components/forms/organizer-course';
import React from 'react';

export default function AddOrganizerCourse({ categories, lecturers }) {
  return (
    <OrganizerCourseForm
      categories={categories}
      lecturers={lecturers}
    />
  );
}
