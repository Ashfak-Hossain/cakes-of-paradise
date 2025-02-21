import { ApiResponse } from '@/app/api/v1/types/types';
import { fetcher } from '@/lib/fetcher';
import { GetIngredientsReturn } from '@/types/types';

export const getIngredient = async (): Promise<ApiResponse<GetIngredientsReturn[]>> => {
  return fetcher(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/ingredient`, {
    cache: 'no-cache',
  });
};
