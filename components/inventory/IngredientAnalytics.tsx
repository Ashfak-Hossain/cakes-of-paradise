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
import { useEffect, useState } from 'react';
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

interface Ingredient {
  ingredient_id: number;
  ingredient_name: string;
  unit_of_measure: string;
  current_stock: string;
  reorder_level: string;
  supplier_id: number;
  supplier_name: string;
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
  const [chartData, setChartData] = useState<chartData[]>([]);
  const [selectedDateRange, setSelectedDateRange] = useState<
    DateRange | undefined
  >(undefined);
  const [selectedUnit, setSelectedUnit] = useState<string | null>(null);

  useEffect(() => {
    if (selectedIngredientId === null) {
      setChartData([]);
      return;
    }

    const selectedIngredient = data.find(
      (item) => item.ingredient_id === selectedIngredientId
    );

    if (!selectedIngredient) {
      setChartData([]);
      return;
    }
    setSelectedUnit(selectedIngredient.unit_of_measure);

    const aggregatedData = selectedIngredient.purchases.reduce(
      (accumulator, purchase) => {
        const date = format(parseISO(purchase.purchase_date), 'yyyy-MM-dd');
        const quantity = parseFloat(purchase.quantity);
        const existingEntry = accumulator.find((entry) => entry.date === date);
        if (existingEntry) {
          existingEntry.quantity += quantity;
        } else {
          accumulator.push({ date, quantity });
        }
        return accumulator;
      },
      [] as chartData[]
    );

    aggregatedData.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA.getTime() - dateB.getTime();
    });

    console.log('Aggregated Data:', aggregatedData);
    setChartData(aggregatedData);
  }, [selectedIngredientId, data]);

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
    console.log('Selected Date Range:', date);
    if (date?.from && date?.to) {
      const startDate = date.from;
      const endDate = date.to;
      // ... use startDate and endDate for your data fetching or filtering
    }
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
        <SelectTrigger className="w-[180px]">
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

      {selectedIngredientId !== null && chartData.length > 0 && (
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
            <div>
              <DatePickerWithRange onDateChange={handleDateRangeChange} />
            </div>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <ChartContainer
              config={chartConfig}
              className="aspect-auto h-[300px] w-full"
            >
              <BarChart
                accessibilityLayer
                data={chartData}
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
            <div className="flex gap-2 font-medium leading-none">
              <TrendingUp size={16} />
              <span>Quantity Purchased</span>
            </div>
            <div className="leading-none text-muted-foreground">
              Showing total visitors for the last 6 months
            </div>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default IngredientAnalytics;
