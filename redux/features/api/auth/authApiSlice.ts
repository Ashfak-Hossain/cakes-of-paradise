import { ApiResponse } from '@/app/api/v1/types/types';
import { apiSlice } from '@/redux/features/api/apiSlice';
import { SignUp } from '@/schemas/auth';

const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //* create user mutation
    createUser: builder.mutation<ApiResponse<SignUp>, SignUp>({
      query: (data) => ({
        url: '/auth/signup',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useCreateUserMutation } = authApiSlice;

export default authApiSlice;
