import { BadgeDollarSign, Boxes, CheckCircle, Hammer, Package, Tag, XCircle } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface DetailSectionProps {
  title: string;
  value: string | number | React.ReactNode;
  isAvailable?: boolean;
}

const DetailSection: React.FC<DetailSectionProps> = ({ title, value, isAvailable }) => {
  const isAvailableSection = title === 'Available' && isAvailable !== undefined;
  const displayValue = isAvailableSection ? (isAvailable ? 'Available' : 'Not available') : value;

  const getIcon = () => {
    switch (title) {
      case 'Total Sales':
        return <BadgeDollarSign className="w-6 h-6 text-gray-500" />;
      case 'Total Sold':
        return <Package className="w-6 h-6 text-gray-500" />;
      case 'Stock':
        return <Boxes className="w-6 h-6 text-gray-500" />;
      case 'Price':
        return <Tag className="w-6 h-6 text-gray-500" />;
      case 'Cost to make':
        return <Hammer className="w-6 h-6 text-gray-500" />;
      case 'Available':
        return isAvailable ? (
          <CheckCircle className="w-6 h-6 text-green-500" />
        ) : (
          <XCircle className="w-6 h-6 text-red-500" />
        );
      default:
        return null;
    }
  };

  const icon = getIcon();

  const borderColor = isAvailableSection
    ? isAvailable
      ? 'border-green-500'
      : 'border-red-500'
    : 'border-gray-300';

  return (
    <div className={cn('flex items-start mb-8 pl-4 border-l-4', borderColor)}>
      <div>
        <div className="flex items-center gap-2">
          {icon && <div className="">{icon}</div>}
          <h3 className="text-lg text-gray-400">{title}</h3>
        </div>
        <div className="ml-8 space-y-4 mt-0.5">
          <p className="text-3xl font-bold">{displayValue}</p>
          <span className="text-sm flex items-center gap-1 text-gray-500">
            <Badge className="px-1.5" variant="success">
              +3.2%
            </Badge>
            from last week
          </span>
        </div>
      </div>
    </div>
  );
};

export default DetailSection;
