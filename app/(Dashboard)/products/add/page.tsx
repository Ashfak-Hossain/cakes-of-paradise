import Link from 'next/link';

import SectionHeader from '@/components/common/SectionHeader';
import ProductForm from '@/components/product/ProductForm';
import { Button } from '@/components/ui/button';

const page = () => {
  return (
    <div className="flex h-full flex-1 flex-col space-y-6 p-2 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center space-y-4">
        <SectionHeader title="Add New Product" subtitle="Fill in the product details below" />
        <Button asChild>
          <Link href="/products">Back to Products</Link>
        </Button>
      </div>
      <div className="flex flex-col space-y-4 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-900">
        <ProductForm />
      </div>
    </div>
  );
};

export default page;
