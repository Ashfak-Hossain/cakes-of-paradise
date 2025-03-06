import { Category } from '@prisma/client';

import { ApiResponse } from '@/app/api/v1/types/types';
import { withToast } from '@/lib/utils';
import { apiSlice } from '@/redux/features/api/apiSlice';
import { CategorySchemaType } from '@/schemas/category';

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

    //* create category mutation
    createCategory: builder.mutation<ApiResponse<Category>, CategorySchemaType>({
      query: (data) => ({
        url: '/categories',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: 'Category', id: 'LIST' }],
      onQueryStarted: async (_, { queryFulfilled }) => {
        await withToast(queryFulfilled, {
          success: 'Category created successfully!',
          error: 'Failed to create category.',
        });
      },
    }),
  }),
});

export const { useGetCategoriesQuery, useCreateCategoryMutation } = categoriesApiSlice;
export default categoriesApiSlice;
