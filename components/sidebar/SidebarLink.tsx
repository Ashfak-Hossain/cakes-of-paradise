import { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
  isCollapsed: boolean;
}

const SidebarLink = ({ href, icon: Icon, label, isCollapsed }: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  // || (pathname === '/' && href === '/dashboard')

  return (
    <Link href={href}>
      <div
        className={cn(
          'cursor-pointer flex items-center hover:text-blue-500 hover:bg-blue-100 gap-3 transition-colors dark:hover:text-blue-300 dark:hover:bg-blue-900',
          isCollapsed ? 'justify-center py-4' : 'justify-start px-8 py-4',
          isActive ? 'bg-blue-200 text-white' : ''
        )}
      >
        <Icon className={cn('w-6 h-6 text-gray-700 dark:text-gray-300')} />
        <span
          className={cn(
            'font-medium text-gray-700 dark:text-gray-300',
            isCollapsed ? 'hidden' : 'block'
          )}
        >
          {label}
        </span>
      </div>
    </Link>
  );
};

export default SidebarLink;
