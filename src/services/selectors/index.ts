import type { RootState } from '@services/store';

export const selectIngredients = (state: RootState) => state.ingredients.ingredients;
export const selectIngredientsLoading = (state: RootState) => state.ingredients.isLoading;
export const selectIngredientsError = (state: RootState) => state.ingredients.error;

export const selectConstructor = (state: RootState) => state.burgerConstructor;

export const selectFeed = (state: RootState) => state.feed;
export const selectFeedOrders = (state: RootState) => state.feed.orders;
export const selectFeedLoading = (state: RootState) => state.feed.isLoading;
export const selectFeedError = (state: RootState) => state.feed.error;

export const selectUserOrders = (state: RootState) => state.userOrders.orders;
export const selectUserOrdersLoading = (state: RootState) => state.userOrders.isLoading;
export const selectUserOrdersError = (state: RootState) => state.userOrders.error;

export const selectOrderRequest = (state: RootState) => state.order.orderRequest;
export const selectOrderModalData = (state: RootState) => state.order.orderModalData;
export const selectOrderData = (state: RootState) => state.order.orderData;
export const selectOrderDetailsLoading = (state: RootState) =>
  state.order.orderDetailsLoading;
export const selectOrderDetailsError = (state: RootState) => state.order.orderDetailsError;

export const selectUser = (state: RootState) => state.user.user;
export const selectIsAuthChecked = (state: RootState) => state.user.isAuthChecked;
export const selectLoginError = (state: RootState) => state.user.loginError;
export const selectRegisterError = (state: RootState) => state.user.registerError;
export const selectUpdateError = (state: RootState) => state.user.updateError;
export const selectPasswordError = (state: RootState) => state.user.passwordError;
