import Link from 'next/link';

import { ApiResponse } from '@/app/api/v1/types/types';
import { PaginationWithLinks } from '@/components/common/pagination-with-links';
import SectionHeader from '@/components/common/SectionHeader';
import ProductCard from '@/components/product/ProductCard';
import { Button } from '@/components/ui/button';
import { fetcher } from '@/lib/fetcher';
import { getProductsReturn, ProductPageProps } from '@/types/types';

const getProducts = async (
  page: string,
  limit: string
): Promise<ApiResponse<getProductsReturn>> => {
  return fetcher({ url: `/products?page=${page}&limit=${limit}` });
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

  const { data } = await getProducts(page, limit);

  return (
    <div className="flex h-full flex-1 flex-col space-y-6 p-2 sm:p-6">
      <div className="flex flex-col md:flex-row md:justify-between items-center">
        <SectionHeader title="Products Management" subtitle=" Manage your products here" />
        <Link href="/products/new">
          <Button>Add New Product</Button>
        </Link>
      </div>
      <div className="flex flex-col space-y-4 border border-dashed border-gray-300 dark:border-gray-500 rounded-lg p-4 bg-gray-100 dark:bg-gray-900">
        {data && data.products && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data.products.map((product: any, i) => (
              <ProductCard
                key={i}
                productId={product.product_id}
                imageUrl={product.Picture[0]?.url || '/placeholder.svg'}
                title={product.product_name}
                stockQuantity={product.current_stock}
              />
            ))}
          </div>
        )}
      </div>
      <div>
        {data && (
          <PaginationWithLinks
            totalCount={data.totalCount}
            limit={Number(limit)}
            page={Number(page)}
            limitSelectOptions={{ LimitOptions: LIMIT_OPTIONS }}
          />
        )}
      </div>
    </div>
  );
};

export default page;
