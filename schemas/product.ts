import { z } from 'zod';

export const productSchema = z.object({
  product_name: z.string().min(2, {
    message: "Product name can't be empty",
  }),

  description: z.string().optional().nullable(),

  price: z.coerce
    .number()
    .min(1, { message: "Price can't be less than 1" })
    .refine((val) => !isNaN(val), { message: 'Price must be a number' }),

  cost_to_make: z.coerce
    .number()
    .refine((val) => !isNaN(val), { message: 'Cost to make must be a number' })
    .nullable(),

  current_stock: z.coerce.number().int().nonnegative().default(0),

  is_available: z.coerce.boolean().default(false),

  photoUrls: z
    .array(z.instanceof(File))
    .optional()
    .nullable()
    .refine((files) => {
      if (!files || files.length === 0) return true;
      return files.every((file) => ['image/jpeg', 'image/png', 'image/webp'].includes(file?.type));
    }, 'Only .jpg, .png, .webp formats are supported.')
    .refine((files) => {
      if (!files || files.length === 0) return true;
      return files.every((file) => file?.size <= 5 * 1024 * 1024);
    }, `Max image size is 5MB.`),

  category_id: z.union([
    z.string().transform((val) => parseInt(val)),
    z
      .number()
      .min(1, {
        message: 'Category is required',
      })
      .optional(),
  ]),
});

export type ProductSchemaType = z.infer<typeof productSchema>;
