import ForgotPassword from '@/components/auth/forget-password';
import GuestGuard from '@/guards/guest';
import React from 'react';

export default function page() {
  return (
    <GuestGuard>
      <ForgotPassword />
    </GuestGuard>
  );
}
