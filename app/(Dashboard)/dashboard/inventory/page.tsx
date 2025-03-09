import { Metadata } from 'next';
import Image from 'next/image';
import { Suspense } from 'react';

import { ApiResponse } from '@/app/api/v1/types/types';
import SectionHeader from '@/components/common/SectionHeader';
import { DataTable } from '@/components/data-table/data-table';
import { columns } from '@/components/inventory/columns';
import IngredientAnalytics from '@/components/inventory/IngredientAnalytics';
import IngredientEditDrawer from '@/components/inventory/IngredientEditDrawer';
import IngredientForm from '@/components/inventory/IngredientForm';
import IngredientPurchaseDrawer from '@/components/inventory/IngredientPurchaseDrawer';
import { Separator } from '@/components/ui/separator';
import { fetcher } from '@/lib/fetcher';
import { GetIngredientsReturn } from '@/types/types';

export const metadata: Metadata = {
  title: 'Inventory Management',
  description: 'Manage your inventory of ingredients',
};

const getIngredient = async (): Promise<ApiResponse<GetIngredientsReturn[]>> => {
  return fetcher({ url: '/ingredient', init: { cache: 'no-cache' } });
};

const page = async () => {
  const { success, data } = await getIngredient();

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
      <SectionHeader
        title="Inventory Management"
        subtitle="Here's a list of all the ingredients in your inventory."
      />
      <Suspense fallback={<p className="text-gray-500">Loading inventory...</p>}>
        <div className="border border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-900">
          <DataTable data={data} columns={columns} />
        </div>
      </Suspense>
      <Separator />
      <IngredientForm />
      <Separator />
      <IngredientAnalytics data={data} />
      <IngredientEditDrawer />
      <IngredientPurchaseDrawer />
    </div>
  );
};

export default page;
