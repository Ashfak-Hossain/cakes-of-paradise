'use client';

import { Bell, Menu, Moon, Search, Settings, Sun } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { setIsSidebarCollapsed } from '@/redux/features/global/global';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

const Navbar = () => {
  const { setTheme, theme } = useTheme();
  const isDarkMode = theme === 'dark';

  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector((state) => state.global.isSidebarCollapsed);
  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  };

  return (
    <div className="flex justify-between items-center w-full mb-7 bg-gray-50 dark:bg-gray-900 px-5 py-3 rounded-lg shadow-md">
      {/* LEFT SIDE */}
      <div className="flex justify-between items-center gap-5">
        <Button
          className="px-3 py-3 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900"
          onClick={toggleSidebar}
        >
          <Menu className="w-4 h-4 text-gray-700 dark:text-gray-300" />
        </Button>

        <div className="relative">
          <Input
            type="search"
            placeholder="Start typing to search..."
            className="pl-10 pr-4 py-2 w-50 md:w-60 border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="text-gray-500 dark:text-gray-400" size={20} />
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex justify-between items-center gap-5">
        <div className="hidden md:flex justify-between items-center gap-5">
          <Button
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
            onClick={() => setTheme(isDarkMode ? 'light' : 'dark')}
          >
            {isDarkMode ? (
              <Sun className="text-gray-600 dark:text-gray-300" size={24} />
            ) : (
              <Moon className="text-gray-600 dark:text-gray-300" size={24} />
            )}
          </Button>

          <div className="relative">
            <Bell className="cursor-pointer text-gray-500 dark:text-gray-400" size={24} />
            <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-[0.4rem] py-1 text-xs font-semibold leading-none text-red-100 dark:text-red-200 bg-red-500 dark:bg-red-600 rounded-full">
              3
            </span>
          </div>

          <hr className="w-0 h-7 border border-solid border-l border-gray-300 dark:border-gray-700 mx-3" />

          <div className="flex items-center gap-3 cursor-pointer">
            <Image
              src="/cop.jpg"
              alt="Profile"
              width={50}
              height={50}
              className="rounded-full h-full object-cover"
            />
            <span className="font-semibold text-gray-800 dark:text-gray-200">Ashfak Hossain</span>
          </div>
        </div>

        <Link href="/settings">
          <Settings className="cursor-pointer text-gray-500 dark:text-gray-400" size={24} />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
