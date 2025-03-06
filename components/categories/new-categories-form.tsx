'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { CustomFormField } from '@/components/common/CustomFormField';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useCreateCategoryMutation } from '@/redux/features/api/categories/categoriesApiSlice';
import { categorySchema, CategorySchemaType } from '@/schemas/category';

const NewCategoryForm = () => {
  const [createCategory, { isLoading }] = useCreateCategoryMutation();

  const defaultValues: CategorySchemaType = {
    category_name: '',
    description: '',
  };

  const form = useForm<CategorySchemaType>({
    resolver: zodResolver(categorySchema),
    defaultValues,
    mode: 'onBlur',
  });

  const onSubmit = async (values: CategorySchemaType) => {
    await createCategory(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 gap-4 p-2">
        <CustomFormField name="category_name" label="Category Name" />
        <CustomFormField name="description" label="Description" type="textarea" />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Creating...' : 'Add Category'}
        </Button>
      </form>
    </Form>
  );
};

export default NewCategoryForm;
