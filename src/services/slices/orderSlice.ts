import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getOrderByNumberApi, orderBurgerApi } from '@api';

import type { TOrder } from '@utils-types';

type OrderState = {
  orderRequest: boolean;
  orderModalData: TOrder | null;
  orderError: string | null;
  orderData: TOrder | null;
  orderDetailsLoading: boolean;
  orderDetailsError: string | null;
};

const initialState: OrderState = {
  orderRequest: false,
  orderModalData: null,
  orderError: null,
  orderData: null,
  orderDetailsLoading: false,
  orderDetailsError: null,
};

export const createOrder = createAsyncThunk(
  'order/create',
  async (ingredientIds: string[]) => (await orderBurgerApi(ingredientIds)).order
);

export const fetchOrderByNumber = createAsyncThunk(
  'order/fetchByNumber',
  async (number: number) => {
    const response = await getOrderByNumberApi(number);
    const order = response.orders[0];

    if (!order) {
      throw new Error('Заказ не найден');
    }

    return order;
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetCreatedOrder: (state) => {
      state.orderModalData = null;
      state.orderError = null;
    },
    resetOrderDetails: (state) => {
      state.orderData = null;
      state.orderDetailsError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.orderRequest = true;
        state.orderError = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.orderError = action.error.message ?? 'Не удалось оформить заказ';
      })
      .addCase(fetchOrderByNumber.pending, (state) => {
        state.orderDetailsLoading = true;
        state.orderDetailsError = null;
        state.orderData = null;
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.orderDetailsLoading = false;
        state.orderData = action.payload;
      })
      .addCase(fetchOrderByNumber.rejected, (state, action) => {
        state.orderDetailsLoading = false;
        state.orderDetailsError = action.error.message ?? 'Не удалось загрузить заказ';
      });
  },
});

export const orderReducer = orderSlice.reducer;
export const { resetCreatedOrder, resetOrderDetails } = orderSlice.actions;
