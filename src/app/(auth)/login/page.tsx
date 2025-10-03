// /src/app/(auth)/login/page.tsx
'use client';
export const dynamic = 'force-dynamic';

import LoginForm from '@/components/login/LoginForm';
import React, { Suspense } from 'react';


export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}
