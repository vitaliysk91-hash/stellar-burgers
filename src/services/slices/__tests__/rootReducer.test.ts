import { rootReducer } from '@services/rootReducer';

it('creates the complete initial Redux state', () => {
  const state = rootReducer(undefined, { type: '@@INIT' });

  expect(state).toEqual({
    burgerConstructor: {
      bun: null,
      ingredients: [],
    },
    feed: {
      orders: [],
      total: 0,
      totalToday: 0,
      isLoading: false,
      error: null,
    },
    ingredients: {
      ingredients: [],
      isLoading: true,
      error: null,
    },
    order: {
      orderRequest: false,
      orderModalData: null,
      orderError: null,
      orderData: null,
      orderDetailsLoading: false,
      orderDetailsError: null,
    },
    user: {
      user: null,
      isAuthChecked: false,
      loginError: null,
      registerError: null,
      updateError: null,
      passwordError: null,
    },
    userOrders: {
      orders: [],
      isLoading: false,
      error: null,
    },
  });
});
