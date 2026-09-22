import {
  fetchIngredients,
  ingredientsReducer,
} from '@slices/ingredientsSlice';

import type { TIngredient } from '@utils-types';

const ingredient: TIngredient = {
  _id: '1',
  name: 'Ингредиент',
  type: 'main',
  proteins: 1,
  fat: 2,
  carbohydrates: 3,
  calories: 4,
  price: 100,
  image: 'image.png',
  image_large: 'image-large.png',
  image_mobile: 'image-mobile.png',
};

describe('ingredientsSlice', () => {
  it('sets loading on pending', () => {
    const state = ingredientsReducer(undefined, fetchIngredients.pending('request', undefined));
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('stores ingredients on fulfilled', () => {
    const state = ingredientsReducer(
      undefined,
      fetchIngredients.fulfilled([ingredient], 'request', undefined)
    );
    expect(state.ingredients).toEqual([ingredient]);
    expect(state.isLoading).toBe(false);
  });

  it('stores request error on rejected', () => {
    const state = ingredientsReducer(
      undefined,
      fetchIngredients.rejected(new Error('network'), 'request', undefined)
    );
    expect(state.error).toBe('network');
    expect(state.isLoading).toBe(false);
  });
});
