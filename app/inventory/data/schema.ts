import { z } from 'zod';

export const ingredientSchema = z.object({
  ingredient_id: z.number().int().positive().optional(),
  ingredient_name: z.string().min(1, 'Ingredient name is required'),
  unit_of_measure: z.string().min(1, 'Unit of measure is required'),
  current_stock: z.number().nonnegative().default(0),
  reorder_level: z.number().nonnegative().optional(),
  supplier_id: z.number().int().positive().optional(),
});

export type Task = z.infer<typeof ingredientSchema>;
