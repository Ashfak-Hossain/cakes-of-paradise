'use client';

import { MoonIcon, PanelLeft, Search, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';

import UserProfile from '@/components/navbar/user-profile';
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

  const toggleTheme = () => {
    setTheme(isDarkMode ? 'light' : 'dark');
  };

  return (
    <nav className="flex items-center justify-between md:px-9 py-3 md:py-5 backdrop-blur-md rounded-lg bg-opacity-60 dark:bg-opacity-60">
      <div className="flex items-center gap-4 h-5">
        <div
          aria-label="Toggle Sidebar"
          onClick={toggleSidebar}
          className="cursor-pointer p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <PanelLeft className="text-gray-700 dark:text-gray-300" size={26} />
        </div>

        <Separator className="bg-gray-600 dark:bg-gray-400" orientation="vertical" />
        <div className="relative">
          <Input
            type="search"
            placeholder="Search products..."
            aria-label="Search products"
            className="pl-10 pr-4 py-2 w-64 border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="text-gray-500 dark:text-gray-400" size={20} />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-5">
        <Button size="icon" className="rounded-full" onClick={toggleTheme}>
          {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </Button>
        {/* <div className="relative">
          <Bell className="cursor-pointer text-gray-500 dark:text-gray-400" />
          <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-5 h-5 text-xs font-semibold leading-none text-red-100 dark:text-red-200 bg-red-500 dark:bg-red-600 rounded-full">
            3
          </span>
        </div> */}
        <UserProfile />
      </div>
    </nav>
  );
};

export default Navbar;
