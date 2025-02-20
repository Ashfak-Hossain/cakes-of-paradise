import { ApiResponse } from '@/app/api/v1/types/types';
import { apiSlice } from '@/redux/features/api/apiSlice';
import { IngredientPurchase } from '@/schemas/ingredient';
import { Purchase } from '@/schemas/purchase';

const purchasesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //* create purchase mutation
    createPurchase: builder.mutation<ApiResponse<Purchase>, IngredientPurchase>({
      query: (data) => ({
        url: '/purchases',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useCreatePurchaseMutation } = purchasesApiSlice;

export default purchasesApiSlice;
