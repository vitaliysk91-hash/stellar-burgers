import { useEffect } from 'react';

import { ProfileOrdersUI } from '@ui-pages';
import { Preloader } from '@ui';

import {
  selectUserOrders,
  selectUserOrdersError,
  selectUserOrdersLoading,
} from '@selectors';
import { fetchUserOrders } from '@slices/userOrdersSlice';
import { useDispatch, useSelector } from '@services/store';

const ORDERS_REFRESH_INTERVAL = 15_000;

export const ProfileOrders = (): React.JSX.Element => {
  const dispatch = useDispatch();
  const orders = useSelector(selectUserOrders);
  const isLoading = useSelector(selectUserOrdersLoading);
  const error = useSelector(selectUserOrdersError);

  useEffect(() => {
    const getOrders = (): void => {
      void dispatch(fetchUserOrders());
    };

    getOrders();
    const timer = window.setInterval(getOrders, ORDERS_REFRESH_INTERVAL);
    return () => window.clearInterval(timer);
  }, [dispatch]);

  if (isLoading && !orders.length) {
    return <Preloader />;
  }

  if (error && !orders.length) {
    return (
      <p className="text text_type_main-medium mt-30" style={{ textAlign: 'center' }}>
        {error}
      </p>
    );
  }

  return <ProfileOrdersUI orders={orders} />;
};
