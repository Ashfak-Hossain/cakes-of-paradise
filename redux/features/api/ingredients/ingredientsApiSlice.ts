import { ApiResponse } from '@/app/api/v1/types/types';
import { apiSlice } from '@/redux/features/api/apiSlice';
import { Ingredient } from '@/schemas/ingredient';

const ingredientsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //* add ingredient mutation
    addIngredient: builder.mutation<ApiResponse<Partial<Ingredient>>, Partial<Ingredient>>({
      query: (data) => ({
        url: '/ingredient',
        method: 'POST',
        body: data,
      }),
    }),

    //* update ingredient mutation
    updateIngredient: builder.mutation<any, Ingredient>({
      query: (data) => ({
        url: `/ingredient/${data.ingredient_id}`,
        method: 'PATCH',
        body: data,
      }),
    }),
  }),
});

export const { useAddIngredientMutation, useUpdateIngredientMutation } = ingredientsApiSlice;

export default ingredientsApiSlice;
