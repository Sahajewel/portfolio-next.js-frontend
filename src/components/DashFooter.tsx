// components/DashFooter.tsx
import Link from 'next/link';

export default function DashFooter() {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link href="/" className="text-xl font-bold">
              Portfolio
            </Link>
            <p className="mt-2 text-gray-400 text-sm">
              Dashboard v1.0.0
            </p>
          </div>
          
          <div className="flex items-center space-x-6">
            <Link href="/" className="text-gray-400 hover:text-white transition-colors text-sm">
              View Site
            </Link>
            <span className="text-gray-600">|</span>
            <span className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Admin Panel
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}