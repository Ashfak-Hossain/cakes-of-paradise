import { Category } from '@prisma/client';

import { ApiResponse } from '@/app/api/v1/types/types';
import { apiSlice } from '@/redux/features/api/apiSlice';

const categoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //* query to get all categories
    getCategories: builder.query<ApiResponse<Category[]>, void>({
      query: () => ({
        url: '/categories',
        method: 'GET',
      }),
      providesTags: (result) => {
        return result?.data
          ? [
              ...result.data.map(({ category_id }) => ({
                type: 'Category' as const,
                id: category_id,
              })),
              { type: 'Category', id: 'LIST' },
            ]
          : [{ type: 'Category', id: 'LIST' }];
      },
    }),
  }),
});

export const { useGetCategoriesQuery } = categoriesApiSlice;
export default categoriesApiSlice;
