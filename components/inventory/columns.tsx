'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header';
import { DataTableRowActions } from '@/components/data-table/data-table-row-actions';

export type InventoryItem = {
  ingredient_id: number;
  ingredient_name: string;
  unit_of_measure: string;
  current_stock: number;
  reorder_level?: number;
  supplier_name?: string;
};

export const columns: ColumnDef<InventoryItem>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'ingredient_name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ingredient" />
    ),
  },
  {
    accessorKey: 'current_stock',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Stock" />;
    },
    cell: ({ row }) => {
      const stock = row.getValue<number>('current_stock');
      return (
        <Badge
          variant={
            stock <= (row.getValue<number>('reorder_level') ?? 0)
              ? 'destructive'
              : 'default'
          }
        >
          {stock}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'unit_of_measure',
    header: 'Unit',
    cell: ({ row }) => {
      const unit = row.getValue<string>('unit_of_measure');
      return (
        <div>
          <span>{unit}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'reorder_level',
    header: 'Reorder Level',
  },
  {
    accessorKey: 'supplier_name',
    header: 'Supplier',
    cell: ({ row }) => row.getValue<string>('supplier_name') || 'N/A',
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
