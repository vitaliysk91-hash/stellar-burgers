import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getOrdersApi } from '@api';

import type { TOrder } from '@utils-types';

type UserOrdersState = {
  orders: TOrder[];
  isLoading: boolean;
  error: string | null;
};

const initialState: UserOrdersState = {
  orders: [],
  isLoading: false,
  error: null,
};

export const fetchUserOrders = createAsyncThunk('userOrders/fetch', getOrdersApi);

const userOrdersSlice = createSlice({
  name: 'userOrders',
  initialState,
  reducers: {
    clearUserOrders: (state) => {
      state.orders = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Не удалось загрузить историю заказов';
      });
  },
});

export const userOrdersReducer = userOrdersSlice.reducer;
export const { clearUserOrders } = userOrdersSlice.actions;
