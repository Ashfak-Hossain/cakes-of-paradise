import Image from 'next/image';

import { ApiResponse } from '@/app/api/v1/types/types';
import { PaginationWithLinks } from '@/components/common/pagination-with-links';
import SectionHeader from '@/components/common/SectionHeader';
import ProductCard from '@/components/product/ProductCard';
import { fetcher } from '@/lib/fetcher';
import { getProductsReturn, ProductPageProps } from '@/types/types';

const getProducts = async (
  page: string,
  limit: string
): Promise<ApiResponse<getProductsReturn>> => {
  return fetcher(`/api/v1/products?page=${page}&limit=${limit}`);
};

export const LIMIT_OPTIONS = [4, 8, 16, 24, 40];
export const DEFAULT_PAGE = '1';
export const DEFAULT_LIMIT = '16';

const page: React.FC<ProductPageProps> = async ({ searchParams }) => {
  const params = await searchParams;
  const page = Array.isArray(params['page']) ? params['page'][0] : params['page'] ?? DEFAULT_PAGE;
  const limit = Array.isArray(params['limit'])
    ? params['limit'][0]
    : params['limit'] ?? DEFAULT_LIMIT;

  const { data, success } = await getProducts(page, limit);

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
          {data.products.map((product, i) => (
            <ProductCard
              key={i}
              imageUrl="/placeholder.svg"
              title={product.product_name}
              stockQuantity={product.current_stock}
            />
          ))}
        </div>
      </div>
      <div>
        <PaginationWithLinks
          totalCount={data.totalCount}
          limit={Number(limit)}
          page={Number(page)}
          limitSelectOptions={{ LimitOptions: [4, 8, 16, 24, 40] }}
        />
      </div>
    </div>
  );
};

export default page;
