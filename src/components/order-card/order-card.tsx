import { memo, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import { OrderCardUI } from '@ui';

import { selectIngredients } from '@selectors';
import { useSelector } from '@services/store';

import type { OrderCardProps } from './type';
import type { TIngredient } from '@utils-types';

const MAX_INGREDIENTS = 6;

export const OrderCard = memo(function OrderCard({
  order,
}: OrderCardProps): React.JSX.Element | null {
  const location = useLocation();
  const ingredients = useSelector(selectIngredients);

  const orderInfo = useMemo(() => {
    if (!ingredients.length) return null;

    const ingredientsInfo = order.ingredients.reduce((acc: TIngredient[], item) => {
      const ingredient = ingredients.find((current) => current._id === item);
      return ingredient ? [...acc, ingredient] : acc;
    }, []);

    const total = ingredientsInfo.reduce((sum, item) => sum + item.price, 0);
    const ingredientsToShow = ingredientsInfo.slice(0, MAX_INGREDIENTS);
    const remains = Math.max(ingredientsInfo.length - MAX_INGREDIENTS, 0);

    return {
      ...order,
      ingredientsInfo,
      ingredientsToShow,
      remains,
      total,
      date: new Date(order.createdAt),
    };
  }, [ingredients, order]);

  if (!orderInfo) return null;

  return (
    <OrderCardUI
      orderInfo={orderInfo}
      maxIngredients={MAX_INGREDIENTS}
      locationState={{ background: location }}
    />
  );
});
