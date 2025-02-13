'use client';

import SectionHeader from '@/components/common/SectionHeader';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Ingredient, ingredientSchema } from '@/schemas/ingredient';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { measurement_units } from '@/lib/constants';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

const defaultValues: Partial<Ingredient> = {
  ingredient_name: '',
  unit_of_measure: '',
  stock: 0,
  cost: 0,
  reorder_level: 0,
};

const IngredientForm = () => {
  const form = useForm<Ingredient>({
    resolver: zodResolver(ingredientSchema),
    defaultValues,
    mode: 'onBlur',
  });

  const onSubmit = async (data: Ingredient) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/inventory`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add ingredient');
      }
      toast.success('Ingredient added successfully!');
      form.reset();
    } catch (error) {
      console.error('Error adding ingredient:', error);
      const errorMessage =
        error instanceof Error ? error.message : 'Something went wrong!';
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex flex-col space-y-4 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-900">
      <SectionHeader
        title="Add Ingredients"
        subtitle="Add new ingredients to your inventory."
      />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2">
            {/* Left Column */}
            <div className="space-y-4">
              {/* Name */}
              <FormField
                control={form.control}
                name="ingredient_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-900 dark:text-gray-200">
                      Ingredient Name <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Eggs..."
                        className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-gray-600 dark:text-gray-400">
                      The name of the ingredient you want to add.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Stock */}
              <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-900 dark:text-gray-200">
                      Stock <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0"
                        className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormDescription className="text-gray-600 dark:text-gray-400">
                      Stock of the ingredient you want to add.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Cost */}
              <FormField
                control={form.control}
                name="cost"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-900 dark:text-gray-200">
                      Cost <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0"
                        className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormDescription className="text-gray-600 dark:text-gray-400">
                      The cost of the ingredient.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              {/* Unit */}
              <FormField
                control={form.control}
                name="unit_of_measure"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-900 dark:text-gray-200">
                      Unit of Measure <span className="text-red-500">*</span>
                    </FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(value)}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700">
                          <SelectValue placeholder="Select unit" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                        {measurement_units.map((unit) => (
                          <SelectItem key={unit.value} value={unit.value}>
                            {unit.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription className="text-gray-600 dark:text-gray-400">
                      The unit of measure for the ingredient.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Reorder Level */}
              <FormField
                control={form.control}
                name="reorder_level"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-900 dark:text-gray-200">
                      Reorder Level
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0"
                        className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormDescription className="text-gray-600 dark:text-gray-400">
                      The reorder level for the ingredient.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Supplier */}
              {/* <FormField
                control={form.control}
                name="supplier_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-900 dark:text-gray-200">
                      Supplier
                    </FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(value)}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700">
                          <SelectValue placeholder="Select Supplier" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                        <SelectItem value="1">Supplier 1</SelectItem>
                        <SelectItem value="2">Supplier 2</SelectItem>
                        <SelectItem value="3">Supplier 3</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription className="text-gray-600 dark:text-gray-400">
                      The supplier of the ingredient.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
            </div>
          </div>

          <Button
            type="submit"
            className="bg-gray-900 hover:bg-gray-800 dark:bg-blue-500 dark:hover:bg-blue-600 text-white flex items-center gap-2"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isLoading ? (
              <>
                <Loader2 className="animate-spin w-5 h-5" /> Adding...
              </>
            ) : (
              'Add Ingredient'
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default IngredientForm;
