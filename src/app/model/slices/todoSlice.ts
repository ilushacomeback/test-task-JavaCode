import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store/store';
import { todoApi } from '@/shared/api/todo';

interface StateTodo {
  id: number;
  name: string;
  userId: string;
  state: 'completed' | 'uncompleted';
}

interface State {
  todos: StateTodo[];
  error: boolean | null;
}

const defaultState: State = {
  todos: [],
  error: false,
};

const todoSlice = createSlice({
  name: 'todoSlice',
  initialState: defaultState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        todoApi.endpoints.getTasks.matchFulfilled,
        (state, { payload }) => {
          state.todos = payload;
          state.error = false;
        }
      )
      .addMatcher(
        todoApi.endpoints.addTask.matchFulfilled,
        (state, { payload }) => {
          state.todos.push(payload);
          state.error = false;
        }
      )
      .addMatcher(
        todoApi.endpoints.editTask.matchFulfilled,
        (state, { payload }) => {
          const indexTask = state.todos.findIndex(
            ({ id }) => payload.id === id
          );
          state.todos[indexTask] = payload;
          state.error = false;
        }
      )
      .addMatcher(
        todoApi.endpoints.removeTask.matchFulfilled,
        (state, { payload }) => {
          state.todos = state.todos.filter(({ id }) => id !== payload);
          state.error = false;
        }
      )
      .addMatcher(
        (action) => {
          if (action.error) {
            return action.error;
          }
        },
        (
          state,
          { payload }: { payload: { status: number; data: string[] } }
        ) => {
          console.log(payload);
          if (payload?.status === 400 && payload.data[0] === 'access expired') {
            state.error = true;
          }
        }
      );
  },
});

export const todoSelectors = {
  selectTodos: (state: RootState) => state.todoState.todos,
  selectError: (state: RootState) => state.todoState.error,
};
export const todoReducer = todoSlice.reducer;
export const { actions } = todoSlice;
