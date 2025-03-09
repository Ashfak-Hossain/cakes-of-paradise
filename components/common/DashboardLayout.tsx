'use client';

import { usePathname } from 'next/navigation';

import Navbar from '@/components/navbar/Navbar';
import { AppSidebar } from '@/components/sidebar/app-sidebar';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { useAppSelector } from '@/redux/hooks';
import { DOCS_PATH } from '@/routes';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isSidebarCollapsed = useAppSelector((state) => state.global.isSidebarCollapsed);

  console.log(isSidebarCollapsed);

  if (DOCS_PATH.some((path) => pathname.startsWith(path))) {
    return <>{children}</>;
  }

  return (
    <SidebarProvider open={isSidebarCollapsed}>
      <AppSidebar />
      <SidebarInset>
        {/* <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Building Your Application</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header> */}
        <Navbar />
        <main className="flex flex-col w-full h-full py-7 px-9 transition-all duration-300">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
