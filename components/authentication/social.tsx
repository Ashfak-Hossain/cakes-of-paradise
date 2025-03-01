'use client';

import { BadgePoundSterling, Github } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';

import { Button } from '@/components/ui/button';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';

export const Social = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');

  const onClick = (provider: 'google' | 'github') => {
    signIn(provider, {
      callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  };
  return (
    <div className="flex items-center w-full gap-x-2">
      <Button size="lg" className="w-full" variant="outline" onClick={() => onClick('google')}>
        <BadgePoundSterling className="h-6 w-6" />
      </Button>
      <Button size="lg" className="w-full" variant="outline" onClick={() => onClick('github')}>
        <Github className="h-6 w-6" />
      </Button>
    </div>
  );
};
