'use client';
import Breadcrumbs from '@/layouts/_admin/breadcrumb';
import AddOrganizerLecturer from '@/components/_organizer/lecturers/add-lecturer';

export default function DashboardPage() {
  return (
    <div className='space-y-6'>
      {/* Page Title */}
      <div className='flex items-center justify-between gap-3'>
        <div>
          <h1 className='text-2xl font-merriweather'>Pridėti dėstytoją</h1>
          {/* Breadcrumbs */}
          <Breadcrumbs />
        </div>
      </div>
      <div className='relative'>
        <AddOrganizerLecturer />
      </div>
    </div>
  );
}
