import { Metadata } from 'next';

import DashboardLayout from '@/components/common/Wrapper';

export const metadata: Metadata = {
  title: 'Cakes of Paradise',
  description: 'The best cakes in the world',
};

const layout = ({ children }: { children: React.ReactNode }) => {
  return <DashboardLayout>{children}</DashboardLayout>;
};

export default layout;
