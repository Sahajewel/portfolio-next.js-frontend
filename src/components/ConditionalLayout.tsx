'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith('/dashboard');

  if (isDashboard) {
    // Dashboard routes - no Navbar/Footer, different background
    return (
      <div className="min-h-screen bg-gray-100">
        {children}
      </div>
    );
  }

  // Public routes - with Navbar/Footer and gradient background
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </div>
  );
}