import { ConstructorPageUI } from '@ui-pages';

import {
  selectIngredients,
  selectIngredientsError,
  selectIngredientsLoading,
} from '@selectors';
import { useSelector } from '@services/store';

export const ConstructorPage = (): React.JSX.Element => {
  const ingredients = useSelector(selectIngredients);
  const isLoading = useSelector(selectIngredientsLoading);
  const error = useSelector(selectIngredientsError);

  return (
    <ConstructorPageUI
      isIngredientsLoading={isLoading && !ingredients.length}
      ingredientsError={!ingredients.length ? error : null}
    />
  );
};
