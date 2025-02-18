import { z } from 'zod';

export const purchaseSchema = z.object({
  purchase_id: z.number().int().positive().optional(),
  supplier_id: z.number().int().positive().optional(),
  ingredient_id: z.number().int().positive().optional(),
  quantity: z.string().min(1, 'Quantity is required'),
  unit_cost: z.string().min(1, 'Unit cost is required'),
  total_cost: z.string().min(1, 'Total cost is required'),
  purchase_date: z.string().min(1, 'Purchase date is required'),
});
