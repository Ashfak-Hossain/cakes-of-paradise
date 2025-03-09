'use client';

import {
  Cake,
  ChartSpline,
  ClipboardList,
  Frame,
  LifeBuoy,
  PieChart,
  Send,
  Settings2,
  Users,
  Warehouse,
} from 'lucide-react';
import Link from 'next/link';

import { NavMain } from '@/components/sidebar/nav-main';
import { Separator } from '@/components/ui/separator';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { useAppSelector } from '@/redux/hooks';

const data = {
  user: {
    name: 'User Name', // Replace with dynamic user name
    email: 'user@example.com', // Replace with dynamic email
    avatar: '/placeholder-avatar.jpg', // Replace with user avatar URL
  },
  navMain: [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: PieChart,
      isActive: true,
      items: [
        { title: 'Overview', url: '/dashboard' },
        { title: 'Sales', url: '/dashboard/sales' },
        { title: 'Inventory', url: '/dashboard/inventory' },
      ],
    },
    {
      title: 'Products',
      url: '/products',
      icon: Frame,
      isActive: false,
      items: [
        { title: 'Product List', url: '/products' },
        { title: 'Add Product', url: '/products/add' },
        { title: 'Categories', url: '/products/categories' },
      ],
    },
    {
      title: 'Inventory',
      url: '/inventory',
      icon: Warehouse,
      isActive: false,
      items: [
        { title: 'Inventory List', url: '/inventory' },
        { title: 'Stock Adjustments', url: '/inventory/adjust' },
        { title: 'Reports', url: '/inventory/reports' },
      ],
    },
    {
      title: 'Orders',
      url: '/orders',
      icon: ClipboardList,
      isActive: false,
      items: [
        { title: 'Order List', url: '/orders' },
        { title: 'Order Status', url: '/orders/status' },
      ],
    },
    {
      title: 'Customers',
      url: '/customers',
      icon: Users,
      isActive: false,
      items: [
        { title: 'Customer List', url: '/customers' },
        { title: 'Add Customer', url: '/customers/add' },
      ],
    },
    {
      title: 'Reports',
      url: '/reports',
      icon: ChartSpline,
      isActive: false,
      items: [
        { title: 'Sales Reports', url: '/reports/sales' },
        { title: 'Inventory Reports', url: '/reports/inventory' },
        { title: 'Customer Reports', url: '/reports/customers' },
      ],
    },
    {
      title: 'Settings',
      url: '/settings',
      icon: Settings2,
      isActive: false,
      items: [
        { title: 'User Management', url: '/settings/users' },
        { title: 'System Settings', url: '/settings/system' },
      ],
    },
  ],
  navSecondary: [
    { title: 'Support', url: '/support', icon: LifeBuoy },
    { title: 'Feedback', url: '/feedback', icon: Send },
  ],
  projects: [],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const isSidebarOpen = useAppSelector((state) => state.ui.isSidebarOpen);

  return (
    <Sidebar collapsible="icon" variant="inset" {...props} className="ml-2">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="my-3">
            <SidebarMenuButton size="lg" asChild>
              <Link href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-indigo-300">
                  <Cake className="size-6" />
                </div>
                <div className="grid flex-1 text-left text-base leading-tight">
                  <span className="truncate font-semibold">Cakes of Paradise</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <Separator />
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <div className={cn('mb-10', !isSidebarOpen && 'hidden')}>
          <p className="text-center text-gray-500 dark:text-gray-400">&copy; 2025 Berlin</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
