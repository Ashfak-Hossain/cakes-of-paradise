import { measurement_units } from '@/lib/constants';
import { z } from 'zod';

// export const ingredientSchema = z.object({
//   ingredient_id: z.number().int().positive().optional(),
//   ingredient_name: z.string().min(1, 'Ingredient name is required'),
//   unit_of_measure: z.enum(
//     measurement_units.map((u) => u.value) as [string, ...string[]],
//     {
//       required_error: 'Invalid unit of measure',
//     }
//   ),
//   current_stock: z.number().nonnegative().default(0),
//   reorder_level: z.number().nonnegative().optional(),
//   supplier_id: z.number().int().positive().optional(),
// });

export const ingredientSchema = z.object({
  ingredient_name: z.string().min(1, 'Ingredient name is required'),
  unit_of_measure: z.enum(
    measurement_units.map((u) => u.value) as [string, ...string[]],
    {
      message: 'Invalid unit of measure',
    }
  ),
  stock: z.number().nonnegative().min(0.0001, {
    message: "Stock can't be 0",
  }),
  cost: z.number().nonnegative().min(0.0001, {
    message: "Cost can't be 0",
  }),
  reorder_level: z.number().nonnegative().optional().default(0),
  supplier_id: z.number().int().positive().optional(),
});

export type Ingredient = z.infer<typeof ingredientSchema>;
