import { ApiResponse } from '@/app/api/v1/types/types';
import SectionHeader from '@/components/common/SectionHeader';
import ProductCard from '@/components/product/ProductCard';
import { fetcher } from '@/lib/fetcher';

const demoData = [
  {
    id: 1,
    imageUrl: '/images/products/1.jpg',
    title: 'Apple Watch Series 6',
    stockQuantity: 10,
  },
  {
    id: 2,
    imageUrl: '/images/products/2.jpg',
    title: 'Apple iPhone 12 Pro',
    stockQuantity: 5,
  },
  {
    id: 3,
    imageUrl: '/images/products/3.jpg',
    title: 'Apple MacBook Pro 13',
    stockQuantity: 3,
  },
  {
    id: 4,
    imageUrl: '/images/products/4.jpg',
    title: 'Apple iPad Pro 11',
    stockQuantity: 7,
  },
  {
    id: 5,
    imageUrl: '/images/products/5.jpg',
    title: 'Apple AirPods Pro',
    stockQuantity: 15,
  },
  {
    id: 6,
    imageUrl: '/images/products/6.jpg',
    title: 'Apple HomePod Mini',
    stockQuantity: 20,
  },
  {
    id: 7,
    imageUrl: '/images/products/7.jpg',
    title: 'Apple Magic Mouse',
    stockQuantity: 8,
  },
  {
    id: 8,
    imageUrl: '/images/products/8.jpg',
    title: 'Apple Magic Keyboard',
    stockQuantity: 6,
  },
  {
    id: 9,
    imageUrl: '/images/products/9.jpg',
    title: 'Apple Pencil (2nd Generation)',
    stockQuantity: 12,
  },
  {
    id: 10,
    imageUrl: '/images/products/10.jpg',
    title: 'Apple Smart Folio',
    stockQuantity: 9,
  },
];

const getProducts = async (): Promise<ApiResponse<any>> => {
  return fetcher('/api/v1/products', {
    cache: 'no-store',
  });
};

const page = async () => {
  const products = await getProducts();

  console.log(products);

  return (
    <div className="flex h-full flex-1 flex-col space-y-6 p-8">
      <SectionHeader title="Products Management" subtitle=" Manage your products here" />
      <div className="flex flex-col space-y-4 border border-dashed border-gray-300 dark:border-gray-500 rounded-lg p-4 bg-gray-100 dark:bg-gray-900">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {demoData.map((product, i) => (
            <ProductCard
              key={i}
              imageUrl="/placeholder.svg"
              title={product.title}
              stockQuantity={product.stockQuantity}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
