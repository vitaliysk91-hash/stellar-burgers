import { fetchUserOrders, userOrdersReducer } from '@slices/userOrdersSlice';

import type { TOrder } from '@utils-types';

const order: TOrder = {
  _id: 'order-1',
  status: 'pending',
  name: 'Бургер',
  createdAt: '2026-09-22T10:00:00.000Z',
  updatedAt: '2026-09-22T10:00:00.000Z',
  number: 123,
  ingredients: ['ingredient-1'],
};

it('stores authorized user order history', () => {
  const state = userOrdersReducer(
    undefined,
    fetchUserOrders.fulfilled([order], 'request', undefined)
  );

  expect(state.orders).toEqual([order]);
  expect(state.isLoading).toBe(false);
});
