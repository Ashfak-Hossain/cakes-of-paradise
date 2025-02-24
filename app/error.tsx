'use client';

import Image from 'next/image';
import { useEffect } from 'react';

import { Button } from '@/components/ui/button';

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('Error -->', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-full space-y-4">
      <h2 className="text-rose-500 font-bold text-4xl">
        Something went wrong! Please try again later
      </h2>
      <p className="text-gray-500">{error.message || 'Failed to load data.'}</p>
      <Button onClick={reset} variant="destructive">
        Try Again
      </Button>
      <Image src="/error.png" alt="Error" width={400} height={400} />
    </div>
  );
}
