import {
  addIngredient,
  clearConstructor,
  constructorReducer,
  moveIngredient,
  removeIngredient,
} from '@slices/constructorSlice';

import type { TIngredient } from '@utils-types';

const bun: TIngredient = {
  _id: 'bun-1',
  name: 'Булка',
  type: 'bun',
  proteins: 1,
  fat: 2,
  carbohydrates: 3,
  calories: 4,
  price: 100,
  image: 'bun.png',
  image_large: 'bun-large.png',
  image_mobile: 'bun-mobile.png',
};

const secondBun: TIngredient = { ...bun, _id: 'bun-2', name: 'Другая булка' };
const filling: TIngredient = { ...bun, _id: 'main-1', name: 'Начинка', type: 'main' };
const sauce: TIngredient = { ...bun, _id: 'sauce-1', name: 'Соус', type: 'sauce' };

describe('constructorSlice', () => {
  it('replaces the selected bun', () => {
    let state = constructorReducer(undefined, addIngredient(bun));
    state = constructorReducer(state, addIngredient(secondBun));

    expect(state.bun?._id).toBe('bun-2');
    expect(state.ingredients).toHaveLength(0);
  });

  it('creates unique ids for duplicate ingredients and removes only one instance', () => {
    let state = constructorReducer(undefined, addIngredient(filling));
    state = constructorReducer(state, addIngredient(filling));

    expect(state.ingredients).toHaveLength(2);
    expect(state.ingredients[0]?.id).not.toBe(state.ingredients[1]?.id);

    const firstId = state.ingredients[0]?.id;
    expect(firstId).toBeDefined();
    state = constructorReducer(state, removeIngredient(firstId as string));

    expect(state.ingredients).toHaveLength(1);
  });

  it('moves ingredients inside the constructor', () => {
    let state = constructorReducer(undefined, addIngredient(filling));
    state = constructorReducer(state, addIngredient(sauce));
    const firstId = state.ingredients[0]?.id;

    state = constructorReducer(state, moveIngredient({ fromIndex: 0, toIndex: 1 }));

    expect(state.ingredients[1]?.id).toBe(firstId);
  });

  it('clears the constructor', () => {
    let state = constructorReducer(undefined, addIngredient(bun));
    state = constructorReducer(state, addIngredient(filling));
    state = constructorReducer(state, clearConstructor());

    expect(state).toEqual({ bun: null, ingredients: [] });
  });
});
