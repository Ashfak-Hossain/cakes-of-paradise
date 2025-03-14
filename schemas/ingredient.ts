import { Prisma } from '@prisma/client';
import { z } from 'zod';

import { measurement_units } from '@/lib/constants';

//* Ingredient Add schema
export const ingredientSchema = z.object({
  ingredient_id: z.number().int().positive().optional(),
  ingredient_name: z.string().min(1, 'Ingredient name is required'),
  unit_of_measure: z.enum(measurement_units.map((u) => u.value) as [string, ...string[]], {
    message: 'Invalid unit of measure',
  }),
  cost: z.number().int().nonnegative().min(1, { message: "Cost can't be 0" }),
  stock: z.number().int().nonnegative().min(1, { message: "Stock can't be 0" }),
  reorder_level: z.number().int().nonnegative().optional().default(0),
  supplier_id: z.number().int().positive().nullable(),
});
export type Ingredient = z.infer<typeof ingredientSchema>;

//* Ingredient Update schema
export const ingredientUpdateSchema = ingredientSchema.omit({
  unit_of_measure: true,
  cost: true,
  stock: true,
});
export type IngredientUpdate = z.infer<typeof ingredientUpdateSchema>;

//* Ingredient Purchase Schema
export const ingredientPurchaseSchema = ingredientSchema.extend({
  supplier_name: z.string().nullable(),
  purchase_date: z.union([z.string().transform((val) => new Date(val)), z.date()]),
});
export type IngredientPurchase = z.infer<typeof ingredientPurchaseSchema>;

//* Add ingredient return type
export const AddIngredientSchema = ingredientSchema.extend({
  reorder_level: z.instanceof(Prisma.Decimal).nullable(),
  current_stock: z.instanceof(Prisma.Decimal),
});
export type AddIngredient = z.infer<typeof AddIngredientSchema>;
