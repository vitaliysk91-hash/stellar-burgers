import {
  createOrder,
  fetchOrderByNumber,
  orderReducer,
  resetCreatedOrder,
} from '@slices/orderSlice';

import type { TOrder } from '@utils-types';

const order: TOrder = {
  _id: 'order-1',
  status: 'done',
  name: 'Бургер',
  createdAt: '2026-09-22T10:00:00.000Z',
  updatedAt: '2026-09-22T10:00:00.000Z',
  number: 123,
  ingredients: ['ingredient-1'],
};

describe('orderSlice', () => {
  it('tracks order creation request and stores successful order', () => {
    let state = orderReducer(undefined, createOrder.pending('request', ['1']));
    expect(state.orderRequest).toBe(true);

    state = orderReducer(state, createOrder.fulfilled(order, 'request', ['1']));
    expect(state.orderRequest).toBe(false);
    expect(state.orderModalData).toEqual(order);
  });

  it('resets created order data', () => {
    let state = orderReducer(undefined, createOrder.fulfilled(order, 'request', ['1']));
    state = orderReducer(state, resetCreatedOrder());
    expect(state.orderModalData).toBeNull();
  });

  it('stores order loaded by number', () => {
    const state = orderReducer(
      undefined,
      fetchOrderByNumber.fulfilled(order, 'request', 123)
    );
    expect(state.orderData).toEqual(order);
    expect(state.orderDetailsLoading).toBe(false);
  });
});
