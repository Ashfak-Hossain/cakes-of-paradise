import { z } from 'zod';

export const supplierSchema = z.object({
  supplier_id: z.number().int().positive().optional(),
  supplier_name: z.string().optional(),
  contact_name: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  supplied_ingredients: z.unknown().optional(),
  payment_terms: z.string().optional(),
});
export type Supplier = z.infer<typeof supplierSchema>;
