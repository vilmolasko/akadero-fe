'use client';
import React from 'react';
import Breadcrumbs from '@/layouts/_admin/breadcrumb';
import OrganizerForm from '@/components/forms/organizer';

export default function OrganizerSettings({ create }) {
  return (
    <div className='space-y-5'>
      <div>
        <h1 className='text-2xl font-merriweather'>
          {create ? 'Pradėkite pardavinėti' : 'Atnaujinimų organizatorius'}{' '}
        </h1>
        {/* Breadcrumbs */}
        <Breadcrumbs />
      </div>
      <OrganizerForm />
    </div>
  );
}
