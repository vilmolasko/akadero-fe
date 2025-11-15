'use client';
import React from 'react';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'; // Breadcrumb components
import OrganizerForm from '@/components/forms/organizer';

export default function OrganizerSettings({ create }) {
  return (
    <div className='space-y-5'>
      <div>
        <h1 className='text-2xl font-merriweather'>
          {create ? 'Pradėkite pardavinėti' : 'Atnaujinimų organizatorius'}{' '}
        </h1>
        {/* Breadcrumb */}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>
                Užpildykite mokymų organizatoriaus duomenis
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <OrganizerForm />
    </div>
  );
}
