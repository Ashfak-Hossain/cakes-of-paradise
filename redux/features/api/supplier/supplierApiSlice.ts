import { ApiResponse } from '@/app/api/v1/types/types';
import { apiSlice } from '@/redux/features/api/apiSlice';
import { Supplier } from '@/schemas/supplier';

const supplierApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //* query to get all suppliers
    getSuppliers: builder.query<ApiResponse<Supplier[]>, void>({
      query: () => ({
        url: '/suppliers',
        method: 'GET',
      }),
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map(({ supplier_id }) => ({
                type: 'Supplier' as const,
                id: supplier_id,
              })),
              { type: 'Supplier', id: 'LIST' },
            ]
          : [{ type: 'Supplier', id: 'LIST' }],
    }),
  }),
});

export const { useGetSuppliersQuery } = supplierApiSlice;
export default supplierApiSlice;
