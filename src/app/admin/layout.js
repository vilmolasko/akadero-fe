// app/layout.tsx
import React from 'react';
import Sidebar from '@/layouts/_admin/sidebar';
import Topbar from '@/layouts/_admin/topbar';
import AuthGuard from '@/guards/auth';

export const metadata = {
  title: 'Dashboard',
  description: 'Dashboard App',
};

export default function RootLayout({ children }) {
  return (
    <AuthGuard>
      <div className='flex h-screen'>
        <Sidebar />
        <div className='flex flex-col flex-1 overflow-hidden'>
          <Topbar />
          <main className='p-4 overflow-auto '>{children}</main>
        </div>
      </div>
    </AuthGuard>
  );
}
