'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';

export default function NotFound() {
  const pathname = usePathname();
  const [previousPage, setPreviousPage] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      setPreviousPage(document.referrer || null);
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="relative w-96 h-96 mb-8">
        <Image src="/404.png" alt="Page Not Found" layout="fill" objectFit="contain" priority />
      </div>

      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4">Page Not Found</h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 text-center">
        We couldn&#39;t find the page: <code>{pathname}</code>
      </p>

      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <Link href="/" passHref>
          <Button variant="outline">Go to Home</Button>
        </Link>

        {previousPage && (
          <Button variant="secondary" onClick={() => window.history.back()}>
            Go Back
          </Button>
        )}

        <Link href="/contact" passHref>
          <Button>Contact Support</Button>
        </Link>
      </div>
    </div>
  );
}
