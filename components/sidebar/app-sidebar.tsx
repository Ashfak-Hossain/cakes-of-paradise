'use client';

import {
  BookOpen,
  Bot,
  Cake,
  Frame,
  LifeBuoy,
  MapPin,
  PieChart,
  Send,
  Settings2,
} from 'lucide-react';
import Link from 'next/link';

import { NavMain } from '@/components/sidebar/nav-main';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

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
      title: 'Orders',
      url: '/orders',
      icon: BookOpen,
      isActive: false,
      items: [
        { title: 'Order List', url: '/orders' },
        { title: 'Order Status', url: '/orders/status' },
      ],
    },
    {
      title: 'Customers',
      url: '/customers',
      icon: Bot,
      isActive: false,
      items: [
        { title: 'Customer List', url: '/customers' },
        { title: 'Add Customer', url: '/customers/add' },
      ],
    },
    {
      title: 'Inventory',
      url: '/inventory',
      icon: MapPin,
      isActive: false,
      items: [
        { title: 'Inventory List', url: '/inventory' },
        { title: 'Stock Adjustments', url: '/inventory/adjust' },
        { title: 'Reports', url: '/inventory/reports' },
      ],
    },
    {
      title: 'Reports',
      url: '/reports',
      icon: Settings2,
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
  return (
    <Sidebar collapsible="icon" variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="">
            <SidebarMenuButton size="lg" asChild>
              <Link href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-rose-500 text-foreground">
                  <Cake className="size-5" />
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
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <div className="mb-10">
          <p className="text-center text-gray-500 dark:text-gray-400">&copy; 2025 Berlin</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
