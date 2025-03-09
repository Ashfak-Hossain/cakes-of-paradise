'use client';

import { Bell, Moon, PanelLeft, Search, Sun } from 'lucide-react';
import Image from 'next/image';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { setIsMobileSidebarOpen, setIsSidebarOpen } from '@/redux/features/ui/ui';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

const Navbar = () => {
  const { setTheme, theme } = useTheme();
  const isDarkMode = theme === 'dark';

  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector((state) => state.ui.isMobileSidebarOpen);
  const isMobileSidebarOpen = useAppSelector((state) => state.ui.isMobileSidebarOpen);
  const toggleSidebar = () => {
    dispatch(setIsSidebarOpen(!isSidebarCollapsed));
    dispatch(setIsMobileSidebarOpen(!isMobileSidebarOpen));
  };

  return (
    <div className="flex items-center justify-between md:px-9 py-3 md:py-5 backdrop-blur-md rounded-lg">
      {/* LEFT SIDE */}
      <div className="flex items-center gap-5 h-5">
        <div
          className="cursor-pointer p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
          onClick={toggleSidebar}
        >
          <PanelLeft className="text-gray-700 dark:text-gray-300" size={30} />
        </div>
        <Separator className="bg-gray-600 dark:bg-gray-400" orientation="vertical" />
        <div className="relative">
          <Input
            type="search"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 w-64 border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="text-gray-500 dark:text-gray-400" size={20} />
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-5">
        <Button
          className="h-10 w-10 p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
          onClick={() => setTheme(isDarkMode ? 'light' : 'dark')}
        >
          {isDarkMode ? (
            <Sun className="text-gray-600 dark:text-gray-300" size={20} />
          ) : (
            <Moon className="text-gray-600 dark:text-gray-300" size={20} />
          )}
        </Button>

        <div className="relative">
          <Bell className="cursor-pointer text-gray-500 dark:text-gray-400" size={24} />
          <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-5 h-5 text-xs font-semibold leading-none text-red-100 dark:text-red-200 bg-red-500 dark:bg-red-600 rounded-full">
            3
          </span>
        </div>

        <div className="flex items-center gap-3 cursor-pointer">
          <Image
            src="/cop.jpg"
            alt="Profile"
            width={40}
            height={40}
            className="rounded-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
