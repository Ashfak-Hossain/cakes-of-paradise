import { Prisma } from '@prisma/client';
import { z } from 'zod';

export const purchaseSchema = z.object({
  purchase_id: z.number().int().optional(),
  supplier_id: z.number().int().nullable(),
  ingredient_id: z.number().int(),
  quantity: z.instanceof(Prisma.Decimal),
  unit_cost: z.instanceof(Prisma.Decimal),
  total_cost: z.instanceof(Prisma.Decimal),
  purchase_date: z.date(),
});

export type Purchase = z.infer<typeof purchaseSchema>;
