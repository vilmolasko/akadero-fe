import React from 'react';
import AuthGuard from '@/guards/auth';
import OrganizerSettings from '@/components/_organizer/settings/update-organizer';
export default function page() {
  return (
    <AuthGuard>
      <div className='layout-container py-4 md:py-9'>
        <OrganizerSettings create />
      </div>
    </AuthGuard>
  );
}
