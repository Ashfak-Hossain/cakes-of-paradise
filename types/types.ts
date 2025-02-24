import { Prisma, Product } from '@prisma/client';

import { AddIngredient, Ingredient } from '@/schemas/ingredient';
import { Purchase } from '@/schemas/purchase';
import { Supplier } from '@/schemas/supplier';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export type AddIngredientReturn = {
  newIngredient: Partial<AddIngredient>;
  newPurchase: Purchase;
};

export interface GetIngredientsReturn extends Omit<Ingredient, 'cost' | 'stock' | 'reorder_level'> {
  current_stock: Prisma.Decimal;
  reorder_level: Prisma.Decimal | null;
  supplier: Omit<
    Supplier,
    'contact_name' | 'phone' | 'email' | 'supplied_ingredients' | 'payment_terms'
  > | null;
  purchases: Purchase[];
}

export interface getProductsReturn {
  products: Product[];
  totalCount: number;
}

export interface ProductPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}
