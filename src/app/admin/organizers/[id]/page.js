import React from 'react';
import OrganizersDetails from '@/components/_admin/organizers/details';
import Breadcrumbs from '@/layouts/_admin/breadcrumb';

export default async function page({ params }) {
  const { id } = await params;
  return (
    <div className='space-y-6'>
      {/* Page Title */}
      <div className='flex items-center justify-between gap-3'>
        <div>
          <h1 className='text-2xl font-merriweather'>
            Organizatorių informacija
          </h1>
          {/* Breadcrumbs */}
          <Breadcrumbs />
        </div>
      </div>
      <div className='relative'>
        <OrganizersDetails id={id} />
      </div>
    </div>
  );
}
