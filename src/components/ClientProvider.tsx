// src/app/ClientProviders.tsx (Client Component)
'use client';

import { Toaster } from 'react-hot-toast';
import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';
import SessionProvider from '@/components/public/SessionProvider';
import { usePathname } from 'next/navigation';

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith('/dashboard');

  if (isDashboard) {
    return (
      <div className="min-h-screen bg-gray-100">
        <SessionProvider>{children}</SessionProvider>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <SessionProvider>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </SessionProvider>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: { background: '#363636', color: '#fff' },
        }}
      />
    </div>
  );
}
