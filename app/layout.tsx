import '@/app/globals.css';

import type { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';

import { auth } from '@/auth';
import Providers from '@/components/providers/Providers';
import { Toaster } from '@/components/ui/sonner';
import { geistMono, geistSans } from '@/lib/font';

export const metadata: Metadata = {
  title: 'Cakes of Paradise',
  description: 'The best cakes in the world',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en" suppressHydrationWarning={true}>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <Providers>
            {children}
            <Toaster />
          </Providers>
        </body>
      </html>
    </SessionProvider>
  );
}
