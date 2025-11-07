import SignIn from '@/components/auth/sign-in';
import GuestGuard from '@/guards/guest';
import React from 'react';

export default function page() {
  return (
    <GuestGuard>
      <SignIn />
    </GuestGuard>
  );
}
