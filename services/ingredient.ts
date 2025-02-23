import { ApiResponse } from '@/app/api/v1/types/types';
import { fetcher } from '@/lib/fetcher';
import { GetIngredientsReturn } from '@/types/types';

export const getIngredient = async (): Promise<ApiResponse<GetIngredientsReturn[]>> => {
  return fetcher('/api/v1/ingredient', {
    cache: 'no-cache',
  });
};
