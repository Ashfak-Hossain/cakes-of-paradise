import { Metadata } from 'next';
// import { columns } from '@/components/inventory/columns';
// import { DataTable } from '@/components/data-table/data-table';
// import IngredientForm from '@/components/inventory/IngredientForm';
// import { Separator } from '@/components/ui/separator';
import SectionHeader from '@/components/common/SectionHeader';
import IngredientAnalytics from '@/components/inventory/IngredientAnalytics';

export const metadata: Metadata = {
  title: 'Inventory Management',
  description: 'Manage your inventory of ingredients',
};

const page = async () => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/inventory`
  ).then((res) => res.json());

  data.forEach(
    (item: { supplier_name: string; supplier: { supplier_name: string } }) => {
      item.supplier_name = item.supplier ? item.supplier.supplier_name : 'N/A';
    }
  );

  return (
    <div className="flex h-full flex-1 flex-col space-y-8 p-8">
      <SectionHeader
        title="Inventory Management"
        subtitle="Here's a list of all the ingredients in your inventory."
      />
      {/* <DataTable data={data} columns={columns} />
      <Separator />
      <IngredientForm />
      <Separator /> */}
      <IngredientAnalytics data={data} />
    </div>
  );
};

export default page;
