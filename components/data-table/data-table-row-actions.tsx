'use client';

import { Row } from '@tanstack/react-table';
import { Ellipsis } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAppDispatch } from '@/redux/hooks';
import { setSelectedIngredient } from '@/redux/features/ingredients/ingredientsSlice';
import { InventoryItem } from '@/services/inventory';
import {
  setIsDrawerOpen,
  setIsIngredientPurchaseDrawerOpen,
} from '@/redux/features/drawers/drawersSlice';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const task = row.original;
  const dispatch = useAppDispatch();

  const handlePurchase = () => {
    dispatch(setSelectedIngredient(task as InventoryItem));
    dispatch(setIsIngredientPurchaseDrawerOpen(true));
  };

  const handleEdit = () => {
    dispatch(setSelectedIngredient(task as InventoryItem));
    dispatch(setIsDrawerOpen(true));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <Ellipsis />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem onClick={handlePurchase}>Purchase</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleEdit}>Edit </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
