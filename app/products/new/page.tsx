import SectionHeader from '@/components/common/SectionHeader';
import ProductForm from '@/components/product/ProductForm';

const page = () => {
  return (
    <div className="flex h-full flex-1 flex-col space-y-6 p-8">
      <SectionHeader title="Add New Product" subtitle="Fill in the product details below" />
      <div className="flex flex-col space-y-4 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-900">
        <ProductForm />
      </div>
    </div>
  );
};

export default page;
