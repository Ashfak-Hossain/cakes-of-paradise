'use client';

import { usePathname } from 'next/navigation';

import Navbar from '@/components/navbar/Navbar';
import Sidebar from '@/components/sidebar/Sidebar';
import { cn } from '@/lib/utils';
import { useAppSelector } from '@/redux/hooks';
import { DOCS_PATH } from '@/routes';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isSidebarCollapsed = useAppSelector((state) => state.global.isSidebarCollapsed);

  const isDocsPath = DOCS_PATH.some((path) => pathname.startsWith(path));
  if (isDocsPath) return <>{children}</>;

  return (
    <div className="flex bg-gray-50 text-gray-900 w-full min-h-screen">
      <Sidebar />
      <main
        className={cn(
          'flex flex-col w-full h-full py-7 px-9 bg-gray-50',
          isSidebarCollapsed ? 'md:pl-24' : 'md:pl-72'
        )}
      >
        <Navbar />
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
