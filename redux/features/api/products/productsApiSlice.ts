import { ApiResponse } from '@/app/api/v1/types/types';
import { withToast } from '@/lib/utils';
import { apiSlice } from '@/redux/features/api/apiSlice';
import { ProductSchemaType } from '@/schemas/product';

const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //* create product mutation
    createProduct: builder.mutation<ApiResponse<ProductSchemaType>, any>({
      query: (data) => ({
        url: '/products',
        method: 'POST',
        body: data,
      }),
      onQueryStarted: async (_, { queryFulfilled }) => {
        await withToast(queryFulfilled, {
          success: 'Product created successfully!',
          error: 'Failed to create product.',
        });
      },
    }),
  }),
});

export const { useCreateProductMutation } = productsApiSlice;
export default productsApiSlice;
