import { Product } from '@prisma/client';
import Image from 'next/image';

import { ApiResponse } from '@/app/api/v1/types/types';
import SectionHeader from '@/components/common/SectionHeader';
import ProductCard from '@/components/product/ProductCard';
import { fetcher } from '@/lib/fetcher';

const getProducts = async (): Promise<ApiResponse<Product[]>> => {
  return fetcher('/api/v1/products', { cache: 'no-store' });
};

const page = async () => {
  const { data, success } = await getProducts();

  if (!success || !data) {
    return (
      <div className="flex flex-col items-center justify-center h-full space-y-4">
        <h1 className="text-rose-600 font-bold text-4xl">
          Something went wrong! Please try again later.
        </h1>
        <Image src="/error.png" alt="Error" width={500} height={500} />
      </div>
    );
  }

  return (
    <div className="flex h-full flex-1 flex-col space-y-6 p-8">
      <SectionHeader title="Products Management" subtitle=" Manage your products here" />
      <div className="flex flex-col space-y-4 border border-dashed border-gray-300 dark:border-gray-500 rounded-lg p-4 bg-gray-100 dark:bg-gray-900">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data.map((product, i) => (
            <ProductCard
              key={i}
              imageUrl="/placeholder.svg"
              title={product.product_name}
              stockQuantity={product.current_stock}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
