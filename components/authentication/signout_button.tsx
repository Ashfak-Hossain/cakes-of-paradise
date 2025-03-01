'use client';

import { signOut } from 'next-auth/react';
import { toast } from 'sonner';

interface SignOutButtonProps {
  children: React.ReactNode;
  className?: string;
}

export const SignOutButton: React.FC<SignOutButtonProps> = ({ children, className }) => {
  const handleSignOut = async () => {
    try {
      await signOut({ redirect: true, callbackUrl: '/' });
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signout`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        throw new Error('Failed to sign out');
      }
    } catch (_error) {
      toast.error('Failed to sign out');
    }
  };

  return (
    <span className={`cursor-pointer ${className || ''}`} onClick={handleSignOut}>
      {children}
    </span>
  );
};
