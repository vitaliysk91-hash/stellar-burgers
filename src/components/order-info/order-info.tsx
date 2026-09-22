import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { OrderInfoUI, Preloader } from '@ui';

import {
  selectIngredients,
  selectIngredientsError,
  selectIngredientsLoading,
  selectOrderData,
  selectOrderDetailsError,
  selectOrderDetailsLoading,
} from '@selectors';
import { fetchOrderByNumber, resetOrderDetails } from '@slices/orderSlice';
import { useDispatch, useSelector } from '@services/store';

import type { TIngredient } from '@utils-types';

export const OrderInfo = (): React.JSX.Element => {
  const { number } = useParams();
  const dispatch = useDispatch();
  const orderData = useSelector(selectOrderData);
  const orderLoading = useSelector(selectOrderDetailsLoading);
  const orderError = useSelector(selectOrderDetailsError);
  const ingredients = useSelector(selectIngredients);
  const ingredientsLoading = useSelector(selectIngredientsLoading);
  const ingredientsError = useSelector(selectIngredientsError);

  useEffect(() => {
    const orderNumber = Number(number);

    if (Number.isFinite(orderNumber)) {
      void dispatch(fetchOrderByNumber(orderNumber));
    }

    return () => {
      dispatch(resetOrderDetails());
    };
  }, [dispatch, number]);

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    type IngredientsWithCount = Record<string, TIngredient & { count: number }>;

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: IngredientsWithCount, ingredientId) => {
        const current = acc[ingredientId];

        if (current) {
          current.count += 1;
          return acc;
        }

        const ingredient = ingredients.find((item) => item._id === ingredientId);
        if (ingredient) {
          acc[ingredientId] = { ...ingredient, count: 1 };
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (sum, item) => sum + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date: new Date(orderData.createdAt),
      total,
    };
  }, [ingredients, orderData]);

  if (orderLoading || ingredientsLoading) {
    return <Preloader />;
  }

  if (orderError || ingredientsError) {
    return (
      <p className="text text_type_main-medium">
        {orderError ?? ingredientsError ?? 'Не удалось загрузить заказ'}
      </p>
    );
  }

  if (!orderInfo) {
    return <p className="text text_type_main-medium">Заказ не найден</p>;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
