import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiRoutes } from '../routes/routes';
import { RootState } from '@/app/model/store/store';

export const todoApi = createApi({
  reducerPath: 'todoApi',
  keepUnusedDataFor: 0,
  tagTypes: ['Todos'],
  baseQuery: fetchBaseQuery({
    baseUrl: apiRoutes.todos(),
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).authState.accessToken;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: (userId) => `/${userId}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map((todo: { id: string }) => ({
                type: 'Todos',
                id: todo.id,
              })),
              'Todos',
            ]
          : ['Todos'],
    }),
    addTask: builder.mutation({
      query: (data) => ({
        method: 'POST',
        body: data,
        url: '',
      }),
      invalidatesTags: ['Todos'],
    }),
    editTask: builder.mutation({
      query: (data) => ({
        method: 'PATCH',
        body: data,
        url: `/${data.id}`,
      }),
      invalidatesTags: ['Todos'],
    }),
    removeTask: builder.mutation({
      query: (id) => ({
        method: 'DELETE',
        url: `/${id}`,
      }),
      invalidatesTags: ['Todos'],
    }),
  }),
});

export const {
  useAddTaskMutation: useAddTask,
  useEditTaskMutation: useEditTask,
  useGetTasksQuery: useGetTasks,
  useRemoveTaskMutation: useRemoveTask,
} = todoApi;
