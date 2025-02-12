'use client';

import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { setIsSidebarCollapsed } from '@/redux/features/global/global';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import SidebarLink from './SidebarLink';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { sidebarLinks } from '@/lib/sidebarLink';

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );

  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  };

  return (
    <div
      className={cn(
        'fixed flex flex-col bg-white dark:bg-gray-900 transition-all duration-300 overflow-hidden h-full shadow-md z-40',
        isSidebarCollapsed ? 'w-0 md:w-16' : 'w-72 md:w-64'
      )}
    >
      {/* Top Logo */}
      <div
        className={cn(
          'flex gap-3 justify-between md:justify-normal items-center pt-8',
          isSidebarCollapsed ? 'px-5' : 'px-8'
        )}
      >
        <Image
          alt="cakes-of-paradise-logo"
          src="/cop.jpg"
          width={27}
          height={27}
          className="rounded w-8"
        />
        <h1
          className={cn(
            'font-extrabold text-2xl text-gray-900 dark:text-gray-300',
            isSidebarCollapsed ? 'hidden' : 'block'
          )}
        >
          Cakes of Paradise
        </h1>

        <Button
          className="md:hidden px-3 py-3 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900"
          onClick={toggleSidebar}
        >
          <Menu className="w-4 h-4 text-gray-700 dark:text-gray-300" />
        </Button>
      </div>

      {/* Sidebar Links */}
      <div className="flex-grow mt-8">
        {sidebarLinks.map((link, i) => (
          <SidebarLink
            key={i}
            href={link.href}
            icon={link.icon}
            label={link.label}
            isCollapsed={isSidebarCollapsed}
          />
        ))}
      </div>

      {/* Footer */}
      <div className={cn('mb-10', isSidebarCollapsed ? 'hidden' : 'block')}>
        <p className="text-center text-xs text-gray-500 dark:text-gray-400">
          &copy; 2025 Habib Rahman
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
