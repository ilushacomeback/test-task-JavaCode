import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiRoutes } from '../routes/routes';

export const authApi = createApi({
  reducerPath: 'authApi',
  tagTypes: ['Todos'],
  baseQuery: fetchBaseQuery({
    baseUrl: '',
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        method: 'POST',
        body: data,
        url: apiRoutes.login(),
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        method: 'POST',
        body: data,
        url: apiRoutes.signup(),
      }),
    }),
    refresh: builder.mutation({
      query: () => ({
        method: 'POST',
        url: apiRoutes.refresh(),
      }),
      invalidatesTags: ['Todos'],
    }),
  }),
});

export const {
  useLoginMutation: useLogin,
  useRegisterMutation: useRegister,
} = authApi;
