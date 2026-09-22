import { useParams } from 'react-router-dom';

import { IngredientDetailsUI, Preloader } from '@ui';

import {
  selectIngredients,
  selectIngredientsError,
  selectIngredientsLoading,
} from '@selectors';
import { useSelector } from '@services/store';

export const IngredientDetails = (): React.JSX.Element => {
  const { id } = useParams();
  const ingredients = useSelector(selectIngredients);
  const isLoading = useSelector(selectIngredientsLoading);
  const error = useSelector(selectIngredientsError);
  const ingredientData = ingredients.find((ingredient) => ingredient._id === id);

  if (isLoading) {
    return <Preloader />;
  }

  if (error) {
    return <p className="text text_type_main-medium">{error}</p>;
  }

  if (!ingredientData) {
    return <p className="text text_type_main-medium">Ингредиент не найден</p>;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
