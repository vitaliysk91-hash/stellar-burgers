import { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import {
  AppHeader,
  IngredientDetails,
  Modal,
  OrderInfo,
  ProtectedRoute,
} from '@components';
import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword,
} from '@pages';

import { fetchIngredients } from '@slices/ingredientsSlice';
import { checkUserAuth } from '@slices/userSlice';
import { useDispatch } from '@services/store';

import type { Location } from 'react-router-dom';
import type { ReactNode } from 'react';

import '../../index.css';
import styles from './app.module.css';

type BackgroundState = {
  background?: Location;
};

type DetailPageProps = {
  children: ReactNode;
  title: string;
};

const DetailPage = ({ children, title }: DetailPageProps): React.JSX.Element => (
  <main className={styles.detailPageWrap}>
    <h1 className={`${styles.detailHeader} text text_type_main-large mb-5`}>{title}</h1>
    {children}
  </main>
);

const App = (): React.JSX.Element => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const background = (location.state as BackgroundState | null)?.background;

  useEffect(() => {
    void dispatch(fetchIngredients());
    void dispatch(checkUserAuth());
  }, [dispatch]);

  const closeModal = (): void => {
    void navigate(-1);
  };

  return (
    <div className={styles.app}>
      <AppHeader />

      <Routes location={background ?? location}>
        <Route path="/" element={<ConstructorPage />} />
        <Route path="/feed" element={<Feed />} />
        <Route
          path="/login"
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path="/register"
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reset-password"
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/orders"
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ingredients/:id"
          element={
            <DetailPage title="Детали ингредиента">
              <IngredientDetails />
            </DetailPage>
          }
        />
        <Route
          path="/feed/:number"
          element={
            <DetailPage title="Информация о заказе">
              <OrderInfo />
            </DetailPage>
          }
        />
        <Route
          path="/profile/orders/:number"
          element={
            <ProtectedRoute>
              <DetailPage title="Информация о заказе">
                <OrderInfo />
              </DetailPage>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound404 />} />
      </Routes>

      {background && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <Modal title="Детали ингредиента" onClose={closeModal}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path="/feed/:number"
            element={
              <Modal title="Информация о заказе" onClose={closeModal}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path="/profile/orders/:number"
            element={
              <ProtectedRoute>
                <Modal title="Информация о заказе" onClose={closeModal}>
                  <OrderInfo />
                </Modal>
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
