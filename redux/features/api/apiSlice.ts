import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

/**
 * Base query with a base URL for all requests.
 */
const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
});

// Tag types for the API slice.
const tagTypes: string[] = ['Supplier', 'Category'];

/**
 **   Base API Slice
 *  - Base API slice that all other API slices will extend
 *  - Provides a baseQuery with a base URL for all requests
 *  - No endpoints are defined here, they are defined in the other API slices
 */
export const apiSlice = createApi({
  baseQuery,
  reducerPath: 'apiSlice',
  tagTypes,
  endpoints: () => ({}),
});
