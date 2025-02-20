import '@/app/globals.css';

import type { Metadata } from 'next';

import DashboardLayout from '@/components/common/Wrapper';
import Providers from '@/components/providers/Providers';
import { Toaster } from '@/components/ui/sonner';
import { geistMono, geistSans } from '@/lib/font';

export const metadata: Metadata = {
  title: 'Cakes of Paradise',
  description: 'The best cakes in the world',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <DashboardLayout>{children}</DashboardLayout>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
