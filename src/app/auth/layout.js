import AuthAppBar from '@/layouts/auth/auth-appbar';
import React from 'react';

export default function layout({ children }) {
  return (
    <div>
      <AuthAppBar />
      <main className='flex-grow'>{children}</main>
    </div>
  );
}
