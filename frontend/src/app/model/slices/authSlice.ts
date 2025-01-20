import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store/store';
import { authApi } from '@/shared/api/auth';
import { initialState } from '@/app/lib/getAuthState';

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    logout: (state) => {
      state.id = null;
      state.accessToken = null;
      state.username = null;
      localStorage.removeItem('user');
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        authApi.endpoints.login.matchFulfilled,
        (state, { payload }) => {
          const data = {
            id: payload.user.id,
            username: payload.user.username,
            accessToken: payload.accessToken,
          };
          state.accessToken = data.accessToken;
          state.id = data.id;
          state.username = data.username;
          localStorage.setItem('user', JSON.stringify(data));
        }
      )
      .addMatcher(
        authApi.endpoints.register.matchFulfilled,
        (state, { payload }) => {
          const data = {
            id: payload.user.id,
            username: payload.user.username,
            accessToken: payload.accessToken,
          };
          state.accessToken = data.accessToken;
          state.id = data.id;
          state.username = data.username;
          localStorage.setItem('user', JSON.stringify(data));
        }
      )
      .addMatcher(
        authApi.endpoints.refresh.matchFulfilled,
        (state, { payload }) => {
          const data = {
            id: payload.user.id,
            username: payload.user.username,
            accessToken: payload.accessToken,
          };
          state.accessToken = data.accessToken;
          state.id = data.id;
          state.username = data.username;
          console.log('ok', data)
          localStorage.setItem('user', JSON.stringify(data));
        }
      )
      .addMatcher(
        authApi.endpoints.refresh.matchRejected,
        (state) => {
          state.id = null;
          state.accessToken = null;
          state.username = null;
          console.log('no')
          localStorage.removeItem('user');
        }
      );
  },
});

export const authSelectors = {
  selectToken: (state: RootState) => state.authState.accessToken,
  selectId: (state: RootState) => state.authState.id,
};
export const authReducer = authSlice.reducer;
export const { actions } = authSlice;
