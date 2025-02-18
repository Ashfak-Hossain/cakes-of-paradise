import { apiSlice } from '@/redux/features/api/apiSlice';
import { Supplier } from '@/schemas/supplier';

export interface SupplierList {
  success: boolean;
  data: Supplier[];
}

const supplierApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //* query to get all suppliers
    //*                        <ResultType, QueryArg>
    getSuppliers: builder.query<SupplierList, void>({
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

// addSupplier: builder.mutation<Supplier, Omit<Supplier, 'supplier_id'>>({ // Omit ID for add
//     query: (supplier) => ({
//       url: '/suppliers',
//       method: 'POST',
//       body: supplier,
//     }),
//     invalidatesTags: [{ type: 'Supplier', id: 'LIST' }], // Invalidate the list
//   }),
//   updateSupplier: builder.mutation<Supplier, Supplier>({
//     query: (supplier) => ({
//       url: `/suppliers/${supplier.supplier_id}`,
//       method: 'PATCH',
//       body: supplier,
//     }),
//     invalidatesTags: (result, error, arg) => [{ type: 'Supplier', id: arg.supplier_id }], // Invalidate the specific supplier
//   }),
//   deleteSupplier: builder.mutation<void, number>({ // Pass the ID to mutation
//     query: (supplierId) => ({
//       url: `/suppliers/${supplierId}`,
//       method: 'DELETE',
//     }),
//     invalidatesTags: (result, error, arg) => [{ type: 'Supplier', id: arg}], // Invalidate the specific supplier
//   }),
