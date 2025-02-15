import { Metadata } from 'next';
import { columns } from '@/components/inventory/columns';
import { DataTable } from '@/components/data-table/data-table';
import IngredientForm from '@/components/inventory/IngredientForm';
import { Separator } from '@/components/ui/separator';
import SectionHeader from '@/components/common/SectionHeader';
import IngredientAnalytics from '@/components/inventory/IngredientAnalytics';
import { getInventory } from '@/services/inventory';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Inventory Management',
  description: 'Manage your inventory of ingredients',
};

const page = async () => {
  const data = await getInventory();

  return (
    <div className="flex h-full flex-1 flex-col space-y-8 p-8">
      <SectionHeader
        title="Inventory Management"
        subtitle="Here's a list of all the ingredients in your inventory."
      />
      <Suspense
        fallback={<p className="text-gray-500">Loading inventory...</p>}
      >
        <DataTable data={data} columns={columns} />
      </Suspense>

      <Separator />
      <IngredientForm />
      <Separator />
      <IngredientAnalytics data={data} />
    </div>
  );
};

export default page;
