'use client';

import { ThemeProvider } from '@/components/providers/theme-provider';
import { StoreProvider } from './StoreProvider';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <StoreProvider>{children}</StoreProvider>
    </ThemeProvider>
  );
};

export default Providers;
