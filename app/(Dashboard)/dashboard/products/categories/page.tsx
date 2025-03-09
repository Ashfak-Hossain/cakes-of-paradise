import Link from 'next/link';

import NewCategoryForm from '@/components/categories/new-categories-form';
import SectionHeader from '@/components/common/SectionHeader';
import { Button } from '@/components/ui/button';

const page = () => {
  return (
    <div className="flex h-full flex-1 flex-col space-y-6 p-2 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center space-y-4">
        <SectionHeader title="Add New Category" subtitle="Category for Products" />
        <Button asChild>
          <Link href="/products">Back to Products</Link>
        </Button>
      </div>
      <div className="flex flex-col space-y-4 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-4 bg-secondary">
        <NewCategoryForm />
      </div>
    </div>
  );
};

export default page;
