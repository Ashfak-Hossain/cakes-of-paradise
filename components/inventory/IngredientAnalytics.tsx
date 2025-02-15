'use client';

import SectionHeader from '@/components/common/SectionHeader';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { toast } from 'sonner';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { CartesianGrid, XAxis, LabelList, BarChart, Bar } from 'recharts';
import { useMemo, useState } from 'react';
import { TrendingUp } from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { DatePickerWithRange } from '../ui/datePickerWithRange';
import { DateRange } from 'react-day-picker';
import { format, parse, parseISO } from 'date-fns';
import { Button } from '../ui/button';

interface Ingredient {
  ingredient_id: number;
  ingredient_name: string;
  unit_of_measure: string;
  current_stock: string;
  reorder_level: string;
  supplier_id: number;
  supplier: {
    supplier_id: number;
    supplier_name: string;
  };
  purchases: {
    purchase_id: number;
    supplier_id: number | null;
    ingredient_id: number;
    quantity: string;
    unit_cost: string;
    total_cost: string;
    purchase_date: string;
  }[];
}

interface IngredientAnalyticsProps {
  data: Ingredient[];
}

type chartData = {
  date: string;
  quantity: number;
};

const IngredientAnalytics = ({ data }: IngredientAnalyticsProps) => {
  const [selectedIngredientId, setSelectedIngredientId] = useState<
    number | null
  >(null);
  const [selectedDateRange, setSelectedDateRange] = useState<
    DateRange | undefined
  >(undefined);
  const [selectedUnit, setSelectedUnit] = useState<string | null>(null);

  const aggregatedData = useMemo(() => {
    if (selectedIngredientId === null) return [];

    const selectedIngredient = data.find(
      (item) => item.ingredient_id === selectedIngredientId
    );
    if (!selectedIngredient) return [];

    setSelectedUnit(selectedIngredient.unit_of_measure);

    const result = selectedIngredient.purchases.reduce((acc, purchase) => {
      const date = format(parseISO(purchase.purchase_date), 'yyyy-MM-dd'); // ✅ Directly format the date
      const quantity = parseFloat(purchase.quantity);
      const existingEntry = acc.find((entry) => entry.date === date);

      if (existingEntry) {
        existingEntry.quantity += quantity;
      } else {
        acc.push({ date, quantity });
      }
      return acc;
    }, [] as chartData[]);

    return result.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  }, [selectedIngredientId, data]);

  const filteredChartData = useMemo(() => {
    if (!selectedDateRange?.from || !selectedDateRange?.to)
      return aggregatedData;

    return aggregatedData.filter((entry) => {
      const entryDate = new Date(entry.date);
      return (
        selectedDateRange?.from &&
        selectedDateRange?.to &&
        entryDate.getTime() >= selectedDateRange.from.getTime() &&
        entryDate.getTime() <= selectedDateRange.to.getTime()
      );
    });
  }, [selectedDateRange, aggregatedData]);

  const handleSelectChange = (value: string) => {
    const selectedId = Number(value);
    setSelectedIngredientId(selectedId);
    toast(
      `Selected Ingredient: ${
        data.find((item) => item.ingredient_id === selectedId)
          ?.ingredient_name || 'Unknown'
      }`
    );
  };

  const handleDateRangeChange = (date: DateRange | undefined) => {
    setSelectedDateRange(date);
  };

  const chartConfig = {
    count: {
      label: 'Total Purchases : ',
      color: '#10b981',
    },
    quantity: {
      label: `Quantity Purchased (${selectedUnit}) : `,
      color: '#2563eb',
    },
  } satisfies ChartConfig;

  return (
    <div className="flex flex-col space-y-4 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-900">
      <SectionHeader
        title="Ingredient Analytics"
        subtitle="View purchase history"
      />
      <Select onValueChange={handleSelectChange}>
        <SelectTrigger className="w-[250px]">
          <SelectValue placeholder="Select Ingredient" />
        </SelectTrigger>
        <SelectContent>
          {data.map((ingredient) => (
            <SelectItem
              key={ingredient.ingredient_id}
              value={ingredient.ingredient_id.toString()}
            >
              {ingredient.ingredient_name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {selectedIngredientId !== null && aggregatedData.length > 0 && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex flex-col items-start gap-2">
              <CardTitle>
                {data.find(
                  (item) => item.ingredient_id === selectedIngredientId
                )?.ingredient_name || 'Unknown'}
              </CardTitle>
              <CardDescription>
                Purchase history for the selected ingredient
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <DatePickerWithRange onDateChange={handleDateRangeChange} />
              <Button
                variant="outline"
                onClick={() => setSelectedDateRange(undefined)}
              >
                Reset
              </Button>
            </div>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <ChartContainer
              config={chartConfig}
              className="aspect-auto h-[300px] w-full"
            >
              <BarChart
                accessibilityLayer
                data={filteredChartData}
                margin={{
                  top: 25,
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={10}
                  tickFormatter={(value) => {
                    return format(
                      parse(value, 'yyyy-MM-dd', new Date()),
                      'MMM d'
                    );
                  }}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      className="min-w-44"
                      indicator="line"
                      nameKey="count"
                      labelFormatter={(value) => {
                        return format(
                          parse(value, 'yyyy-MM-dd', new Date()),
                          'MMM d, yyyy'
                        );
                      }}
                    />
                  }
                />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="quantity" fill="#2563eb" radius={[5, 5, 2, 2]}>
                  <LabelList
                    position="top"
                    offset={12}
                    className="fill-foreground"
                    fontSize={12}
                    fontWeight={500}
                  />
                </Bar>
              </BarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex gap-2 font-medium leading-none items-center">
              <TrendingUp size={20} />
              <span>
                Total Purchases:
                <span className="font-bold px-1">
                  {filteredChartData.length}
                </span>
              </span>
            </div>
            <div className="leading-none text-muted-foreground">
              {selectedDateRange?.from && selectedDateRange?.to ? (
                <>
                  Showing total purchases from{' '}
                  <span className="font-medium">
                    {format(selectedDateRange.from, 'MMM d, yyyy')}
                  </span>{' '}
                  to{' '}
                  <span className="font-medium">
                    {format(selectedDateRange.to, 'MMM d, yyyy')}
                  </span>{' '}
                  (
                  <span className="font-medium">
                    {Math.ceil(
                      (selectedDateRange.to.getTime() -
                        selectedDateRange.from.getTime()) /
                        (1000 * 60 * 60 * 24) +
                        1
                    )}
                  </span>{' '}
                  days)
                </>
              ) : (
                'Showing total purchases'
              )}
            </div>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default IngredientAnalytics;
