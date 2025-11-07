'use client';
import React from 'react';
import { useRouter } from '@bprogress/next';

import Breadcrumbs from '@/layouts/_admin/breadcrumb';
import { Button } from '@/components/ui/button';
import OrganizerSettingsForm from '@/components/forms/organizer-settings';

export default function OrganizerProfileSettings() {
  const router = useRouter();
  return (
    <div className='space-y-5'>
      <div className='flex items-center justify-between gap-3'>
        <div>
          <h1 className='text-2xl font-merriweather'>Organizatorius</h1>
          {/* Breadcrumbs */}
          <Breadcrumbs />
        </div>
      </div>
      <OrganizerSettingsForm />
    </div>
  );
}
