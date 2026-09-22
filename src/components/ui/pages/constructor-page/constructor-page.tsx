import { BurgerConstructor, BurgerIngredients } from '@components';
import { Preloader } from '@ui';

import type { ConstructorPageUIProps } from './type';

import styles from './constructor-page.module.css';

export const ConstructorPageUI = ({
  isIngredientsLoading,
  ingredientsError,
}: ConstructorPageUIProps): React.JSX.Element => {
  if (isIngredientsLoading) {
    return <Preloader />;
  }

  if (ingredientsError) {
    return (
      <p className="text text_type_main-medium mt-30" style={{ textAlign: 'center' }}>
        {ingredientsError}
      </p>
    );
  }

  return (
    <main className={styles.containerMain}>
      <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
        Соберите бургер
      </h1>
      <div className={`${styles.main} pl-5 pr-5`}>
        <BurgerIngredients />
        <BurgerConstructor />
      </div>
    </main>
  );
};
