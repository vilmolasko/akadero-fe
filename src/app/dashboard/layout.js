// app/layout.tsx
import React from 'react';
import AuthGuard from '@/guards/auth';
import DashboardSidebar from '@/layouts/_dashboard/sidebar';
import OrganizerTopbar from '@/layouts/_dashboard/topbar';

export const metadata = {
  title: 'Dashboard',
  description: 'Dashboard App',
};

export default function RootLayout({ children }) {
  return (
    <AuthGuard>
      <div className='flex h-screen'>
        <DashboardSidebar />
        <div className='flex flex-col flex-1 overflow-hidden'>
          <OrganizerTopbar />
          <main className='p-4 overflow-auto '>{children}</main>
        </div>
      </div>
    </AuthGuard>
  );
}
