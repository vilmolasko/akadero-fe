import React from 'react';

import SignUp from '@/components/auth/sign-up';
import GuestGuard from '@/guards/guest';

export default function page() {
  return (
    <GuestGuard>
      <SignUp />
    </GuestGuard>
  );
}
