import ResetPassword from '@/components/auth/reset-password';
import GuestGuard from '@/guards/guest';
import React from 'react';

export default async function Page({ params }) {
  const { token } = await params;
  return (
    <GuestGuard>
      <ResetPassword token={token} />
    </GuestGuard>
  );
}
