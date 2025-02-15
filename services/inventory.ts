import { fetcher } from '@/lib/fetcher';

export interface InventoryItem {
  ingredient_id: number;
  ingredient_name: string;
  unit_of_measure: string;
  current_stock: string;
  reorder_level: string;
  supplier_id: number;
  supplier: {
    supplier_id: number;
    supplier_name: string;
  };
  purchases: {
    purchase_id: number;
    supplier_id: number | null;
    ingredient_id: number;
    quantity: string;
    unit_cost: string;
    total_cost: string;
    purchase_date: string;
  }[];
}

export const getInventory = async (): Promise<InventoryItem[]> => {
  return fetcher(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/inventory`, {
    cache: 'no-cache',
  });
};
