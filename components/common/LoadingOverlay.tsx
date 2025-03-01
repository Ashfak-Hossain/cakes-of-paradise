import { useEffect, useState } from 'react';

import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface LoadingOverlayProps {
  isLoading: boolean;
  isFetching: boolean;
  message?: string;
  className?: string;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  isLoading,
  isFetching,
  message = 'Loading...',
  className,
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isLoading) {
      let interval: string | number | NodeJS.Timeout | undefined;
      if (isFetching) {
        interval = setInterval(() => {
          setProgress((prevProgress) => {
            const newProgress = prevProgress + 10;
            return newProgress <= 90 ? newProgress : 90;
          });
        }, 300);
      }

      return () => clearInterval(interval);
    } else {
      setProgress(100);
    }
  }, [isLoading, isFetching]);

  if (!isLoading) {
    return null;
  }

  return (
    <div>
      <Progress value={progress} className={cn('w-full mb-4 h-3', className)} />
      <p className="text-sm">{message}</p>
    </div>
  );
};

export default LoadingOverlay;
