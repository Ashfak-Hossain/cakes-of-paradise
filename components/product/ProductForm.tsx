'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

export const productSchema = z.object({
  product_name: z.string().min(2, {
    message: "Product name can't be empty",
  }),
  description: z.string().optional().nullable(),
  //   price: z.instanceof(Prisma.Decimal, {
  //     message: "Price can't be less than 0",
  //   }),
  price: z.number().int().nonnegative().min(1, {
    message: "Price can't be less than 0",
  }),
  //   cost_to_make: z.instanceof(Prisma.Decimal).optional().nullable(),
  cost_to_make: z.number().int().nonnegative().min(1, {
    message: "Cost can't be less than 0",
  }),
  current_stock: z.coerce.number().int().nonnegative().default(0),
  is_available: z.boolean().default(false),
  image: z
    .any()
    .refine((files) => files?.[0]?.size <= 5 * 1024 * 1024, `Max image size is 5MB.`)
    .refine(
      (files) => ['image/jpeg', 'image/png', 'image/webp'].includes(files?.[0]?.type),
      'Only .jpg, .png, .webp formats are supported.'
    )
    .optional()
    .nullable(),
});

export type ProductSchemaType = z.infer<typeof productSchema>;

const ProductForm = () => {
  const defaultValues: ProductSchemaType = {
    product_name: '',
    description: '',
    price: 0,
    cost_to_make: 0,
    current_stock: 0,
    is_available: false,
    image: null,
  };

  const form = useForm<ProductSchemaType>({
    resolver: zodResolver(productSchema),
    defaultValues,
    mode: 'onBlur',
  });

  const onSubmit = (values: ProductSchemaType) => {
    console.log(values);
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2">
            {/* Left Column */}
            <div className="space-y-4">
              {/* Product Name */}
              <FormField
                control={form.control}
                name="product_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Product Name <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormDescription>This is the name of the product</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* Right Column */}
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Price <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0"
                        //! start from here. i have to create custom input component for form. and then some changes with edroh and s3 setup for image upload
                        // onChange={(e) => Number(e.target.value)}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This is the price at which the product will be sold
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default ProductForm;
