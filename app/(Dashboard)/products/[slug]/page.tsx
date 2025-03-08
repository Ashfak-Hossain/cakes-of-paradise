import { OrderDetail, Product } from '@prisma/client';
import { Metadata } from 'next';
import Image from 'next/image';

import { ApiResponse } from '@/app/api/v1/types/types';
import ProductDetails from '@/components/product/ProductDetails';
import { Separator } from '@/components/ui/separator';
import { fetcher } from '@/lib/fetcher';

interface Props {
  params: Promise<{ slug: string }>;
}

export const metadata: Metadata = {
  title: 'Product',
  description: 'Product details',
};

interface getProductReturn extends Product {
  orderDetails: OrderDetail[];
}

const getProduct = async (slug: string): Promise<ApiResponse<getProductReturn>> => {
  return fetcher({ url: `/products/${slug}`, init: { cache: 'no-cache' } });
};

const Page: React.FC<Props> = async ({ params }) => {
  const { slug } = await params;
  const { success, data } = await getProduct(slug);

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

  const {
    product_name,
    price,
    description,
    current_stock,
    cost_to_make,
    is_available,
    orderDetails,
  } = data;

  const { totalSold, totalSales } = orderDetails.reduce(
    (acc, { quantity, total_price }) => {
      acc.totalSold += quantity;
      acc.totalSales += Number(total_price);
      return acc;
    },
    { totalSold: 0, totalSales: 0 }
  );

  return (
    <div className="max-w-7xl py-10 px-4 sm:px-6 lg:px-8">
      <h2 className="text-4xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
        {product_name}
      </h2>
      <Separator className="my-5" />
      <Separator className="my-10" />
      <ProductDetails
        product_name={product_name}
        price={price}
        description={description}
        current_stock={current_stock}
        cost_to_make={cost_to_make}
        is_available={is_available}
        totalSales={totalSales}
        totalSold={totalSold}
      />
    </div>
  );
};

export default Page;
