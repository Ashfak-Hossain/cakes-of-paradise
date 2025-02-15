'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header';
import { DataTableRowActions } from '@/components/data-table/data-table-row-actions';
import { InventoryItem } from '@/services/inventory';

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
      const stockValue = row.getValue('current_stock');
      const reorderLevel = row.getValue<number>('reorder_level') ?? 0;

      const stock =
        typeof stockValue === 'number'
          ? stockValue
          : parseFloat(stockValue as string) || 0;

      if (isNaN(stock)) {
        console.error("Invalid 'current_stock' value:", stockValue);
        return <Badge>N/A</Badge>;
      }
      return (
        <Badge variant={stock <= reorderLevel ? 'destructive' : 'default'}>
          {stock.toFixed(2)}
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
    cell: ({ row }) => {
      const reorderLevelValue = row.getValue('reorder_level');

      const reorderLevel =
        typeof reorderLevelValue === 'number'
          ? reorderLevelValue
          : parseFloat(reorderLevelValue as string) || 0;

      if (isNaN(reorderLevel)) {
        console.error("Invalid 'reorder_level' value:", reorderLevelValue);
        return <span>N/A</span>;
      }

      return <span>{reorderLevel.toFixed(2)}</span>;
    },
  },
  {
    accessorKey: 'supplier',
    header: 'Supplier',
    cell: ({ row }) => {
      const supplier = row.original.supplier;
      const supplierName = supplier?.supplier_name || 'N/A';
      return <span>{supplierName}</span>;
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
