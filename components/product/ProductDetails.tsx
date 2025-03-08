import { Product } from '@prisma/client';

import DetailSection from '@/components/product/DetailSection';
import { Separator } from '@/components/ui/separator';

interface Props extends Product {
  totalSold: number;
  totalSales: number;
}

const ProductDetails: React.FC<Partial<Props>> = ({
  price,
  cost_to_make,
  current_stock,
  is_available,
  description,
  totalSold,
  totalSales,
}) => {
  return (
    <div className="flex flex-col space-y-4 border border-dashed border-gray-300 dark:border-gray-500 rounded-lg p-4">
      <div className="flex flex-col space-y-4">
        <h3 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">Description</h3>
        <p className="text-lg text-gray-700 dark:text-gray-300">{description}</p>
      </div>

      <Separator className="my-5 dark:bg-gray-400" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-rows-auto gap-4 sm:gap-6 p-6">
        <DetailSection title="Total Sales" value={`${totalSales}`} />
        <DetailSection title="Total Sold" value={totalSold} />
        <DetailSection title="Stock" value={current_stock} />
        <DetailSection title="Price" value={`${price}`} />
        <DetailSection title="Cost to make" value={`${cost_to_make}`} />
        <DetailSection title="Available" value={''} isAvailable={is_available} />
      </div>
    </div>
  );
};

export default ProductDetails;