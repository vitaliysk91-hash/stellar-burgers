import { feedReducer, fetchFeed } from '@slices/feedSlice';

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

it('stores feed statistics and orders', () => {
  const state = feedReducer(
    undefined,
    fetchFeed.fulfilled(
      { success: true, orders: [order], total: 1000, totalToday: 20 },
      'request',
      undefined
    )
  );

  expect(state.orders).toEqual([order]);
  expect(state.total).toBe(1000);
  expect(state.totalToday).toBe(20);
});
