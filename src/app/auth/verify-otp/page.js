import React from 'react';
import VerifyOTP from '@/components/auth/verify-otp';
import AuthGuard from '@/guards/auth';

export default function page() {
  return (
    <AuthGuard>
      <VerifyOTP />
    </AuthGuard>
  );
}
