'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import SectionHeader from '@/components/common/SectionHeader';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
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
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { measurement_units } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { useCreatePurchaseMutation } from '@/redux/features/api/purchases/purchasesApiSlice';
import { useGetSuppliersQuery } from '@/redux/features/api/supplier/supplierApiSlice';
import { setIsIngredientPurchaseDrawerOpen } from '@/redux/features/drawers/drawersSlice';
import { clearSelectedIngredient } from '@/redux/features/ingredients/ingredientsSlice';
import { useAppDispatch } from '@/redux/hooks';
import { Ingredient, IngredientPurchase, ingredientPurchaseSchema } from '@/schemas/ingredient';

interface IngredientPurchaseFormProps {
  initialData?: Ingredient | null;
}

const IngredientPurchaseForm = ({ initialData }: IngredientPurchaseFormProps) => {
  const dispatch = useAppDispatch();
  const { data: suppliersResult } = useGetSuppliersQuery();
  const [createPurchase, { isLoading: isPurchasing }] = useCreatePurchaseMutation();

  const [initialSupplierName, setInitialSupplierName] = useState<string | null>(null);
  const [initialSupplierId, setInitialSupplierId] = useState<number | null>(null);
  const [displayedUnitLabel, setDisplayedUnitLabel] = useState<string | null>(null);

  const suppliers = suppliersResult?.data;

  const defaultValues: IngredientPurchase = {
    ingredient_id: initialData?.ingredient_id || 0,
    ingredient_name: initialData?.ingredient_name || '',
    unit_of_measure: initialData?.unit_of_measure || '',
    cost: 0,
    stock: 0,
    reorder_level: initialData?.reorder_level || 0,
    supplier_id: initialSupplierId || null,
    supplier_name: initialSupplierName || '',
    purchase_date: new Date(),
  };

  const form = useForm<IngredientPurchase>({
    resolver: zodResolver(ingredientPurchaseSchema),
    defaultValues,
    mode: 'onBlur',
  });

  useEffect(() => {
    if (suppliers && initialData?.supplier_id) {
      const initialSupplier = suppliers.find((s) => s.supplier_id === initialData.supplier_id);
      if (initialSupplier) {
        setInitialSupplierName(initialSupplier.supplier_name || null);
        setInitialSupplierId(initialSupplier.supplier_id || null);
        form.setValue('supplier_name', initialSupplier.supplier_name || null);
        form.setValue('supplier_id', initialSupplier.supplier_id || null);
      }
    }

    const currentUnitValue = form.getValues('unit_of_measure');
    if (currentUnitValue) {
      const foundUnit = measurement_units.find((unit) => unit.value === currentUnitValue);
      setDisplayedUnitLabel(foundUnit?.label || null);
    } else {
      setDisplayedUnitLabel(null);
    }
  }, [suppliers, initialData, form]);

  const handleSupplierSelect = (value: string) => {
    const supplierName = value;
    const selectedSupplier = suppliers?.find((s) => s.supplier_name === supplierName);
    if (selectedSupplier) {
      form.setValue('supplier_name', selectedSupplier?.supplier_name || '');
      form.setValue('supplier_id', selectedSupplier.supplier_id || null);
    }
  };

  const onSubmit = async (data: IngredientPurchase) => {
    try {
      const payload = await createPurchase(data).unwrap();
      if (payload.success) {
        toast.success('Ingredient purchased successfully');
        dispatch(clearSelectedIngredient());
        dispatch(setIsIngredientPurchaseDrawerOpen(false));
        form.reset();
      } else {
        toast.error(payload.error?.message || 'Failed to purchase ingredient');
        if (payload.error?.details) {
          console.error('Purchase Error Details:', payload.error.details);
        }
      }
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.error &&
        error.response.data.error.message
      ) {
        toast.error(error.response.data.error.message);
        console.error(error.response.data.error);
      } else if (error.status === 403) {
        toast.error("Forbidden. You don't have permission to perform this action.");
      } else if (error.status === 404) {
        toast.error('Resource not found.');
      } else if (error.status === 500) {
        toast.error('A server error occurred. Please try again later.');
      } else {
        console.error('Purchase Error:', error);
        toast.error('Something went wrong');
      }
    }
  };

  return (
    <div className="flex flex-col space-y-4 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-900">
      <SectionHeader
        title="Purchase Ingredient"
        subtitle="Purchase the ingredient from the supplier."
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
                      Ingredient Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        readOnly
                        className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-gray-600 dark:text-gray-400">
                      The name of the ingredient.
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
                      Total Cost (BDT)
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormDescription className="text-gray-600 dark:text-gray-400">
                      The cost of the ingredient per unit.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Purchase Date */}
              <FormField
                control={form.control}
                name="purchase_date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Purchase Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              'w-[240px] pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      The date on which the ingredient was purchased.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Right Column */}
            {/* Unit */}
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="unit_of_measure"
                render={() => (
                  <FormItem>
                    <FormLabel className="text-gray-900 dark:text-gray-200">
                      Unit of Measure
                    </FormLabel>
                    <FormControl>
                      <Input
                        readOnly
                        className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
                        value={displayedUnitLabel || ''}
                      />
                    </FormControl>
                    <FormDescription className="text-gray-600 dark:text-gray-400">
                      The unit of measure for the ingredient.
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
                    <FormLabel className="text-gray-900 dark:text-gray-200">Stock</FormLabel>
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

              {/* Supplier */}
              <FormField
                control={form.control}
                name="supplier_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-900 dark:text-gray-200">Supplier</FormLabel>
                    <Select onValueChange={handleSupplierSelect} value={field.value!}>
                      <FormControl>
                        <SelectTrigger className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700">
                          <SelectValue placeholder="Select Supplier" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                        {suppliers &&
                          suppliers.map((supplier) => (
                            <SelectItem
                              key={supplier.supplier_id}
                              value={supplier.supplier_name || 'N/A'}
                            >
                              {supplier.supplier_name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    <FormDescription className="text-gray-600 dark:text-gray-400">
                      The supplier of the ingredient.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Button
            type="submit"
            className="bg-gray-900 hover:bg-gray-800 dark:bg-blue-500 dark:hover:bg-blue-600 text-white flex items-center gap-2"
            disabled={form.formState.isSubmitting || isPurchasing}
          >
            {form.formState.isSubmitting || isPurchasing ? (
              <>
                Purchasing <Loader2 className="animate-spin w-5 h-5" />
              </>
            ) : (
              'Purchase'
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default IngredientPurchaseForm;
