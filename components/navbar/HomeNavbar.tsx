'use client';

import { Braces, Moon, Sun, X } from 'lucide-react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import { useCurrentUser } from '@/hooks/auth';

import { SignInButton } from '../authentication/signin_button';
import { SignOutButton } from '../authentication/signout_button';
import { Button } from '../ui/button';

const HomeNavbar = () => {
  const user = useCurrentUser();
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  if (!mounted) {
    return null;
  }

  return (
    <nav className="sticky top-0 z-20 w-full bg-white dark:bg-gray-900 shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center relative">
        <div className="flex items-center">
          <Link href="/" className="font-semibold text-xl text-blue-600 dark:text-blue-400">
            Sweet Pandemonium
          </Link>
        </div>

        <div className="hidden md:flex space-x-4 items-center">
          {user && (
            <div className="flex items-center space-x-4">
              <Link
                href="/dashboard"
                className="px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-md hover:bg-blue-700 dark:hover:bg-blue-800 transition duration-300"
              >
                Dashboard
              </Link>

              <SignOutButton>
                <Button variant="secondary" size="lg">
                  Sign Out
                </Button>
              </SignOutButton>
            </div>
          )}
          {!user && (
            <div>
              <SignInButton asChild>
                <Button variant="secondary" size="lg">
                  Sign In
                </Button>
              </SignInButton>

              <Link
                href="/auth/signup"
                className="px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-md hover:bg-blue-700 dark:hover:bg-blue-800 transition duration-300"
              >
                Sign Up
              </Link>
            </div>
          )}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300"
          >
            {theme === 'light' ? (
              <Moon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            ) : (
              <Sun className="h-5 w-5 text-gray-300 dark:text-gray-200" />
            )}
          </button>
        </div>

        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-gray-700 dark:text-gray-300" />
            ) : (
              <Braces className="h-6 w-6 text-gray-700 dark:text-gray-300" />
            )}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white dark:bg-gray-900 shadow-md rounded-b-md overflow-hidden md:hidden">
            <div className="flex flex-col p-4 space-y-2">
              <SignInButton asChild>
                <Button variant="secondary" size="lg" className="w-full">
                  Sign In
                </Button>
              </SignInButton>
              <Link
                href="/auth/signup"
                className="w-full text-center px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-md hover:bg-blue-700 dark:hover:bg-blue-800 transition duration-300"
              >
                Sign Up
              </Link>
              <button
                onClick={toggleTheme}
                className="w-full p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300 text-left"
              >
                {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default HomeNavbar;
