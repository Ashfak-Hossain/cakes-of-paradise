import { z } from 'zod';

export const categorySchema = z.object({
  category_name: z.string().min(2, {
    message: "Category name can't be empty",
  }),
  description: z.string().optional().nullable(),
});

export type CategorySchemaType = z.infer<typeof categorySchema>;
