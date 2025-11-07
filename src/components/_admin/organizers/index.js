'use client';
import Breadcrumbs from '@/layouts/_admin/breadcrumb';
import OrganizerList from './organizer-list';

export default function AdminOrganizersList() {
  return (
    <div className='space-y-6'>
      {/* Page Title */}
      <div className='flex items-center justify-between gap-3'>
        <div>
          <h1 className='text-2xl font-merriweather'>Organizatoriai</h1>
          {/* Breadcrumbs */}
          <Breadcrumbs />
        </div>
      </div>
      <OrganizerList />
    </div>
  );
}
