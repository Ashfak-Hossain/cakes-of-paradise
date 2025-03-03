'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { CustomFormField } from '@/components/common/CustomFormField';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useGetCategoriesQuery } from '@/redux/features/api/categories/categoriesApiSlice';
import { useCreateProductMutation } from '@/redux/features/api/products/productsApiSlice';
import { productSchema, ProductSchemaType } from '@/schemas/product';

const ProductForm = () => {
  const { data: categories, isLoading: isCategoriesLoading, isError } = useGetCategoriesQuery();
  const [createProduct] = useCreateProductMutation();

  const categoryOptions = categories?.data
    ? categories.data.map((category) => ({
        value: category.category_id.toString(), //* this converts to number in zod schema
        label: category.category_name,
      }))
    : [];

  const defaultValues: ProductSchemaType = {
    product_name: '',
    description: '',
    price: 0,
    cost_to_make: 0,
    current_stock: 0,
    is_available: false,
    photoUrls: [],
    category_id: 0,
  };

  const form = useForm<ProductSchemaType>({
    resolver: zodResolver(productSchema),
    defaultValues,
    mode: 'onBlur',
  });

  useEffect(() => {
    if (isError) {
      toast.error('Failed to fetch categories');
    }
  }, [isError]);

  const onSubmit = async (values: ProductSchemaType) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (key === 'photoUrls') {
        const files = value as File[];
        files.forEach((file: File) => {
          formData.append('photos', file);
        });
      } else if (Array.isArray(value)) {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, String(value));
      }
    });

    await createProduct(formData);
    form.reset(defaultValues);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2">
          {/* Left Column */}
          <div className="space-y-4">
            <CustomFormField name="product_name" label="Product Name" required />
            <CustomFormField name="current_stock" label="Current Stock" type="number" required />
            <CustomFormField
              name="category_id"
              label="Category"
              type="select"
              options={categoryOptions}
              disabled={isCategoriesLoading}
              required
            />
            <CustomFormField name="description" label="Description" type="textarea" />
            <CustomFormField name="is_available" label="Is Available" type="switch" />
          </div>
          {/* Right Column */}
          <div className="space-y-4">
            <CustomFormField name="price" label="Price" type="number" required />
            <CustomFormField name="cost_to_make" label="Cost to Make" type="number" />
            <CustomFormField
              name="photoUrls"
              label="Photos of the Product"
              type="file"
              accept="image/*"
            />
          </div>
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default ProductForm;
