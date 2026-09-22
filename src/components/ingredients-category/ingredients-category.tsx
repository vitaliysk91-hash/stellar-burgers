import { useMemo } from 'react';

import { IngredientsCategoryUI } from '@ui';

import { selectConstructor } from '@selectors';
import { useSelector } from '@services/store';

import type { TIngredientsCategoryProps } from './type';

export const IngredientsCategory = ({
  title,
  titleRef,
  ingredients,
  ref,
}: TIngredientsCategoryProps): React.JSX.Element => {
  const burgerConstructor = useSelector(selectConstructor);

  const ingredientsCounters = useMemo(() => {
    const counters: Record<string, number> = {};

    burgerConstructor.ingredients.forEach((ingredient) => {
      counters[ingredient._id] = (counters[ingredient._id] ?? 0) + 1;
    });

    if (burgerConstructor.bun) {
      counters[burgerConstructor.bun._id] = 2;
    }

    return counters;
  }, [burgerConstructor]);

  return (
    <IngredientsCategoryUI
      title={title}
      titleRef={titleRef}
      ingredients={ingredients}
      ingredientsCounters={ingredientsCounters}
      ref={ref}
    />
  );
};
