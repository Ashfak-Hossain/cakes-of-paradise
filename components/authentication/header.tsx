import { Separator } from '@/components/ui/separator';
import { font } from '@/lib/font';
import { cn } from '@/lib/utils';

interface HeaderProps {
  title: string;
  subTitle: string;
}

export const Header: React.FC<HeaderProps> = ({ title, subTitle }) => {
  return (
    <div className="w-full flex flex-col gap-y-3 items-start justify-center">
      <h1 className={cn('text-2xl font-semibold tracking-tight', font.className)}>{title}</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 text-center max-w-md">{subTitle}</p>
      <Separator className="mt-3" />
    </div>
  );
};
