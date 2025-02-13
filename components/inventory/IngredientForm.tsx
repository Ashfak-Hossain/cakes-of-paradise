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
    mode: 'onChange',
  });

  const onSubmit = (data: Ingredient) => {
    console.log(data);
    toast.success('Ingredient added successfully');
  };

  return (
    <div className="flex flex-col space-y-4 border border-dashed border-gray-200 rounded-lg p-4">
      <SectionHeader
        title="Add Ingredients"
        subtitle="Add new ingredients to your inventory."
      />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left Column */}
            <div className="space-y-4">
              {/* Name */}
              <FormField
                control={form.control}
                name="ingredient_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Ingredient Name <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Eggs..." {...field} />
                    </FormControl>
                    <FormDescription>
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
                    <FormLabel>
                      Stock
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormDescription>
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
                    <FormLabel>
                      Cost
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormDescription>
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
                    <FormLabel>
                      Unit of Measure <span className="text-red-500">*</span>
                    </FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(value)}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select unit" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {measurement_units.map((unit) => (
                          <SelectItem key={unit.value} value={unit.value}>
                            {unit.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
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
                    <FormLabel>Reorder Level</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormDescription>
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
                <FormLabel>Supplier</FormLabel>
                <FormControl>
                 
                </FormControl>
                <FormDescription>
                  The supplier of the ingredient.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          /> */}
            </div>
          </div>
          <Button type="submit">Add Ingredient</Button>
        </form>
      </Form>
    </div>
  );
};

export default IngredientForm;
