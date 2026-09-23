import type { RootState } from '@services/store';

export const selectIngredients = (
  state: RootState
): RootState['ingredients']['ingredients'] => state.ingredients.ingredients;

export const selectIngredientsLoading = (
  state: RootState
): RootState['ingredients']['isLoading'] => state.ingredients.isLoading;

export const selectIngredientsError = (
  state: RootState
): RootState['ingredients']['error'] => state.ingredients.error;

export const selectConstructor = (state: RootState): RootState['burgerConstructor'] =>
  state.burgerConstructor;

export const selectFeed = (state: RootState): RootState['feed'] => state.feed;

export const selectFeedOrders = (state: RootState): RootState['feed']['orders'] =>
  state.feed.orders;

export const selectFeedLoading = (state: RootState): RootState['feed']['isLoading'] =>
  state.feed.isLoading;

export const selectFeedError = (state: RootState): RootState['feed']['error'] =>
  state.feed.error;

export const selectUserOrders = (state: RootState): RootState['userOrders']['orders'] =>
  state.userOrders.orders;

export const selectUserOrdersLoading = (
  state: RootState
): RootState['userOrders']['isLoading'] => state.userOrders.isLoading;

export const selectUserOrdersError = (
  state: RootState
): RootState['userOrders']['error'] => state.userOrders.error;

export const selectOrderRequest = (
  state: RootState
): RootState['order']['orderRequest'] => state.order.orderRequest;

export const selectOrderModalData = (
  state: RootState
): RootState['order']['orderModalData'] => state.order.orderModalData;

export const selectOrderData = (state: RootState): RootState['order']['orderData'] =>
  state.order.orderData;

export const selectOrderDetailsLoading = (
  state: RootState
): RootState['order']['orderDetailsLoading'] => state.order.orderDetailsLoading;

export const selectOrderDetailsError = (
  state: RootState
): RootState['order']['orderDetailsError'] => state.order.orderDetailsError;

export const selectUser = (state: RootState): RootState['user']['user'] =>
  state.user.user;

export const selectIsAuthChecked = (
  state: RootState
): RootState['user']['isAuthChecked'] => state.user.isAuthChecked;

export const selectLoginError = (state: RootState): RootState['user']['loginError'] =>
  state.user.loginError;

export const selectRegisterError = (
  state: RootState
): RootState['user']['registerError'] => state.user.registerError;

export const selectUpdateError = (state: RootState): RootState['user']['updateError'] =>
  state.user.updateError;

export const selectPasswordError = (
  state: RootState
): RootState['user']['passwordError'] => state.user.passwordError;
