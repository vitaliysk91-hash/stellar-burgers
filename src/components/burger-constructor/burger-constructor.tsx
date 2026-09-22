import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { BurgerConstructorUI } from '@ui';

import {
  selectConstructor,
  selectOrderModalData,
  selectOrderRequest,
  selectUser,
} from '@selectors';
import { clearConstructor } from '@slices/constructorSlice';
import { fetchFeed } from '@slices/feedSlice';
import { createOrder, resetCreatedOrder } from '@slices/orderSlice';
import { fetchUserOrders } from '@slices/userOrdersSlice';
import { useDispatch, useSelector } from '@services/store';

export const BurgerConstructor = (): React.JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const constructorItems = useSelector(selectConstructor);
  const orderRequest = useSelector(selectOrderRequest);
  const orderModalData = useSelector(selectOrderModalData);
  const user = useSelector(selectUser);

  const onOrderClick = (): void => {
    if (!constructorItems.bun || orderRequest) return;

    if (!user) {
      void navigate('/login', { state: { from: location } });
      return;
    }

    const ingredientIds = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((ingredient) => ingredient._id),
      constructorItems.bun._id,
    ];

    void dispatch(createOrder(ingredientIds))
      .unwrap()
      .then(() => {
        dispatch(clearConstructor());
        void dispatch(fetchFeed());
        void dispatch(fetchUserOrders());
      });
  };

  const closeOrderModal = (): void => {
    dispatch(resetCreatedOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce((sum, ingredient) => sum + ingredient.price, 0),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
