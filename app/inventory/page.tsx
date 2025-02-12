import { Metadata } from 'next';
import { columns } from '@/components/inventory/columns';
import { DataTable } from '@/components/data-table/data-table';

export const metadata: Metadata = {
  title: 'Inventory Management',
  description: 'Manage your inventory of ingredients',
};

// {
//   ingredient_id: 8,
//   ingredient_name: 'Butter',
//   unit_of_measure: 'kg',
//   current_stock: '30',
//   reorder_level: '5',
//   supplier_id: 3,
//   supplier: {
//     supplier_id: 3,
//     supplier_name: 'Fresh Dairy Co.',
//     contact_name: 'Sarah Johnson',
//     phone: '+1122334455',
//     email: 'sarah@freshdairy.com',
//     supplied_ingredients: [Array],
//     payment_terms: 'Net 30 days'
//   }
// }

const page = async () => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/inventory`
  ).then((res) => res.json());

  data.forEach(
    (item: { supplier_name: string; supplier: { supplier_name: string } }) => {
      item.supplier_name = item.supplier.supplier_name;
    }
  );

  return (
    <div className="flex h-full flex-1 flex-col space-y-8 p-8">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Inventory Management
          </h2>
          <p className="text-muted-foreground">
            Here&apos;s a list of all the ingredients in your inventory.
          </p>
        </div>
        <div className="flex items-center space-x-2">{/* <UserNav /> */}</div>
      </div>
      <DataTable data={data} columns={columns} />
      <div>
        <button className="btn">Add Ingredient</button>
      </div>
    </div>
  );
};

export default page;
