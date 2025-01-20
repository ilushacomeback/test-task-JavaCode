import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authApi } from '@/shared/api/auth';
import { todoApi } from '@/shared/api/todo';
import {
  authReducer as authState,
  actions as authActions,
  authSelectors,
} from '../slices/authSlice';
import {
  todoReducer as todoState,
  actions as todoActions,
  todoSelectors,
} from '../slices/todoSlice';

export const actions = {
  ...authActions,
  ...todoActions,
};

export const selectors = {
  authSelectors,
  todoSelectors,
};

const reducer = combineReducers({
  authState,
  todoState,
  [authApi.reducerPath]: authApi.reducer,
  [todoApi.reducerPath]: todoApi.reducer,
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([authApi.middleware, todoApi.middleware,]),
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
