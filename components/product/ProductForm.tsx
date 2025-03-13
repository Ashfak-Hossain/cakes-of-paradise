"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { CustomFormField } from "@/components/common/CustomFormField";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useGetCategoriesQuery } from "@/redux/features/api/categories/categoriesApiSlice";
import { useCreateProductMutation } from "@/redux/features/api/products/productsApiSlice";
import { productSchema, ProductSchemaType } from "@/schemas/product";

const ProductForm = () => {
  const {
    data: categories,
    isLoading: isCategoriesLoading,
    isError,
  } = useGetCategoriesQuery();
  const [createProduct, { isLoading: isProductCreating }] =
    useCreateProductMutation();

  const categoryOptions = categories?.data
    ? categories.data.map((category) => ({
        value: category.category_id.toString(), //* this converts to number in zod schema
        label: category.category_name,
      }))
    : [];

  const defaultValues: ProductSchemaType = {
    product_name: "",
    description: "",
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
    mode: "onBlur",
  });

  useEffect(() => {
    if (isError) {
      toast.error("Failed to fetch categories");
    }
  }, [isError]);

  const onSubmit = async (values: ProductSchemaType) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (key === "photoUrls") {
        const files = value as File[];
        files.forEach((file: File) => {
          formData.append("photos", file);
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
        {categoryOptions.length === 0 && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>No Categories Found</AlertTitle>
            <AlertDescription>
              You need to add categories first before you can add products.
            </AlertDescription>
          </Alert>
        )}
        <div className="grid grid-cols-1 gap-4 p-2 md:grid-cols-2">
          {/* Left Column */}
          <div className="space-y-4">
            <CustomFormField
              name="product_name"
              label="Product Name"
              required
              disabled={isProductCreating}
            />
            <CustomFormField
              name="current_stock"
              label="Current Stock"
              type="number"
              required
              disabled={isProductCreating}
            />
            <CustomFormField
              name="category_id"
              label="Category"
              type="select"
              options={categoryOptions}
              disabled={isCategoriesLoading || isProductCreating}
              required
            />
            <CustomFormField
              name="description"
              label="Description"
              type="textarea"
              disabled={isProductCreating}
            />
            <CustomFormField
              name="is_available"
              label="Is Available"
              type="switch"
              disabled={isProductCreating}
            />
          </div>
          {/* Right Column */}
          <div className="space-y-4">
            <CustomFormField
              name="price"
              label="Price"
              type="number"
              required
              disabled={isProductCreating}
            />
            <CustomFormField
              name="cost_to_make"
              label="Cost to Make"
              type="number"
              disabled={isProductCreating}
            />
            <CustomFormField
              name="photoUrls"
              label="Photos of the Product"
              type="file"
              accept="image/*"
              disabled={isProductCreating}
            />
          </div>
        </div>
        <Button type="submit" disabled={isProductCreating}>
          {isProductCreating ? "Adding Product" : "Add Product"}
        </Button>
      </form>
    </Form>
  );
};

export default ProductForm;
