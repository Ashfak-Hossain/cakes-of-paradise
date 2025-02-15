'use client';

import { useEffect } from 'react';

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('Error in Inventory Page:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-red-500 text-2xl font-semibold">
        Oops! Something went wrong.
      </h2>
      <p className="text-gray-500">
        {error.message || 'Failed to load inventory data.'}
      </p>
      <button
        onClick={reset}
        className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        Try Again
      </button>
    </div>
  );
}
